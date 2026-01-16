import { useState } from "react";
import { updateEmailCategory } from "../services/api";

const categoryColors = {
   Work: "bg-blue-100 text-blue-700 border border-blue-300",
   Personal: "bg-green-100 text-green-700 border border-green-300",
   Promotion: "bg-red-100 text-red-700 border border-red-300",
   Social: "bg-purple-100 text-purple-700 border border-purple-300",
   Finance: "bg-teal-100 text-teal-700 border border-teal-300",
   Updates: "bg-yellow-100 text-yellow-700 border border-yellow-300",
   Spam: "bg-orange-100 text-orange-700 border border-orange-300",
};

export default function EmailCard({ email, onUpdate }) {
   const [isEditing, setIsEditing] = useState(false);
   const [selectedCategory, setSelectedCategory] = useState(
      email.userCategory || email.category
   );
   const [saving, setSaving] = useState(false);
   const [showSuccess, setShowSuccess] = useState(false);

   const handleSave = async () => {
      setSaving(true);
      try {
         const updated = await updateEmailCategory(email._id, selectedCategory);
         onUpdate(updated);
         setIsEditing(false);
         setShowSuccess(true);
         setTimeout(() => setShowSuccess(false), 2000);
      } catch (error) {
         console.error("Failed to update email:", error);
         alert("Failed to update category. Please try again.");
      } finally {
         setSaving(false);
      }
   };

   const handleCancel = () => {
      setSelectedCategory(email.userCategory || email.category);
      setIsEditing(false);
   };

   const displayCategory = email.userCategory || email.category;

   return (
      <div className="border border-gray-300 rounded p-4 mb-3 bg-white">
         <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
               <h3 className="font-semibold text-gray-800 text-base">
                  {email.subject}
               </h3>
               <p className="text-xs text-gray-500 mt-1">From: {email.from}</p>
            </div>
            <span
               className={`px-2 py-1 rounded text-xs font-medium ${categoryColors[displayCategory]}`}
            >
               {displayCategory}
            </span>
         </div>

         <p className="text-gray-600 text-sm mb-3">{email.body}</p>

         {showSuccess && (
            <div className="mb-3 bg-green-50 border border-green-300 text-green-700 px-3 py-2 rounded text-sm flex items-center gap-2">
               <span>✓</span>
               <span>Category updated successfully!</span>
            </div>
         )}

         {isEditing ? (
            <div className="bg-gray-50 border border-gray-300 rounded p-3">
               <label className="block text-xs text-gray-600 mb-2 font-medium">
                  Select correct category:
               </label>
               <div className="flex gap-2 items-center">
                  <select
                     value={selectedCategory}
                     onChange={(e) => setSelectedCategory(e.target.value)}
                     className="flex-1 border border-gray-400 rounded px-2 py-2 text-sm focus:outline-none focus:border-blue-500"
                     autoFocus
                  >
                     <option value="Work">Work</option>
                     <option value="Personal">Personal</option>
                     <option value="Promotion">Promotion</option>
                     <option value="Social">Social</option>
                     <option value="Finance">Finance</option>
                     <option value="Updates">Updates</option>
                     <option value="Spam">Spam</option>
                  </select>
                  <button
                     onClick={handleSave}
                     disabled={saving || selectedCategory === displayCategory}
                     className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded text-sm font-medium"
                  >
                     {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                     onClick={handleCancel}
                     disabled={saving}
                     className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white px-4 py-2 rounded text-sm"
                  >
                     Cancel
                  </button>
               </div>
            </div>
         ) : (
            <div className="flex items-center gap-3">
               <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 hover:underline"
               >
                  <span>✎</span>
                  <span>Correct Category</span>
               </button>
               {email.userCategory && (
                  <span className="text-xs text-gray-500">
                     (Already corrected)
                  </span>
               )}
            </div>
         )}

         {email.userCategory && (
            <div className="mt-2 text-xs text-gray-600">
               <span>Original: {email.category}</span>
               {email.isCorrect !== null && (
                  <span
                     className={
                        email.isCorrect
                           ? "text-green-600 ml-2"
                           : "text-red-600 ml-2"
                     }
                  >
                     {email.isCorrect ? "(Correct)" : "(Corrected)"}
                  </span>
               )}
            </div>
         )}
      </div>
   );
}

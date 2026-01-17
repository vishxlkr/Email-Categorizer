import { useEffect, useState } from "react";
import EmailList from "./components/EmailList";
import AccuracyStats from "./components/AccuracyStats";
import { fetchEmails, seedDatabase } from "./services/api";

export default function App() {
   const [emails, setEmails] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      loadEmails();
   }, []);

   const loadEmails = async () => {
      setLoading(true);
      try {
         const data = await fetchEmails();
         setEmails(data);
      } catch (error) {
         console.error("Failed to load emails:", error);
      }
      setLoading(false);
   };

   const handleSeed = async () => {
      setLoading(true);
      try {
         await seedDatabase();
         await loadEmails();
      } catch (error) {
         console.error("Failed to seed database:", error);
      }
      setLoading(false);
   };

   const handleEmailUpdate = (updatedEmail) => {
      setEmails(
         emails.map((e) => (e._id === updatedEmail._id ? updatedEmail : e))
      );
   };

   return (
      <div className="min-h-screen bg-gray-100 p-6">
         <div className="max-w-5xl mx-auto">
            <header className="mb-6">
               <h1 className="text-3xl font-bold text-gray-800 mb-1">
                  Email Categorizer
               </h1>
               <p className="text-gray-600 text-sm">using OpenAI</p>
            </header>

            <div className="mb-5">
               <AccuracyStats emails={emails} />
            </div>

            <div className="bg-white rounded shadow p-5">
               <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl font-semibold text-gray-800">
                     Email List
                  </h2>
                  <button
                     onClick={handleSeed}
                     disabled={loading}
                     className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded text-sm"
                  >
                     {loading ? "Loading..." : "Refresh"}
                  </button>
               </div>

               {emails.length === 0 ? (
                  <p className="text-gray-500 text-center py-10">
                     No emails to display. Click Refresh to load emails.
                  </p>
               ) : (
                  <EmailList
                     emails={emails}
                     onEmailUpdate={handleEmailUpdate}
                  />
               )}
            </div>
         </div>
      </div>
   );
}


git quick
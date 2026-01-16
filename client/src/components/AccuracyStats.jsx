import { useEffect, useState } from "react";
import { fetchAccuracy } from "../services/api";

export default function AccuracyStats({ emails }) {
   const [stats, setStats] = useState(null);

   useEffect(() => {
      if (emails.length > 0) {
         loadStats();
      }
   }, [emails]);

   const loadStats = async () => {
      try {
         const data = await fetchAccuracy();
         setStats(data);
      } catch (error) {
         console.error("Failed to load accuracy:", error);
      }
   };

   if (!stats) return null;

   return (
      <div className="bg-white rounded shadow p-4 border border-gray-200">
         <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-medium">Accuracy</span>
            <span className="text-2xl font-bold text-blue-600">
               {stats.accuracy}%
            </span>
         </div>
         <div className="w-full bg-gray-200 rounded h-3">
            <div
               className="bg-blue-600 h-3 rounded"
               style={{ width: `${stats.accuracy}%` }}
            />
         </div>
      </div>
   );
}

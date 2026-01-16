const API_URL = "http://localhost:5000/api";

export const fetchEmails = async () => {
   const response = await fetch(`${API_URL}/emails`);
   if (!response.ok) throw new Error("Failed to fetch emails");
   return response.json();
};

export const seedDatabase = async () => {
   const response = await fetch(`${API_URL}/emails/seed`, {
      method: "POST",
   });
   if (!response.ok) throw new Error("Failed to seed database");
   return response.json();
};

export const updateEmailCategory = async (id, category) => {
   const response = await fetch(`${API_URL}/emails/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category }),
   });
   if (!response.ok) throw new Error("Failed to update email");
   return response.json();
};

export const fetchAccuracy = async () => {
   const response = await fetch(`${API_URL}/emails/accuracy/stats`);
   if (!response.ok) throw new Error("Failed to fetch accuracy");
   return response.json();
};

import openai from "../config/openai.js";

const categories = [
   "Work",
   "Personal",
   "Promotion",
   "Social",
   "Finance",
   "Updates",
   "Spam",
];

export const classifyEmailWithAI = async (subject, body) => {
   if (!openai) {
      return classifyEmailFallback(subject, body);
   }

   try {
      const prompt = `Classify this email into one of these categories: ${categories.join(
         ", "
      )}.
    
Subject: ${subject}
Body: ${body}

Respond with ONLY the category name, nothing else.`;

      const response = await openai.chat.completions.create({
         model: "gpt-3.5-turbo",
         messages: [{ role: "user", content: prompt }],
         max_tokens: 10,
      });

      const classification = response.choices[0].message.content.trim();
      return categories.includes(classification) ? classification : "Spam";
   } catch (error) {
      console.warn(
         "⚠️ AI classification failed, using fallback:",
         error.message
      );
      return classifyEmailFallback(subject, body);
   }
};

const classifyEmailFallback = (subject, body) => {
   const text = `${subject} ${body}`.toLowerCase();

   if (
      text.includes("work") ||
      text.includes("meeting") ||
      text.includes("project")
   ) {
      return "Work";
   }
   if (
      text.includes("discount") ||
      text.includes("sale") ||
      text.includes("offer") ||
      text.includes("promotion")
   ) {
      return "Promotion";
   }
   if (
      text.includes("update") ||
      text.includes("notification") ||
      text.includes("alert")
   ) {
      return "Updates";
   }
   if (text.includes("friend") || text.includes("family")) {
      return "Personal";
   }
   if (
      text.includes("social") ||
      text.includes("facebook") ||
      text.includes("twitter") ||
      text.includes("linkedin")
   ) {
      return "Social";
   }
   if (
      text.includes("payment") ||
      text.includes("invoice") ||
      text.includes("bank") ||
      text.includes("transaction")
   ) {
      return "Finance";
   }
   if (
      text.includes("spam") ||
      text.includes("unsubscribe") ||
      text.includes("phishing")
   ) {
      return "Spam";
   }

   return "Spam";
};

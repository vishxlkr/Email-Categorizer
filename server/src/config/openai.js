import OpenAI from "openai";

let openai = null;

try {
   openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
   });
   console.log("✅ OpenAI configured");
} catch (error) {
   console.warn("⚠️ OpenAI initialization warning:", error.message);
}

export default openai;

import mongoose from "mongoose";

const emailSchema = new mongoose.Schema(
   {
      from: String,
      subject: String,
      body: String,
      category: {
         type: String,
         enum: [
            "Work",
            "Personal",
            "Promotion",
            "Social",
            "Finance",
            "Updates",
            "Spam",
         ],
         default: "Spam",
      },
      isCorrect: {
         type: Boolean,
         default: null,
      },
      userCategory: String,
   },
   { timestamps: true }
);

export default mongoose.model("Email", emailSchema);

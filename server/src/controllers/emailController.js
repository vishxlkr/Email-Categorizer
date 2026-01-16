import Email from "../models/Email.js";
import { classifyEmailWithAI } from "../services/classifyEmail.js";
import { sampleEmails } from "../data/sampleEmails.js";

export const getAllEmails = async (req, res) => {
   try {
      const emails = await Email.find().sort({ createdAt: -1 });
      res.json(emails);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

export const seedEmails = async (req, res) => {
   try {
      await Email.deleteMany({});

      const classifiedEmails = await Promise.all(
         sampleEmails.map(async (email) => {
            const category = await classifyEmailWithAI(
               email.subject,
               email.body
            );
            return { ...email, category };
         })
      );

      await Email.insertMany(classifiedEmails);
      res.json({
         message: "Database seeded successfully",
         count: classifiedEmails.length,
      });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

export const updateEmailCategory = async (req, res) => {
   try {
      const { category } = req.body;
      const email = await Email.findById(req.params.id);

      email.userCategory = category;
      email.isCorrect = category === email.category;
      await email.save();

      res.json(email);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

export const getAccuracy = async (req, res) => {
   try {
      const emails = await Email.find();
      const total = emails.length;
      const withCorrection = emails.filter((e) => e.userCategory).length;
      const correct = emails.filter((e) => e.isCorrect === true).length;
      const accuracy =
         withCorrection > 0
            ? ((correct / withCorrection) * 100).toFixed(2)
            : 100;

      res.json({
         total,
         correct,
         accuracy,
         categories: {
            Work: emails.filter((e) => e.category === "Work").length,
            Personal: emails.filter((e) => e.category === "Personal").length,
            Promotion: emails.filter((e) => e.category === "Promotion").length,
            Social: emails.filter((e) => e.category === "Social").length,
            Finance: emails.filter((e) => e.category === "Finance").length,
            Updates: emails.filter((e) => e.category === "Updates").length,
            Spam: emails.filter((e) => e.category === "Spam").length,
         },
      });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

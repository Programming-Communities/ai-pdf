import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Define and export the schema
export default defineSchema({
  users: defineTable({
    userName: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  }),

  pdfFiles: defineTable({
    fileId: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    fileUrl: v.string(),
    createdBy: v.string(),
  }),
});


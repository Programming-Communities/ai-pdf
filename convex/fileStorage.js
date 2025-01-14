import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Mutation to generate an upload URL
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// Mutation to add a file entry to the database
export const AddFileEntryToDb = mutation({
  args: v.object({
    fileId: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    fileUrl: v.string(),
    createdBy: v.string(),
  }),
  handler: async (ctx, args) => {
    // Insert into the database
    await ctx.db.insert("pdfFiles", {
      fileId: args.fileId,
      fileName: args.fileName,
      storageId: args.storageId,
      fileUrl: args.fileUrl,
      createdBy: args.createdBy,
    });

    return "Inserted";
  },
});

// Mutation to get a file URL by storageId
export const getFileUrl = mutation({
  args: v.object({
    storageId: v.string(),
  }),
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    return url;
  },
});

// Query to get file record by fileId
export const GetFileRecord = query({
  args: v.object({
    fileId: v.string(),
  }),
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();
    console.log(result);
    return result[0];
  },
});


// import { mutation } from "./_generated/server";
// import { v } from "convex/values";

// // Mutation to generate an upload URL
// export const generateUploadUrl = mutation(async (ctx) => {
//   return await ctx.storage.generateUploadUrl();
// });

// // Mutation to add a file entry to the database
// export const AddFileEntryToDb = mutation({
//   args: v.object({
//     fileId: v.string(),
//     storageId: v.string(),
//     fileName: v.string(),
//     fileUrl: v.string(),
//     createdBy: v.string(),
//   }),
//   handler: async (ctx, args) => {
//     // Insert into the database
//     await ctx.db.insert("pdfFiles", {
//       fileId: args.fileId,
//       fileName: args.fileName,
//       storageId: args.storageId,
//       fileUrl: args.fileUrl,
//       createdBy: args.createdBy,
//     });

//     return "Inserted";
//   },
// });

// // Mutation to get a file URL by storageId
// export const getFileUrl = mutation({
//   args: v.object({
//     storageId: v.string(),
//   }),
//   handler: async (ctx, args) => {
//     const url = await ctx.storage.getUrl(args.storageId);
//     return url;
//   },
// });

// export const GetFileRecord=query({
//   args{
//       fileId:v.string()
//   },
//   handler:async(ctx,args)=>{
//     const result=await ctx.db.query("pdfFiles").filter((q)=>q.eq(q.field('fileId'),args.fileId))
//     .collect();
//     console.log(result);
//     return result;
//   }
// })
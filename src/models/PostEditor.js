import { Schema, model } from "mongoose";

const PostEditorSchema = new Schema({
  _id: String,
  editorId: { type: String, ref: "User", required: true },
  postId: { type: String, ref: "Post", required: true },
});

PostEditorSchema.virtual("post", {
  ref: "Blog",
  localField: "postId",
  foreignField: "_id",
  justOne: true,
});

PostEditorSchema.virtual("editor", {
  ref: "User",
  localField: "editorId",
  foreignField: "_id",
  justOne: true,
});

const PostEditor = model("PostEditor", PostEditorSchema);

export { PostEditor, PostEditorSchema };

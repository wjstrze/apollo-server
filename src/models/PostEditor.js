import { Schema, model } from "mongoose";

const PostEditorSchema = new Schema({
  _id: Schema.Types.ObjectId,
  editorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
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

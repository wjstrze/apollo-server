import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  id: Schema.Types.ObjectId,
  title: String,
  postBlogId: { type: Schema.Types.ObjectId, ref: "Blog" },
});

const Post = model("Post", PostSchema);

export { Post, PostSchema };

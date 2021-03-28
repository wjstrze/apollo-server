import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  postBlogId: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
});

PostSchema.virtual("blog", {
  ref: "Blog",
  localField: "postBlogId",
  foreignField: "_id",
  justOne: true,
});

PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "commentPostId",
  justOne: false,
});

PostSchema.virtual("editors", {
  ref: "PostEditor",
  localField: "_id",
  foreignField: "postId",
  justOne: false,
});

const Post = model("Post", PostSchema);

export { Post, PostSchema };

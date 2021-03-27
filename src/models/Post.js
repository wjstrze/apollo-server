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

const Post = model("Post", PostSchema);

export { Post, PostSchema };

import { Schema, model } from "mongoose";

const BlogSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
});

BlogSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "postBlogId",
  justOne: false,
});

const Blog = model("Blog", BlogSchema);

export { Blog, BlogSchema };

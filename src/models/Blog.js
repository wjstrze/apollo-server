import { Schema, model } from "mongoose";

const BlogSchema = new Schema({
  name: String,
  id: Schema.Types.ObjectId,
});

const Blog = model("Blog", BlogSchema);

export { Blog, BlogSchema };

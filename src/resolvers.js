import { Types } from "mongoose";
import { Blog } from "./models/Blog";
import { Post } from "./models/Post";

export const resolvers = {
  Query: {
    blogs: () => Blog.find().populate({ path: "posts", model: "Post" }).exec(),
    posts: () => Post.find().populate({ path: "blog", model: "Blog" }).exec(),
  },
  Mutation: {
    createBlog: async (_, { name }) => {
      const blog = new Blog({
        _id: Types.ObjectId(),
        name,
      });
      return blog.save();
    },
    createPost: async (_, { title, postBlogId }) => {
      const post = new Post({
        title,
        postBlogId,
      });
      return post.save();
    },
  },
};

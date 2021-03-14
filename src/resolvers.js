import { Types } from "mongoose";
import { Blog } from "./models/Blog";
import { Post } from "./models/Post";

export const resolvers = {
  Query: {
    blogs: () => Blog.find(),
    posts: () => Post.find(),
  },
  Mutation: {
    createBlog: async (_, { name }) => {
      const blog = new Blog({
        id: Types.ObjectId(),
        name,
      });
      return blog.save();
    },
    createPost: async (_, { title, postBlogId }) => {
      const post = new Post({
        id: Types.ObjectId(),
        title,
        postBlogId,
      });
      return post.save();
    },
  },
};

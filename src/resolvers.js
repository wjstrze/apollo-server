import { Types } from "mongoose";
import { Blog, Post, User } from "./models";

export const resolvers = {
  Query: {
    blogs: () => Blog.find().populate({ path: "posts", model: "Post" }).exec(),
    posts: () => Post.find().populate({ path: "blog", model: "Blog" }).exec(),
    users: () => User.find().exec(),
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
        _id: Types.ObjectId(),
        title,
        postBlogId,
      });
      return post.save();
    },
    createUser: async (_, { username }) => {
      const user = new User({
        _id: Types.ObjectId(),
        username,
      });
      return user.save();
    },
  },
};

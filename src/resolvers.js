import { Types } from "mongoose";
import { Blog, Post, User, Comment, PostEditor } from "./models";

export const resolvers = {
  Query: {
    blogs: () => Blog.find().populate({ path: "posts", model: "Post" }).exec(),
    posts: () => Post.find().populate({ path: "blog", model: "Blog" }).exec(),
    users: () => User.find().exec(),
    comments: () => Comment.find().exec(),
    postEditors: () => PostEditor.find().exec(),
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
    createComment: async (_, { content, commentPostId }) => {
      const comment = new Comment({
        _id: Types.ObjectId(),
        content,
        commentPostId,
      });
      return comment.save();
    },
    createPostEditor: async (_, { postId, editorId }) => {
      const postEditor = new PostEditor({
        _id: Types.ObjectId(),
        postId,
        editorId,
      });
      return postEditor.save();
    },
  },
};

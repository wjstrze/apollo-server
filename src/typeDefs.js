import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Blog {
    _id: ID!
    name: String!
    posts: [Post]
  }

  type Post {
    _id: ID!
    title: String!
    postBlogId: String!
    blog: Blog!
  }

  type Comment {
    _id: ID!
    content: String!
    commentPostId: String!
  }

  type User {
    _id: ID!
    username: String!
  }

  type Query {
    blogs: [Blog]
    posts: [Post]
    users: [User]
    comments: [Comment]
  }

  type Mutation {
    createBlog(name: String!): Blog
    createPost(title: String!, postBlogId: ID!): Post
    createUser(username: String!): User
    createComment(content: String!, commentPostId: ID!): Comment
  }
`;

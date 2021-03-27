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

  type Query {
    blogs: [Blog]
    posts: [Post]
  }

  type Mutation {
    createBlog(name: String!): Blog
    createPost(title: String!, postBlogId: ID!): Post
  }
`;

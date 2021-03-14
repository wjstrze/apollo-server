import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Blog {
    id: ID!
    name: String!
  }

  type Post {
    id: ID!
    title: String!
    postBlogId: String!
  }

  type Query {
    blogs: [Blog!]!
    posts: [Post!]!
  }

  type Mutation {
    createBlog(name: String!): Blog
    createPost(title: String!, postBlogId: ID!): Post
  }
`;

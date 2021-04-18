import {
  DynamoDBClient,
  BatchWriteItemCommand,
} from "@aws-sdk/client-dynamodb";
import chunk from "lodash/chunk";

const REGION = "eu-central-1";
const MAX_BATCH_SIZE = 25; // dynamo-db limtation

const TABLES = {
  blogs: {
    typename: "Blog",
    name: "Blog-fvnsxybjd5a3tkhnhhqo4ays6q-dev",
  },
  posts: {
    typename: "Post",
    name: "Post-fvnsxybjd5a3tkhnhhqo4ays6q-dev",
  },
  comments: {
    typename: "Comment",
    name: "Comment-fvnsxybjd5a3tkhnhhqo4ays6q-dev",
  },
  posteditors: {
    typename: "PostEditor",
    name: "PostEditor-fvnsxybjd5a3tkhnhhqo4ays6q-dev",
  },
  users: {
    typename: "User",
    name: "User-fvnsxybjd5a3tkhnhhqo4ays6q-dev",
  },
};

const dbclient = new DynamoDBClient({ region: REGION });

export const seedDynamoDb = async (json) => {
  const blogs = json.blogs.map((blog) => ({
    PutRequest: {
      Item: {
        id: { S: blog._id },
        name: { S: blog.name },
        __typename: { S: TABLES.blogs.typename },
        createdAt: { S: new Date().toISOString() },
        updatedAt: { S: new Date().toISOString() },
      },
    },
  }));

  const posts = json.posts.map((post) => ({
    PutRequest: {
      Item: {
        id: { S: post._id },
        title: { S: post.title },
        postBlogId: { S: post.postBlogId },
        __typename: { S: TABLES.posts.typename },
        createdAt: { S: new Date().toISOString() },
        updatedAt: { S: new Date().toISOString() },
      },
    },
  }));

  const comments = json.comments.map((comment) => ({
    PutRequest: {
      Item: {
        id: { S: comment._id },
        content: { S: comment.content },
        commentPostId: { S: comment.commentPostId },
        __typename: { S: TABLES.comments.typename },
        createdAt: { S: new Date().toISOString() },
        updatedAt: { S: new Date().toISOString() },
      },
    },
  }));

  const users = json.users.map((user) => ({
    PutRequest: {
      Item: {
        id: { S: user._id },
        username: { S: user.username },
        __typename: { S: TABLES.users.typename },
        createdAt: { S: new Date().toISOString() },
        updatedAt: { S: new Date().toISOString() },
      },
    },
  }));

  const posteditors = json.posteditors.map((posteditor) => ({
    PutRequest: {
      Item: {
        id: { S: posteditor._id },
        editorId: { S: posteditor.editorId },
        postId: { S: posteditor.postId },
        __typename: { S: TABLES.posteditors.typename },
        createdAt: { S: new Date().toISOString() },
        updatedAt: { S: new Date().toISOString() },
      },
    },
  }));

  const blogsChunks = chunk(blogs, MAX_BATCH_SIZE);
  const postsChunks = chunk(posts, MAX_BATCH_SIZE);
  const usersChunks = chunk(users, MAX_BATCH_SIZE);
  const commentsChunks = chunk(comments, MAX_BATCH_SIZE);
  const posteditorsChunks = chunk(posteditors, MAX_BATCH_SIZE);

  const chunks = {
    [TABLES.blogs.name]: blogsChunks,
    [TABLES.posts.name]: postsChunks,
    [TABLES.comments.name]: commentsChunks,
    [TABLES.users.name]: usersChunks,
    [TABLES.posteditors.name]: posteditorsChunks,
  };

  const chunkKeys = Object.keys(chunks);

  for (let i = 0; i < chunkKeys.length; i++) {
    const tableName = chunkKeys[i];

    for (let i = 0; i < chunks[tableName].length; i++) {
      try {
        const params = {
          RequestItems: {
            [tableName]: chunks[tableName][i],
          },
        };
        const data = await dbclient.send(new BatchWriteItemCommand(params));
        console.log("Success, items inserted", data);
      } catch (err) {
        console.log("Error", err);
      }
    }
  }
};

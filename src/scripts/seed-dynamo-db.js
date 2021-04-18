import {
  DynamoDBClient,
  BatchWriteItemCommand,
} from "@aws-sdk/client-dynamodb";
const REGION = "eu-central-1";

const TABLES = {
  blog: {
    typename: "Blog",
    name: "Blog-fvnsxybjd5a3tkhnhhqo4ays6q-dev",
  },
  post: {
    typename: "Post",
    name: "Post-fvnsxybjd5a3tkhnhhqo4ays6q-dev",
  },
  comment: {
    typename: "Comment",
    name: "Comment-fvnsxybjd5a3tkhnhhqo4ays6q-dev",
  },
  posteditor: {
    typename: "PostEditor",
    name: "PostEditor-fvnsxybjd5a3tkhnhhqo4ays6q-dev",
  },
  user: {
    typename: "User",
    name: "User-fvnsxybjd5a3tkhnhhqo4ays6q-dev",
  },
};

const params = {
  RequestItems: {
    [TABLES.blog.name]: [
      {
        PutRequest: {
          Item: {
            id: { S: "a8b0a6b8-2231-4a49-974c-e45e5503d44g" },
            name: { S: "ATTRIBUTE_1_VALUE" },
            __typename: { S: TABLES.blog.typename },
            createdAt: { S: new Date().toISOString() },
            updatedAt: { S: new Date().toISOString() },
          },
        },
      },
    ],
  },
};

const dbclient = new DynamoDBClient({ region: REGION });

export const seedDynamoDb = async (json) => {
  try {
    const data = await dbclient.send(new BatchWriteItemCommand(params));
    console.log("Success, items inserted", data);
  } catch (err) {
    console.log("Error", err);
  }
};

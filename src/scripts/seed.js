import { generateFakeData } from "./fake-data-generator";
import { seedMongoDb } from "./seed-mongo-db";
import { seedDynamoDb } from "./seed-dynamo-db";

export const seed = async (json) => {
  const json = generateFakeData();
  await seedMongoDb(json);
  await seedDynamoDb(json);
};

seed();

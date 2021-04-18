import { connect } from "mongoose";
import { config } from "dotenv";

config();

export const seedMongoDb = async (json) => {
  const db = await connect(process.env.CONNECTION_STRING, {
    dbName: "test-13",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  for (let i = 0; i < Object.keys(json).length; i++) {
    const name = Object.keys(json)[i];
    await db.connection.db.collection(name).insertMany(json[name]);
  }

  db.connection.close();
};

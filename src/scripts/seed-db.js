import { connect } from "mongoose";
import { config } from "dotenv";
import { generate } from "./fake-data-generator";

config();

const seedDB = async () => {
  const db = await connect(process.env.CONNECTION_STRING, {
    dbName: "test-12",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const json = generate();

  for (let i = 0; i < Object.keys(json).length; i++) {
    const name = Object.keys(json)[i];
    await db.connection.db.collection(name).insertMany(json[name]);
  }

  db.connection.close();
};

seedDB();

import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://secureExamAdmin:aQdLUc0YuYK8Kn6B@cluster0.ldizubn.mongodb.net/?appName=Cluster0";

async function main() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("yourDBName");
    const questions = db.collection("questions");

    const result = await questions.updateMany(
      { examId: "69a2829b55a7d440ee28854a" }, // old examId
      { $set: { examId: "69a296a66fdf3e6256be7a06" } }, // new examId
    );

    console.log("Updated documents:", result.modifiedCount);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();

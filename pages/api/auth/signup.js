import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;

  const { email, password } = JSON.parse(data);

  if (!email || !email.includes("@")) {
    res.status(422).json({ message: "Invalid email" });
    return;
  }

  if (!password || password.trim().length < 6) {
    res.status(422).json({ message: "Invalid password" });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email });

  if (existingUser) {
    res.status(422).json({ message: "Email already registered" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db
    .collection("users")
    .insertOne({ email, password: hashedPassword });

  res.status(201).json({ message: "Created user" });
  client.close();
};

export default handler;

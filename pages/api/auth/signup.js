import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

const handler = async (req, res) => {
  const data = req.body;

  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 6
  ) {
    res.status(422).json({ message: "Invalid input" });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();

  const hashedPassword = hashPassword(password);

  const result = db
    .collection("users")
    .insertOne({ email, password: hashedPassword });

  res.status(201).json({ message: "Created user" });
};

export default handler;

import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// POST /api/post
// Required fields in body: title, preview
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content, preview } = req.body;

  const session = await getSession({ req });
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      preview: preview,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/usuarios", async (req, res) => {
  let users = [];

  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: {
          contains: req.query.name,
          mode: "insensitive",
        },
        age: req.query.age,
      },
    });
  } else {
    users = await prisma.user.findMany();
  }

  res.status(200).json(users);
});

app.post("/usuarios", async (req, res) => {
  await prisma.user.create({
    data: {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    },
  });

  res.status(201).json(req.body);
});

app.put("/usuarios/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    },
  });

  res.status(201).json(req.body);
});

app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: "User delete with success!" });
});

app.listen(3000);

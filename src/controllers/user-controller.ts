import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: `Error fetching users: ${error.message}` });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { cognitoId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        cognitoId,
      },
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: `Error fetching user: ${error.message}` });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      username,
      cognitoId,
      profilePictureUrl = "i1.jpg",
      teamId = 1,
    } = req.body;
    const newUser = await prisma.user.create({
      data: {
        username,
        cognitoId,
        profilePictureUrl,
        teamId,
      },
    });
    res.json(newUser);
  } catch (error: any) {
    res.status(500).json({ error: `Error creating user: ${error.message}` });
  }
};

import prisma from "../prisma/prisma";

// this function is used to grab all the professor objects from the database

export async function getProfessors() {
  const professors = await prisma.professor.findMany();
  return professors;
}
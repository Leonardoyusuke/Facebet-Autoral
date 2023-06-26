import prisma from "../src/config/database";

export async function cleanDb() {
    await prisma.bet.deleteMany({});
    await prisma.users.deleteMany({});
    await prisma.contest.deleteMany({});
    await prisma.feed.deleteMany({});
    await prisma.follows.deleteMany({});
    await prisma.games.deleteMany({});
    await prisma.participants.deleteMany({});
    await prisma.users.deleteMany({});
  }
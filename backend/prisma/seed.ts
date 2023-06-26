import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function main() {
    let users = await prisma.users.findFirst()
    let games = await prisma.games.findFirst()


    if(!games){
      await prisma.games.createMany({
        data:[{
          id:1,
          name:"Black Jack"
        },
        {
          id:2,
          name:"Jogo da forca"
        },
      {
        id:3,
        name:"Jogo da memoria"
      }]
      })
    }


    if(!users){
        users = await prisma.users.create({
            data:{
            username:"leo",
            email:"leo@leo.com",
            password:"ahh",
            pictureUrl:"semfoto"
            }
        })
    }
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

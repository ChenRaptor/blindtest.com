import { getPrismaClient } from "../client"

let prisma = getPrismaClient()


// let prisma = getPrismaClient()

export const getUserByID = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    }
  });
  return user;
}




export const createUser = async ({
  pseudo,
  password,
  passwordComfirm,
  email
}: {
  pseudo: string
  password: string
  passwordComfirm: string
  email: string
}) => {

    
  const newUser = await prisma.user.create({
    data: {
      email: "protechbonneau@gmail.com",
      name: "chen",
    },
  });

    const user = await getUserByID(newUser.id)

    return user
  
}

//https://blog.openreplay.com/authentication-and-db-access-with-next-prisma-and-mongodb/
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

export function getPrismaClient(): PrismaClient {

    if (process.env.NODE_ENV === 'production') {

        return prisma = new PrismaClient();
    
    } else {
    
        if (!(global as any).prisma) {
    
            (global as any).prisma = new PrismaClient();
        }
        
        return prisma = (global as any).prisma;
    }
    
}
// // import { PrismaClient } from 'prisma/generated/clientPg'
// import { PrismaClient } from '@prisma/client';

// let prisma = PrismaClient;


// export function getPrismaClient(): PrismaClient {

//     if (process.env.NODE_ENV === 'production') {

//         return prisma = new PrismaClient();
    
//     } else {
    
//         if (!(global as any).prisma) {
    
//             (global as any).prisma = new PrismaClient();
//         }
        
//         return prisma = (global as any).prisma;
//     }
    
// }

// async function main() {
//   // ... you will write your Prisma Client queries here
// }

// main()
//   .catch(async (e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
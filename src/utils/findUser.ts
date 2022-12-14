import { prisma } from '../database';
import { User } from '../models/User';

export default async function findUser(id: number): Promise<User | null> {
  const user = await prisma.user.findFirst({
    where: {
      id,
      active: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      isAdmin: true,
      active: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  return user;
}

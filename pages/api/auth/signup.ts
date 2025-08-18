import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * API route to create a new user. Expects JSON body with `email`, `password`, and
 * optional `name`. The password is hashed before storage. Returns the created
 * user object (without password) on success.
 */
export default async function signupHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const { email, password, name } = req.body as {
    email?: string;
    password?: string;
    name?: string;
  };
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  try {
    // Check if a user with this email already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }
    // Hash the password
    const hashed = await hash(password, 10);
    // Create new user
    const user = await prisma.user.create({
      data: {
        email,
        name: name ?? null,
        password: hashed,
      },
    });
    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user;
    return res.status(201).json(userWithoutPassword);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to create user' });
  }
}

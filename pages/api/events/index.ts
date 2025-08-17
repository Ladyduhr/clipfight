import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const events = await prisma.event.findMany();
    return res.status(200).json(events);
  }

  if (req.method === 'POST') {
    const { title, description, startDate, endDate, userId } = req.body;
    if (!title || !startDate || !endDate || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
      const event = await prisma.event.create({
        data: {
          title,
          description,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          user: { connect: { id: userId } },
        },
      });
      return res.status(201).json(event);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create event' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

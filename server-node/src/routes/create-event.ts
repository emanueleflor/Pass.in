import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { generateSlug } from "../utils/generate-slug";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { BadRequest } from "./_errors/bad-request";

export async function createEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/events",
    {
      schema: {
        summary: "Create an event",
        tags:['events'],
        body: z.object({
          title: z.string().min(4),
          details: z.string().nullable(),
          maximumAttendees: z.number().int().positive().nullable(),
        }),
        response: {
          // quando der 201 ele manda um objeto com esse formato
          201: z.object({
            eventId: z.string().uuid(),
          }),
        },
      },
    },
    async (req, res) => {
      // faz a validação dos dados que virao pelo body
      const { title, details, maximumAttendees } = req.body;

      const slug = generateSlug(title);

      const eventWithSameSlug = await prisma.event.findUnique({
        where: {
          slug,
        },
      });

      // evita evento duplicados
      if (eventWithSameSlug !== null) {
        throw new BadRequest("Another event with same slug already exists");
      }

      // os dados colocados no schema são automaticamente ligados na hora de inserir um dado
      const event = await prisma.event.create({
        data: {
          title,
          details,
          maximumAttendees,
          slug,
        },
      });

      return res.status(201).send({ eventId: event.id });
    }
  );
}

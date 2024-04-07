import {
  generateSlug
} from "./chunk-677O5SV4.mjs";
import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/create-event.ts
import { z } from "zod";
async function createEvent(app) {
  app.withTypeProvider().post(
    "/events",
    {
      schema: {
        summary: "Create an event",
        tags: ["events"],
        body: z.object({
          title: z.string({ invalid_type_error: "O titulo precisa ser um texto" }).min(4),
          details: z.string().nullable(),
          maximumAttendees: z.number().int().positive().nullable()
        }),
        response: {
          // quando der 201 ele manda um objeto com esse formato
          201: z.object({
            eventId: z.string().uuid()
          })
        }
      }
    },
    async (req, res) => {
      const { title, details, maximumAttendees } = req.body;
      const slug = generateSlug(title);
      const eventWithSameSlug = await prisma.event.findUnique({
        where: {
          slug
        }
      });
      if (eventWithSameSlug !== null) {
        throw new BadRequest("Another event with same slug already exists");
      }
      const event = await prisma.event.create({
        data: {
          title,
          details,
          maximumAttendees,
          slug
        }
      });
      return res.status(201).send({ eventId: event.id });
    }
  );
}

export {
  createEvent
};

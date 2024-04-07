import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";

export async function getAttendeeByBadge(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/attendee/:attendeeId/badge",
    {
      schema: {
        summary: "Get an attandee badge",
        tags:['attendees'],
        params: z.object({
          attendeeId: z.coerce.number(),
        }),
        response: {
          200: z.object({
            badge: z.object({
              name: z.string(),
              email: z.string().email(),
              eventTitle: z.string(),
              checkInURL: z.string().url(),
            }),
          }),
        },
      },
    },
    async (req, res) => {
      const { attendeeId } = req.params;

      const attendee = await prisma.attendee.findUnique({
        select: {
          name: true,
          email: true,
          event: {
            select: {
              title: true,
            },
          },
        },
        where: {
          id: attendeeId,
        },
      });

      if (attendee == null) {
        throw new BadRequest("Attendee not found");
      }

      console.log(req.hostname);

      const baseURL = `${req.protocol}://${req.hostname}`;

      const checkInURL = new URL(`/attendees/${attendeeId}/checkin`, baseURL);

      return res.send({
        badge: {
          name: attendee.name,
          email: attendee.email,
          eventTitle: attendee.event.title,
          checkInURL: checkInURL.toString(),
        },
      });
    }
  );
}
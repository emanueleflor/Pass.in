import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/get-attendee-badge.ts
import z from "zod";
async function getAttendeeByBadge(app) {
  app.withTypeProvider().get(
    "/attendee/:attendeeId/badge",
    {
      schema: {
        summary: "Get an attandee badge",
        tags: ["attendees"],
        params: z.object({
          attendeeId: z.coerce.number()
        }),
        response: {
          200: z.object({
            badge: z.object({
              name: z.string(),
              email: z.string().email(),
              eventTitle: z.string(),
              checkInURL: z.string().url()
            })
          })
        }
      }
    },
    async (req, res) => {
      const { attendeeId } = req.params;
      const attendee = await prisma.attendee.findUnique({
        select: {
          name: true,
          email: true,
          event: {
            select: {
              title: true
            }
          }
        },
        where: {
          id: attendeeId
        }
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
          checkInURL: checkInURL.toString()
        }
      });
    }
  );
}

export {
  getAttendeeByBadge
};

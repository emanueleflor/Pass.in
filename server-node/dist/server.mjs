import {
  registerForEvent
} from "./chunk-YXCAIJBZ.mjs";
import {
  errorHandler
} from "./chunk-3DG5AGQJ.mjs";
import {
  checkIn
} from "./chunk-TW4G5ID7.mjs";
import {
  createEvent
} from "./chunk-5OZUZBPS.mjs";
import "./chunk-677O5SV4.mjs";
import {
  getAttendeeByBadge
} from "./chunk-GJDUB773.mjs";
import {
  getEventAttendees
} from "./chunk-UOTBCML7.mjs";
import {
  getEvent
} from "./chunk-E2K5QDDA.mjs";
import "./chunk-JRO4E4TH.mjs";
import "./chunk-JV6GRE7Y.mjs";
import {
  __require
} from "./chunk-ZFXKCRJC.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifyCors from "@fastify/cors";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
var fastifySwaggerUI = __require("@fastify/swagger-ui");
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass-in",
      description: "Especifica\xE7\xF5es de API para o backend",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeByBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("http server running");
});
export {
  app
};

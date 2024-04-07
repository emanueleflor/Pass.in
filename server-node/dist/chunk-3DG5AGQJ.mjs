import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";

// src/error-handler.ts
import { ZodError } from "zod";
var errorHandler = (error, req, res) => {
  const { validation, validationContext } = error;
  if (error instanceof ZodError) {
    return res.status(400).send({
      msg: "Error during the validation",
      errors: error.flatten().fieldErrors
    });
  }
  if (error instanceof BadRequest) {
    return res.status(400).send({ msg: error.message });
  }
  return res.status(500).send({ msg: "Internal server error" });
};

export {
  errorHandler
};

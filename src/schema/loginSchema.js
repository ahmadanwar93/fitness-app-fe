// const { default: z } = require("zod");

import z from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email field is compulsory")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default loginSchema;

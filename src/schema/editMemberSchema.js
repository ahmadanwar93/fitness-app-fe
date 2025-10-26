import { z } from "zod";

const editMemberSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name must not exceed 100 characters")
    .trim(),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name must not exceed 100 characters")
    .trim(),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .trim()
    .toLowerCase(),

  phone: z
    .string()
    .min(1, "Phone is required")
    .max(20, "Phone number must not exceed 20 characters")
    .trim(),

  dateOfBirth: z
    .string()
    .optional()
    .refine(
      (date) => {
        if (!date) return true;
        const selected = new Date(date);
        const today = new Date();
        return selected < today;
      },
      { message: "Date of birth must be in the past" }
    ),

  membershipType: z.enum(["Basic", "Premium", "VIP"], {
    required_error: "Please select a membership type",
    invalid_type_error: "Invalid membership type",
  }),

  status: z.enum(["Active", "Inactive"], {
    required_error: "Please select a status",
    invalid_type_error: "Invalid status",
  }),
});

export default editMemberSchema;

import { z } from "zod";

export const addSchoolSchema = z.object({
  name: z
    .string({
      message: "Please enter a valid Name",
      required_error: "Name is required",
    })
    .min(2, {
      message: "Firstname must be at least 2 characters.",
    })
    .max(50, {
      message: "Firstname must not exceed 50 characters.",
    }),

  city: z
    .string({
      message: "Please enter a valid City",
      required_error: "City is required",
    })
   
    .optional(),
  state: z
    .string({
      message: "Please enter a valid State",
      required_error: "State is required",
    })
    .min(2, {
      message: "State must be at least 2 characters.",
    })
    .max(50, {
      message: "State must not exceed 50 characters.",
    }),
  headId: z.string().optional(),
  organizationId: z.string().optional(),

  notes: z
    .string()
   
    .optional(),
});

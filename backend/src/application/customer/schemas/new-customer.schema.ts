import z from "zod";

export const NewCustomerSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Please enter a valid email"),
  firstName: z
    .string({
      required_error: "First name is required",
    })
    .min(1, "First name needs to contain at least 1 character(s)")
    .max(255, "First name cannot exceed 255 character(s)"),
  lastName: z
    .string({
      required_error: "Last name is required",
    })
    .min(1, "Last name needs to contain at least 1 character(s)")
    .max(255, "Last name cannot exceed 255 character(s)"),
  image: z
    .string({
      required_error: "Image is required",
    })
    .url("Please enter a valid image url"),
  roles: z
    .enum(["ADMIN_ROLE", "BASIC_ROLE"], {
      required_error: "Please enter a valid role ('ADMIN_ROLE', 'BASIC_ROLE')",
    })
    .array(),
  isVerified: z.boolean({
    required_error: "isVerified is required",
    invalid_type_error: "isVerified needs to be of type 'boolean'",
  }),
  isSuspended: z.boolean({
    required_error: "isSuspended is required",
    invalid_type_error: "isSuspended needs to be of type 'boolean'",
  }),
});

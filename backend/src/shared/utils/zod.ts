import z from "zod";

export const required = (name: string) => ({
  required_error: `${name} is required`,
});

export const minimum = (name: string, min = 1) =>
  `${name} must contain at least ${min} character(s)`;
export const maximum = (name: string, max: number) =>
  `${name} cannot contain more than ${max} character(s)`;
const ID_LEN = 36;

//

export const email = z
  .string({
    required_error: "Email is required",
    invalid_type_error: "Email must be of type 'string'",
  })
  .email("Please enter a valid email");

export const notNullStr = (name: string, min: number = 1, max?: number) => {
  let builder = z
    .string({
      required_error: `${name} is required`,
      invalid_type_error: `${name} must be of type 'string'`,
    })
    .min(min, minimum(name, min));

  if (max) {
    builder.max(max, maximum(name, max));
  }

  return builder;
};

export const url = (name: string) =>
  z
    .string({
      required_error: `${name} is required`,
      invalid_type_error: `${name} must be of type 'string'`,
    })
    .url(`${name} must be a valid url`);

export const enumeration = <T extends [string, ...string[]]>(
  name: string,
  values: T
): z.ZodEnum<T> =>
  z.enum(values, {
    required_error: `${name} is required`,
    invalid_type_error: `${name} must be of type '${values.join(", ")}'`,
  });

export const boolean = (name: string) =>
  z.boolean({
    required_error: `${name} is required`,
    invalid_type_error: `${name} must be of type 'boolean'`,
  });

export const id = () =>
  z
    .string({
      required_error: "ID is required",
      invalid_type_error: "ID must be of type 'string'",
    })
    .min(ID_LEN, minimum("id", ID_LEN))
    .max(ID_LEN, maximum("id", ID_LEN));

export const date = (name: string) =>
  z.date({
    required_error: `${name} is required`,
    invalid_type_error: `${name} must be of type 'date'`,
  });

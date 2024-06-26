import z from "zod";

export const required = (name: string) => ({
  required_error: `${name} is required`,
});

export const invalid = (name: string, type = "string") => ({
  invalid_error: `${name} must be of type ${type}`,
});

export const errors = (name: string, type = "string") => ({
  ...required(name),
  ...invalid(name, type),
});

export const minimum = (name: string, min = 1) =>
  `${name} must contain at least ${min} character(s)`;
export const maximum = (name: string, max: number) =>
  `${name} cannot contain more than ${max} character(s)`;
const ID_LEN = 36;

//

export const email = z
  .string(errors("Email"))
  .email("Please enter a valid email");

export const notNullStr = (name: string, min: number = 1, max?: number) => {
  let builder = z.string(errors(name)).min(min, minimum(name, min));

  if (max) {
    builder.max(max, maximum(name, max));
  }

  return builder;
};

export const url = (name: string) =>
  z.string(errors(name)).url(`${name} must be a valid url`);

export const enumeration = <T extends [string, ...string[]]>(
  name: string,
  values: T
): z.ZodEnum<T> => z.enum(values, errors(name, values.join(", ")));

export const boolean = (name: string) => z.boolean(errors(name, "boolean"));

export const id = () =>
  z
    .string(errors("id"))
    .min(ID_LEN, minimum("id", ID_LEN))
    .max(ID_LEN, maximum("id", ID_LEN));

export const date = (name: string) => z.date(errors(name, "date"));

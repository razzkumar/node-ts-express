import { z } from '~/lib/zod';

const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9!@#$%^&*]).{10,}$');
const passwordValidationError =
  'Password must be at least 10 characters long with at least one uppercase, one lower case and one number or symbol character.';

export const createUserSchema = z.object({
  password: z.string().regex(passwordRegex, passwordValidationError),
  name: z.string(),
  email: z.string().email(),
});

export const updateUserSchema = z.object({
  password: z.string().regex(passwordRegex, passwordValidationError).optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
});

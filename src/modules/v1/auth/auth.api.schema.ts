import { z } from '~/lib/zod';

// regex for password validation with at least 1 uppercase, at least 1 lowercase, 1 number or symbol and minimum 10 characters
const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9!@#$%^&*]).{10,}$');
const passwordValidationError =
  'Password must be at least 10 characters long with at least one uppercase, one lower case and one number or symbol character.';

export const userSchema = z.object({
  password: z.string().regex(passwordRegex, passwordValidationError),
  name: z.string(),
  email: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

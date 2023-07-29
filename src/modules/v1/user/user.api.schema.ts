import { z } from '~/lib/zod';

export const userEditSchema = z.object({
  phone: z.string().optional(),
  fullName: z.string().optional(),
});

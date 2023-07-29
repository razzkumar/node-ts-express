import { z } from '~/lib/zod';

export const userIDParamsSchema = z.object({
  id: z.string(),
});

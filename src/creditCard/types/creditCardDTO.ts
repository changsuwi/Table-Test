import {z} from 'zod';

const CreditCardResponseSchema = z.object({
  title: z.string(),
  image: z.string().optional(),
  score: z.string().optional(),
  network: z.string().optional(),
  isBusinessCard: z.union([z.literal(1), z.literal(0)]).optional(),
  reward: z.object({
    signUpBonus: z.string().optional(),
    pointsCurrency: z.string().optional(),
  }).optional(),
});

export const GetCreditCardsResponseSchema = z.object({
  creditCards: CreditCardResponseSchema.array(),
});

export type CreditCardResponseDTO = z.infer<typeof CreditCardResponseSchema>;
export type GetCreditCardsResponseDTO = z.infer<typeof GetCreditCardsResponseSchema>;
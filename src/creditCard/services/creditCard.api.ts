import {
  GetCreditCardsResponseDTO,
  CreditCardResponseDTO,
  GetCreditCardsResponseSchema,
} from "../types/creditCardDTO";
import { CreditCard } from "../types/creditCardModel";

export const validationResult = (data: GetCreditCardsResponseDTO) =>
  GetCreditCardsResponseSchema.parse(data);

export const creditCardMapper = (
  creditCardResponseDTO: CreditCardResponseDTO
): CreditCard => {
  return {
    name: creditCardResponseDTO.title,
    image: creditCardResponseDTO.image,
    score: creditCardResponseDTO.score,
    isBusinessCard: creditCardResponseDTO.isBusinessCard,
    welcomeOffer: creditCardResponseDTO.reward?.signUpBonus,
    rewardsCurrency: creditCardResponseDTO.reward?.pointsCurrency,
    merchantSystem: creditCardResponseDTO.network,
  };
};

const transformToCreditCard = (
  creditCardResponseDTOs: CreditCardResponseDTO[]
): CreditCard[] => {
  return creditCardResponseDTOs.map(creditCardMapper);
};

export async function getCreditCards(): Promise<CreditCard[]> {
  try {
    const response = await fetch(
      "https://my-json-server.typicode.com/liuderchi/json-server-v1/creditCards"
    );
    const data = await response.json();
    const parsed = validationResult(data);
    return transformToCreditCard(parsed.creditCards);
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching data");
  }
}

import { HeaderType } from "../constants/creditCard.constants";
import { CreditCard } from "../types/creditCard.model";

export function getValue(
  type: HeaderType,
  creditCard: CreditCard
): string | undefined {
  switch (type) {
    case HeaderType.score:
      return creditCard.score;
    case HeaderType.isBusinessCard:
      if (creditCard.isBusinessCard === 1) return "Yes";
      if (creditCard.isBusinessCard === 0) return "No";
      return undefined;
    case HeaderType.welcomeOffer:
      return creditCard.welcomeOffer;
    case HeaderType.rewardsCurrency:
      return creditCard.rewardsCurrency;
    case HeaderType.merchantSystem:
      return creditCard.merchantSystem;
    default:
      return undefined;
  }
}
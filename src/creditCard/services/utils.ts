import { HeaderType } from "../constants/creditCard.constants";
import { CreditCard } from "../types/creditCardModel";

export function getValue(
  type: HeaderType,
  creditCard: CreditCard
): string | undefined {
  switch (type) {
    case HeaderType.score:
      return creditCard.score;
    case HeaderType.isBusinessCard:
      return creditCard.isBusinessCard === 1
        ? "Yes"
        : creditCard.isBusinessCard === 0
        ? "No"
        : "";
    case HeaderType.welcomeOffer:
      return creditCard.welcomeOffer;
    case HeaderType.rewardsCurrency:
      return creditCard.rewardsCurrency;
    case HeaderType.merchantSystem:
      return creditCard.merchantSystem;
  }
}
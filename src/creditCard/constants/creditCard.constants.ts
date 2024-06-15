export enum HeaderType {
  score,
  isBusinessCard,
  welcomeOffer,
  rewardsCurrency,
  merchantSystem,
}
export const CreditCardFirstHeaderLabel = "Credit card";
export const CreditCardTableHeader: { display: string; key: HeaderType }[] = [
  {
    display: "Recommended credit score",
    key: HeaderType.score,
  },
  {
    display: "Is business credit card",
    key: HeaderType.isBusinessCard,
  },
  {
    display: "Welcome offer",
    key: HeaderType.welcomeOffer,
  },
  {
    display: "Rewards currency",
    key: HeaderType.rewardsCurrency,
  },
  {
    display: "Merchant system",
    key: HeaderType.merchantSystem,
  },
];
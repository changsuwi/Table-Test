export enum HeaderType {
  score = "score",
  isBusinessCard = "isBusinessCard",
  welcomeOffer = "welcomeOffer",
  rewardsCurrency = "rewardsCurrency",
  merchantSystem = "merchantSystem",
}

export const CreditCardFirstHeaderLabel = "Credit card";

interface CreditCardTableHeaderItem {
  display: string;
  key: HeaderType;
}

export const CreditCardTableHeader: CreditCardTableHeaderItem[] = [
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
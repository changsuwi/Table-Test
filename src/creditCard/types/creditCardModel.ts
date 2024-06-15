export type CreditCard = {
  name: string;
  image?: string;
  score?: string;
  isBusinessCard?: 1 | 0;
  welcomeOffer?: string;
  rewardsCurrency?: string;
  merchantSystem?: string;
}
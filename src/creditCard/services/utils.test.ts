import { describe, it, expect } from 'vitest';
import { CreditCard } from '../types/creditCardDTO';
import { getValue } from './utils';
import { HeaderType } from '../constants/creditCard.constants';

describe('getValue', () => {
  const mockCreditCard: CreditCard = {
    name: 'Test Card',
    image: 'test-image.png',
    score: 'good',
    isBusinessCard: 1,
    welcomeOffer: '1000 points',
    rewardsCurrency: 'USD',
    merchantSystem: 'Visa',
  };

  it('should return the correct score', () => {
    const result = getValue(HeaderType.score, mockCreditCard);
    expect(result).toBe('good');
  });

  it('should return "Yes" for business card', () => {
    const result = getValue(HeaderType.isBusinessCard, mockCreditCard);
    expect(result).toBe('Yes');
  });

  it('should return "No" for non-business card', () => {
    const nonBusinessCard: CreditCard = { ...mockCreditCard, isBusinessCard: 0 };
    const result = getValue(HeaderType.isBusinessCard, nonBusinessCard);
    expect(result).toBe('No');
  });

  it('should return the correct welcome offer', () => {
    const result = getValue(HeaderType.welcomeOffer, mockCreditCard);
    expect(result).toBe('1000 points');
  });

  it('should return the correct rewards currency', () => {
    const result = getValue(HeaderType.rewardsCurrency, mockCreditCard);
    expect(result).toBe('USD');
  });

  it('should return the correct merchant system', () => {
    const result = getValue(HeaderType.merchantSystem, mockCreditCard);
    expect(result).toBe('Visa');
  });
});
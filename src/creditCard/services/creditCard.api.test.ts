import { describe, it, expect, vi, beforeEach } from 'vitest';
import { creditCardMapper, getCreditCards } from './creditCard.api';
import { CreditCardResponseDTO } from '../types/creditCardDTO';

describe('creditCardMapper', () => {
  it('should map CreditCardResponseDTO to CreditCard correctly', () => {
    const dto: CreditCardResponseDTO = {
      title: 'Test Card',
      image: 'test-image.png',
      score: 'good',
      isBusinessCard: 1,
      reward: {
        signUpBonus: '1000 points',
        pointsCurrency: 'Avios',
      },
      network: 'Visa',
    };

    const expected = {
      name: 'Test Card',
      image: 'test-image.png',
      score: 'good',
      isBusinessCard: 1,
      welcomeOffer: '1000 points',
      rewardsCurrency: 'Avios',
      merchantSystem: 'Visa',
    };

    const result = creditCardMapper(dto);
    expect(result).toEqual(expected);
  });

  it('should map CreditCardResponseDTO to CreditCard correctly with no rewards', () => {
    const dto: CreditCardResponseDTO = {
      title: 'Test Card',
      image: 'test-image.png',
      score: 'good',
      isBusinessCard: 1,
      network: 'Visa',
    };

    const expected = {
      name: 'Test Card',
      image: 'test-image.png',
      score: 'good',
      isBusinessCard: 1,
      merchantSystem: 'Visa',
    };

    const result = creditCardMapper(dto);
    expect(result).toEqual(expected);
  });
});

describe('getCreditCards', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  it('should transform API response to CreditCardModel', async () => {
    const mockApiResponse = {
      creditCards: [
        {
          title: 'Test Card',
          image: 'test-image.png',
          score: 'good',
          isBusinessCard: 1,
          reward: {
            signUpBonus: '1000 points',
            pointsCurrency: 'Avios',
          },
          network: 'Visa',
        },
      ],
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      json: async () => mockApiResponse,
    } as Response);

    const result = await getCreditCards();
    expect(result).toEqual([
      {
        name: 'Test Card',
        image: 'test-image.png',
        score: 'good',
        isBusinessCard: 1,
        welcomeOffer: '1000 points',
        rewardsCurrency: 'Avios',
        merchantSystem: 'Visa',
      },
    ]);

  });

  it('should throw an error if invalid API response is received', async () => {
    const mockApiResponse = {
      creditCards: [
        {
          title: 'Test Card',
          image: 'test-image.png',
          score: 100,
          isBusinessCard: 2,
          reward: {
            
          },
          invalidField: 'invalid',
          network: 'Visa',
        },
      ],
    };
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      json: async () => mockApiResponse,
    } as Response);

    await expect(getCreditCards()).rejects.toThrowError('Error fetching data');
  });
  
});
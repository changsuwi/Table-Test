import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { useQuery } from '@tanstack/react-query';
import CreditCardTable from './CreditCardTable';
import { CreditCardFirstHeaderLabel, CreditCardTableHeader } from './constants/creditCard.constants';
import { CreditCard } from './types/creditCard.model';

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}));

vi.mock('./creditCard.api', () => ({
  getCreditCards: vi.fn(),
}));

describe('CreditCardTable', () => {
  it('should display loading state initially', () => {
    (useQuery as Mock).mockReturnValue({ data: undefined, isLoading: true });

    render(<CreditCardTable />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display credit card data when loaded', () => {
    const mockData: CreditCard[] = [
      {
        name: 'Test Card',
        image: 'test-image.png',
        score: 'good',
        isBusinessCard: 1,
        welcomeOffer: '1000 points',
        rewardsCurrency: 'USD',
        merchantSystem: 'Visa',
      },
    ];

    (useQuery as Mock).mockReturnValue({ data: mockData, isLoading: false });

    render(<CreditCardTable />);

    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('good')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('1000 points')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('Visa')).toBeInTheDocument();
  });

  it('should display header in correct order', () => {
    (useQuery as Mock).mockReturnValue({ data: [], isLoading: false });

    const {queryAllByRole} =render(<CreditCardTable />);
    const headers = queryAllByRole('columnheader');
    expect(headers[0]).toHaveTextContent(CreditCardFirstHeaderLabel);
    for(let i=1; i<CreditCardTableHeader.length; i++) {
      expect(headers[i]).toHaveTextContent(CreditCardTableHeader[i-1].display);
    }
  });
  it('should display error message when API call fails', () => {
    (useQuery as Mock).mockReturnValue({ data: undefined, isLoading: false, isError: true });

    render(<CreditCardTable />);
    expect(screen.getByText('Error loading data')).toBeInTheDocument();
  });
});
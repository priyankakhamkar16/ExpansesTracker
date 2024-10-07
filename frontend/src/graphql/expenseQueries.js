import { gql } from '@apollo/client';

export const GET_EXPENSES = gql`
  query GetExpenses {
    getExpenses {
      income
      totalExpenses
      remainingIncome
      expenses {
        description
        amount
      }
    }
  }
`;

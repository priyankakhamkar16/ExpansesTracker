// src/graphql/incomeQueries.js
import { gql } from '@apollo/client';

export const ADD_INCOME = gql`
  mutation SetIncome($income: Float!) {
    setIncome(income: $income) {
      income
    }
  }
`;

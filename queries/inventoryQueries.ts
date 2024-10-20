import { gql } from '@apollo/client';

export const GET_YEARLY_PROFIT_LOSS = gql`
  query GetYearlyProfitLoss {
    getYearlyProfitLoss {
      year
      summary {
        month
        profit
        loss
      }
    }
  }
`;

export const GET_GROWTH_PROGRESSION = gql`
  query GetGrowthProgression {
    getGrowthProgression {
      month
      data {
        week
        current
        last
      }
    }
  }
`;

export const GET_TOTAL_PROFIT_AND_EXPENSE = gql`
  query GetTotalProfitAndExpense {
    getTotalProfitAndExpense {
      totalProfit
      totalExpense
    }
  }
`;

export const GET_MONTHLY_EXPENSE_BY_CATEGORY = gql`
  query GetMonthlyExpenseByCategory {
    getMonthlyExpenseByCategory {
      month
      data {
        categoryName
        value
        percentage
      }
    }
  }
`;

export const GET_YEARLY_PROFIT_AND_LOSS = gql`
  query GetYearlyProfitAndLoss {
    getYearlyProfitAndLoss {
      year
      profit
      loss
    }
  }
`;

export const GET_INVOICE_SUMMARY = gql`
  query GetInvoiceSummary {
    getInvoiceSummary {
      month
      data {
        totalInvoice
        amountDue
        paidInvoice
      }
    }
  }
`;

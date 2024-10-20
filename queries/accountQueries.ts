import { gql } from '@apollo/client';

export const GET_YEARLY_PROFIT_LOSS = gql`
  query {
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

export const GET_ALL_PAYMENTS = gql`
  query {
    getAllPayments {
      id
      amount
      status
      trxId
      paymentMethod
      createdAt
    }
  }
`;

export const GET_TOTAL_PROFIT_EXPENSE = gql`
  query {
    getTotalProfitAndExpense {
      totalProfit
      totalExpense
    }
  }
`;

export const GET_MONTHLY_EXPENSE_BY_CATEGORY = gql`
  query {
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

export const GET_GROWTH_PROGRESSION = gql`
  query {
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

export const GET_YEARLY_PROFIT_AND_LOSS = gql`
  query {
    getYearlyProfitAndLoss {
      year
      profit
      loss
    }
  }
`;

export const GET_INVOICE_SUMMARY = gql`
  query {
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

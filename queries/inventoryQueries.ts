import { gql } from '@apollo/client';

export const GET_MONTHLY_INVENTORY_VALUE = gql`
  query {
    getMonthlyInventoryValues {
      month
      value
      change
    }
  }
`;

export const GET_MONTHLY_REVENUE = gql`
  query {
    getMonthlyRevenueValues {
      month
      value
      change
    }
  }
`;

export const GET_MONTHLY_STOCK = gql`
  query {
    getMonthlyStockValues {
      month
      value
      change
    }
  }
`;
export const GET_MONTHLY_INVOICE = gql`
  query {
    getMonthlyInvoiceValues {
      month
      value
      change
    }
  }
`;

export const GET_LOW_STOCK = gql`
  query {
    lowStockCategory {
      categoryName
      stockQuantity
    }
  }
`;

export const GET_DEAD_STOCK = gql`
  query {
    deadStockProducts {
      productName
      daysUnsold
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query {
    products {
      items {
        id
        sku
        title
        description
        price
        buyPrice
        stockQuantity
        images {
          url
          alt
        }
        category {
          name
        }
        variants {
          id
          name
          value
        }
        discount {
          id
          discountedPrice
          startsAt
          endsAt
          isActive
        }
      }
      totalItems
      currentPage
      totalPages
    }
  }
`;

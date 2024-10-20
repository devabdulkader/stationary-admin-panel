import { gql } from '@apollo/client';

export const GET_TOTAL_ORDERS = gql`
  query {
    getTotalOrdersByMonth {
      month
      totalOrders
      totalRevenue
      change
    }
  }
`;

export const GET_PENDING_ORDERS = gql`
  query {
    getPendingOrdersByMonth {
      month
      totalOrders
      totalRevenue
      change
    }
  }
`;

export const GET_COMPLETED_ORDERS = gql`
  query {
    getCompletedOrdersByMonth {
      month
      totalOrders
      totalRevenue
      change
    }
  }
`;

export const GET_SHIPPED_ORDERS = gql`
  query {
    getShippedOrdersByMonth {
      month
      totalOrders
      totalRevenue
      change
    }
  }
`;

export const GET_RETURNED_ORDERS = gql`
  query {
    getReturnedOrdersByMonth {
      month
      totalOrders
      totalRevenue
      change
    }
  }
`;

export const GET_PAYMENT_STATUS = gql`
  query {
    getPaymentStatusByMonth {
      month
      totalPaid
      totalPending
      totalRefund
      total
      noOfOrders
    }
  }
`;

export const GET_ALL_ORDERS = gql`
  query {
    getAllOrders {
      totalItems
      totalPages
      currentPage
      items {
        id
        vat
        trackingId
        shippingAndHandlingFee
        totalAmount
        status
        shippingMethod
        payment {
          id
          amount
          paymentMethod
          trxId
          status
        }
        orderedItems {
          variant
          quantity
          price
          product {
            id
            title
          }
        }
        user {
          fullName
        }
      }
    }
  }
`;
// export const x = gql``

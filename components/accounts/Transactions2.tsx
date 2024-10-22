import React from 'react';
import Table from '../common/Table';

interface Transaction {
  id: string;
  trxId: string;
  amount: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
}

interface TransactionsProps {
  transactionData: Transaction[] | null;
}

const Transactions2: React.FC<TransactionsProps> = ({ transactionData }) => {
  // Format the data to fit the table structure
  const formattedData = transactionData?.map((transaction, index) => ({
    id: index + 1,
    transactionId: transaction.trxId,
    date: new Date(transaction.createdAt).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    amount: `MVR ${transaction.amount}`,
    method: transaction.paymentMethod,
    status: transaction.status,
  }));

  return (
    <Table
      title="Transactions"
      headings={['Transaction ID', 'Date', 'Amount', 'Method', 'Status']}
      data={formattedData ?? []}
      href="/"
    />
  );
};

export default Transactions2;

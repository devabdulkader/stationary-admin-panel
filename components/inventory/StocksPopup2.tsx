import React from 'react';
import Table from '../common/Table';

interface Product {
  id: string;
  title: string;
  sku: string;
  stockQuantity: string;
  category: {
    name: string;
  };
}

interface StocksPopupProps {
  products: Product[];
}

const StocksPopup2: React.FC<StocksPopupProps> = ({ products }) => {
  // Transform the products array to match the format required by the table
  const stocksData = products.map((product, index) => ({
    id: index + 1,
    productName: product.title,
    sku: product.sku,
    category: product.category.name, // Assuming category has a 'name' field
    quantity: Number(product.stockQuantity), // Convert stockQuantity to number if necessary
  }));

  return (
    <div>
      <Table
        topHeading="List of Stocks"
        headings={['Product Name', 'SKU', 'Category', 'Quantity']}
        data={stocksData}
        pagination={true}
        view={false}
        action={false}
        search={true}
        sort={true}
        arrowDown={false}
        href="/"
      />
    </div>
  );
};

export default StocksPopup2;

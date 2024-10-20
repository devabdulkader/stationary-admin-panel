import React from 'react';
import Table from '../common/Table';

interface StockLevelItem {
  id: string;
  title: string;
  sku: string;
  category: string;
  stockQuantity: number;
}

interface StockLevelProps {
  data: StockLevelItem[];
}

const StockLevel2: React.FC<StockLevelProps> = ({ data }) => {
  // Map the data to the table's structure
  const stockLevelData = data.map((item, index) => ({
    id: index + 1,
    productName: item.title,
    sku: item.sku,
    category: item.category,
    quantity: +item.stockQuantity,
    status: +item.stockQuantity > 0 ? 'In Stock' : 'Out of Stock',
  }));

  return (
    <Table
      title="Stock Level"
      view={true}
      headings={['Product Name', 'SKU', 'Category', 'Quantity', 'Stock Status']}
      data={stockLevelData}
      href="/"
    />
  );
};

export default StockLevel2;

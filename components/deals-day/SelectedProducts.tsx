import { useSelectedProducts } from '@/context/SelectedProductsContext';
import React from 'react';
import { IoImagesOutline } from 'react-icons/io5';
import ProductCard from '../card/ProductCard';

const SelectedProducts: React.FC = () => {
  const { selectedProducts } = useSelectedProducts();

  const maxProducts = 4;

  const displayProducts = [
    ...selectedProducts,
    ...Array(maxProducts).fill(null),
  ].slice(0, maxProducts);

  return (
    <div>
      <p className="py-5 text-xl">Selected Products</p>
      <div className="grid grid-cols-4 gap-4">
        {displayProducts.map((product, index) => (
          <div key={index}>
            {product ? (
              <ProductCard product={product} />
            ) : (
              <div className="border-blue-dashed flex h-full min-h-[420px] cursor-pointer items-center justify-center rounded-lg border hover:bg-gray-100">
                <IoImagesOutline className="text-blue" size={40} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedProducts;

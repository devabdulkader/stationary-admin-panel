'use client';
import { useSelectedProducts } from '@/context/SelectedProductsContext';
// import React, { useEffect, useState } from 'react';
import { IoImagesOutline } from 'react-icons/io5';
import ProductCard from '../card/ProductCard';

const SelectedProducts: React.FC = () => {
  const { selectedProducts } = useSelectedProducts();

  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // if (!isClient) return null;

  const maxProducts = 4;

  const displayProducts = [
    ...selectedProducts,
    ...Array(maxProducts).fill(null),
  ].slice(0, maxProducts);

  return (
    <div>
      <p className="py-5 text-xl">Selected Products</p>
      <div className="flex flex-wrap justify-center gap-5 md:justify-between">
        {displayProducts.map((product, index) => (
          <div key={index}>
            {product ? (
              <ProductCard product={product} />
            ) : (
              <div className="border-blue-dashed flex h-full min-h-[420px] w-[320px] cursor-pointer items-center justify-center rounded-lg border hover:bg-gray-100">
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

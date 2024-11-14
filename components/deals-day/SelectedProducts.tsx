'use client';
import { IoImagesOutline } from 'react-icons/io5';
import ProductCard from '../card/ProductCard';
import { useEffect, useState } from 'react';
import { instance } from '@/axios/axiosInstance';


const SelectedProducts: React.FC<any> = ({ update, setUpdate }) => {
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  useEffect(() => {
    if (update) {
      fetchSelectedProducts();
    }
  }, [update]);

  const fetchSelectedProducts = async () => {
    try {
      setUpdate(false);
      const response = await instance.post('', {
        query: `
          query dealsOfTheDay {
            dealsOfTheDay {
              id
              products {    
                id
                sku
                title
                description
                price
                buyPrice
                stockQuantity
                images {
                  url
                }
              }
            }
          }
        `,
      });
      const productsWithDealId = response.data.data.dealsOfTheDay.flatMap((deal: any) => 
        deal.products.map((product: any) => ({
          ...product,
          dealId: deal.id,  // Attach deal.id to each product
        }))
      );
      
      // Set the selected products with the deal ID
      setSelectedProducts(productsWithDealId);
    } catch (error) {
      console.error('Error fetching selected products:', error);
    }
  }

  const maxProducts = 4;

  const removeProduct = (productId: string) => {
    setSelectedProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
  };

  const displayProducts = [
    ...selectedProducts,
    ...Array(maxProducts - selectedProducts.length).fill(null),
  ].slice(0, maxProducts);

  return (
    <div>
      <p className="py-5 text-xl">Selected Products</p>
      <div className="flex flex-wrap justify-center gap-5 md:justify-between">
        {displayProducts.map((product, index) => (
          <div key={index}>
            {product ? (
              <ProductCard product={product} onRemove={removeProduct}/>
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

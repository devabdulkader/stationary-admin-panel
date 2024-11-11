'use client';

import { instance } from '@/axios/axiosInstance';
import React, { useEffect, useState } from 'react';
import FormInput from '../form/FormInput';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import FormTextarea from '../form/FormTextarea';

interface ProductInformationProps {
  productId: string;
}

const ProductInformation: React.FC<ProductInformationProps> = ({
  productId,
}) => {
  const [productDetail, setProductDetail] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const productResponse = await instance.post('', {
          query: `
              query GetProduct($id: String!) {
                product(id: $id) {
                  id
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
                }
              }
            `,
          variables: {
            id: productId, // Make sure to replace productId with actual value
          },
        });

        console.log('Product Detail:', productResponse.data.data.product);
        setProductDetail(productResponse.data.data.product);
      } catch (error) {
        console.error('Error fetching product detail or discount data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-[60%]">
      <div className="flex flex-col gap-5 rounded-lg bg-white p-5">
        {/* Product Title Input */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Product Title</label>
          <div className="relative">
            <FormInput
              name="productTitle"
              className="input-bg w-full rounded-md p-3 pr-10 outline-none"
              placeholder={productDetail.title || ' '}
            />
            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 transform items-center gap-3">
              <FiEdit2 className="cursor-pointer text-gray-600" size={24} />
              <RiDeleteBin6Line
                className="cursor-pointer text-red-600"
                size={24}
              />
            </div>
          </div>
        </div>

        {/* Product Category Input */}
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">Product Category</label>
            <div className="relative">
              <FormInput
                name="productCategory"
                className="input-bg w-full rounded-md p-3 pr-10 outline-none"
                placeholder={productDetail.category?.name || ' '}
              />
              <div className="absolute right-4 top-1/2 flex -translate-y-1/2 transform items-center gap-3">
                <FiEdit2 className="cursor-pointer text-gray-600" size={24} />
                <RiDeleteBin6Line
                  className="cursor-pointer text-red-600"
                  size={24}
                />
              </div>
            </div>
          </div>

          {/* Product Price Input */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">Product Price</label>
            <div className="relative">
              <FormInput
                name="productPrice"
                type="number"
                className="input-bg w-full rounded-md p-3 pr-10 outline-none"
                placeholder={productDetail.price?.toString() || ' '}
              />
              <div className="absolute right-4 top-1/2 flex -translate-y-1/2 transform items-center gap-3">
                <FiEdit2 className="cursor-pointer text-gray-600" size={24} />
                <RiDeleteBin6Line
                  className="cursor-pointer text-red-600"
                  size={24}
                />
              </div>
            </div>
          </div>

          {/* Product Quantity Input */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">Product Quantity</label>
            <div className="relative">
              <FormInput
                name="productQuantity"
                className="input-bg w-full rounded-md p-3 outline-none"
                placeholder={productDetail.stockQuantity?.toString() || ' '}
              />
              <div className="absolute right-4 top-1/2 flex -translate-y-1/2 transform items-center gap-3">
                <FiEdit2 className="cursor-pointer text-gray-600" size={24} />
                <RiDeleteBin6Line
                  className="cursor-pointer text-red-600"
                  size={24}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">Product SKU</label>
            <div className="relative">
              <input
                className="input-bg w-full rounded-md p-2 pr-10"
                value="2302u32"
                disabled
              />
            </div>
          </div>
        </section>
      </div>

      <div className="rounded-lg bg-white p-5">
        <div className="relative flex flex-col gap-2">
          <label className="text-lg font-medium">Product Description</label>
          <FormTextarea
            name="productDescription"
            className="min-h-40 outline-none"
            rows={4}
            placeholder={productDetail.description || ' '}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;

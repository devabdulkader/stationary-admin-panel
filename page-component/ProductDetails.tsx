'use client';

import Form from '@/components/form/Form';

import Link from 'next/link';

import { BsArrowLeft } from 'react-icons/bs';

import ProductImages from '@/components/ProductDetails/ProductImages';
import ProductDiscount from '@/components/ProductDetails/ProductDiscount';
import ProductInformation from '@/components/ProductDetails/ProductInformation';
import { instance } from '@/axios/axiosInstance';
import { useEffect, useState } from 'react';

interface ProductDetailsProps {
  productId: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId }) => {
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

  const submitHandler = async (data:any) => {
    const sanitizedProductDetail = {
      ...productDetail,
      imageUrls: [
        data.photo?.[1],
        data.photo?.[2],
        data.photo?.[3],
        data.photo?.[4],
      ].filter((imageUrl) => imageUrl !== undefined && imageUrl !== ''),
      // imageUrls: productDetail.images?.map((img: any) => img.url), // Assuming `img` has a `url` property
      categoryId: productDetail.category?.id, // Assuming `category` has an `id` field
    };
    // Remove unnecessary fields
    delete sanitizedProductDetail.id;
    delete sanitizedProductDetail.category;
    delete sanitizedProductDetail.images;
    const response = await instance.post('', {
      query: `
        mutation UpdateProduct($id: String!, $input: UpdateProductInput!) {
          updateProduct( id: $id, input: $input) {
            success
            message
          }
        }
      `,
      variables: {
        id: productId,
        input: sanitizedProductDetail,
      },
    });
    console.log('Product Update Response:', response.data.data);

  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full p-5">
      <div className="flex flex-col gap-5 pb-10 lg:flex-row">
        <Link href="/list-of-products">
          <h1 className="text-blue flex items-center gap-2 pr-10 text-3xl font-medium">
            <BsArrowLeft />
            <span>Product Details</span>
          </h1>
        </Link>
        <div className="flex flex-grow flex-col gap-5 sm:flex-row">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>
        </div>
      </div>

      <Form submitHandler={submitHandler} className="w-full">
        <div>
          <ProductImages images={productDetail.images}/>
        </div>
        <div className="flex w-full gap-5 py-5">
          <ProductInformation
            productDetail={productDetail}
            setProductDetail={setProductDetail}
           />

          <ProductDiscount />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue my-5 w-full rounded-lg p-3 text-center text-white"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
};

export default ProductDetails;

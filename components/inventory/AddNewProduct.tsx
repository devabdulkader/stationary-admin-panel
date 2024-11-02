'use client';

import React, { useState, useEffect } from 'react';
import Form from '../form/Form';
import { CgDanger } from 'react-icons/cg';
import { GoPlus } from 'react-icons/go';
import FormImageUpload from '../form/FormImageUpload';
import FormSelect from '../form/FormSelect';
import FormInput from '../form/FormInput';
import FormTextarea from '../form/FormTextarea';
import { instance } from '@/axios/axiosInstance';

interface Variant {
  id: number;
  value: string;
}

const AddNewProduct = () => {
  const [defaultValuesFromPOS, setDefaultValuesFromPOS] = useState({
    posProductId: '',
    sku: '',
    title: '',
    quantity: '',
  });

  // State for variants
  const [variants, setVariants] = useState<Variant[]>([{ id: 1, value: '' }]);

  // State for product categories
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);

  // State for mutation
  const [mutationLoading, setMutationLoading] = useState(false);
  const [mutationError, setMutationError] = useState(null);

  // Fetch product categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await instance.post('', {
          query: `
            query {
              getAllProductCategories {
                id
                name
              }
            }
          `,
        });
        const categories = response.data.data.getAllProductCategories;
        setCategoryOptions(
          categories.map((category: any) => ({
            value: category.id,
            label: category.name,
          })),
        );
        setCategoryLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategoryLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle adding a new variant
  const handleAddVariant = () => {
    setVariants((prevVariants) => [
      ...prevVariants,
      { id: prevVariants.length + 1, value: '' },
    ]);
  };

  // Handle form submission
  const submitHandler = async (data: any) => {
    setMutationLoading(true);
    setMutationError(null);

    const {
      sku,
      title,
      category,
      prouctPrice,
      buyingPrice,
      quantity,
      productDescription,
    } = data;

    const formData = {
      posProductId: defaultValuesFromPOS.posProductId,
      sku,
      title,
      categoryId: category,
      price: prouctPrice,
      buyPrice: buyingPrice,
      stockQuantity: quantity,
      description: productDescription,
      imageUrls: [
        data.photo?.[1],
        data.photo?.[2],
        data.photo?.[3],
        data.photo?.[4],
      ].filter((imageUrl) => imageUrl !== undefined && imageUrl !== ''), // Filter out undefined images
      variants: variants
        .map((variant) => ({
          name: `Color`,
          value: data[`variant.${variant.id}`],
        }))
        .filter((variant) => variant.value), // Filter out empty variant values
    };

    try {
      const response = await instance.post('', {
        query: `
          mutation CreateProduct($input: CreateProductInput!) {
            createProduct(input: $input) {
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
          input: formData,
        },
      });

      console.log('Product created:', response.data.data.createProduct);
      setMutationLoading(false);
    } catch (error: any) {
      console.error('Error creating product:', error);
      setMutationError(error.message);
      setMutationLoading(false);
    }
  };

  const handleGetProductInfo = async (ProductId: string) => {
    try {
      fetch(
        `https://api.ewitypos.com/v1/products/locations/207/full-list/${ProductId}`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer uat_kGsvfUZy1lCd7OmWlTZQExpcje5V`,
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setDefaultValuesFromPOS({
            posProductId: ProductId,
            sku: data?.data?.variants?.[0]?.sku,
            title: data?.data?.name,
            quantity: data?.data?.variants?.[0]?.stock?.count.toString(),
          });
        })
        .catch((err) => console.log(err));
    } catch (err: any) {
      console.log(err);
    }
  };

  // Show loading state if categories are still being fetched
  if (categoryLoading) return <div>Loading categories...</div>;

  return (
    <Form
      submitHandler={submitHandler}
      className="relative flex h-auto w-full flex-col gap-4"
      defaultValues={defaultValuesFromPOS}
    >
      <h2 className="text-2xl font-bold">Add New Product</h2>
      <h3 className="text-md font-semibold">Add Product Image</h3>
      <section className="grid grid-cols-4 gap-4">
        <FormImageUpload
          name="photo.1"
          required
          className="mt-5 h-40 w-full overflow-hidden rounded-lg"
        />
        <FormImageUpload
          name="photo.2"
          required
          className="mt-5 h-40 w-full overflow-hidden rounded-lg"
        />
        <FormImageUpload
          name="photo.3"
          required
          className="mt-5 h-40 w-full overflow-hidden rounded-lg"
        />
        <FormImageUpload
          name="photo.4"
          required
          className="mt-5 h-40 w-full overflow-hidden rounded-lg"
        />
      </section>
      <p className="flex items-center gap-1 text-sm text-gray-500">
        <CgDanger className="text-gray-500" />
        First image will be the thumbnail
      </p>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          id="productId"
          className="input-bg w-full rounded-md p-2"
          placeholder="Enter Product ID"
        />
        <button
          type="button"
          className="rounded-md bg-[#00359E] p-2 text-white"
          onClick={(e) => {
            e.preventDefault();
            const productIdElement = document.getElementById(
              'productId',
            ) as HTMLInputElement;
            const productId = productIdElement.value;
            handleGetProductInfo(productId);
          }}
        >
          Load Product
        </button>
      </div>

      {/* Product SKU */}
      <div>
        <label className="text-md mb-2 block font-semibold">SKU</label>
        <FormInput
          name="sku"
          className="input-bg w-full rounded-md p-2"
          disabled
          required
        />
      </div>

      {/* Product Title */}
      <div>
        <label className="text-md mb-2 block font-semibold">
          Product Title
        </label>
        <FormInput
          name="title"
          className="input-bg w-full rounded-md p-2"
          required
        />
      </div>
      {/* Product Category and Price */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-md mb-2 block font-semibold">
            Product Category
          </label>
          <FormSelect
            name="category"
            options={categoryOptions}
            required={true}
            className="input-bg w-full rounded-md p-2"
          />
        </div>
        <div className="flex-1">
          <label className="text-md mb-2 block font-semibold">
            Product Price
          </label>
          <FormInput
            name="prouctPrice"
            type="number"
            className="input-bg w-full rounded-md p-2"
            placeholder="MVR"
            required
          />
        </div>
      </div>
      {/* Quantity and Buying Price */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-md mb-2 block font-semibold">
            Add Quantity
          </label>
          <FormInput
            name="quantity"
            type="number"
            className="input-bg w-full rounded-md p-2"
            placeholder="Unit"
            required
          />
        </div>
        <div className="flex-1">
          <label className="text-md mb-2 block font-semibold">
            Buying Price
          </label>
          <FormInput
            name="buyingPrice"
            type="number"
            className="input-bg w-full rounded-md p-2"
            placeholder="MVR"
            required
          />
        </div>
      </div>
      {/* Product Description */}
      <div>
        <label className="text-md mb-2 block font-semibold">
          Product Description
        </label>
        <FormTextarea
          name="productDescription"
          className="input-bg w-full rounded-md p-2"
          placeholder="0/300"
          rows={4}
          required
        />
      </div>
      {/* Variants Section */}
      <div className="grid grid-cols-2 gap-4">
        {variants.map((variant, index) => (
          <FormInput
            key={variant.id}
            name={`variant.${variant.id}`}
            type="text"
            className="input-bg w-full rounded-md p-2"
            placeholder={`Variant ${index + 1}`}
          />
        ))}
        <div>
          <button
            type="button"
            onClick={handleAddVariant}
            className="input-bg text-blue w-full rounded-md p-2"
          >
            <GoPlus size={24} className="text-blue mr-2 inline" /> Add New
            Variant
          </button>
        </div>
      </div>
      {/* Save Button */}
      <div className="">
        <button
          type="submit"
          className="bg-blue w-full rounded-md px-4 py-2 text-white"
          disabled={mutationLoading}
        >
          {mutationLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
      {mutationError && (
        <div className="mt-4 text-red-500">Error: {mutationError}</div>
      )}
    </Form>
  );
};

export default AddNewProduct;

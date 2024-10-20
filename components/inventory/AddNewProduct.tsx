/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Form from '../form/Form';
import { CgDanger } from 'react-icons/cg';
import { GoPlus } from 'react-icons/go';
import FormImageUpload from '../form/FormImageUpload';
import FormSelect from '../form/FormSelect';
import FormInput from '../form/FormInput';
import FormTextarea from '../form/FormTextarea';
import { useQuery, useMutation } from '@apollo/client';
import {
  CREATE_PRODUCT,
  GET_ALL_PRODUCT_CATEGORIES,
} from '@/queries/accountQueries';
import { tempToken } from '@/middleware';

interface Variant {
  id: number;
  value: string;
}

const AddNewProduct = () => {
  // State for product SKU
  const [sku] = useState<string>(
    'SKU-' + Math.floor(100000 + Math.random() * 900000),
  );

  // State for variants
  const [variants, setVariants] = useState<Variant[]>([{ id: 1, value: '' }]);

  // Fetch product categories
  const { data: categoryData, loading: categoryLoading } = useQuery(
    GET_ALL_PRODUCT_CATEGORIES,
  );
  const categoryOptions = categoryData?.getAllProductCategories.map(
    (category: any) => ({
      value: category.id,
      label: category.name,
    }),
  );

  // Mutation for creating product
  const [createProduct, { loading: mutationLoading, error: mutationError }] =
    useMutation(CREATE_PRODUCT, {
      context: {
        headers: {
          Authorization: tempToken,
        },
      },
    });

  // Handle adding a new variant
  const handleAddVariant = () => {
    setVariants((prevVariants) => [
      ...prevVariants,
      { id: prevVariants.length + 1, value: '' },
    ]);
  };

  // Handle form submission
  const submitHandler = async (data: any) => {
    const {
      title,
      category,
      prouctPrice,
      buyingPrice,
      quantity,
      productDescription,
    } = data;

    const formData = {
      title,
      categoryId: category,
      price: prouctPrice,
      buyPrice: buyingPrice,
      stockQuantity: quantity,
      sku, // Use the generated SKU
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
      const response = await createProduct({
        variables: {
          input: formData,
        },
      });
      console.log('Product created:', response.data.createProduct);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  // Show loading state if categories are still being fetched
  if (categoryLoading) return <div>Loading categories...</div>;

  return (
    <Form
      submitHandler={submitHandler}
      className="relative flex h-auto w-full flex-col gap-4"
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
      <div>
        <p className="text-md mb-2 font-semibold">Product SKU: {sku}</p>
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
        <div className="mt-4 text-red-500">Error: {mutationError.message}</div>
      )}
    </Form>
  );
};

export default AddNewProduct;

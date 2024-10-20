import React, { useState } from 'react';
import Form from '../form/Form';
import { CgDanger } from 'react-icons/cg';
import { GoPlus } from 'react-icons/go';
import FormImageUpload from '../form/FormImageUpload';
import FormSelect from '../form/FormSelect';
import FormInput from '../form/FormInput';
import FormTextarea from '../form/FormTextarea';
interface Variant {
  id: number;
  value: string;
}
const AddNewProduct = () => {
  const categoryOptions = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'clothing', label: 'Clothing' },
  ];

  const [variants, setVariants] = useState<Variant[]>([
    { id: 1, value: '' },
    { id: 2, value: '' },
    { id: 3, value: '' },
  ]);
  const handleAddVariant = () => {
    setVariants((prevVariants) => [
      ...prevVariants,
      { id: prevVariants.length + 1, value: '' },
    ]);
  };

  const submitHandler = async (data: any) => {
    console.log(data);
  };
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
        <p className="text-md mb-2 font-semibold">Product SKU: 232323</p>
        <label className="text-md mb-2 block font-semibold">
          Product Title
        </label>
        <FormInput name="title" className="input-bg w-full rounded-md p-2" />
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
        />
      </div>
      {/* Variants Section */}
      <div className="grid grid-cols-2 gap-4">
        {variants.map((variant, index) => (
          <FormInput
            key={variant.id}
            name={`variant${variant.id}`}
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
        >
          Save
        </button>
      </div>
    </Form>
  );
};

export default AddNewProduct;

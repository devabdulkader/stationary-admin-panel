'use client';

import { instance } from '@/axios/axiosInstance';
import Form from '@/components/form/Form';
import ContactNumber from '@/components/settings/ContactNumber';
import CopyrightText from '@/components/settings/CopyrightText';
import EditExpenseCategory from '@/components/settings/EditExpnseCategory';
import EditProductCategory from '@/components/settings/EditProductCategory';
import HeroCarousel from '@/components/settings/HeroCarousel';
import ManageSocials from '@/components/settings/ManageSocials';
import React from 'react';

const Settings = () => {
  const submitHandler = async (data: any) => {
    console.log('Data is:', data);
    const {
      contactNumber,
      copyrightText,
      facebook,
      instagram,
      viber,
      whatsApp,
    } = data;
    // Update website info individually

    const filteredProductCategories =
      data.product_category?.filter(
        (category: string) => category.trim() !== '',
      ) || [];

    console.log('Filtered Product Categories:', filteredProductCategories);

    const filteredExpenseCategories =
      data.expense_category?.filter(
        (category: string) => category.trim() !== '',
      ) || [];

    console.log('Filtered Expense Categories:', filteredExpenseCategories);

    if (
      filteredProductCategories.length === 0 &&
      filteredExpenseCategories.length === 0
    ) {
      console.log('No categories to submit');
      return;
    }

    try {
      const websiteInfoResponse = await instance.post('', {
        query: `
          mutation CreateWebsiteInfo($input: CreateWebsiteInfoInput!) {
            createWebsiteInfo(input: $input) {
              contactNumber
              copyrightText
              facebookLink
              instagramLink
              whatsAppLink
              viberLink
            }
          }
        `,
        variables: {
          input: {
            contactNumber,
            copyrightText,
            facebookLink: facebook,
            instagramLink: instagram,
            whatsAppLink: whatsApp,
            viberLink: viber,
          },
        },
      });

      console.log(
        'Website Info Update Response:',
        websiteInfoResponse.data.data,
      );

      if (filteredProductCategories.length > 0) {
        const productCategoryResponses = await Promise.all(
          filteredProductCategories.map(async (categoryName: string) => {
            const response = await instance.post('', {
              query: `
                mutation CreateProductCategory($name: String!) {
                  createProductCategory(name: $name) {
                    id
                    name
                  }
                }
              `,
              variables: {
                name: categoryName,
              },
            });
            return response.data;
          }),
        );
        console.log('Product Category Responses:', productCategoryResponses);
      }

      if (filteredExpenseCategories.length > 0) {
        const expenseCategoryResponses = await Promise.all(
          filteredExpenseCategories.map(async (categoryName: string) => {
            const response = await instance.post('', {
              query: `
                mutation CreateExpenseCategory($name: String!) {
                  createExpenseCategory(name: $name) {
                    id
                    name
                  }
                }
              `,
              variables: {
                name: categoryName,
              },
            });
            return response.data;
          }),
        );
        console.log('Expense Category Responses:', expenseCategoryResponses);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-blue mb-5 flex items-center gap-2 pr-10 text-3xl font-medium">
        <span>Settings</span>
      </h1>

      <Form submitHandler={submitHandler} className="flex flex-col gap-5">
        <HeroCarousel />
        <ManageSocials />
        <ContactNumber />
        <EditProductCategory />
        <EditExpenseCategory />
        <CopyrightText />
        <button
          type="submit"
          className={`w-full rounded-lg border border-[#00359E] bg-[#00359E] py-3 text-white transition-all active:scale-[0.96]`}
        >
          Save changes
        </button>
      </Form>
    </div>
  );
};

export default Settings;

'use client';
import React, { createContext, useContext, useState } from 'react';
interface Product {
  id: number;
  name: string;
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, nihil.';
  currentPrice: number;
  originalPrice?: number;
  discountedPrice?: number;
  image: string;
  imageVariants?: string[];
  colorOptions?: string[];
  stockQuantity: number;
}
interface SelectedProductsContextType {
  selectedProducts: Product[];
  message: string;
  addProduct: (product: any) => void;
  removeProduct: (id: number) => void;
}

const SelectedProductsContext = createContext<
  SelectedProductsContextType | undefined
>(undefined);

export const SelectedProductsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');

  const addProduct = (product: any) => {
    const productExists = selectedProducts.some((p) => p.id === product.id);

    if (productExists) {
      setMessage('Product already selected!');
      return;
    }

    if (selectedProducts.length >= 4) {
      setMessage('Cannot add more than four products');
      return;
    }

    setSelectedProducts((prevProducts) => {
      const updatedProducts = [...prevProducts, product];
      setMessage('');
      return updatedProducts;
    });
  };

  const removeProduct = (id: number) => {
    setSelectedProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (product) => product.id !== id,
      );

      if (updatedProducts.length < prevProducts.length) {
        setMessage('Product removed successfully.');
      }

      return updatedProducts;
    });
  };

  // Clear the message after a delay
  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <SelectedProductsContext.Provider
      value={{ selectedProducts, message, addProduct, removeProduct }}
    >
      {children}
    </SelectedProductsContext.Provider>
  );
};

export const useSelectedProducts = () => {
  const context = useContext(SelectedProductsContext);
  if (context === undefined) {
    throw new Error(
      'useSelectedProducts must be used within a SelectedProductsProvider',
    );
  }
  return context;
};

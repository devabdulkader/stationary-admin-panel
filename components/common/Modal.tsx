'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Spinner from '../loader/Spinner';
import { RxCross1 } from 'react-icons/rx';
import CustomBackDrop from './CustomBackDrop';

const Modal = ({
  closeModal,
  children,
}: {
  closeModal: () => void;
  children: React.ReactNode;
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(closeModal, 500);
  };

  const modalVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="fixed inset-0 top-0 z-50 flex h-screen w-screen items-center justify-center">
      <CustomBackDrop onClose={closeModal} />

      {isLoading ? (
        <div className="relative z-10 flex h-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <motion.section
          className={`custom-scrollbar sm:nin-w-[80vw] relative z-10 max-h-full overflow-y-auto rounded-lg border border-gray-300 bg-white px-5 py-5 sm:px-10 md:min-w-[70vw] lg:min-w-[60vw] xl:min-w-[50vw] 2xl:min-w-[40vw]`}
          variants={modalVariants}
          initial="hidden"
          animate={isClosing ? 'exit' : 'visible'}
          transition={{ duration: isClosing ? 0.5 : 0.3 }}
        >
          <RxCross1
            className="absolute right-5 top-5 cursor-pointer hover:text-red-500"
            size={30}
            onClick={handleCloseModal}
          />

          {children}
        </motion.section>
      )}
    </div>
  );
};

export default Modal;

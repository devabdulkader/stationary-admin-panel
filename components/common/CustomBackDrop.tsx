import React from 'react';

interface CustomBackDropProps {
  onClose?: () => void;
  top?: string;
  zIndex?: string;
}

const CustomBackDrop: React.FC<CustomBackDropProps> = ({
  onClose,
  top = 'top-0',
  zIndex = '',
}) => {
  return (
    <div
      className={`fixed inset-0 h-full w-full ${top} left-0 ${zIndex} cursor-crosshair bg-white/5 backdrop-blur-lg transition-opacity duration-300`}
      onClick={onClose}
    />
  );
};

export default CustomBackDrop;

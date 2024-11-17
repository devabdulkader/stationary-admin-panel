import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Image from 'next/image';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { instance } from '@/axios/axiosInstance';

interface IImageUpload {
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
}

const FormImageUpload = ({
  name,
  label,
  required,
  disabled,
  className,
  defaultValue
}: IImageUpload) => {
  const { control, setValue } = useFormContext();
  const [imagePreview, setImagePreview] = useState<string | null>(defaultValue || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateUploadUrl = async (fileType: string, fileName: string) => {
    try {
      const response = await instance.post('', {
        query: `
          mutation GenerateUploadUrl($fileType: String!, $fileName: String) {
            s3SignedUrl(fileType: $fileType, fileName: $fileName) {
              url
              signedUrl
            }
          }
        `,
        variables: { fileType, fileName },
      });

      return response.data.data.s3SignedUrl;
    } catch (error) {
      console.error('Error generating upload URL:', error);
      throw error;
    }
  };

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const { signedUrl, url } = await generateUploadUrl(file.type, file.name);

      // Upload image to S3 using the signed URL
      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      if (uploadResponse.ok) {
        setValue(name, url); // Store the URL in the form state
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Optimistically set the image preview
      };
      reader.readAsDataURL(file);

      handleFileUpload(file); // Upload the file in the background
    }
  };

  return (
    <div className={`mb-4 flex flex-col ${className}`}>
      {label && (
        <label className="mb-2 font-semibold text-[#00359E]">
          {label} {required && <span>*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div
            className="relative flex h-80 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 hover:border-gray-400"
            onClick={() =>
              document.getElementById(`file-input-${name}`)?.click()
            }
          >
            <input
              id={`file-input-${name}`}
              type="file"
              accept="image/*"
              disabled={disabled || loading}
              onChange={handleFileChange}
              className="hidden"
            />

            {loading && (
              <small className="absolute bottom-2 left-2 text-xs text-gray-600">
                Loading...
              </small>
            )}

            <div className="flex h-full w-full items-center justify-center">
              {imagePreview || field.value ? (
                <Image
                  src={imagePreview || field.value}
                  alt="Uploaded Preview"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <BsFillPlusCircleFill className="text-blue" size={30} />
                  <p className="text-sm text-gray-500">Click to upload</p>
                </div>
              )}
            </div>

            {error && (
              <small className="absolute bottom-2 right-2 text-xs text-red-600">
                {error}
              </small>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default FormImageUpload;

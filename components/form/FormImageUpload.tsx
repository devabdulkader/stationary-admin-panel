import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';
import Image from 'next/image';
import { BsFillPlusCircleFill } from 'react-icons/bs';

const GENERATE_UPLOAD_URL = gql`
  mutation GenerateUploadUrl($fileType: String!, $fileName: String) {
    s3SignedUrl(fileType: $fileType, fileName: $fileName) {
      url
      signedUrl
    }
  }
`;

interface IImageUpload {
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const FormImageUpload = ({
  name,
  label,
  required,
  disabled,
  className,
}: IImageUpload) => {
  const { control, setValue } = useFormContext();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [generateUploadUrl, { loading, error }] = useMutation(
    GENERATE_UPLOAD_URL,
    {
      context: {
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZkODU1YTRhLTY2MDAtNDg5NC1iZDM3LTI0ZWQ4MGE3Mjk0YSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJQaG9uZU51bWJlciI6IjExMTExMTExMCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyODY2MzMwMywiZXhwIjoxNzYwMTk5MzAzfQ.D9JAey0n24yamU8SMRrMYvoai8rs9DngXm2Hv4ZGl-E`,
        },
      },
    },
  );

  const handleFileUpload = async (file: File) => {
    try {
      const { data } = await generateUploadUrl({
        variables: { fileType: file.type, fileName: file.name },
      });

      const { signedUrl, url } = data.s3SignedUrl;

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
            } // Programmatically trigger file input on click
          >
            <input
              id={`file-input-${name}`}
              type="file"
              accept="image/*"
              disabled={disabled || loading}
              onChange={handleFileChange}
              className="hidden" // Hide the actual file input
            />

            {/* Show loading text while uploading */}
            {loading ? (
              <small className="absolute bottom-2 left-2 text-xs text-gray-600">
                Loading...
              </small>
            ) : null}

            {/* Display placeholder or uploaded image */}
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
                  {/* <Image
                    src={'/plus.png'} 
                    alt="Placeholder"
                    width={50}
                    height={50}
                    className="mb-2"
                  /> */}
                  <BsFillPlusCircleFill className="text-blue" size={30} />
                  <p className="text-sm text-gray-500">Click to upload</p>
                </div>
              )}
            </div>

            {/* Display error message if any */}
            {error && (
              <small className="absolute bottom-2 right-2 text-xs text-red-600">
                {error.message}
              </small>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default FormImageUpload;

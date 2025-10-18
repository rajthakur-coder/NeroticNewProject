// FileUpload.tsx
import React, { useRef, useState } from "react";

interface FileUploadProps {
  url: string;
  maxFiles?: number;
  singleton?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ url, maxFiles = 1, singleton = true }) => {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      // Here you can upload file to your URL
      const formData = new FormData();
      formData.append("file", selectedFile);
      fetch(url, {
        method: "POST",
        body: formData,
      });
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative flex w-full overflow-hidden text-sm border border-gray-700 rounded-lg focus:z-10 focus:ring-1 focus:border-black focus:ring-black focus:outline-none disabled:pointer-events-none disabled:opacity-50"
      >
        <span className="h-full px-4 py-3 text-white bg-black text-nowrap rounded-s-lg">
          Choose File
        </span>
        <span className="flex h-full px-4 py-3 overflow-hidden text-white group grow">
          {file ? (
            <div className="flex items-center w-full">
              <span className="truncate">{file.name.replace(/\.[^/.]+$/, "")}</span>
              <span>.</span>
              <span>{file.name.split(".").pop()}</span>
            </div>
          ) : (
            <span className="group-has-[div]:hidden">No Chosen File</span>
          )}
        </span>
      </button>
    </div>
  );
};

export default FileUpload;

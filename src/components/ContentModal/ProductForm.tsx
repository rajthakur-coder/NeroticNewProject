import React, { useState } from "react";
import InputField from "../../components/Common/inputField";
import RadioButton from "../Common/RadioButton";
import SearchModalWrapper from "../Modal/SearchModalWrapper";
import Icon from "../../components/ui/Icon";
import FileUpload from "../Common/FileUpload";
import type { Country } from "../../components/ContentModal/SearchContentModal";

interface Values {
  category_id: number | null;
  name: string;
  description: string;
  icon: File | string | null;
  status: string;
}

type Errors = Partial<Record<keyof Values, string>>;

interface AddProductFormProps {
  values: Values;
  errors?: Errors;
  onChange: (values: Values) => void;
  onBlur: (field: keyof Values) => void;
  touched: Record<keyof Values, boolean>;
}

const AddProductForm: React.FC<AddProductFormProps> = ({
  values,
  errors = {},
  onChange,
  onBlur,
  touched,
}) => {
  const [search, setSearch] = useState("");
  const [isSearchContentModalOpen, setIsSearchContentModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setSearch(country.name);
    setIsSearchContentModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Category */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Category
        </label>
        <div className="relative flex items-center w-full gap-2">
          <Icon
            name="ri-search-line"
            className="absolute -translate-y-1/2 text-text-subtle left-3 top-1/2"
          />
          <input
            readOnly
            value={
              selectedCountry ? `${selectedCountry.name}` : search
            }
            placeholder="Search customer or order number..."
            onClick={() => setIsSearchContentModalOpen(true)}
            className="w-full px-3 py-3.5 pl-10 text-sm border rounded-lg cursor-pointer bg-surface-card text-text-main placeholder-text-subtle
              border-border-input hover:border-[var(--color-border-input-hover)] 
              focus:border-[var(--color-border-input-focus)] focus:ring-primary"
          />
          {selectedCountry && (
            <button
              data-no-ripple
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCountry(null);
                setSearch("");
              }}
              className="absolute -translate-y-1/2 right-3 top-1/2 p-1.5 rounded-full text-text-subtle hover:bg-surface-hover hover:text-text-main transition-colors"
            >
              <Icon name="x" className="w-4 h-4" />
            </button>
          )}
        </div>
        {touched.category_id && errors.category_id && (
          <p className="mt-1 text-sm text-red-500">{errors.category_id}</p>
        )}
      </div>

      {/* Name */}
      <div>
        <InputField
          label="Name"
          placeholder="Enter Product Category Name"
          type="text"
          themeMode="light"
          value={values.name}
          onChange={(e) => onChange({ ...values, name: e.target.value })}
          onBlur={() => onBlur("name")}
          touched={touched.name}
          error={errors.name}
        />
      </div>

      {/* Description */}
      <div>
        <InputField
          label="Description"
          placeholder="Enter product description..."
          type="textarea"
          themeMode="light"
          value={values.description}
          onChange={(e) => onChange({ ...values, description: e.target.value })}
          onBlur={() => onBlur("description")}
          touched={touched.description}
          error={errors.description}
        />
      </div>

      {/* Icon Upload */}
      <div>
        <label
          htmlFor="icon_file"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Icon
        </label>
        <div className="p-0">
          <h2 className="mb-2 font-medium text-text-main">Upload your file</h2>
          <FileUpload url="/upload" />
        </div>
        {touched.icon && errors.icon && (
          <p className="mt-1 text-sm text-red-500">{errors.icon}</p>
        )}
        {values.icon && (
          <div className="mt-3">
            <img
              src={
                typeof values.icon === "string"
                  ? values.icon
                  : URL.createObjectURL(values.icon)
              }
              alt="preview"
              className="object-contain w-20 h-20 border rounded-md shadow-sm"
            />
          </div>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Status
        </label>
        <div className="flex items-center gap-6">
          <RadioButton
            checked={values.status === "Active"}
            onChange={() => {
              onChange({ ...values, status: "Active" });
              onBlur("status");
            }}
            label="Active"
            size="sm"
            activeColor="bg-green-600"
            borderColor="border-green-600"
            labelColor="text-gray-700"
          />
          <RadioButton
            checked={values.status === "Inactive"}
            onChange={() => {
              onChange({ ...values, status: "Inactive" });
              onBlur("status");
            }}
            label="Inactive"
            size="sm"
            activeColor="bg-red-600"
            borderColor="border-red-600"
            labelColor="text-gray-700"
          />
        </div>
        {touched.status && errors.status && (
          <p className="mt-1 text-sm text-red-500">{errors.status}</p>
        )}
      </div>

      <SearchModalWrapper
        initialSearch={search}
        isOpen={isSearchContentModalOpen}
        onClose={() => setIsSearchContentModalOpen(false)}
        onSelect={handleCountrySelect}
      />
    </div>
  );
};

export default AddProductForm;

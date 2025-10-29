import React, { useState } from "react";
import InputField from "../../components/Common/inputField";
import SearchModalWrapper from "../Modal/SearchModalWrapper";
import Icon from "../../components/ui/Icon";
import type { Country } from "../../components/ContentModal/SearchContentModal";

interface Values {
  product_id: number | string;
  price: string | number;
  currency: string;
}

type Errors = Partial<Record<keyof Values, string>>;

interface Props {
  values: Values;
  errors?: Errors;
  onChange: (values: Values) => void;
  onBlur: (field: keyof Values) => void;
  touched: Record<keyof Values, boolean>;
}

const ProductPricingForm: React.FC<Props> = ({
  values,
  errors = {},
  onChange,
  onBlur,
  touched,
}) => {
  const [search, setSearch] = useState<string>("");
  const [isSearchContentModalOpen, setIsSearchContentModalOpen] =
    useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);

    setSearch(country.name);
    setIsSearchContentModalOpen(false);
  };

  return (
    <div className="grid gap-4">
      {/* Product Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product
        </label>
        <div className="flex items-center w-full gap-2 md:flex-1">
          <div className="relative flex-1">
            <Icon
              name="ri-search-line"
              className="absolute -translate-y-1/2 text-text-subtle left-3 top-1/2"
            />
            <input
              readOnly
              value={
                selectedCountry
                  ? `${selectedCountry.name}`
                  : search
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
        </div>
        {touched.product_id && errors.product_id && (
          <p className="mt-1 text-sm text-red-500">{errors.product_id}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <InputField
          label="Price"
          type="number"
          value={values.price}
          onChange={(e) => onChange({ ...values, price: e })}
          onBlur={() => onBlur("price")}
          touched={touched.price}
          error={errors.price}
          themeMode="light"
        />
      </div>

      {/* Currency */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Currency
        </label>
        <input
          type="text"
          value={values.currency}
          disabled
          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
        />
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

export default ProductPricingForm;

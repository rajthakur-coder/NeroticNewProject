import React, { useState } from "react";
import InputField from "../../components/Common/inputField";
import CustomSelect from "../Common/CustomSelect";
import Icon from "../../components/ui/Icon";
import SearchModalWrapper from "../Modal/SearchModalWrapper";
import type { Country } from "../../components/ContentModal/SearchContentModal";

interface AddServiceProps {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  onChange: (values: Record<string, any>) => void;
  onBlur: (field: string) => void;
}

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const typeOptions = [
  { value: "Commission", label: "Commission" },
  { value: "Surcharge", label: "Surcharge" },
];

const flateRateOptions = [
  { value: "flat", label: "Flat" },
  { value: "percent", label: "Percent" },
];

const AddService: React.FC<AddServiceProps> = ({
  values,
  errors,
  touched,
  onChange,
  onBlur,
}) => {
  console.log(values);
  
  const [searchAPI, setSearchAPI] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [selectedAPI, setSelectedAPI] = useState<Country | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Country | null>(null);
  const [isSearchContentModalOpen, setIsSearchContentModalOpen] =
    useState(false);

  const handleCountrySelect = (country: Country, type: "api" | "product") => {
    if (type === "api") {
      setSelectedAPI(country);
      setSearchAPI(country.name);
    } else {
      setSelectedProduct(country);
      setSearchProduct(country.name);
    }
    setIsSearchContentModalOpen(false);
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const errorClass = "text-red-500 text-sm mt-1";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* API */}
      <div>
        <label className="block mb-1 font-medium">API</label>
        <div className="relative">
          <Icon
            name="ri-search-line"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle"
          />
          <input
            readOnly
            value={selectedAPI?.name || searchAPI}
            placeholder="Select API"
            onClick={() => setIsSearchContentModalOpen(true)}
            className={`${inputClass} pl-10 cursor-pointer`}
          />
          {selectedAPI && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedAPI(null);
                setSearchAPI("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-text-subtle hover:bg-surface-hover hover:text-text-main transition-colors"
            >
              <Icon name="x" className="w-4 h-4" />
            </button>
          )}
        </div>
        {touched.api_id && errors.api_id && (
          <p className={errorClass}>{errors.api_id}</p>
        )}
      </div>

      {/* Product */}
      <div>
        <label className="block mb-1 font-medium">Product</label>
        <div className="relative">
          <Icon
            name="ri-search-line"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle"
          />
          <input
            readOnly
            value={selectedProduct?.name || searchProduct}
            placeholder="Select Product"
            onClick={() => setIsSearchContentModalOpen(true)}
            className={`${inputClass} pl-10 cursor-pointer`}
          />
          {selectedProduct && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProduct(null);
                setSearchProduct("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-text-subtle hover:bg-surface-hover hover:text-text-main transition-colors"
            >
              <Icon name="x" className="w-4 h-4" />
            </button>
          )}
        </div>
        {touched.product_id && errors.product_id && (
          <p className={errorClass}>{errors.product_id}</p>
        )}
      </div>

      {/* API Code */}
      <InputField
        label="API Code"
        placeholder="Enter API Code"
        type="text"
        themeMode="light"
        value={values.api_code || ""}
        onChange={(e) => onChange({ ...values, api_code: e.target.value })}
        onBlur={() => onBlur("api_code")}
        touched={touched.api_code}
        error={errors.api_code}
      />

      {/* Rate */}
      <div>
        <InputField
          label="Enter Rate"
          placeholder="0.00"
          type="number"
          themeMode="light"
          value={values.rate || ""}
          onChange={(e) => onChange({ ...values, rate: e.target.value })}
          onBlur={() => onBlur("rate")}
          touched={touched.rate}
          error={errors.rate}
        />
      </div>

      <CustomSelect
        label="Commission / Surcharge"
        value={values.commission_surcharge || ""}
        options={[
          { value: "Commission", label: "Commission" },
          { value: "Surcharge", label: "Surcharge" },
          { value: "Commission", label: "Commission" },
          { value: "Surcharge", label: "Surcharge" },
          { value: "Commission", label: "Commission" },
          { value: "Surcharge", label: "Surcharge" },
          { value: "Commission", label: "Commission" },
          { value: "Surcharge", label: "Surcharge" },
          { value: "Commission", label: "Commission" },
          { value: "Surcharge", label: "Surcharge" },
          { value: "Commission", label: "Commission" },
          { value: "Surcharge", label: "Surcharge" },
          { value: "Commission", label: "Commission" },
          { value: "Surcharge", label: "Surcharge" },
        ]}
        onChange={(val) => onChange({ ...values, commission_surcharge: val })}
      />
      {touched.commission_surcharge && errors.commission_surcharge && (
        <p className={errorClass}>{errors.commission_surcharge}</p>
      )}

      <CustomSelect
        label="Flat / Percentage"
        value={values.flat_per || ""}
        options={[
          { value: "flat", label: "Flat" },
          { value: "percent", label: "Percent" },
          { value: "flat", label: "Flat" },
          { value: "percent", label: "Percent" },
          { value: "flat", label: "Flat" },
          { value: "percent", label: "Percent" },
          { value: "flat", label: "Flat" },
          { value: "percent", label: "Percent" },
          { value: "flat", label: "Flat" },
          { value: "percent", label: "Percent" },
          { value: "flat", label: "Flat" },
          { value: "percent", label: "Percent" },
        ]}
        onChange={(val) => onChange({ ...values, flat_per: val })}
      />
      {touched.flat_per && errors.flat_per && (
        <p className={errorClass}>{errors.flat_per}</p>
      )}

      {/* GST */}
      <div>
        <InputField
          label="Gst(%)"
          placeholder="Enter GST"
          type="number"
          themeMode="light"
          value={values.gst || ""}
          onChange={(e) => onChange({ ...values, gst: e.target.value })}
          onBlur={() => onBlur("gst")}
          touched={touched.gst}
          error={errors.gst}
        />
      </div>

      {/* TDS */}
      <div>
        <InputField
          label="TDS(%)"
          placeholder="Enter TDS"
          type="number"
          themeMode="light"
          value={values.tds || ""}
          onChange={(e) => onChange({ ...values, tds: e.target.value })}
          onBlur={() => onBlur("tds")}
          touched={touched.tds}
          error={errors.tds}
        />
      </div>

      {/* Transaction Limit */}
      <div>
        {/* <label className="block mb-1 font-medium">Transaction Limit</label>
        <input
          type="number"
          value={values.txn_limit || ""}
          onChange={(e) => onChange({ ...values, txn_limit: e.target.value })}
          onBlur={() => onBlur("txn_limit")}
          placeholder="Enter Transaction Limit"
          className={inputClass}
        /> */}
        <InputField
          label="Limit"
          placeholder="Enter Transaction Limit"
          type="number"
          themeMode="light"
          value={values.txn_limit || ""}
          onChange={(e) => onChange({ ...values, txn_limit: e.target.value })}
          onBlur={() => onBlur("txn_limit")}
          touched={touched.txn_limit}
          error={errors.txn_limit}
        />
      </div>

      <CustomSelect
        label="Status"
        value={values.status || ""}
        options={[
          { value: "Active", label: "Active" },
          { value: "Inactive", label: "Inactive" },
        ]}
        onChange={(val) => onChange({ ...values, status: val })}
      />

      <SearchModalWrapper
        initialSearch={searchAPI || searchProduct}
        isOpen={isSearchContentModalOpen}
        onClose={() => setIsSearchContentModalOpen(false)}
        onSelect={(country: Country) => handleCountrySelect(country, "api")}
      />
    </div>
  );
};

export default AddService;
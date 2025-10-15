import React, {useState} from "react";
import SearchModalWrapper from "../Modal/SearchModalWrapper";
import Icon from "../../components/ui/Icon";
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

      const [search, setSearch] = useState<string>("");
      const [isSearchContentModalOpen, setIsSearchContentModalOpen] = useState(false);
      const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    
        const handleCountrySelect = (country: Country) => {
            setSelectedCountry(country);
    
            setSearch(country.name);
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
                  ? `Filtering by: ${selectedCountry.name}`
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
        {touched.api_id && errors.api_id && (
          <p className={errorClass}>{errors.api_id}</p>
        )}
      </div>

      {/* Product */}
      <div>
        <label className="block mb-1 font-medium">Product</label>
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
                  ? `Filtering by: ${selectedCountry.name}`
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
          <p className={errorClass}>{errors.product_id}</p>
        )}
      </div>

      {/* API Code */}
      <div>
        <label className="block mb-1 font-medium">API Code</label>
        <input
          type="text"
          placeholder="Enter API Code"
          className={inputClass}
          value={values.api_code}
          onChange={(e) => onChange({ ...values, api_code: e.target.value })}
          onBlur={() => onBlur("api_code")}
        />
        {touched.api_code && errors.api_code && (
          <p className={errorClass}>{errors.api_code}</p>
        )}
      </div>

      {/* Rate */}
      <div>
        <label className="block mb-1 font-medium">Rate</label>
        <input
          type="number"
          placeholder="Enter Rate"
          className={inputClass}
          value={values.rate}
          onChange={(e) => onChange({ ...values, rate: e.target.value })}
          onBlur={() => onBlur("rate")}
        />
        {touched.rate && errors.rate && (
          <p className={errorClass}>{errors.rate}</p>
        )}
      </div>

      {/* Commission / Surcharge */}
      <div>
        <label className="block mb-1 font-medium">Commission / Surcharge</label>
        <select
          className={inputClass}
          value={values.commission_surcharge}
          onChange={(e) =>
            onChange({ ...values, commission_surcharge: e.target.value })
          }
          onBlur={() => onBlur("commission_surcharge")}
        >
          <option value="">Select Type</option>
          {typeOptions.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {touched.commission_surcharge && errors.commission_surcharge && (
          <p className={errorClass}>{errors.commission_surcharge}</p>
        )}
      </div>

      {/* Flat / Percentage */}
      <div>
        <label className="block mb-1 font-medium">Flat / Percentage</label>
        <select
          className={inputClass}
          value={values.flat_per}
          onChange={(e) => onChange({ ...values, flat_per: e.target.value })}
          onBlur={() => onBlur("flat_per")}
        >
          <option value="">Select Type</option>
          {flateRateOptions.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
        {touched.flat_per && errors.flat_per && (
          <p className={errorClass}>{errors.flat_per}</p>
        )}
      </div>

      {/* GST */}
      <div>
        <label className="block mb-1 font-medium">GST (%)</label>
        <input
          type="number"
          placeholder="Enter GST"
          className={inputClass}
          value={values.gst}
          onChange={(e) => onChange({ ...values, gst: e.target.value })}
          onBlur={() => onBlur("gst")}
        />
        {touched.gst && errors.gst && (
          <p className={errorClass}>{errors.gst}</p>
        )}
      </div>

      {/* TDS */}
      <div>
        <label className="block mb-1 font-medium">TDS (%)</label>
        <input
          type="number"
          placeholder="Enter TDS"
          className={inputClass}
          value={values.tds}
          onChange={(e) => onChange({ ...values, tds: e.target.value })}
          onBlur={() => onBlur("tds")}
        />
        {touched.tds && errors.tds && (
          <p className={errorClass}>{errors.tds}</p>
        )}
      </div>

      {/* Transaction Limit */}
      <div>
        <label className="block mb-1 font-medium">Transaction Limit</label>
        <input
          type="number"
          placeholder="Enter Transaction Limit"
          className={inputClass}
          value={values.txn_limit}
          onChange={(e) => onChange({ ...values, txn_limit: e.target.value })}
          onBlur={() => onBlur("txn_limit")}
        />
        {touched.txn_limit && errors.txn_limit && (
          <p className={errorClass}>{errors.txn_limit}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block mb-1 font-medium">Status</label>
        <select
          className={inputClass}
          value={values.status}
          onChange={(e) => onChange({ ...values, status: e.target.value })}
          onBlur={() => onBlur("status")}
        >
          <option value="">Select Status</option>
          {statusOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {touched.status && errors.status && (
          <p className={errorClass}>{errors.status}</p>
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

export default AddService;
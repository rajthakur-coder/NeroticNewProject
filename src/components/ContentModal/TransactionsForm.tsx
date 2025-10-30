import React from "react";
import RadioButton from "../Common/RadioButton";
import CustomSelect from "../Common/CustomSelect";
import CustomInput from "../Common/inputField"; // renamed import to match your file
// ^ ensure this path is correct in your project

interface TransactionFormProps {
  values: {
    transfer_type: "Credit" | "Debit" | "";
    user_id: string | number | null;
    amount: string;
    payment_mode: string;
    bank: string | number | null;
    reference_number: string;
    remark: string;
  };
  errors?: Partial<Record<keyof TransactionFormProps["values"], string>>;
  touched: Record<keyof TransactionFormProps["values"], boolean>;
  onChange: (v: TransactionFormProps["values"]) => void;
  onBlur: (field: keyof TransactionFormProps["values"]) => void;
}

// Dummy data
const dummyUsers = [
  { value: 1, label: "Amit Sharma - 9876543210" },
  { value: 2, label: "Neha Verma - 9823456789" },
  { value: 3, label: "Rahul Singh - 9811122233" },
];

const dummyBanks = [
  { value: "SBI", label: "State Bank of India" },
  { value: "HDFC", label: "HDFC Bank" },
  { value: "ICICI", label: "ICICI Bank" },
  { value: "AXIS", label: "Axis Bank" },
];

const paymentModeOptions = [
  { value: "Credit Note", label: "Credit Note" },
  { value: "Cash In-Hand", label: "Cash In-Hand" },
  { value: "Cash Deposit", label: "Cash Deposit" },
  { value: "Bank Transfer", label: "Bank Transfer" },
  { value: "IMPS/UPI", label: "IMPS/UPI" },
  { value: "NEFT/RTGS", label: "NEFT/RTGS" },
];

const TransactionForm: React.FC<TransactionFormProps> = ({
  values,
  errors,
  touched,
  onChange,
  onBlur,
}) => {
  const numberToWords = (num: number | string): string => {
    if (num === "" || num === undefined || num === null) return "";
    const [intPartStr, decimalStr] = num.toString().split(".");
    const intPart = parseInt(intPartStr, 10);
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const inWords = (n: number): string => {
      if (n < 20) return a[n];
      if (n < 100)
        return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
      if (n < 1000)
        return (
          a[Math.floor(n / 100)] +
          " Hundred" +
          (n % 100 ? " " + inWords(n % 100) : "")
        );
      if (n < 100000)
        return (
          inWords(Math.floor(n / 1000)) +
          " Thousand" +
          (n % 1000 ? " " + inWords(n % 1000) : "")
        );
      if (n < 10000000)
        return (
          inWords(Math.floor(n / 100000)) +
          " Lakh" +
          (n % 100000 ? " " + inWords(n % 100000) : "")
        );
      return (
        inWords(Math.floor(n / 10000000)) +
        " Crore" +
        (n % 10000000 ? " " + inWords(n % 10000000) : "")
      );
    };
    let result = `Rupees ${inWords(intPart).trim() || "Zero"}`;
    if (decimalStr) {
      const paise = parseInt(decimalStr.substring(0, 2), 10);
      if (paise > 0) {
        result += ` and ${inWords(paise).trim()} Paise`;
      }
    }
    return result + " Only";
  };

  // ✅ Conditional logic
  const isBankFieldsVisible =
    values.transfer_type === "Credit" &&
    ["Cash Deposit", "Bank Transfer", "IMPS/UPI", "NEFT/RTGS"].includes(
      values.payment_mode
    );

  const formatINR = (num: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(num);

  return (
    <div className="space-y-6 px-1 max-h-96 overflow-y-auto p-3 py-3">
      {/* ===== Transfer Type ===== */}
      <div>
        <label className="block font-medium mb-2">
          Transfer Type <span className="text-red-600">*</span>
        </label>
        <div className="flex gap-6 mt-1">
          <RadioButton
            label="Credit"
            checked={values.transfer_type === "Credit"}
            onChange={() => {
              onChange({ ...values, transfer_type: "Credit" });
              onBlur("transfer_type");
            }}
            size="sm"
            activeColor="bg-green-600"
            borderColor="border-green-600"
            labelColor="text-text-main"
          />
          <RadioButton
            label="Debit"
            checked={values.transfer_type === "Debit"}
            onChange={() => {
              onChange({ ...values, transfer_type: "Debit" });
              onBlur("transfer_type");
            }}
            size="sm"
            activeColor="bg-red-600"
            borderColor="border-red-600"
            labelColor="text-text-main"
          />
        </div>
        {touched.transfer_type && errors?.transfer_type && (
          <p className="text-red-600 text-sm mt-1">{errors.transfer_type}</p>
        )}
      </div>

      {/* ===== Transfer To ===== */}
      <CustomSelect
        label="Transfer To"
        placeholder="Select User"
        options={dummyUsers}
        value={values.user_id ?? ""}
        onChange={(val) => onChange({ ...values, user_id: Number(val) })}
      />
      {touched.user_id && errors?.user_id && (
        <p className="text-red-600 text-sm mt-1">{errors.user_id}</p>
      )}

      {/* ===== Balance Summary ===== */}
      <div className="flex justify-between font-semibold border-b pb-1">
        <span>Main Balance: {formatINR(0)}</span>
        <span>Free Balance: {formatINR(0)}</span>
      </div>

      {/* 💰 Amount & Payment Mode side by side */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Amount Field */}
        <div className="w-full md:w-1/2">
          <CustomInput
            label="Amount (₹)"
            type="number"
            onChange={(e) => onChange({ ...values, amount: e })}
            value={values.amount}
            onBlur={() => onBlur("amount")}
            error={touched.amount ? errors?.amount : ""}
          />
          {values.amount && (
            <p className="text-gray-500 text-sm mt-1">
              {numberToWords(Number(values.amount))}
            </p>
          )}
        </div>

        {/* Payment Mode Field */}
        {values.transfer_type === "Credit" && (
          <div className="w-full md:w-1/2">
            <CustomSelect
              label="Payment Mode"
              options={paymentModeOptions}
              value={values.payment_mode}
              onChange={(val) =>
                onChange({ ...values, payment_mode: String(val) })
              }
              placeholder="Select Payment Mode"
            />
            {touched.payment_mode && errors?.payment_mode && (
              <p className="text-red-600 text-sm mt-1">{errors.payment_mode}</p>
            )}
          </div>
        )}
      </div>

      {/* ===== Bank & Reference ===== */}
      {isBankFieldsVisible && (
        <>
          <CustomSelect
            label="Bank"
            value={values.bank ?? ""}
            options={dummyBanks}
            onChange={(val) => onChange({ ...values, bank: val })}
            placeholder="Select Bank"
          />

          <CustomInput
            label="Reference Number"
            type="text"
            value={values.reference_number}
            onChange={(e) => onChange({ ...values, reference_number: e })}
            onBlur={() => onBlur("reference_number")}
            touched={touched.reference_number}
            error={errors?.reference_number}
          />
        </>
      )}

      {/* ===== Remark ===== */}
      <CustomInput
        label="Remark"
        type="textarea"
        value={values.remark}
        onChange={(e) => onChange({ ...values, remark: e })}
        onBlur={() => onBlur("remark")}
        touched={touched.remark}
        error={errors?.remark}
      />
    </div>
  );
};

export default TransactionForm;
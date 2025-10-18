import React, { useEffect } from "react";
import { Row, Col, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import RadioButton from "../Common/RadioButton";

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
  errors?: Partial<{
    transfer_type: string;
    user_id: string;
    amount: string;
    payment_mode: string;
    bank: string;
    reference_number: string;
    remark: string;
  }>;
  touched: Record<
    | "transfer_type"
    | "user_id"
    | "amount"
    | "payment_mode"
    | "bank"
    | "reference_number"
    | "remark",
    boolean
  >;
  onChange: (v: TransactionFormProps["values"]) => void;
  onBlur: (field: keyof TransactionFormProps["values"]) => void;
  users: {
    options: any[];
    loadMore: () => void;
    hasMore: boolean;
    loading: boolean;
  };
  banks: {
    options: any[];
    loadMore: () => void;
    hasMore: boolean;
    loading: boolean;
  };

  mainBalance: {
    free_balance: number;
    total_balance: number;
  };
  balanceFetchState?: {
    loading: boolean;
    error: string | null;
  };
}

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
  users,
  banks,
  mainBalance = { free_balance: 0, total_balance: 0 },
  balanceFetchState,
}) => {
  useEffect(() => {
    if (!values.transfer_type) {
      onChange({
        ...values,
        transfer_type: "Credit",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const numberToWords = (num: number | string): string => {
    if (num === null || num === undefined || num === "") return "ZERO";
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

  const handleTransferTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newType = e.target.value as "Credit" | "Debit";
    if (newType === "Debit") {
      onChange({
        ...values,
        transfer_type: newType,
        payment_mode: "",
        bank: "",
        reference_number: "",
      });
      return;
    }
    onChange({
      ...values,
      transfer_type: newType,
    });
  };

  const resetFields = ["Credit Note", "Cash In-Hand"];

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
    <Row>
      {/* Transfer Type */}
      <Col md={12} className="mb-3">
        <FormGroup>
          <Label>
            Transfer Type<span className="text-danger">*</span>
          </Label>
          <div>
            <div className="form-check form-check-inline form-radio-success">
              <Input
                className="form-check-input"
                type="radio"
                id="credit"
                value="Credit"
                checked={values.transfer_type === "Credit"}
                onChange={handleTransferTypeChange}
                onBlur={() => onBlur("transfer_type")}
              />
              <Label className="form-check-label" htmlFor="credit">
                Credit
              </Label>
            </div>
            <div className="form-check form-check-inline form-radio-danger">
              <Input
                className="form-check-input"
                type="radio"
                id="debit"
                value="Debit"
                checked={values.transfer_type === "Debit"}
                onChange={handleTransferTypeChange}
                onBlur={() => onBlur("transfer_type")}
              />
              <Label className="form-check-label" htmlFor="debit">
                Debit
              </Label>
            </div>
          </div>
        </FormGroup>
      </Col>

      {/* Transfer To */}
      <Col md={12} className="mb-3">
        <Label>
          Transfer To <span className="text-danger">*</span>
        </Label>
        {touched.user_id && errors?.user_id && (
          <FormFeedback className="d-block">{errors.user_id}</FormFeedback>
        )}
      </Col>

      {/* Amount & Payment Mode */}
      <Row className="w-100">
        <Col md={values.transfer_type === "Credit" ? 6 : 12} className="mb-3">
          <FormGroup>
            <Label for="amount">
              Amount (₹)<span className="text-danger">*</span>
            </Label>
            <Input
              type="number"
              id="amount"
              value={values.amount}
              onChange={(e) => onChange({ ...values, amount: e.target.value })}
              onBlur={() => onBlur("amount")}
              placeholder="Enter amount"
              invalid={touched.amount && !!errors.amount}
            />
            {touched.amount && errors.amount && (
              <FormFeedback>{errors.amount}</FormFeedback>
            )}
            {values.amount && (
              <div className="mt-2 text-muted fw-semibold">
                {numberToWords(Number(values.amount))}
              </div>
            )}
          </FormGroup>
        </Col>
        {values.transfer_type === "Credit" && (
          <Col md={6} className="mb-3">
            <FormGroup>
              <Label>
                Payment Mode<span className="text-danger">*</span>
              </Label>
              {/* <Select
                value={paymentModeOptions.find(
                  (opt) => opt.value === values.payment_mode
                )}
                onChange={(opt) => {
                  const selectedMode = opt?.value || "";

                  if (resetFields.includes(selectedMode)) {
                    onChange({
                      ...values,
                      payment_mode: selectedMode,
                      bank: "",
                      reference_number: "",
                    });
                  } else {
                    onChange({
                      ...values,
                      payment_mode: selectedMode,
                    });
                  }
                }}
                onBlur={() => onBlur("payment_mode")}
                options={paymentModeOptions}
                placeholder="Select Payment Mode"
              /> */}
              {touched.payment_mode && errors.payment_mode && (
                <FormFeedback className="d-block">
                  {errors.payment_mode}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
        )}
      </Row>

      {/* Bank & Reference */}
      {isBankFieldsVisible && (
        <>
          <Col md={12} className="mb-3">
            <Label>
              Bank <span className="text-danger">*</span>
            </Label>
          </Col>
          <Col md={12} className="mb-3">
            <FormGroup>
              <Label for="reference_number">
                Reference No<span className="text-danger">*</span>
              </Label>
              <Input
                id="reference_number"
                value={values.reference_number}
                onChange={(e) =>
                  onChange({ ...values, reference_number: e.target.value })
                }
                onBlur={() => onBlur("reference_number")}
                placeholder="Reference No / UTR No"
                invalid={touched.reference_number && !!errors.reference_number}
              />
              {touched.reference_number && errors.reference_number && (
                <FormFeedback>{errors.reference_number}</FormFeedback>
              )}
            </FormGroup>
          </Col>
        </>
      )}

      {/* Remark */}
      <Col md={12} className="mb-3">
        <FormGroup>
          <Label for="remark">Remark</Label>
          <Input
            id="remark"
            type="textarea"
            value={values.remark}
            onChange={(e) => onChange({ ...values, remark: e.target.value })}
            onBlur={() => onBlur("remark")}
            placeholder="Enter remark (optional)"
            invalid={touched.remark && !!errors.remark}
          />
          {touched.remark && errors.remark && (
            <FormFeedback>{errors.remark}</FormFeedback>
          )}
        </FormGroup>
      </Col>
    </Row>
  );
};

export default TransactionForm;
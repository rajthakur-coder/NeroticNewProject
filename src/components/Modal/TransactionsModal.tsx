import React, { useMemo, useState, useEffect } from "react";
import MpinModal from "../Modal/AuthkeyMpinModal";
import BaseModal from "../BaseModals/BaseModal";
import TransactionForm from "../ContentModal/TransactionsForm";

interface TransactionsModalProps {
  isOpen: boolean;
  toggle: () => void;
  usersData: {
    options: { id: number; name: string }[];
    loadMore: () => void;
    hasMore: boolean;
    loading: boolean;
  };
  banksData: {
    options: { id: number; name: string }[];
    loadMore: () => void;
    hasMore: boolean;
    loading: boolean;
  };
  mainBalance: {
    free_balance: number;
    total_balance: number;
  };
}

const TransactionsModal: React.FC<TransactionsModalProps> = ({
  isOpen,
  toggle,
  usersData,
  banksData,
  mainBalance,
}) => {
  const [isMpinOpen, setIsMpinOpen] = useState(false);
  const [pendingPayload, setPendingPayload] = useState<any>(null);

  // --- Form State ---
  const [values, setValues] = useState({
    user_id: null as number | null,
    transfer_type: "Credit" as "Credit" | "Debit",
    payment_mode: "",
    bank: null as number | null,
    reference_number: "",
    remark: "",
    amount: "",
  });

  const [touched, setTouched] = useState<Record<keyof typeof values, boolean>>({
    user_id: false,
    transfer_type: false,
    payment_mode: false,
    bank: false,
    reference_number: false,
    remark: false,
    amount: false,
  });

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setValues({
        user_id: null,
        transfer_type: "Credit",
        payment_mode: "",
        bank: null,
        reference_number: "",
        remark: "",
        amount: "",
      });
      setTouched({
        user_id: false,
        transfer_type: false,
        payment_mode: false,
        bank: false,
        reference_number: false,
        remark: false,
        amount: false,
      });
    }
  }, [isOpen]);

  // --- Validation ---
  const errors = useMemo(() => {
    return {
      user_id: values.user_id ? "" : "User is required",
      transfer_type: values.transfer_type ? "" : "Transfer type is required",
      payment_mode:
        values.transfer_type === "Credit" && !values.payment_mode
          ? "Payment mode is required"
          : "",
      bank:
        ["Cash Deposit", "Bank Transfer", "IMPS/UPI", "NEFT/RTGS"].includes(
          values.payment_mode
        ) && !values.bank
          ? "Bank is required"
          : "",
      reference_number:
        ["Cash Deposit", "Bank Transfer", "IMPS/UPI", "NEFT/RTGS"].includes(
          values.payment_mode
        ) && !values.reference_number
          ? "Reference No is required"
          : "",
      amount: values.amount ? "" : "Amount is required",
    };
  }, [values]);

  const isValid = useMemo(
    () => Object.values(errors).every((e) => !e),
    [errors]
  );

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // --- Submit ---
  const handleSubmit = () => {
    if (!isValid) return;

    const payload = {
      user_id: values.user_id,
      amount: Number(values.amount),
      transfer_type: values.transfer_type,
      payment_mode: values.payment_mode,
      ...(values.bank ? { bank_id: values.bank } : {}),
      ...(values.reference_number
        ? { reference_number: values.reference_number }
        : {}),
      ...(values.remark ? { remark: values.remark } : {}),
    };

    setPendingPayload(payload);
    setIsMpinOpen(true);
  };

  const handleMpinVerify = (mpin: string, setError: (msg: string) => void) => {
    if (!pendingPayload) return;
    const finalPayload = { ...pendingPayload, mPin: mpin };

    // TODO: Send finalPayload to backend
    console.log("Submitting transaction:", finalPayload);
    setIsMpinOpen(false);
    toggle();
  };

  const handleCancel = () => {
    toggle();
  };

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        toggle={toggle}
        headerText="New Transaction"
        onConfirm={handleSubmit}
        onCancel={handleCancel}
        confirmText="Submit"
        cancelText="Cancel"
        confirmColor={
          isValid
            ? "bg-black hover:bg-gray-900 text-white"
            : "bg-gray-400 text-white cursor-not-allowed"
        }
        widthClass="w-[600px]"
      >
        <TransactionForm
          values={values}
          errors={errors}
          touched={touched}
          onChange={setValues}
          onBlur={handleBlur}
          users={usersData}
          banks={banksData}
          mainBalance={mainBalance}
        />
      </BaseModal>

      <MpinModal
        isOpen={isMpinOpen}
        toggle={() => setIsMpinOpen(false)}
        onVerify={handleMpinVerify}
      />
    </>
  );
};

export default TransactionsModal;
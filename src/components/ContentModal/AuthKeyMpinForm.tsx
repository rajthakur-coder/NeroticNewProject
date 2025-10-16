import React, { useRef, useEffect } from "react";

interface Props {
  mpin: string[];
  setMpin: (val: string[]) => void;
  error?: string;
}

const AuthKeyMpinForm: React.FC<Props> = ({ mpin, setMpin, error }) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>(
    new Array(4).fill(null)
  );

  // ✅ Focus first input when mounted
  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  const handleChange = (val: string, idx: number) => {
    if (val && !/^\d$/.test(val)) return; // only digits allowed

    const newMpin = [...mpin];
    newMpin[idx] = val;

    // clear next digits
    for (let i = idx + 1; i < newMpin.length; i++) newMpin[i] = "";
    setMpin(newMpin);

    if (val && idx < 3) {
      // ✅ enable and move focus to next input
      inputsRef.current[idx + 1]?.removeAttribute("disabled");
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newMpin = [...mpin];
      if (mpin[idx]) {
        newMpin[idx] = "";
        setMpin(newMpin);
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
        newMpin[idx - 1] = "";
        setMpin(newMpin);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label className="text-gray-700 dark:text-gray-300 mb-2">
        Enter your 4-digit mPIN
      </label>

      <div className="flex gap-3">
        {mpin?.map((num, idx) => (
          <input
            key={idx}
            id={`mpin-${idx}`}
            type="password"
            inputMode="numeric"
            maxLength={1}
            value={num}
            ref={(el) => (inputsRef.current[idx] = el)}
            onChange={(e) => handleChange(e.target.value, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            disabled={idx > 0 && mpin[idx - 1] === ""}
            className="w-12 h-12 text-center text-2xl font-bold border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        ))}
      </div>

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default AuthKeyMpinForm;
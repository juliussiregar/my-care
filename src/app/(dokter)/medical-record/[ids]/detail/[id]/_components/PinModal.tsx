// components/PinModal.tsx
import { useState, useEffect, useRef } from "react";

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pin: string[]) => void;
}

const PinModal: React.FC<PinModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (isOpen) {
      inputRefs.current[0]?.focus();
    } else {
      setPin(["", "", "", "", "", ""]);
    }
  }, [isOpen]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Submit when all digits are filled
    if (newPin.every(digit => digit !== "") && value) {
      onSubmit(newPin);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black font-open-sans text-[14px] leading-[22px] text-[#191F2A] bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-5 w-80">
        <div className="flex justify-between items-center mb-[37px]">
          <h2 className="font-bold">Input PIN</h2>
          <button 
            onClick={onClose} 
          >
            &times;
          </button>
        </div>
        <p className="font-normal mb-10">Silakan input PIN untuk mengakses Rekam Medis</p>
        <div className="flex justify-between space-x-2 mb-10">
          {pin.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="password"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-10 border border-[#C0C9D9] rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          ))}
        </div>
        <p>
          Saya lupa PIN saya{' '}
          <a href="#" className="text-blue-600 hover:text-blue-800 underline">
            Reset PIN
          </a>
        </p>
      </div>
    </div>
  );
};

export default PinModal;
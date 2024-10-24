import React from 'react';

interface ToggleSwitchProps {
    isOn: boolean;
    setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, setIsOn }) => {
    // Toggle the switch state
    const toggleSwitch = () => {
        setIsOn(!isOn);
    };

    return (
        <svg
            width="48"
            height="26"
            viewBox="0 0 48 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={toggleSwitch}
            style={{ cursor: 'pointer' }}
        >
            {/* Background rectangle */}
            <rect
                y="1"
                width="48"
                height="24"
                rx="12"
                fill={isOn ? "#0D0DCD" : "#D7D7D7"}
            />
            {/* Toggle circle with animation */}
            <rect
                x={isOn ? "28" : "4"}
                y="5"
                width="16"
                height="16"
                rx="8"
                fill="white"
                style={{
                    transition: 'x 0.3s ease',
                }}
            />
        </svg>
    );
};

export default ToggleSwitch;

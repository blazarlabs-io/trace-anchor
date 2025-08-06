import React from 'react';

interface LabelSeparatorProps {
  /** The text to display in the center label */
  label: string;
}

const LabelSeparator: React.FC<LabelSeparatorProps> = ({ label }) => (
  <div className="flex items-center w-full">
    {/* Left line */}
    <div className="flex-grow border-t border-gray-300" />
    {/* Centered label */}
    <span className="mx-4 px-4 bg-white text-gray-600 border border-gray-300 rounded">
      {label}
    </span>
    {/* Right line */}
    <div className="flex-grow border-t border-gray-300" />
  </div>
);

export default LabelSeparator;

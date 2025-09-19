import React from "react";

const Title = ({ text1, text2, subtitle, align = "center" }) => {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`${alignmentClasses[align]} mb-6`}>
      <div className="inline-flex flex-col items-center gap-1.5">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          <span className="text-gray-600">{text1}</span>
          <span className="ml-2 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            {text2}
          </span>
        </h2>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-0.5 bg-red-600 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></div>
          <div className="w-8 h-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-full"></div>
        </div>
        {subtitle && (
          <p className="text-gray-500 text-xs font-medium mt-1 tracking-wide max-w-md">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default Title;

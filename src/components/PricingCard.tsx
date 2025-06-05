import React from "react";

type PricingCardProps = {
  plan: string;
  price: string;
  features: string[];
  isFeatured?: boolean;
};

const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  price,
  features,
  isFeatured = false,
}) => {
  return (
    <div
      tabIndex={0}
      className={`
        flex flex-col items-center 
        ${isFeatured ? "bg-blue-900 text-white shadow-2xl scale-105 z-10" : "bg-white shadow-md"}
        rounded-lg px-8 py-10 mx-2 my-4
        transition-all duration-200
        outline-none
        focus:ring-4 focus:ring-blue-400
        hover:shadow-2xl
        sm:my-0
        w-full max-w-xs
      `}
      aria-label={`${plan} plan`}
    >
      <div className="text-lg font-semibold mb-2">{plan}</div>
      <div className="text-4xl font-bold mb-4">{price}</div>
      <ul className="w-full mb-6">
        {features.map((feature, idx) => (
          <li
            key={idx}
            className={`py-2 border-b last:border-b-0 ${
              isFeatured ? "border-blue-700" : "border-gray-200"
            } text-center`}
          >
            {feature}
          </li>
        ))}
      </ul>
      <button
        className={`
          mt-auto font-semibold uppercase tracking-wide
          px-6 py-2 rounded
          transition-colors duration-150
          focus:outline-none focus:ring-2 focus:ring-blue-400
          ${
            isFeatured
              ? "bg-white text-blue-900 hover:bg-gray-100"
              : "bg-blue-900 text-white hover:bg-blue-800"
          }
        `}
      >
        Subscribe
      </button>
    </div>
  );
};

export default PricingCard; 
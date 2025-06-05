import React from "react";
import PricingCard from "./components/PricingCard";

const plans = [
  {
    plan: "Standard",
    price: "$100",
    features: [
      "50,000 Requests",
      "4 contributors",
      "Up to 3 GB storage space",
    ],
  },
  {
    plan: "Pro",
    price: "$200",
    features: [
      "100,000 Requests",
      "7 contributors",
      "Up to 6 GB storage space",
    ],
    isFeatured: true,
  },
  {
    plan: "Expert",
    price: "$500",
    features: [
      "200,000 Requests",
      "11 contributors",
      "Up to 10 GB storage space",
    ],
  },
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-12 px-2">
      <h1 className="text-3xl font-bold text-white mb-10">Pricing</h1>
      <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-4xl">
        {plans.map((p) => (
          <PricingCard
            key={p.plan}
            plan={p.plan}
            price={p.price}
            features={p.features}
            isFeatured={p.isFeatured}
          />
        ))}
      </div>
    </div>
  );
};

export default App; 
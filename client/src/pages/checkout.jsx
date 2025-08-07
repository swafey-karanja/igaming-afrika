import React from "react";
import Header from "../components/Header";
import Checkout from "../components/checkout/Checkout";

const checkout = () => {
  return (
    <div className="w-full bg-gray-100">
      <Header />
      <div className="py-6 w-full bg-gray-100 max-w-7xl mx-auto">
        <Checkout />
      </div>
    </div>
  );
};

export default checkout;

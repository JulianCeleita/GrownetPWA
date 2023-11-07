import React, { useEffect, useState } from "react";
import "./stepper.css";

export default function Stepper({ productData, onAmountChange, counter }) {
  const [amount, setAmount] = useState(productData.amount);
  const { id } = productData;
  useEffect(() => {
    onAmountChange(id, amount);
  }, [amount]);
  return (
    <div className="counter">
      <button
        id="decrement"
        onClick={() => {
          if (amount > counter) {
            setAmount(amount - 1);
          }
        }}
      >
        -
      </button>
      <input
        type="number"
        min={0}
        max={100}
        step={5}
        value={amount}
        onChange={(e) => {
          setAmount(parseInt(e.target.value));
        }}
        id="my-input"
      />
      <button
        id="increment"
        onClick={() => {
          setAmount(amount + 1);
        }}
      >
        +
      </button>
    </div>
  );
}

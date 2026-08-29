"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import type { OnApproveData, OnApproveActions } from "@paypal/paypal-js";

interface DonateButtonProps {
  currency: string;
  amount: string;
}

const DonateButton = ({ currency, amount }: DonateButtonProps) => {
  const [successMsg, setSuccessMsg] = useState("");
  const amountRef = useRef(amount);

  useEffect(() => {
    amountRef.current = amount;
  }, [amount]);
  async function handleApprove(
    data: OnApproveData,
    actions: OnApproveActions,
  ) {
    const capture = await actions.order!.capture();
    const givenName = capture.payer?.name?.given_name;
    if (givenName) {
      setSuccessMsg(`Thanks ${givenName}! Your donation has been made`);
    }
  }

  return (
    <>
      {successMsg ? (
        <span>{successMsg}</span>
      ) : (
        <PayPalButtons
          style={{
            layout: "horizontal",
            color: "blue",
            shape: "pill",
            label: "pay",
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: currency, // Specify the currency
                    value: amountRef.current, // Specify the amount
                  },
                },
              ],
            });
          }}
          onApprove={handleApprove}
          onError={(err: Record<string, unknown>) => {
            console.error("PayPal Checkout Error", err);
          }}
        />
      )}
    </>
  );
};

function DonateForm() {
  const initialAmount = "1.00";
  const [amount, setAmount] = useState(initialAmount);
  return (
    <form className="flex flex-col gap-4 mt-4">
      <AmountPicker
        initialAmount={initialAmount}
        onAmountChange={(e) => {
          setAmount((e.target as unknown as HTMLInputElement).value);
        }}
      />
      <DonateButton currency="EUR" amount={amount} />
    </form>
  );
}

interface AmountPickerProps {
  onAmountChange: (e: ChangeEvent<HTMLFieldSetElement>) => void;
  initialAmount: string;
}

function AmountPicker({ onAmountChange, initialAmount }: AmountPickerProps) {
  return (
    <fieldset onChange={onAmountChange}>
      <legend>Donation Amount</legend>
      <label>
        <input
          type="radio"
          value={initialAmount}
          defaultChecked
          name="amount"
        />
        1.00
      </label>
      <label>
        <input type="radio" value="4.00" name="amount" id="radio-6" />
        4.00
      </label>
      <label>
        <input type="radio" value="8.00" name="amount" id="radio-9" />
        8.00
      </label>
    </fieldset>
  );
}

export function Donate() {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PP_CLIENT_ID ?? "",
        components: "buttons",
        currency: "EUR",
      }}
    >
      {/*Infos and img */}
      <DonateForm />
    </PayPalScriptProvider>
  );
}

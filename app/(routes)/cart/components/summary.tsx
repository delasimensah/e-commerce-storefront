"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";

import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  // customer details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");

  // useEffect(() => {
  //   if (searchParams.get("success")) {
  //     toast.success("Payment completed.");
  //     removeAll();
  //   }

  //   if (searchParams.get("canceled")) {
  //     toast.error("Something went wrong.");
  //   }
  // }, [searchParams, removeAll]);

  // useEffect(() => {
  //   if (status === "success") {
  //     toast.success("Payment completed.");
  //     removeAll();
  //   }

  //   if (status === "error") {
  //     toast.success("Something went wrong.");
  //   }
  // }, [removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
        totalPrice: totalPrice * 100,
        customerName: name,
        customerEmail: email,
        customerPhoneNumber: phoneNumber,
        customerAddress: address,
      },
    );

    window.location = response.data.url;

    // setStatus(response.data.status);
  };

  const inputStyles = "w-full p-2 placeholder:text-sm focus:outline-none";

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>

      <div className="mt-10 space-y-5">
        <input
          type="text"
          value={name}
          placeholder="Your Name"
          onChange={(e) => setName(e.target.value)}
          className={inputStyles}
        />

        <input
          type="email"
          value={email}
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
          className={inputStyles}
        />

        <input
          type="text"
          value={phoneNumber}
          placeholder="Your Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={inputStyles}
        />

        <input
          type="text"
          value={address}
          placeholder="Your Address"
          onChange={(e) => setAddress(e.target.value)}
          className={inputStyles}
        />
      </div>

      <Button
        onClick={onCheckout}
        disabled={
          items.length === 0 ||
          name === "" ||
          email === "" ||
          phoneNumber === "" ||
          address === ""
        }
        className="mt-6 w-full"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;

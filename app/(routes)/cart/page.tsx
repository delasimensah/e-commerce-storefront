"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/button";
import Container from "@/components/ui/container";

import Summary from "./components/summary";
import CartItem from "./components/cart-item";

import useCart from "@/hooks/use-cart";

export const revalidate = 0;

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <div className="mt-12 gap-x-12 lg:grid lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && (
                <div>
                  <p className="text-neutral-500">No items added to cart.</p>

                  <Button onClick={() => router.push("/")} className="mt-6">
                    Continue Shopping
                  </Button>
                </div>
              )}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;

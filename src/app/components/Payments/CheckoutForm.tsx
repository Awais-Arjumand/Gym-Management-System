"use client";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CheckoutFormProps {
  membershipType: string;
  isTestMode?: boolean;
}

export default function CheckoutForm({
  membershipType,
  isTestMode = false,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [email, setEmail] = useState(isTestMode ? "test@example.com" : "");
  const [name, setName] = useState(isTestMode ? "Test User" : "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements) {
      setError("Payment system not ready");
      return;
    }

    setLoading(true);

    try {
      const { error: stripeError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success?type=${membershipType}&test_mode=${isTestMode}`,
          receipt_email: email,
          payment_method_data: {
            billing_details: {
              name: name,
              email: email,
            },
          },
        },
      });

      if (stripeError) {
        throw stripeError;
      }
    } catch (err) {
      // Use Stripe.StripeError or Error for better type safety
      const error = err as { message?: string };
      console.error("Payment error:", error);
      setError(error.message || "Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <PaymentElement
        options={{
          layout: "tabs",
          fields: {
            billingDetails: {
              name: "never",
              email: "never",
            },
          },
        }}
        className="border-2 border-gray-700 rounded-lg p-4"
      />

      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded border border-red-200">
          {error}
        </div>
      )}

      {isTestMode && (
        <div className="p-3 bg-yellow-50 text-yellow-700 rounded border border-yellow-200 text-sm">
          <p className="font-medium">Test Mode Active</p>
          <p>
            Use test card:{" "}
            <span className="font-mono">4242 4242 4242 4242</span>
          </p>
          <p>Any future date, any 3-digit CVC</p>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          disabled={loading}
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-32"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            `Pay $${
              isTestMode
                ? "10.00"
                : membershipType === "premium"
                ? "29.99"
                : "19.99"
            }`
          )}
        </button>
      </div>
    </form>
  );
}

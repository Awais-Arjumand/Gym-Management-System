"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TestModeBanner from "../components/TestModeBanner";
import CheckoutForm from "../components/Payments/CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function PaymentContent() {
  const [clientSecret, setClientSecret] = useState("");
  const [membershipType, setMembershipType] = useState("standard");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTestMode, setIsTestMode] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const type = searchParams.get("type") || "standard";
    setMembershipType(type);
    setLoading(true);
    setError(null);

    fetch("/api/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ membershipType: type }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Payment initialization failed");
        }
        return res.json();
      })
      .then((data) => {
        if (!data.clientSecret)
          throw new Error("Invalid client secret received");
        setIsTestMode(data.isTestMode || false);
        setClientSecret(data.clientSecret);
      })
      .catch((err) => {
        console.error("Payment Error:", err);
        setError(err.message || "Failed to initialize payment");
      })
      .finally(() => setLoading(false));
  }, [searchParams]);

  return (
    <div className="w-full min-h-screen text-white bg-primary py-4 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mt-16 sm:mt-20 flex flex-col gap-y-6 sm:gap-y-8 md:gap-y-12 lg:gap-y-16">
      {isTestMode && <TestModeBanner />}

      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Complete Your {membershipType === "premium" ? "Premium" : "Standard"}{" "}
          Membership
        </h1>

        {error && (
          <div className="bg-red-900/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
            <h2 className="font-bold mb-2">Payment Error</h2>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-red-700 rounded hover:bg-red-600 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <p>Setting up your secure payment...</p>
          </div>
        ) : clientSecret ? (
          <>
            <div className="mb-6 p-4 bg-white/50 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Membership Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Plan:</p>
                  <p>{membershipType === "premium" ? "Premium" : "Standard"}</p>
                </div>
                <div>
                  <p className="font-medium">Price:</p>
                  <p>
                    {isTestMode
                      ? "$10.00 (test)"
                      : membershipType === "premium"
                      ? "$29.99"
                      : "$19.99"}
                    /month
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-secondary p-4 md:p-6 rounded-lg">
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "night",
                    variables: {
                      colorPrimary: "#3b82f6",
                      colorBackground: "#1e293b",
                      colorText: "#f8fafc",
                    },
                  },
                }}
              >
                <CheckoutForm
                  membershipType={membershipType}
                  isTestMode={isTestMode}
                />
              </Elements>
            </div>
          </>
        ) : null}

        {isTestMode && (
          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">🧪 Test Mode</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-700 rounded">
                <h3 className="font-medium mb-1">💳 Test Card</h3>
                <p className="font-mono">4242 4242 4242 4242</p>
                <p className="text-xs mt-1">Any future date, any 3-digit CVC</p>
              </div>
              <div className="p-3 bg-gray-700 rounded">
                <h3 className="font-medium mb-1">⚠️ Test Decline Card</h3>
                <p className="font-mono">4000 0000 0000 0002</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen text-white bg-primary py-4 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mt-16 sm:mt-20 flex flex-col gap-y-6 sm:gap-y-8 md:gap-y-12 lg:gap-y-16">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <p>Loading payment page...</p>
          </div>
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}

"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get("payment_intent");
  const initialMembershipType = searchParams.get("type");
  const isTestMode = searchParams.get("test_mode") === "true";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setVerified] = useState(false);
  const [membershipType, setMembershipType] = useState(
    initialMembershipType || "standard"
  );

  useEffect(() => {
    if (!paymentIntentId) {
      setError("No payment information found");
      setLoading(false);
      return;
    }

    if (isTestMode) {
      console.log("Test payment - skipping verification");
      setVerified(true);
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentIntentId }),
        });

        const data = await response.json();

        if (!response.ok || !data.verified) {
          throw new Error(data.error || "Payment verification failed");
        }

        if (data.membershipType) {
          setMembershipType(data.membershipType);
        }

        setVerified(true);
      } catch (err: unknown) {
        console.error("Verification error:", err);
        if (
          err &&
          typeof err === "object" &&
          "message" in err &&
          typeof (err as { message?: unknown }).message === "string"
        ) {
          setError((err as { message: string }).message);
        } else {
          setError("Could not verify your payment");
        }
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [paymentIntentId, isTestMode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold">Verifying your payment...</h2>
          <p className="text-white/80 mt-2">
            Please wait while we confirm your transaction
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-secondary p-8 rounded-lg shadow-lg border border-red-500/30">
          <div className="flex justify-center text-red-400 mb-4">
            <ExclamationTriangleIcon className="h-12 w-12" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-4">
            Payment Verification Failed
          </h1>
          <p className="text-white/90 text-center mb-6">{error}</p>

          <div className="space-y-3">
            <Link
              href="/contact"
              className="block w-full px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 text-center transition"
            >
              Contact Support
            </Link>
            <Link
              href="/"
              className="block w-full px-4 py-2 bg-white text-black rounded hover:bg-white/90 text-center transition"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-secondary p-8 rounded-lg shadow-lg border border-green-500/30">
        <div className="flex justify-center text-green-400 mb-4">
          <CheckCircleIcon className="h-12 w-12" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">
          Payment Successful!
        </h1>
        <p className="text-white/90 text-center mb-6">
          Thank you for your {membershipType} membership purchase
        </p>

        <div className="space-y-3">
          <Link
            href="/createmealplan"
            className="block w-full px-4 py-2 bg-white text-black rounded hover:bg-white/90 text-center transition"
          >
            Create Meal Plan
          </Link>
          <Link
            href="/meals"
            className="block w-full px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 text-center transition"
          >
            View Sample Plans
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-primary text-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold">Loading...</h2>
          </div>
        </div>
      }
    >
      <SuccessPageContent />
    </Suspense>
  );
}

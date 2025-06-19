"use client";

export default function TestModeBanner() {
  return (
    <div className="fixed bottom-4 left-4 bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center">
      <span className="mr-2">🛠️</span>
      <div>
        <p className="font-medium">Test Mode Active</p>
        <p className="text-xs">Using Stripe test environment - No real charges</p>
      </div>
    </div>
  );
}
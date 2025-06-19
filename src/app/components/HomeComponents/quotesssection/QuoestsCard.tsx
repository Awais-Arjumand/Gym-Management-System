// QuoteCard.tsx
import React from 'react';

interface QuoteCardProps {
  quote: { q: string; a: string };
  colorClass: string;
  refreshQuote: () => void;
}

const QuoteCard = ({ quote, colorClass, refreshQuote }: QuoteCardProps) => {
  return (
    <div
      className={`w-full h-64 p-6 rounded-lg ${colorClass} transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer flex flex-col justify-between`}
      onClick={refreshQuote}
    >
      <blockquote className="text-lg italic font-medium mb-4 !text-black">
        &apos;{quote.q}&apos;
      </blockquote>
      <p className="text-right font-semibold opacity-90 !text-black">— {quote.a || 'Unknown'}</p>
    </div>
  );
};

export default QuoteCard;

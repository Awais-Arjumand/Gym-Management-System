import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15'
});

export async function POST(request: Request) {
  try {
    const { paymentIntentId } = await request.json();

    if (!paymentIntentId) {
      return NextResponse.json(
        { verified: false, error: 'Missing payment intent ID' },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { 
          verified: false,
          error: `Payment not completed. Status: ${paymentIntent.status}`
        },
        { status: 400 }
      );
    }


    return NextResponse.json({
      verified: true,
      membershipType: paymentIntent.metadata.membership_type || 'standard',
      amount: paymentIntent.amount,
      currency: paymentIntent.currency
    });

  } catch (err: unknown) {
    console.error('Payment verification failed:', err);
    return NextResponse.json(
      { 
        verified: false,
        error: (err instanceof Error ? err.message : 'Payment verification failed')
      },
      { status: 500 }
    );
  }
}
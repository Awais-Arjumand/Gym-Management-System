import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15'
});

export async function POST(request: Request) {
  try {
    const { membershipType } = await request.json();
    const isTestMode = process.env.NEXT_PUBLIC_TEST_MODE === 'true';

    const amount = isTestMode ? 1000 : membershipType === 'premium' ? 2999 : 1999;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        membership_type: membershipType,
        ...(isTestMode && { test_mode: 'true' })
      },
      description: `${membershipType} membership subscription`,
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      isTestMode,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency
    });

  } catch (err: unknown) {
    console.error('Stripe Error:', err);
    return NextResponse.json(
      { 
      error: 'Payment processing error',
      message: err && typeof err === 'object' && 'message' in err ? (err as { message: string }).message : 'Unknown error',
      type: err && typeof err === 'object' && 'type' in err ? (err as { type: string }).type : 'unknown_error'
      },
      { status: err && typeof err === 'object' && 'statusCode' in err ? (err as { statusCode: number }).statusCode : 500 }
    );
  }
}
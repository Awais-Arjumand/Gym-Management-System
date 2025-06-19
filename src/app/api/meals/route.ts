import { NextResponse } from 'next/server';

const API_URL = process.env.JSON_SERVER_URL || 'http://localhost:3001';

export async function POST(request: Request) {
  try {
    const { userId, planData, formData } = await request.json();

    // Save to JSON server
    const response = await fetch(`${API_URL}/meal_plans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        planData,
        formData,
        createdAt: new Date().toISOString()
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to save meal plan');
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Save Meal Plan Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save meal plan" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    // Fetch user's meal plans from JSON server
    const response = await fetch(`${API_URL}/meal_plans?userId=${userId}&_sort=createdAt&_order=desc`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch meal plans');
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Fetch Meal Plans Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch meal plans" },
      { status: 500 }
    );
  }
}
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { mealPlans } = data;

    // Save to your JSON server
    const response = await fetch("http://localhost:3001/meal-plans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        mealPlans,
        createdAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save meal plans");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving meal plans:", error);
    return NextResponse.json(
      { error: "Failed to save meal plans" },
      { status: 500 }
    );
  }
}

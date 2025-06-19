import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { weight, goal, gender, mealPlanType, workoutDecision, age } = await request.json();
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest" 
    });
    
    const prompt = `
      Generate a detailed personalized meal plan based on:
      - Weight: ${weight} kg
      - Goal: ${goal}
      - Gender: ${gender}
      - Meal Plan Type: ${mealPlanType}
      - Workout Routine: ${workoutDecision}
      - Age: ${age} years

      Provide 2 options (not 3 to reduce complexity) with:
      1. Daily meals (breakfast, lunch, dinner, 2 snacks)
      2. Simple nutritional info (just calories)
      3. Basic prep instructions
      4. Weekly schedule
      5. Shopping list

      Use this format:
      ## Option 1
      ### Monday
      - Breakfast: [meal] ([calories] calories)
      - Lunch: [meal] ([calories] calories)
      - Dinner: [meal] ([calories] calories)
      - Snacks: [snack1], [snack2]
      
      Keep responses concise to stay within free tier limits.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ 
      success: true,
      mealPlans: text 
    });
  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Free tier limit reached. Please try again later or simplify your request." 
      },
      { status: 500 }
    );
  }
}
async function testApi() {
  const response = await fetch('http://localhost:3000/api/generate-meal-plan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      weight: "70",
      goal: "Weight loss",
      gender: "Male",
      mealPlanType: "Balanced",
      workoutDecision: "3-4 times per week",
      age: "30"
    }),
  });
  console.log(await response.json());
}
testApi();
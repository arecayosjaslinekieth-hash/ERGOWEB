// YOUR JAVA LOGIC CONVERTED TO JS - SAME SCORES!
const questions = [
  { scores: [0, 25, 0] }, // Monitor height
  { scores: [0, 25, 10] }, // Distance
  { scores: [0, 20, 5] },  // Feet
  { scores: [5, 20, 0] },  // Elbows
  { scores: [0, 20, 5] },  // Shoulders
  { scores: [0, 15, 0] },  // Wrists
  { scores: [5, 15, 10] }, // Lighting
  { scores: [0, 10, 20] }  // Breaks
];

export default async function (req, res) {
  const { answers } = await req.json();
  
  let score = 0;
  for (let i = 0; i < Math.min(answers.length, questions.length); i++) {
    score += questions[i].scores[answers[i]] || 0;
  }
  
  const category = score >= 140 ? "🎉 Excellent!" : 
                  score >= 100 ? "✅ Good" : 
                  score >= 70 ? "⚠️ Fair" : "🔴 Needs Work";
  
  const description = score >= 140 ? "Your workstation is perfect! 👏" :
                     score >= 100 ? "Great job! Minor tweaks only." :
                     score >= 70 ? "Good start! Fix a few things." :
                     "Time for some changes! 😊";
  
  const tips = generateTips(answers, score);
  
  return new Response(JSON.stringify({
    score,
    category,
    description,
    tips
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

function generateTips(answers, score) {
  const tips = [];
  
  if (answers[0] !== 1) tips.push({ priority: "HIGH", text: "Raise monitor top to eye level" });
  if (answers[1] !== 1) tips.push({ priority: "MEDIUM", text: "Keep monitor 20-30 inches away" });
  if (answers[2] !== 1) tips.push({ priority: "HIGH", text: "Get footrest - feet must be flat" });
  if (answers[3] !== 1) tips.push({ priority: "MEDIUM", text: "Adjust chair for 90° elbows" });
  if (answers[4] !== 1) tips.push({ priority: "HIGH", text: "Relax shoulders down" });
  if (answers[5] !== 1) tips.push({ priority: "HIGH", text: "Keep wrists straight when typing" });
  if (answers[6] !== 1) tips.push({ priority: "MEDIUM", text: "Fix lighting to reduce glare" });
  if (answers[7] !== 2) tips.push({ priority: "MEDIUM", text: "Take breaks every hour!" });
  
  return tips.slice(0, 5); // Top 5 tips
}

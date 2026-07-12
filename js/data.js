/* ============================================
   IRON LOG — static content
   4-week progressive overload plan + diet plan
   ============================================ */

const WORKOUT_PLAN = {
  1: {
    label: "Week 1",
    rpe: "RPE 7",
    note: "Foundation week — focus on form and finding your working weight. Start light, leave the ego at the door.",
    days: {
      push: [
        ["Barbell Bench Press", "3 x 10-12", "7", "90s"],
        ["Seated Dumbbell Shoulder Press", "3 x 10-12", "7", "90s"],
        ["Incline Dumbbell Press", "3 x 10-12", "7", "75s"],
        ["Lateral Raise", "3 x 12-15", "7", "60s"],
        ["Triceps Pushdown", "3 x 12-15", "7", "60s"],
        ["Dips (assisted if needed)", "2 x 10-12", "7", "60s"],
      ],
      pull: [
        ["Lat Pulldown / Assisted Pull-up", "3 x 10-12", "7", "90s"],
        ["Barbell Row", "3 x 10-12", "7", "90s"],
        ["Seated Cable Row", "3 x 10-12", "7", "75s"],
        ["Face Pull", "3 x 12-15", "7", "60s"],
        ["Barbell/Dumbbell Curl", "3 x 12-15", "7", "60s"],
        ["Hammer Curl", "2 x 12-15", "7", "60s"],
      ],
      legs: [
        ["Barbell Squat", "3 x 10-12", "7", "2 min"],
        ["Romanian Deadlift", "3 x 10-12", "7", "90s"],
        ["Leg Press", "3 x 10-12", "7", "90s"],
        ["Leg Curl", "3 x 12-15", "7", "60s"],
        ["Leg Extension", "3 x 12-15", "7", "60s"],
        ["Standing Calf Raise", "4 x 15", "7", "45s"],
      ]
    }
  },
  2: {
    label: "Week 2",
    rpe: "RPE 7-8",
    note: "If last week's final reps felt easy, bump the weight 2.5-5%.",
    days: {
      push: [
        ["Barbell Bench Press", "4 x 8-10", "7-8", "90s"],
        ["Seated Dumbbell Shoulder Press", "4 x 8-10", "7-8", "90s"],
        ["Incline Dumbbell Press", "3 x 10-12", "8", "75s"],
        ["Lateral Raise", "3 x 10-12", "8", "60s"],
        ["Triceps Pushdown", "3 x 10-12", "8", "60s"],
        ["Dips (assisted if needed)", "3 x 10-12", "8", "60s"],
      ],
      pull: [
        ["Lat Pulldown / Assisted Pull-up", "4 x 8-10", "7-8", "90s"],
        ["Barbell Row", "4 x 8-10", "7-8", "90s"],
        ["Seated Cable Row", "3 x 10-12", "8", "75s"],
        ["Face Pull", "3 x 10-12", "8", "60s"],
        ["Barbell/Dumbbell Curl", "3 x 10-12", "8", "60s"],
        ["Hammer Curl", "3 x 10-12", "8", "60s"],
      ],
      legs: [
        ["Barbell Squat", "4 x 8-10", "7-8", "2 min"],
        ["Romanian Deadlift", "4 x 8-10", "7-8", "90s"],
        ["Leg Press", "3 x 10-12", "8", "90s"],
        ["Leg Curl", "3 x 10-12", "8", "60s"],
        ["Leg Extension", "3 x 10-12", "8", "60s"],
        ["Standing Calf Raise", "4 x 15-20", "8", "45s"],
      ]
    }
  },
  3: {
    label: "Week 3",
    rpe: "RPE 8",
    note: "Peak volume week — the heaviest of this block. Every set should leave 1-2 reps in the tank, no more.",
    days: {
      push: [
        ["Barbell Bench Press", "4 x 6-8", "8", "2 min"],
        ["Seated Dumbbell Shoulder Press", "4 x 6-8", "8", "90s"],
        ["Incline Dumbbell Press", "4 x 10-12", "8", "75s"],
        ["Lateral Raise", "4 x 10-12", "8", "60s"],
        ["Triceps Pushdown", "4 x 10-12", "8", "60s"],
        ["Dips (assisted if needed)", "3 x 10-12", "8", "60s"],
      ],
      pull: [
        ["Lat Pulldown / Assisted Pull-up", "4 x 6-8", "8", "2 min"],
        ["Barbell Row", "4 x 6-8", "8", "90s"],
        ["Seated Cable Row", "4 x 10-12", "8", "75s"],
        ["Face Pull", "4 x 10-12", "8", "60s"],
        ["Barbell/Dumbbell Curl", "4 x 10-12", "8", "60s"],
        ["Hammer Curl", "3 x 10-12", "8", "60s"],
      ],
      legs: [
        ["Barbell Squat", "4 x 6-8", "8", "2-3 min"],
        ["Romanian Deadlift", "4 x 6-8", "8", "2 min"],
        ["Leg Press", "4 x 10-12", "8", "90s"],
        ["Leg Curl", "4 x 10-12", "8", "60s"],
        ["Leg Extension", "4 x 10-12", "8", "60s"],
        ["Standing Calf Raise", "4 x 15-20", "8", "45s"],
      ]
    }
  },
  4: {
    label: "Week 4",
    rpe: "RPE 5-6 (Deload)",
    note: "This week should feel easy. No grinding, no failure — just blood flow and form practice, at ~60% of week 3's top weight.",
    days: {
      push: [
        ["Barbell Bench Press", "2 x 10", "5-6", "90s"],
        ["Seated Dumbbell Shoulder Press", "2 x 10", "5-6", "90s"],
        ["Incline Dumbbell Press", "2 x 12", "5-6", "60s"],
        ["Lateral Raise", "2 x 12", "5-6", "45s"],
        ["Triceps Pushdown", "2 x 12", "5-6", "45s"],
      ],
      pull: [
        ["Lat Pulldown / Assisted Pull-up", "2 x 10", "5-6", "90s"],
        ["Barbell Row", "2 x 10", "5-6", "90s"],
        ["Seated Cable Row", "2 x 12", "5-6", "60s"],
        ["Face Pull", "2 x 12", "5-6", "45s"],
        ["Barbell/Dumbbell Curl", "2 x 12", "5-6", "45s"],
      ],
      legs: [
        ["Barbell Squat", "2 x 10", "5-6", "2 min"],
        ["Romanian Deadlift", "2 x 10", "5-6", "90s"],
        ["Leg Press", "2 x 12", "5-6", "60s"],
        ["Leg Curl", "2 x 12", "5-6", "45s"],
        ["Standing Calf Raise", "2 x 15", "5-6", "45s"],
      ]
    }
  }
};

const DIET_PLAN = {
  meals: [
    ["Morning (Pre-workout)", "150g white rice + 100g dahi"],
    ["Post-workout", "50g oats + 2 banana + 2 tbsp peanut butter + 250ml milk"],
    ["Lunch", "3 chapati + sabji"],
    ["Mid-day", "3 eggs"],
    ["Evening", "4 brown bread + 3 tbsp peanut butter + 100g paneer"],
    ["Dinner", "2 chapati + 100g white rice + dal"],
  ],
  macros: [
    ["Pre-workout (rice + dahi)", "~255", "8g", "48g", "3g"],
    ["Post-workout (oats+banana+PB+milk)", "~845", "25g", "106g", "28g"],
    ["Lunch (3 chapati + sabji)", "~450", "12g", "66g", "12g"],
    ["3 Eggs", "~215", "18g", "1g", "15g"],
    ["Evening (bread+PB+paneer)", "~830", "40g", "63g", "48g"],
    ["Dinner (chapati+rice+dal)", "~480", "18g", "84g", "7g"],
    ["TOTAL (approx)", "~3000 kcal", "~120g", "~368g", "~113g"],
  ],
  working: [
    "Calories (~3000) sit well above maintenance (~2200-2400 for 52.6kg) — a solid surplus for muscle gain.",
    "Protein (~120g, ~2.3g/kg bodyweight) lands right in the target range of 1.6-2.2g/kg.",
    "Pre- and post-workout nutrition are both covered, with the post-workout combo supporting energy and recovery."
  ],
  improve: [
    "Fat is a bit high (~113g, ~34% of calories) mostly from peanut butter (5 tbsp/day) — trim to 3-4 tbsp total.",
    "Fiber and micronutrients are light — only one sabji serving and one fruit. Add a second vegetable serving and one more fruit (apple, papaya).",
    "Hydration isn't specified — target 3-4L water/day, especially on a high-protein diet."
  ]
};

const PROFILE = {
  age: 24,
  weightKg: 52.6,
  heightCm: 180,
  level: "Beginner",
  goal: "Muscle Gain",
  daysPerWeek: 6,
  injuries: "None"
};

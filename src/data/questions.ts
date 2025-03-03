import { Question } from '../types';

export const mathProblems: Question[] = [
  {
    question: "Solve: 2x + 5 = 13",
    options: ["x = 3", "x = 4", "x = 5", "x = 6"],
    correctIndex: 1,
    explanation: "To solve, subtract 5 from both sides: 2x = 8, then divide by 2: x = 4",
    topic: "algebra",
    grade: 7
  },
  {
    question: "What is 25% of 80?",
    options: ["15", "20", "25", "30"],
    correctIndex: 1,
    explanation: "To find 25% of 80, multiply 80 by 0.25 or divide by 4: 80 × 0.25 = 20"
  },
  {
    question: "If a rectangle has a length of 12 cm and a width of 5 cm, what is its area?",
    options: ["17 square cm", "34 square cm", "60 square cm", "85 square cm"],
    correctIndex: 2,
    explanation: "Area = length × width = 12 × 5 = 60 square centimeters"
  },
  {
    question: "What is the greatest common factor (GCF) of 24 and 36?",
    options: ["6", "12", "18", "24"],
    correctIndex: 1,
    explanation: "Factors of 24: 1,2,3,4,6,8,12,24. Factors of 36: 1,2,3,4,6,9,12,18,36. The greatest common factor is 12."
  },
  {
    question: "If 3/4 of a number is 18, what is the number?",
    options: ["13.5", "22", "24", "27"],
    correctIndex: 2,
    explanation: "If 3/4 × n = 18, then n = 18 ÷ (3/4) = 18 × (4/3) = 24"
  },
  {
    question: "Which expression represents 'twice a number increased by 5'?",
    options: ["2 + 5x", "2x + 5", "5x + 2", "x + 25"],
    correctIndex: 1,
    explanation: "Twice a number is 2x, increased by 5 means add 5: 2x + 5"
  },
  {
    question: "Convert 0.625 to a fraction in simplest form.",
    options: ["5/8", "6/10", "62/100", "625/1000"],
    correctIndex: 0,
    explanation: "0.625 = 625/1000, which simplifies to 5/8"
  },
  {
    question: "What is the ratio of 3 hours to 1 day in simplest form?",
    options: ["1:8", "1:6", "1:12", "1:24"],
    correctIndex: 0,
    explanation: "There are 24 hours in a day. 3:24 simplifies to 1:8"
  },
  {
    question: "What is the value of 3² × 4?",
    options: ["24", "36", "48", "60"],
    correctIndex: 1,
    explanation: "3² = 3 × 3 = 9, then 9 × 4 = 36",
    topic: "operations",
    grade: 6
  },
  {
    question: "Which of the following is equivalent to 0.75?",
    options: ["3/4", "7/5", "7/10", "3/5"],
    correctIndex: 0,
    explanation: "0.75 = 75/100, which simplifies to 3/4",
    topic: "fractions",
    grade: 6
  },
  {
    question: "What is the least common multiple (LCM) of 6 and 8?",
    options: ["12", "24", "36", "48"],
    correctIndex: 1,
    explanation: "Multiples of 6: 6, 12, 18, 24, 30, 36, ... Multiples of 8: 8, 16, 24, 32, ... The least common multiple is 24.",
    topic: "number theory",
    grade: 6
  },
  {
    question: "Simplify: 2/3 × 9/10",
    options: ["3/5", "6/10", "3/5", "6/30"],
    correctIndex: 0,
    explanation: "2/3 × 9/10 = (2×9)/(3×10) = 18/30 = 3/5",
    topic: "fractions",
    grade: 6
  },
  {
    question: "If a recipe calls for 2/3 cup of flour to make 12 cookies, how much flour is needed to make 18 cookies?",
    options: ["1 cup", "3/4 cup", "1 1/2 cups", "2 cups"],
    correctIndex: 0,
    explanation: "For 18 cookies, you need 18/12 = 1.5 times the original recipe. So 2/3 × 1.5 = 2/3 × 3/2 = 1 cup",
    topic: "ratios",
    grade: 6
  },
  {
    question: "What is the perimeter of a square with a side length of 7.5 cm?",
    options: ["15 cm", "22.5 cm", "30 cm", "56.25 cm"],
    correctIndex: 2,
    explanation: "The perimeter of a square is 4 × side length. So 4 × 7.5 = 30 cm",
    topic: "geometry",
    grade: 6
  },
  {
    question: "Which of the following is a prime number?",
    options: ["51", "57", "59", "91"],
    correctIndex: 2,
    explanation: "59 is a prime number because it is only divisible by 1 and itself. 51 = 3 × 17, 57 = 3 × 19, and 91 = 7 × 13.",
    topic: "number theory",
    grade: 6
  },
  {
    question: "What is the value of 5 - (-3)?",
    options: ["2", "8", "-2", "-8"],
    correctIndex: 1,
    explanation: "5 - (-3) = 5 + 3 = 8. Subtracting a negative number is the same as adding its positive value.",
    topic: "integers",
    grade: 6
  },
  {
    question: "If the ratio of red marbles to blue marbles is 3:5, and there are 40 blue marbles, how many red marbles are there?",
    options: ["15", "24", "30", "40"],
    correctIndex: 1,
    explanation: "If the ratio is 3:5 and there are 40 blue marbles, then 5 parts = 40, so 1 part = 40 ÷ 5 = 8. Therefore, 3 parts = 3 × 8 = 24 red marbles.",
    topic: "ratios",
    grade: 6
  },
  {
    question: "What is the mean (average) of 12, 15, 18, 21, and 24?",
    options: ["15", "18", "20", "21"],
    correctIndex: 1,
    explanation: "Mean = (12 + 15 + 18 + 21 + 24) ÷ 5 = 90 ÷ 5 = 18",
    topic: "statistics",
    grade: 6
  },
  {
    question: "Which decimal is equivalent to 5/8?",
    options: ["0.58", "0.625", "0.825", "0.85"],
    correctIndex: 1,
    explanation: "5/8 = 5 ÷ 8 = 0.625",
    topic: "fractions",
    grade: 6
  },
  {
    question: "What is the value of 3.6 ÷ 0.9?",
    options: ["0.4", "4", "0.25", "40"],
    correctIndex: 1,
    explanation: "3.6 ÷ 0.9 = 36 ÷ 9 = 4. You can multiply both numbers by 10 to make the divisor a whole number.",
    topic: "decimals",
    grade: 6
  },
  {
    question: "Which of the following is the correct order from least to greatest? 0.6, 2/3, 0.75, 5/8",
    options: ["0.6, 5/8, 2/3, 0.75", "0.6, 2/3, 5/8, 0.75", "5/8, 0.6, 2/3, 0.75", "2/3, 5/8, 0.6, 0.75"],
    correctIndex: 0,
    explanation: "Converting to decimals: 0.6 = 0.6, 2/3 = 0.667..., 0.75 = 0.75, 5/8 = 0.625. So the order is 0.6, 5/8 (0.625), 2/3 (0.667...), 0.75",
    topic: "fractions",
    grade: 6
  },
  {
    question: "A rectangular prism has a length of 5 cm, width of 3 cm, and height of 4 cm. What is its volume?",
    options: ["12 cm³", "20 cm³", "60 cm³", "120 cm³"],
    correctIndex: 2,
    explanation: "Volume = length × width × height = 5 × 3 × 4 = 60 cm³",
    topic: "geometry",
    grade: 6
  },
  {
    question: "If x = 3, what is the value of 2x² - 5x + 4?",
    options: ["7", "10", "13", "16"],
    correctIndex: 1,
    explanation: "2x² - 5x + 4 = 2(3)² - 5(3) + 4 = 2(9) - 15 + 4 = 18 - 15 + 4 = 7",
    topic: "algebra",
    grade: 6
  },
  {
    question: "What is the median of the following numbers: 7, 12, 5, 9, 3?",
    options: ["3", "5", "7", "9"],
    correctIndex: 2,
    explanation: "First arrange the numbers in order: 3, 5, 7, 9, 12. The median is the middle value, which is 7.",
    topic: "statistics",
    grade: 6
  },
  {
    question: "Which of the following is NOT a perfect square?",
    options: ["16", "25", "36", "48"],
    correctIndex: 3,
    explanation: "16 = 4², 25 = 5², 36 = 6², but 48 is not a perfect square because there is no whole number that can be squared to get 48.",
    topic: "number theory",
    grade: 6
  },
  {
    question: "What is the value of 2³ × 2²?",
    options: ["25", "32", "64", "128"],
    correctIndex: 1,
    explanation: "When multiplying powers with the same base, add the exponents: 2³ × 2² = 2³⁺² = 2⁵ = 32",
    topic: "exponents",
    grade: 6
  },
  {
    question: "If a car travels at 55 miles per hour, how far will it travel in 3.5 hours?",
    options: ["155.5 miles", "172.5 miles", "192.5 miles", "210 miles"],
    correctIndex: 2,
    explanation: "Distance = speed × time = 55 × 3.5 = 192.5 miles",
    topic: "rates",
    grade: 6
  },
  {
    question: "What is the area of a triangle with a base of 8 cm and a height of 6 cm?",
    options: ["14 cm²", "24 cm²", "48 cm²", "96 cm²"],
    correctIndex: 1,
    explanation: "Area of a triangle = (1/2) × base × height = (1/2) × 8 × 6 = 24 cm²",
    topic: "geometry",
    grade: 6
  },
  {
    question: "What is the value of 4.25 + 3.75?",
    options: ["7", "8", "7.1", "8.1"],
    correctIndex: 1,
    explanation: "4.25 + 3.75 = 8",
    topic: "decimals",
    grade: 6
  },
  {
    question: "Which of the following fractions is equivalent to 40%?",
    options: ["4/10", "4/5", "2/5", "4/100"],
    correctIndex: 2,
    explanation: "40% = 40/100 = 4/10 = 2/5",
    topic: "fractions",
    grade: 6
  },
  {
    question: "If a box contains 5 red marbles, 3 blue marbles, and 2 green marbles, what is the probability of randomly selecting a blue marble?",
    options: ["1/10", "3/10", "1/5", "1/2"],
    correctIndex: 1,
    explanation: "Total marbles = 5 + 3 + 2 = 10. Probability of blue = 3/10.",
    topic: "probability",
    grade: 6
  },
  {
    question: "What is the value of 12 ÷ (2 + 2)?",
    options: ["2", "3", "4", "6"],
    correctIndex: 1,
    explanation: "Following order of operations: 12 ÷ (2 + 2) = 12 ÷ 4 = 3",
    topic: "operations",
    grade: 6
  },
  {
    question: "Which of the following is the correct way to write 'five and three tenths' as a decimal?",
    options: ["5.3", "5.03", "0.53", "53"],
    correctIndex: 0,
    explanation: "Five and three tenths means 5 + 3/10 = 5.3",
    topic: "decimals",
    grade: 6
  },
  {
    question: "A store is having a 20% off sale. If a shirt originally costs $25, what is the sale price?",
    options: ["$5", "$15", "$20", "$22"],
    correctIndex: 2,
    explanation: "20% of $25 = 0.2 × $25 = $5. Sale price = $25 - $5 = $20",
    topic: "percentages",
    grade: 6
  },
  {
    question: "What is the perimeter of a regular hexagon with sides of length 5 cm?",
    options: ["15 cm", "25 cm", "30 cm", "35 cm"],
    correctIndex: 2,
    explanation: "A regular hexagon has 6 equal sides. Perimeter = 6 × 5 cm = 30 cm",
    topic: "geometry",
    grade: 6
  },
  {
    question: "Which of the following numbers is divisible by both 3 and 4?",
    options: ["18", "24", "27", "32"],
    correctIndex: 1,
    explanation: "24 ÷ 3 = 8 and 24 ÷ 4 = 6, so 24 is divisible by both 3 and 4. 18 is only divisible by 3, 27 is only divisible by 3, and 32 is only divisible by 4.",
    topic: "number theory",
    grade: 6
  },
  {
    question: "If 8 pencils cost $2.00, how much do 12 pencils cost?",
    options: ["$2.50", "$3.00", "$3.50", "$4.00"],
    correctIndex: 1,
    explanation: "Cost per pencil = $2.00 ÷ 8 = $0.25. Cost of 12 pencils = 12 × $0.25 = $3.00",
    topic: "proportions",
    grade: 6
  },
  {
    question: "What is the mode of the following data set: 3, 7, 5, 7, 8, 7, 2, 9?",
    options: ["2", "3", "7", "9"],
    correctIndex: 2,
    explanation: "The mode is the value that appears most frequently. In this data set, 7 appears three times, more than any other number.",
    topic: "statistics",
    grade: 6
  },
  {
    question: "Which inequality represents 'x is less than or equal to 8'?",
    options: ["x < 8", "x > 8", "x ≤ 8", "x ≥ 8"],
    correctIndex: 2,
    explanation: "The phrase 'less than or equal to' is represented by the symbol ≤, so 'x is less than or equal to 8' is written as x ≤ 8.",
    topic: "algebra",
    grade: 6
  },
  {
    question: "What is the value of (-3) × (-4)?",
    options: ["-12", "-7", "7", "12"],
    correctIndex: 3,
    explanation: "When multiplying two negative numbers, the result is positive: (-3) × (-4) = 12",
    topic: "integers",
    grade: 6
  },
  {
    question: "Which of the following is NOT a factor of 36?",
    options: ["4", "6", "9", "14"],
    correctIndex: 3,
    explanation: "The factors of 36 are 1, 2, 3, 4, 6, 9, 12, 18, and 36. 14 is not a factor of 36 because 36 ÷ 14 is not a whole number.",
    topic: "number theory",
    grade: 6
  },
  {
    question: "If a triangle has angles measuring 30° and 45°, what is the measure of the third angle?",
    options: ["95°", "105°", "115°", "125°"],
    correctIndex: 1,
    explanation: "The sum of angles in a triangle is 180°. So the third angle = 180° - 30° - 45° = 105°",
    topic: "geometry",
    grade: 6
  },
  {
    question: "Which of the following is the correct way to write 3/4 as a percent?",
    options: ["34%", "43%", "75%", "0.75%"],
    correctIndex: 2,
    explanation: "To convert a fraction to a percent, multiply by 100: 3/4 = 0.75 = 75%",
    topic: "percentages",
    grade: 6
  },
  {
    question: "What is the value of 5 + 2 × (8 - 3)?",
    options: ["15", "25", "35", "45"],
    correctIndex: 0,
    explanation: "Following order of operations: 5 + 2 × (8 - 3) = 5 + 2 × 5 = 5 + 10 = 15",
    topic: "operations",
    grade: 6
  },
  {
    question: "A recipe requires 2/3 cup of sugar to make 24 cookies. How much sugar is needed to make 36 cookies?",
    options: ["1 cup", "3/4 cup", "1 1/2 cups", "2 cups"],
    correctIndex: 0,
    explanation: "For 36 cookies, you need 36/24 = 1.5 times the original recipe. So 2/3 × 1.5 = 2/3 × 3/2 = 1 cup of sugar.",
    topic: "proportions",
    grade: 6
  },
  {
    question: "What is the range of the following data set: 12, 15, 8, 20, 10, 17?",
    options: ["8", "12", "17", "20"],
    correctIndex: 1,
    explanation: "Range = maximum value - minimum value = 20 - 8 = 12",
    topic: "statistics",
    grade: 6
  },
  {
    question: "Which of the following is a composite number?",
    options: ["13", "17", "21", "23"],
    correctIndex: 2,
    explanation: "A composite number has factors other than 1 and itself. 21 = 3 × 7, so it is composite. 13, 17, and 23 are all prime numbers.",
    topic: "number theory",
    grade: 6
  },
  {
    question: "If a square has an area of 64 square inches, what is the length of each side?",
    options: ["4 inches", "8 inches", "16 inches", "32 inches"],
    correctIndex: 1,
    explanation: "For a square, area = side length². So side length = √area = √64 = 8 inches",
    topic: "geometry",
    grade: 6
  },
  {
    question: "What is the value of the expression 3(2x - 4) when x = 5?",
    options: ["18", "21", "33", "42"],
    correctIndex: 1,
    explanation: "Substitute x = 5 into the expression: 3(2×5 - 4) = 3(10 - 4) = 3(6) = 18",
    topic: "algebra",
    grade: 6
  },
  {
    question: "Which of the following represents the ratio 12:20 in simplest form?",
    options: ["3:5", "4:5", "6:10", "12:20"],
    correctIndex: 0,
    explanation: "To simplify 12:20, divide both numbers by their GCF, which is 4. 12 ÷ 4 = 3 and 20 ÷ 4 = 5, so the simplified ratio is 3:5.",
    topic: "ratios",
    grade: 6
  },
  {
    question: "If a recipe calls for 2/3 cup of flour to make 12 cookies, how much flour is needed to make 18 cookies?",
    options: ["1 cup", "1 1/2 cups", "2 cups", "3 cups"],
    correctIndex: 0,
    explanation: "Set up a proportion: 2/3 ÷ 12 = x ÷ 18. Cross multiply: 2/3 × 18 = 12 × x. Solve: 12 = 12x, so x = 1 cup.",
    topic: "proportions",
    grade: 6
  },
  {
    question: "What is the value of -8 + 3?",
    options: ["-11", "-5", "5", "11"],
    correctIndex: 1,
    explanation: "When adding a positive number to a negative number, move right on the number line. Starting at -8 and moving 3 units right gives -5.",
    topic: "integers",
    grade: 6
  },
  {
    question: "Which decimal is equivalent to 7/8?",
    options: ["0.75", "0.78", "0.825", "0.875"],
    correctIndex: 3,
    explanation: "To convert 7/8 to a decimal, divide 7 by 8: 7 ÷ 8 = 0.875",
    topic: "fractions",
    grade: 6
  },
  {
    question: "What is the value of the expression |−15| − |−7|?",
    options: ["8", "−8", "22", "−22"],
    correctIndex: 0,
    explanation: "The absolute value of −15 is 15, and the absolute value of −7 is 7. So |−15| − |−7| = 15 − 7 = 8.",
    topic: "integers",
    grade: 6
  },
  {
    question: "If 40% of a number is 26, what is the number?",
    options: ["10.4", "65", "104", "650"],
    correctIndex: 2,
    explanation: "Let x be the number. Then 40% of x = 26, or 0.4x = 26. Divide both sides by 0.4: x = 26 ÷ 0.4 = 65.",
    topic: "percentages",
    grade: 6
  },
  {
    question: "Which expression is equivalent to 4(3x + 2)?",
    options: ["12x + 2", "12x + 8", "7x + 2", "7x + 6"],
    correctIndex: 1,
    explanation: "Use the distributive property: 4(3x + 2) = 4 × 3x + 4 × 2 = 12x + 8",
    topic: "algebra",
    grade: 6
  },
  {
    question: "A rectangular prism has a length of 5 cm, width of 3 cm, and height of 4 cm. What is its volume?",
    options: ["12 cm³", "20 cm³", "47 cm³", "60 cm³"],
    correctIndex: 3,
    explanation: "The volume of a rectangular prism is V = l × w × h = 5 × 3 × 4 = 60 cm³",
    topic: "geometry",
    grade: 6
  },
  {
    question: "What is the solution to the equation 2/3x = 8?",
    options: ["5 1/3", "12", "16/3", "24"],
    correctIndex: 1,
    explanation: "To solve for x, multiply both sides by 3/2: x = 8 × 3/2 = 24/2 = 12",
    topic: "algebra",
    grade: 6
  },
  {
    question: "Which of the following is the correct order of operations for evaluating 3 + 4 × 2 - 5²?",
    options: ["Addition, multiplication, subtraction, exponents", "Exponents, addition, multiplication, subtraction", "Exponents, multiplication, addition, subtraction", "Multiplication, exponents, addition, subtraction"],
    correctIndex: 2,
    explanation: "The correct order of operations is PEMDAS: Parentheses, Exponents, Multiplication/Division, Addition/Subtraction. So we calculate 5² = 25, then 4 × 2 = 8, then 3 + 8 = 11, and finally 11 - 25 = -14.",
    topic: "order of operations",
    grade: 6
  },
  {
    question: "What is the value of 2³ × 2²?",
    options: ["25", "32", "64", "128"],
    correctIndex: 1,
    explanation: "When multiplying powers with the same base, add the exponents: 2³ × 2² = 2³⁺² = 2⁵ = 32",
    topic: "exponents",
    grade: 6
  },
  {
    question: "If the ratio of red marbles to blue marbles is 5:3, and there are 40 red marbles, how many blue marbles are there?",
    options: ["15", "24", "27", "67"],
    correctIndex: 1,
    explanation: "Set up a proportion: 5/3 = 40/x. Cross multiply: 5x = 3 × 40 = 120. Solve: x = 120 ÷ 5 = 24 blue marbles.",
    topic: "ratios",
    grade: 6
  },
  {
    question: "If a car travels 210 miles on 7 gallons of gas, how many miles can it travel on 12 gallons of gas?",
    options: ["252 miles", "315 miles", "360 miles", "420 miles"],
    correctIndex: 2,
    explanation: "Set up a proportion: 210/7 = x/12. Cross multiply: 210 × 12 = 7 × x. Solve: 2520 = 7x, so x = 360 miles.",
    topic: "proportions",
    grade: 6
  },
  {
    question: "What is the value of the expression -4 × 6 + 2 × (-3)?",
    options: ["-30", "-24", "-18", "-12"],
    correctIndex: 0,
    explanation: "Following order of operations: -4 × 6 = -24, and 2 × (-3) = -6. Then -24 + (-6) = -30.",
    topic: "integers",
    grade: 6
  },
  {
    question: "Which of the following is equivalent to 2.5 × 10³?",
    options: ["0.0025", "25", "250", "2,500"],
    correctIndex: 3,
    explanation: "2.5 × 10³ means 2.5 × 1000 = 2,500",
    topic: "scientific notation",
    grade: 6
  },
  {
    question: "A circle has a radius of 7 cm. What is its approximate area? (Use π ≈ 3.14)",
    options: ["21.98 cm²", "43.96 cm²", "138.46 cm²", "153.86 cm²"],
    correctIndex: 3,
    explanation: "The area of a circle is A = πr². So A = 3.14 × 7² = 3.14 × 49 ≈ 153.86 cm²",
    topic: "geometry",
    grade: 6
  },
  {
    question: "If 3/4 of the students in a class are girls, and there are 28 students in total, how many boys are in the class?",
    options: ["7", "9", "21", "24"],
    correctIndex: 0,
    explanation: "If 3/4 of the students are girls, then 1/4 are boys. 1/4 of 28 = 28 ÷ 4 = 7 boys.",
    topic: "fractions",
    grade: 6
  },
  {
    question: "Which inequality represents 'x is less than or equal to -3'?",
    options: ["x < -3", "x ≤ -3", "x > -3", "x ≥ -3"],
    correctIndex: 1,
    explanation: "'Less than or equal to' is represented by the symbol ≤, so 'x is less than or equal to -3' is written as x ≤ -3.",
    topic: "inequalities",
    grade: 6
  },
  {
    question: "What is the median of the data set: 12, 5, 7, 19, 8?",
    options: ["5", "7", "8", "12"],
    correctIndex: 2,
    explanation: "To find the median, arrange the numbers in order: 5, 7, 8, 12, 19. The middle value is 8.",
    topic: "statistics",
    grade: 6
  },
  {
    question: "Sarah has $24.75 and spends $16.82 on school supplies. How much money does she have left?",
    options: ["$7.93", "$7.83", "$8.03", "$8.13"],
    correctIndex: 0,
    explanation: "To find the remaining amount, subtract: $24.75 - $16.82 = $7.93",
    topic: "money",
    grade: 6
  },
  {
    question: "A map shows that the distance between two cities is 3.75 miles. If the map scale is 1 inch = 0.5 miles, how many inches apart are the cities on the map?",
    options: ["6.5 inches", "7.5 inches", "1.875 inches", "3.25 inches"],
    correctIndex: 1,
    explanation: "To find the distance on the map, divide the actual distance by the scale: 3.75 ÷ 0.5 = 7.5 inches",
    topic: "decimal distances",
    grade: 6
  },
  {
    question: "Which is the correct decimal addition sentence? 4.7 + 2.83 = ?",
    options: ["4.7 + 2.83 = 6.53", "4.7 + 2.83 = 7.53", "4.7 + 2.83 = 7.13", "4.7 + 2.83 = 6.13"],
    correctIndex: 1,
    explanation: "Line up the decimal points: 4.70 + 2.83 = 7.53",
    topic: "decimal addition",
    grade: 6
  },
  {
    question: "Estimate the sum of 4.82 + 7.19",
    options: ["About 11", "About 12", "About 13", "About 10"],
    correctIndex: 1,
    explanation: "Round each number: 4.82 rounds to 5, and 7.19 rounds to 7. 5 + 7 = 12",
    topic: "estimation",
    grade: 6
  },
  {
    question: "Multiply: 0.6 × 0.4",
    options: ["0.24", "2.4", "0.1", "0.024"],
    correctIndex: 0,
    explanation: "Multiply as with whole numbers: 6 × 4 = 24. Count decimal places (1 in each number, so 2 total): 0.24",
    topic: "multiply decimals",
    grade: 6
  },
  {
    question: "Divide: 3.6 ÷ 9",
    options: ["0.4", "0.04", "4", "40"],
    correctIndex: 0,
    explanation: "Divide as with whole numbers: 36 ÷ 9 = 4. Adjust for decimal places: 3.6 ÷ 9 = 0.4",
    topic: "divide decimals",
    grade: 6
  },
  {
    question: "Add the fractions: 3/8 + 2/8",
    options: ["5/8", "5/16", "6/8", "5/4"],
    correctIndex: 0,
    explanation: "With like denominators, add the numerators: 3/8 + 2/8 = (3+2)/8 = 5/8",
    topic: "add fractions",
    grade: 6
  },
  {
    question: "Subtract: 5/6 - 1/3",
    options: ["4/6", "2/3", "1/2", "4/3"],
    correctIndex: 1,
    explanation: "Convert to like denominators: 5/6 - 1/3 = 5/6 - 2/6 = 3/6 = 1/2",
    topic: "subtract fractions",
    grade: 6
  },
  {
    question: "Add the mixed numbers: 2 1/4 + 1 3/4",
    options: ["3 4/4", "4", "3 1/2", "4 1/4"],
    correctIndex: 1,
    explanation: "Add the whole numbers: 2 + 1 = 3. Add the fractions: 1/4 + 3/4 = 4/4 = 1. Total: 3 + 1 = 4",
    topic: "add mixed numbers",
    grade: 6
  },
  {
    question: "Estimate the product of 4.9 × 6.1",
    options: ["About 24", "About 30", "About 36", "About 42"],
    correctIndex: 1,
    explanation: "Round each number: 4.9 rounds to 5, and 6.1 rounds to 6. 5 × 6 = 30",
    topic: "estimate products",
    grade: 6
  },
  {
    question: "Estimate the quotient of 38.4 ÷ 4.9",
    options: ["About 4", "About 8", "About 10", "About 12"],
    correctIndex: 1,
    explanation: "Round each number: 38.4 rounds to 38, and 4.9 rounds to 5. 38 ÷ 5 ≈ 7.6, which is about 8",
    topic: "estimate quotients",
    grade: 6
  },
  {
    question: "Write an equation for: 'Six less than a number is 18'",
    options: ["x - 6 = 18", "6 - x = 18", "x + 6 = 18", "18 - x = 6"],
    correctIndex: 0,
    explanation: "Let x be the number. 'Six less than a number' means x - 6. So the equation is x - 6 = 18",
    topic: "write equations",
    grade: 6
  },
  {
    question: "Solve: x + 3.5 = 7.2",
    options: ["x = 3.7", "x = 10.7", "x = 4.3", "x = 3.2"],
    correctIndex: 0,
    explanation: "Subtract 3.5 from both sides: x = 7.2 - 3.5 = 3.7",
    topic: "solve equations",
    grade: 6
  },
  {
    question: "Which inequality represents 'a number is at least 12'?",
    options: ["x < 12", "x ≤ 12", "x > 12", "x ≥ 12"],
    correctIndex: 3,
    explanation: "'At least' means greater than or equal to, so the inequality is x ≥ 12",
    topic: "inequalities",
    grade: 6
  },
  {
    question: "A recipe calls for 2 3/4 cups of flour. If you want to make half the recipe, how much flour do you need?",
    options: ["1 1/4 cups", "1 3/8 cups", "1 1/2 cups", "1 3/4 cups"],
    correctIndex: 1,
    explanation: "Half of 2 3/4 = half of 11/4 = 11/4 ÷ 2 = 11/8 = 1 3/8 cups",
    topic: "fractions",
    grade: 6
  },
  {
    question: "If a car travels at 55.5 miles per hour, how far will it travel in 2.5 hours?",
    options: ["138.75 miles", "108.75 miles", "135.5 miles", "140 miles"],
    correctIndex: 0,
    explanation: "Distance = rate × time = 55.5 × 2.5 = 138.75 miles",
    topic: "word problems",
    grade: 6
  },
  {
    question: "Which expression represents 'the product of a number and 4, decreased by 7'?",
    options: ["4x - 7", "4 - 7x", "7 - 4x", "4x + 7"],
    correctIndex: 0,
    explanation: "'The product of a number and 4' is 4x. 'Decreased by 7' means subtract 7. So the expression is 4x - 7",
    topic: "expressions",
    grade: 6
  },
  {
    question: "Solve the two-step equation: 3x + 5 = 20",
    options: ["x = 5", "x = 15", "x = 8", "x = 5/3"],
    correctIndex: 0,
    explanation: "First, subtract 5 from both sides: 3x = 15. Then divide both sides by 3: x = 5",
    topic: "two-step equations",
    grade: 6
  },
  {
    question: "A rectangular garden has a length of 4.5 meters and a width of 3.2 meters. What is its area?",
    options: ["7.7 square meters", "14.4 square meters", "15.4 square meters", "16.2 square meters"],
    correctIndex: 1,
    explanation: "Area = length × width = 4.5 × 3.2 = 14.4 square meters",
    topic: "area",
    grade: 6
  },
  {
    question: "If 3/4 of a tank holds 18 gallons of water, what is the total capacity of the tank?",
    options: ["13.5 gallons", "24 gallons", "27 gallons", "36 gallons"],
    correctIndex: 1,
    explanation: "If 3/4 of the tank is 18 gallons, then 1/4 is 18 ÷ 3 = 6 gallons. So the full tank (4/4) is 6 × 4 = 24 gallons",
    topic: "fractions",
    grade: 6
  }
];

export const writingProblems: Question[] = [
  {
    question: "Which sentence uses correct punctuation?",
    options: [
      "The cat slept on the windowsill, it was sunny.",
      "The cat slept on the windowsill; it was sunny.",
      "The cat slept on the windowsill it was sunny.",
      "The cat slept on the windowsill... it was sunny."
    ],
    correctIndex: 1,
    explanation: "A semicolon correctly joins two related independent clauses.",
    topic: "punctuation",
    grade: 7
  },
  {
    question: "Choose the sentence with correct subject-verb agreement.",
    options: [
      "The group of students were late.",
      "The group of students was late.",
      "The students in the group were late.",
      "The students in the group was late."
    ],
    correctIndex: 1,
    explanation: "'Group' is a singular collective noun, so it takes a singular verb (was)."
  }
];

export const smartyPantsProblems: Question[] = [
  {
    question: "Which of these inventions came first?",
    options: [
      "Television",
      "Telephone",
      "Internet",
      "Radio"
    ],
    correctIndex: 1,
    explanation: "The telephone was invented by Alexander Graham Bell in 1876, before the radio (1895), television (1920s), and internet (1960s)."
  },
  {
    question: "What causes a rainbow to appear?",
    options: [
      "Heat from the sun",
      "Clouds moving together",
      "Light reflecting off water droplets",
      "Wind patterns"
    ],
    correctIndex: 2,
    explanation: "Rainbows appear when sunlight reflects and refracts (bends) through water droplets in the air."
  },
  {
    question: "Which continent has the most countries?",
    options: [
      "Asia",
      "Africa",
      "Europe",
      "South America"
    ],
    correctIndex: 1,
    explanation: "Africa has 54 countries, more than any other continent."
  },
  {
    question: "Which ancient wonder of the world was located in Alexandria, Egypt?",
    options: ["The Lighthouse", "The Hanging Gardens", "The Colossus", "The Temple of Artemis"],
    correctIndex: 0,
    explanation: "The Lighthouse (Pharos) of Alexandria was one of the Seven Wonders of the Ancient World, guiding ships into the harbor."
  },
  {
    question: "Who was the first Emperor of Rome?",
    options: ["Julius Caesar", "Augustus", "Nero", "Constantine"],
    correctIndex: 1,
    explanation: "Augustus (born Octavian) became the first Roman Emperor after defeating Mark Antony and Cleopatra."
  },
  {
    question: "Which empire was ruled by Mansa Musa, considered one of the wealthiest people in history?",
    options: ["Ottoman Empire", "Persian Empire", "Mali Empire", "Mongol Empire"],
    correctIndex: 2,
    explanation: "Mansa Musa ruled the Mali Empire in the 14th century and was known for his incredible wealth and famous pilgrimage to Mecca."
  },
  {
    question: "The Renaissance period began in which modern-day country?",
    options: ["France", "England", "Spain", "Italy"],
    correctIndex: 3,
    explanation: "The Renaissance began in Italy during the late Middle Ages and later spread throughout Europe."
  },
  {
    question: "Who is credited with inventing the first practical telephone?",
    options: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Guglielmo Marconi"],
    correctIndex: 0,
    explanation: "Alexander Graham Bell patented the first practical telephone in 1876."
  },
  {
    question: "What was the name of the first artificial satellite launched into space?",
    options: ["Explorer 1", "Vanguard 1", "Sputnik 1", "Apollo 1"],
    correctIndex: 2,
    explanation: "Sputnik 1 was launched by the Soviet Union in 1957, marking the beginning of the Space Age."
  },
  {
    question: "Which is the largest desert in the world?",
    options: ["Sahara Desert", "Arabian Desert", "Antarctic Desert", "Arctic Desert"],
    correctIndex: 2,
    explanation: "The Antarctic Desert is the largest desert in the world, as a desert is defined by its precipitation rather than temperature."
  },
  {
    question: "Which country is known as the 'Land of the Rising Sun'?",
    options: ["China", "Korea", "Thailand", "Japan"],
    correctIndex: 3,
    explanation: "Japan is known as the 'Land of the Rising Sun' - the Japanese word for Japan (Nippon) literally means 'origin of the sun'."
  },
  {
    question: "Who painted 'The Starry Night'?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Claude Monet", "Leonardo da Vinci"],
    correctIndex: 0,
    explanation: "Vincent van Gogh painted 'The Starry Night' in 1889 while he was staying at the Saint-Paul-de-Mausole asylum."
  },
  {
    question: "Which playwright wrote 'Romeo and Juliet'?",
    options: ["Christopher Marlowe", "William Shakespeare", "Ben Jonson", "John Webster"],
    correctIndex: 1,
    explanation: "William Shakespeare wrote 'Romeo and Juliet' in the 1590s, and it remains one of his most popular plays."
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correctIndex: 2,
    explanation: "Diamond is the hardest natural substance, ranking 10 on the Mohs scale of mineral hardness."
  },
  {
    question: "Which planet has the most moons in our solar system?",
    options: ["Saturn", "Jupiter", "Uranus", "Neptune"],
    correctIndex: 0,
    explanation: "Saturn has the most confirmed moons, with 82 confirmed natural satellites."
  },
  {
    question: "Who was the first woman to win a Nobel Prize?",
    options: ["Marie Curie", "Mother Teresa", "Pearl Buck", "Jane Addams"],
    correctIndex: 0,
    explanation: "Marie Curie won the Nobel Prize in Physics in 1903 and later won another in Chemistry in 1911."
  },
  {
    question: "Which ancient Greek philosopher was the teacher of Alexander the Great?",
    options: ["Socrates", "Plato", "Aristotle", "Pythagoras"],
    correctIndex: 2,
    explanation: "Aristotle was hired by Philip II of Macedon to tutor his son Alexander, who later became Alexander the Great."
  },
  {
    question: "Who is credited with inventing the World Wide Web?",
    options: ["Bill Gates", "Steve Jobs", "Tim Berners-Lee", "Mark Zuckerberg"],
    correctIndex: 2,
    explanation: "Tim Berners-Lee invented the World Wide Web in 1989 while working at CERN."
  },
  {
    question: "Who wrote the '95 Theses' that began the Protestant Reformation?",
    options: ["John Calvin", "Martin Luther", "Henry VIII", "Pope Leo X"],
    correctIndex: 1,
    explanation: "Martin Luther posted his '95 Theses' on a church door in 1517, challenging Catholic Church practices and starting the Protestant Reformation."
  },
  {
    question: "Which ancient Greek philosopher was known for teaching Plato?",
    options: ["Socrates", "Aristotle", "Pythagoras", "Homer"],
    correctIndex: 0,
    explanation: "Socrates was a famous philosopher in Athens who taught Plato. He is known for the 'Socratic method' of asking questions to encourage critical thinking."
  },
  {
    question: "Which disease was known as the 'Black Death' in medieval Europe?",
    options: ["Smallpox", "Bubonic Plague", "Cholera", "Influenza"],
    correctIndex: 1,
    explanation: "The Bubonic Plague, known as the Black Death, killed about one-third of Europe's population in the 14th century."
  },
  {
    question: "Which document limited the power of the English king in 1215?",
    options: ["Magna Carta", "Declaration of Independence", "Bill of Rights", "Constitution"],
    correctIndex: 0,
    explanation: "The Magna Carta was signed by King John in 1215, limiting royal power and protecting certain rights of English citizens."
  },
  {
    question: "Which ancient civilization built the Parthenon?",
    options: ["Romans", "Egyptians", "Greeks", "Persians"],
    correctIndex: 2,
    explanation: "The ancient Greeks built the Parthenon in Athens as a temple to their goddess Athena."
  },
  {
    question: "Who was the first President of the United States?",
    options: ["Thomas Jefferson", "John Adams", "Benjamin Franklin", "George Washington"],
    correctIndex: 3,
    explanation: "George Washington served as the first President of the United States from 1789 to 1797."
  },
  {
    question: "Which queen ruled England for 63 years during the Victorian Era?",
    options: ["Queen Elizabeth I", "Queen Victoria", "Queen Mary", "Queen Anne"],
    correctIndex: 1,
    explanation: "Queen Victoria ruled from 1837 to 1901, giving her name to the Victorian Era of British history."
  },
  {
    question: "Who wrote the Declaration of Independence?",
    options: ["Thomas Jefferson", "George Washington", "Benjamin Franklin", "John Adams"],
    correctIndex: 0,
    explanation: "Thomas Jefferson was the main author of the Declaration of Independence in 1776."
  },
  {
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Brain", "Liver", "Skin"],
    correctIndex: 3,
    explanation: "The skin is the largest organ in the human body, protecting everything inside."
  },
  {
    question: "Which animal is known as the 'King of the Jungle'?",
    options: ["Tiger", "Lion", "Elephant", "Gorilla"],
    correctIndex: 1,
    explanation: "The lion is known as the 'King of the Jungle', even though it actually lives in grasslands and savannas."
  },
  {
    question: "What is the closest planet to the Sun?",
    options: ["Venus", "Mars", "Mercury", "Earth"],
    correctIndex: 2,
    explanation: "Mercury is the closest planet to the Sun in our solar system."
  },
  {
    question: "Which ocean is the largest?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctIndex: 3,
    explanation: "The Pacific Ocean is the largest and deepest ocean on Earth."
  },
  {
    question: "What is the capital city of Japan?",
    options: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
    correctIndex: 0,
    explanation: "Tokyo is the capital city of Japan and one of the largest cities in the world."
  },
  {
    question: "Which famous scientist developed the theory of gravity?",
    options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Charles Darwin"],
    correctIndex: 1,
    explanation: "Isaac Newton developed the theory of gravity after allegedly seeing an apple fall from a tree."
  },
  {
    question: "What is the main ingredient in chocolate?",
    options: ["Cocoa beans", "Sugar", "Milk", "Vanilla"],
    correctIndex: 0,
    explanation: "Chocolate is made primarily from cocoa beans, which come from the cacao tree."
  },
  {
    question: "Which dinosaur was the largest meat-eater of all time?",
    options: ["T-Rex", "Spinosaurus", "Allosaurus", "Velociraptor"],
    correctIndex: 1,
    explanation: "The Spinosaurus was the largest known carnivorous dinosaur, even bigger than T-Rex."
  },
  {
    question: "What causes the seasons on Earth?",
    options: ["Distance from the Sun", "Earth's tilt", "The Moon", "Ocean currents"],
    correctIndex: 1,
    explanation: "Earth's seasons are caused by its 23.5-degree tilt as it orbits the Sun."
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"],
    correctIndex: 0,
    explanation: "Leonardo da Vinci painted the Mona Lisa in the early 16th century."
  },
  {
    question: "What is the longest river in the world?",
    options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
    correctIndex: 1,
    explanation: "The Nile River in Africa is the longest river in the world."
  },
  {
    question: "Which instrument has 88 keys?",
    options: ["Guitar", "Piano", "Violin", "Drums"],
    correctIndex: 1,
    explanation: "A standard piano has 88 keys - 52 white keys and 36 black keys."
  }
];

export const vocabWords: Question[] = [
  {
    question: "What does 'Emerge' mean?",
    options: [
      'To stay hidden',
      'To come out or appear',
      'To go back in',
      'To disappear'
    ],
    correctIndex: 1,
    explanation: "Emerge means to come out or appear. Example: 'The butterfly emerged from its cocoon.'"
  },
  {
    question: "What does 'Abundant' mean?",
    options: [
      'Very rare',
      'Present in large quantity',
      'Completely missing',
      'Small amount'
    ],
    correctIndex: 1,
    explanation: "Abundant means present in large quantity. Example: 'The garden had abundant flowers in spring.'"
  },
  {
    question: "What does 'Persistent' mean?",
    options: [
      'Giving up easily',
      'Continuing firmly despite difficulty',
      'Moving very quickly',
      'Being completely still'
    ],
    correctIndex: 1,
    explanation: "Persistent means continuing firmly despite difficulty. Example: 'Her persistent efforts to improve finally paid off with a good grade.'"
  },
  {
    question: "What does 'Reluctant' mean?",
    options: [
      'Eager and excited',
      'Unwilling or hesitant',
      'Very fast',
      'Extremely loud'
    ],
    correctIndex: 1,
    explanation: "Reluctant means unwilling or hesitant to do something. Example: 'He was reluctant to try the new food because it looked strange.'"
  },
  {
    question: "What does 'Diligent' mean?",
    options: [
      'Lazy and careless',
      'Hardworking and careful',
      'Angry and upset',
      'Confused and lost'
    ],
    correctIndex: 1,
    explanation: "Diligent means showing care and effort in your work or duties. Example: 'The diligent student always completed her homework on time.'"
  },
  {
    question: "What does 'Ambiguous' mean?",
    options: [
      'Having more than one possible meaning',
      'Very clear and specific',
      'Completely wrong',
      'Always correct'
    ],
    correctIndex: 0,
    explanation: "Ambiguous means open to more than one interpretation; not having one obvious meaning. Example: 'His ambiguous answer could be taken in several different ways.'"
  },
  {
    question: "What does 'Versatile' mean?",
    options: [
      'Able to adapt to many different functions or situations',
      'Unable to change',
      'Very specific in purpose',
      'Extremely fragile'
    ],
    correctIndex: 0,
    explanation: "Versatile means able to adapt to many different functions or situations. Example: 'The versatile tool could be used for cutting, hammering, and measuring.'"
  },
  {
    question: "What does 'Ambivalent' mean?",
    options: [
      'Having mixed feelings or contradictory ideas',
      'Extremely determined',
      'Completely certain',
      'Highly skilled'
    ],
    correctIndex: 0,
    explanation: "Ambivalent means having mixed feelings or contradictory ideas about something or someone. Example: 'She felt ambivalent about moving to a new city—excited for the opportunity but sad to leave her friends.'"
  },
  {
    question: "What does 'Meticulous' mean?",
    options: [
      'Showing great attention to detail',
      'Very messy',
      'Extremely careless',
      'Working quickly'
    ],
    correctIndex: 0,
    explanation: "Meticulous means showing great attention to detail; very careful and precise. Example: 'The meticulous artist spent hours perfecting every small detail of the painting.'"
  },
  {
    question: "What does 'Empathy' mean?",
    options: [
      'The ability to understand and share the feelings of others',
      'Being completely selfish',
      'Feeling nothing at all',
      'Being extremely logical'
    ],
    correctIndex: 0,
    explanation: "Empathy means the ability to understand and share the feelings of another person. Example: 'She showed empathy by listening to her friend's problems and offering support.'"
  },
  {
    question: "What does 'Resilient' mean?",
    options: [
      'Able to recover quickly from difficulties',
      'Easily broken',
      'Very weak',
      'Always failing'
    ],
    correctIndex: 0,
    explanation: "Resilient means able to recover quickly from difficulties; tough. Example: 'The resilient community quickly rebuilt after the storm.'"
  },
  {
    question: "What does 'Verbose' mean?",
    options: [
      'Using or containing too many words',
      'Extremely concise',
      'Completely silent',
      'Highly accurate'
    ],
    correctIndex: 0,
    explanation: "Verbose means using or containing too many words. Example: 'His verbose explanation took twenty minutes when it could have been said in two.'"
  },
  {
    question: "What does 'Skeptical' mean?",
    options: [
      'Not easily convinced; having doubts',
      'Believing everything',
      'Very trusting',
      'Extremely fearful'
    ],
    correctIndex: 0,
    explanation: "Skeptical means not easily convinced; having doubts or reservations. Example: 'She was skeptical about the new miracle product that claimed to solve all problems.'"
  },
  {
    question: "What does 'Compassionate' mean?",
    options: [
      'Feeling or showing sympathy and concern for others',
      'Being cruel',
      'Not caring about others',
      'Extremely angry'
    ],
    correctIndex: 0,
    explanation: "Compassionate means feeling or showing sympathy and concern for others. Example: 'The compassionate nurse made sure all her patients were comfortable.'"
  },
  {
    question: "What does 'Innovative' mean?",
    options: [
      'Introducing new ideas; original and creative',
      'Very old-fashioned',
      'Copying others',
      'Extremely boring'
    ],
    correctIndex: 0,
    explanation: "Innovative means featuring new methods; advanced and original. Example: 'Her innovative design won first prize in the science fair.'"
  },
  {
    question: "What does 'Peculiar' mean?",
    options: [
      'Strange or unusual',
      'Perfectly normal',
      'Very common',
      'Exactly the same as others'
    ],
    correctIndex: 0,
    explanation: "Peculiar means strange or unusual; different from what is normal or expected. Example: 'There was a peculiar smell coming from the science lab.'"
  },
  {
    question: "What does 'Conscientious' mean?",
    options: [
      'Wishing to do what is right; thorough and careful',
      'Careless about quality',
      'Working very quickly',
      'Being completely lazy'
    ],
    correctIndex: 0,
    explanation: "Conscientious means wishing to do what is right; thorough and careful. Example: 'The conscientious employee double-checked all her work before submitting it.'"
  },
  {
    question: "What does 'Articulate' mean?",
    options: [
      'Able to express thoughts and feelings clearly',
      'Unable to speak well',
      'Very quiet',
      'Extremely loud'
    ],
    correctIndex: 0,
    explanation: "Articulate means able to express thoughts and feelings clearly and effectively. Example: 'The articulate speaker explained complex ideas in a way everyone could understand.'"
  },
  {
    question: "What does 'Tenacious' mean?",
    options: [
      'Tending to keep a firm hold of something; determined',
      'Giving up easily',
      'Very weak',
      'Extremely fragile'
    ],
    correctIndex: 0,
    explanation: "Tenacious means tending to keep a firm hold of something; determined. Example: 'The tenacious climber refused to give up until she reached the summit.'"
  },
  {
    question: "What does 'Prudent' mean?",
    options: [
      'Acting with or showing care and thought for the future',
      'Being reckless',
      'Taking unnecessary risks',
      'Spending money freely'
    ],
    correctIndex: 0,
    explanation: "Prudent means acting with or showing care and thought for the future. Example: 'It was prudent to save some money for emergencies.'"
  }
];

export const readingPassages = [
  {
    title: "The Scientific Method",
    text: `The scientific method is a systematic approach used by scientists to investigate phenomena, acquire new knowledge, and correct and integrate existing knowledge. It consists of several steps: observation, question formulation, hypothesis development, prediction, testing, and analysis.

    The process begins with careful observation of a phenomenon. Scientists then formulate questions about their observations and develop hypotheses—tentative explanations that can be tested. These hypotheses lead to predictions that can be investigated through controlled experiments. The results of these experiments either support or contradict the original hypothesis, leading to refinement of scientific understanding.`,
    questions: [
      {
        question: "What is the primary purpose of the scientific method?",
        options: [
          "To prove existing theories correct",
          "To systematically investigate and understand phenomena",
          "To develop new technologies",
          "To document observations only"
        ],
        correctIndex: 1,
        explanation: "The passage states that the scientific method is used to 'investigate phenomena, acquire new knowledge, and correct and integrate existing knowledge.'"
      }
    ]
  },
  {
    title: "The Great Depression",
    text: `The Great Depression was a severe worldwide economic downturn that began in 1929 and lasted until the late 1930s. It was the longest and most severe depression ever experienced by the industrialized world. The economic crisis originated in the United States but quickly spread globally.

    The depression had devastating effects on both rich and poor countries. Personal income, tax revenue, profits, and prices dropped dramatically. International trade fell by more than 50%, and unemployment in the United States rose to 25%. Construction projects halted, farm prices fell by roughly 60%, and manufacturing output plunged.`,
    questions: [
      {
        question: "When did the Great Depression begin?",
        options: [
          "1919",
          "1929",
          "1939",
          "1949"
        ],
        correctIndex: 1,
        explanation: "The passage clearly states that the Great Depression began in 1929."
      }
    ]
  }
]; 
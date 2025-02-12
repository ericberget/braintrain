import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ChevronRight, Search } from 'lucide-react';

interface Formula {
  id: string;
  name: string;
  formula: string;
  explanation: string;
  example: {
    problem: string;
    solution: string[];
    answer: string;
  };
  category: 'geometry' | 'algebra' | 'basic';
}

const formulas: Formula[] = [
  // Basic Operations
  {
    id: 'order-operations',
    name: 'Order of Operations',
    formula: 'PEMDAS: (), ^, ×/÷, +/-',
    explanation: 'Parentheses, Exponents, Multiplication/Division (left to right), Addition/Subtraction (left to right)',
    example: {
      problem: 'Solve: 2 + (3 × 4) - 1',
      solution: [
        'First solve inside parentheses: 3 × 4 = 12',
        'Then: 2 + 12 - 1',
        'Solve left to right: 14 - 1 = 13'
      ],
      answer: '13'
    },
    category: 'basic'
  },

  // Geometry
  {
    id: 'area-rectangle',
    name: 'Area of a Rectangle',
    formula: 'A = l × w',
    explanation: 'Multiply the length by the width to find the area of a rectangle.',
    example: {
      problem: 'Find the area of a rectangle with length 8 and width 5.',
      solution: [
        'Use the formula: A = l × w',
        'Plug in the values: A = 8 × 5',
        'Multiply: 8 × 5 = 40'
      ],
      answer: '40 square units'
    },
    category: 'geometry'
  },
  {
    id: 'area-triangle',
    name: 'Area of a Triangle',
    formula: 'A = ½ × b × h',
    explanation: 'Multiply the base by the height and divide by 2.',
    example: {
      problem: 'Find the area of a triangle with base 6 and height 8.',
      solution: [
        'Use the formula: A = ½ × b × h',
        'Plug in values: A = ½ × 6 × 8',
        'Multiply: ½ × 48 = 24'
      ],
      answer: '24 square units'
    },
    category: 'geometry'
  },
  {
    id: 'perimeter-rectangle',
    name: 'Perimeter of a Rectangle',
    formula: 'P = 2l + 2w',
    explanation: 'Add twice the length and twice the width.',
    example: {
      problem: 'Find the perimeter of a rectangle with length 5 and width 3.',
      solution: [
        'Use the formula: P = 2l + 2w',
        'Plug in values: P = 2(5) + 2(3)',
        'Simplify: P = 10 + 6 = 16'
      ],
      answer: '16 units'
    },
    category: 'geometry'
  },
  {
    id: 'circumference',
    name: 'Circumference of a Circle',
    formula: 'C = 2πr or C = πd',
    explanation: 'Multiply π (approximately 3.14) by either twice the radius or the diameter.',
    example: {
      problem: 'Find the circumference of a circle with radius 4.',
      solution: [
        'Use the formula: C = 2πr',
        'Plug in values: C = 2 × 3.14 × 4',
        'Multiply: C = 25.12'
      ],
      answer: '25.12 units'
    },
    category: 'geometry'
  },

  // Algebra
  {
    id: 'percent-to-decimal',
    name: 'Percent to Decimal',
    formula: 'Decimal = Percent ÷ 100',
    explanation: 'Move the decimal point two places to the left.',
    example: {
      problem: 'Convert 75% to a decimal.',
      solution: [
        'Use the formula: Decimal = 75 ÷ 100',
        'Move decimal point two places left',
        '75% = 0.75'
      ],
      answer: '0.75'
    },
    category: 'algebra'
  },
  {
    id: 'fraction-to-percent',
    name: 'Fraction to Percent',
    formula: 'Percent = (Fraction × 100)%',
    explanation: 'Divide the numerator by denominator and multiply by 100.',
    example: {
      problem: 'Convert ¾ to a percent.',
      solution: [
        'Divide: 3 ÷ 4 = 0.75',
        'Multiply by 100: 0.75 × 100 = 75',
        'Add percent sign: 75%'
      ],
      answer: '75%'
    },
    category: 'algebra'
  },

  // More Geometry
  {
    id: 'area-circle',
    name: 'Area of a Circle',
    formula: 'A = πr²',
    explanation: 'Multiply π by the radius squared.',
    example: {
      problem: 'Find the area of a circle with radius 3.',
      solution: [
        'Use the formula: A = πr²',
        'Plug in values: A = 3.14 × 3²',
        'Square the radius: 3² = 9',
        'Multiply: 3.14 × 9 = 28.26'
      ],
      answer: '28.26 square units'
    },
    category: 'geometry'
  },

  // More Algebra
  {
    id: 'simple-interest',
    name: 'Simple Interest',
    formula: 'I = P × r × t',
    explanation: 'Principal × rate × time gives the interest earned.',
    example: {
      problem: 'Find interest on $100 at 5% for 2 years.',
      solution: [
        'Use formula: I = P × r × t',
        'Convert 5% to decimal: 0.05',
        'Plug in values: I = 100 × 0.05 × 2',
        'Multiply: I = 10'
      ],
      answer: '$10'
    },
    category: 'algebra'
  }
];

const FormulaReference = () => {
  const [selectedCategory, setSelectedCategory] = useState<Formula['category']>('basic');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-100 mb-2">Math Formula Library</h2>
          <p className="text-gray-400">Interactive formulas with examples and practice</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search formulas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-800/50 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-4 mb-8">
        {['basic', 'geometry', 'algebra'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category as Formula['category'])}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-500/20 text-blue-400'
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Formula Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formulas
          .filter(f => f.category === selectedCategory)
          .map(formula => (
            <motion.div
              key={formula.id}
              layoutId={formula.id}
              onClick={() => setSelectedFormula(formula)}
              className="bg-gray-800/50 p-6 rounded-xl cursor-pointer hover:bg-gray-800/80 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-blue-400">{formula.name}</h3>
                <Calculator className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-2xl text-white font-mono mb-4">{formula.formula}</div>
              <p className="text-gray-400">{formula.explanation}</p>
              <div className="flex items-center text-blue-400 mt-4">
                <span className="text-sm">View Example</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
          ))}
      </div>

      {/* Formula Detail Modal */}
      {selectedFormula && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-gray-800 rounded-xl max-w-2xl w-full p-8"
          >
            <h3 className="text-2xl font-bold text-blue-400 mb-6">{selectedFormula.name}</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-gray-400 mb-2">Formula:</h4>
                <div className="text-3xl text-white font-mono">{selectedFormula.formula}</div>
              </div>

              <div>
                <h4 className="text-gray-400 mb-2">Example Problem:</h4>
                <p className="text-white">{selectedFormula.example.problem}</p>
              </div>

              <div>
                <h4 className="text-gray-400 mb-2">Solution Steps:</h4>
                <div className="space-y-2">
                  {selectedFormula.example.solution.map((step, index) => (
                    <div key={index} className="flex items-center text-white">
                      <span className="text-blue-400 mr-2">{index + 1}.</span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-gray-400 mb-2">Answer:</h4>
                <div className="text-emerald-400 font-bold">{selectedFormula.example.answer}</div>
              </div>

              <button
                onClick={() => setSelectedFormula(null)}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default FormulaReference; 
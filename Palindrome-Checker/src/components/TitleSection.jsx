import React from 'react';
import { Cpu } from 'lucide-react';

const TitleSection = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-3">
        <div className="bg-blue-500 text-white p-3 rounded-full">
          <Cpu size={32} />
        </div>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
        Pushdown Automaton Simulator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Visualize how a PDA uses a stack to determine if a string is a palindrome
      </p>
    </div>
  );
};

export default TitleSection;

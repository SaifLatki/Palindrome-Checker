import React from 'react';
import { SimulationStatus } from '../types/pda';
import { Check, X } from 'lucide-react';

interface ResultDisplayProps {
  result: boolean | null;
  simulationStatus: SimulationStatus;
  input: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  result,
  simulationStatus,
  input
}) => {
  if (simulationStatus === 'idle') {
    return (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Result</h3>
        <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4 min-h-[250px] transition-colors duration-300">
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Results will appear after simulation
          </p>
        </div>
      </div>
    );
  }

  if (simulationStatus === 'running') {
    return (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Result</h3>
        <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4 min-h-[250px] transition-colors duration-300">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Processing...
              </span>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Analyzing input...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (simulationStatus === 'complete') {
    return (
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Result</h3>
        <div className="flex-grow flex flex-col bg-gray-100 dark:bg-gray-700 rounded-lg p-4 min-h-[250px] transition-colors duration-300">
          <div className={`flex items-center justify-center mb-4 p-3 rounded-lg ${
            result 
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
          }`}>
            <div className={`flex items-center justify-center rounded-full p-2 mr-3 ${
              result 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {result ? <Check size={24} /> : <X size={24} />}
            </div>
            <span className="font-semibold text-lg">
              {result ? 'Palindrome' : 'Not a Palindrome'}
            </span>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-inner transition-colors duration-300">
            <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Explanation:</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {result ? (
                <>
                  The string <span className="font-mono font-semibold">{input}</span> is a palindrome because it reads the same forward and backward.
                  <br /><br />
                  The PDA succeeded in matching each character with its corresponding position from the end by using the stack to store characters during the push phase and comparing them during the pop phase.
                </>
              ) : (
                <>
                  The string <span className="font-mono font-semibold">{input}</span> is not a palindrome because it does not read the same forward and backward.
                  <br /><br />
                  The PDA detected a mismatch between characters when comparing the input with characters popped from the stack.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ResultDisplay;
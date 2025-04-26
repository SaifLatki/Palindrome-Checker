import React from 'react';

interface StateDisplayProps {
  currentState: string;
  processingIndex: number;
  input: string;
  inPushPhase: boolean;
}

const StateDisplay: React.FC<StateDisplayProps> = ({
  currentState,
  processingIndex,
  input,
  inPushPhase
}) => {
  // Helper function to get state color
  const getStateColor = (state: string): string => {
    switch (state) {
      case 'q0':
        return 'border-blue-500 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'q1':
        return 'border-purple-500 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
      case 'qAccept':
        return 'border-green-500 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'qReject':
        return 'border-red-500 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default:
        return 'border-gray-500 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  // Helper function to get state description
  const getStateDescription = (state: string): string => {
    switch (state) {
      case 'q0':
        return 'Initial State (Push Phase)';
      case 'q1':
        return 'Mid State (Pop Phase)';
      case 'qAccept':
        return 'Accept State (Palindrome)';
      case 'qReject':
        return 'Reject State (Not a Palindrome)';
      default:
        return 'Unknown State';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Current State</h3>
      
      <div className="flex-grow flex flex-col justify-start bg-gray-100 dark:bg-gray-700 rounded-lg p-4 min-h-[250px] transition-colors duration-300">
        <div className="flex justify-center mb-4">
          <div 
            className={`flex items-center justify-center w-16 h-16 rounded-full border-2 font-mono text-lg font-bold transition-all duration-300 ${getStateColor(currentState)}`}
          >
            {currentState}
          </div>
        </div>
        
        <div className="text-center mb-4">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {getStateDescription(currentState)}
          </span>
        </div>
        
        {processingIndex >= 0 && processingIndex <= input.length && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Processing:</h4>
            <div className="font-mono bg-white dark:bg-gray-800 rounded p-2 border border-gray-200 dark:border-gray-600 overflow-x-auto transition-colors duration-300">
              {input.split('').map((char, index) => (
                <span 
                  key={index}
                  className={`inline-block px-1 transition-all duration-300 ${
                    index === processingIndex 
                      ? 'bg-yellow-300 dark:bg-yellow-800 font-bold text-black dark:text-white' 
                      : index < processingIndex 
                        ? 'text-gray-400 dark:text-gray-500' 
                        : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {char}
                </span>
              ))}
              {processingIndex === input.length && (
                <span className="inline-block animate-pulse">|</span>
              )}
            </div>
          </div>
        )}
        
        <div className="mt-auto pt-4">
          <div className="flex justify-between items-center">
            <div className={`h-3 w-3 rounded-full ${inPushPhase ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600 mx-2"></div>
            <div className={`h-3 w-3 rounded-full ${!inPushPhase ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className={`${inPushPhase ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>Push Phase</span>
            <span className={`${!inPushPhase ? 'text-purple-600 dark:text-purple-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>Pop Phase</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateDisplay;
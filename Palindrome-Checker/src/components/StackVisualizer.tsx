import React from 'react';
import { SimulationStatus } from '../types/pda';

interface StackVisualizerProps {
  stack: string[];
  inPushPhase: boolean;
  simulationStatus: SimulationStatus;
}

const StackVisualizer: React.FC<StackVisualizerProps> = ({ 
  stack, 
  inPushPhase,
  simulationStatus 
}) => {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Stack</h3>
      
      <div className="flex-grow flex flex-col-reverse items-center justify-start bg-gray-100 dark:bg-gray-700 rounded-lg p-4 min-h-[250px] relative overflow-hidden transition-colors duration-300">
        {simulationStatus !== 'idle' && (
          <>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-500" />
            
            <div className="w-full flex flex-col-reverse items-center gap-1 relative z-10">
              {stack.length === 0 ? (
                <div className="text-gray-400 dark:text-gray-500 font-mono italic">Empty Stack</div>
              ) : (
                stack.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className={`w-full max-w-[120px] py-2 px-4 font-mono text-center border-2 
                               border-blue-500 rounded transition-all duration-300
                               ${index === stack.length - 1 ? 'animate-pulse' : ''}
                               ${inPushPhase ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 
                                              'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'}`}
                  >
                    {item}
                  </div>
                ))
              )}
            </div>
          </>
        )}
        
        {simulationStatus === 'idle' && (
          <div className="flex items-center justify-center h-full w-full">
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Start the simulation to see the stack operations
            </p>
          </div>
        )}

        {/* Stack Operation Indicator */}
        {simulationStatus === 'running' && (
          <div className="absolute top-2 right-2 rounded-full px-3 py-1 text-xs font-semibold text-white bg-opacity-90 dark:bg-opacity-90 transition-all duration-300 z-20
                         bg-blue-500 dark:bg-blue-600">
            {inPushPhase ? 'PUSH Phase' : 'POP Phase'}
          </div>
        )}
      </div>
    </div>
  );
};

export default StackVisualizer;
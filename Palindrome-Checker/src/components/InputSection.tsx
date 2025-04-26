import React from 'react';
import { Play, RotateCcw, FastForward, ChevronDown } from 'lucide-react';
import { SimulationStatus } from '../types/pda';

interface InputSectionProps {
  input: string;
  setInput: (input: string) => void;
  processingIndex: number;
  startSimulation: () => void;
  resetSimulation: () => void;
  simulationStatus: SimulationStatus;
  speed: number;
  setSpeed: (speed: number) => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  input,
  setInput,
  processingIndex,
  startSimulation,
  resetSimulation,
  simulationStatus,
  speed,
  setSpeed
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startSimulation();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Input String</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter a string (e.g., 'racecar')"
            className="w-full px-4 py-3 border-2 border-blue-200 dark:border-blue-900 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-mono text-lg
                       transition-all duration-300"
            disabled={simulationStatus === 'running'}
          />
          
          {simulationStatus === 'running' && processingIndex >= 0 && processingIndex < input.length && (
            <div 
              className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300"
              style={{ 
                width: `${(processingIndex / input.length) * 100}%`, 
                transitionTimingFunction: 'linear' 
              }}
            />
          )}
        </div>
        
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!input.trim() || simulationStatus === 'running'}
            className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2
                       ${
                         !input.trim() || simulationStatus === 'running'
                           ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                           : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
                       } transition-all duration-300`}
          >
            <Play size={18} />
            <span>Start</span>
          </button>
          
          <button
            type="button"
            onClick={resetSimulation}
            disabled={simulationStatus === 'idle' && !input.trim()}
            className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2
                       ${
                         simulationStatus === 'idle' && !input.trim()
                           ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                           : 'bg-purple-500 hover:bg-purple-600 text-white shadow-md hover:shadow-lg'
                       } transition-all duration-300`}
          >
            <RotateCcw size={18} />
            <span>Reset</span>
          </button>
        </div>
      </form>

      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
          <FastForward size={16} />
          Speed:
        </label>
        <div className="relative w-40">
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full appearance-none px-3 py-2 bg-gray-100 dark:bg-gray-700 
                       border border-gray-300 dark:border-gray-600 rounded-lg 
                       text-gray-800 dark:text-white focus:outline-none focus:ring-2 
                       focus:ring-blue-500 pr-8 transition-colors duration-300"
          >
            <option value={1000}>Slow</option>
            <option value={500}>Normal</option>
            <option value={200}>Fast</option>
            <option value={50}>Very Fast</option>
          </select>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
            <ChevronDown size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputSection;
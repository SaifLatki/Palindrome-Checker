import React, { useState, useEffect } from 'react';
import InputSection from './InputSection';
import StackVisualizer from './StackVisualizer';
import StateDisplay from './StateDisplay';
import ResultDisplay from './ResultDisplay';
import TitleSection from './TitleSection';
import { simulatePDAStep, isPalindrome } from '../utils/pdaLogic';
import { PDAState, SimulationStatus } from '../types/pda';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import BackgroundEffect from './BackgroundEffect';

const PDASimulator: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [stack, setStack] = useState<string[]>([]);
  const [currentState, setCurrentState] = useState<string>('q0');
  const [processingIndex, setProcessingIndex] = useState<number>(-1);
  const [simulationStatus, setSimulationStatus] = useState<SimulationStatus>('idle');
  const [result, setResult] = useState<boolean | null>(null);
  const [inPushPhase, setInPushPhase] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(500); // milliseconds per step
  const { theme, toggleTheme } = useTheme();

  // Reset the simulation
  const resetSimulation = () => {
    setStack([]);
    setCurrentState('q0');
    setProcessingIndex(-1);
    setSimulationStatus('idle');
    setResult(null);
    setInPushPhase(true);
    setInput('');
  };

  // Start the simulation
  const startSimulation = () => {
    if (!input.trim()) return;
    
    resetSimulation();
    setSimulationStatus('running');
    setProcessingIndex(0);
  };

  // Run the simulation step by step
  useEffect(() => {
    if (simulationStatus !== 'running' || processingIndex === -1) return;

    const timer = setTimeout(() => {
      if (processingIndex >= input.length) {
        // Simulation complete
        const isPal = isPalindrome(input);
        setResult(isPal);
        setSimulationStatus('complete');
        setCurrentState(isPal ? 'qAccept' : 'qReject');
        return;
      }

      // Calculate midpoint to switch from push to pop phase
      const midpoint = Math.floor(input.length / 2);
      const isAtMidpoint = processingIndex === midpoint;
      
      if (isAtMidpoint && input.length % 2 === 1) {
        // Skip the middle character for odd-length strings
        setProcessingIndex(processingIndex + 1);
        setInPushPhase(false);
      } else {
        // Perform a PDA step
        const { newStack, newState, newPhase } = simulatePDAStep({
          input,
          stack,
          currentState,
          index: processingIndex,
          inPushPhase
        });

        setStack(newStack);
        setCurrentState(newState);
        setProcessingIndex(processingIndex + 1);
        setInPushPhase(newPhase);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [simulationStatus, processingIndex, input, stack, currentState, inPushPhase, speed]);

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <BackgroundEffect />
      
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md hover:shadow-lg transition-all duration-300"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      
      <div className="relative z-10 flex flex-col gap-8">
        <TitleSection />
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 transition-colors duration-300">
          <InputSection 
            input={input} 
            setInput={setInput}
            processingIndex={processingIndex}
            startSimulation={startSimulation}
            resetSimulation={resetSimulation}
            simulationStatus={simulationStatus}
            speed={speed}
            setSpeed={setSpeed}
          />
          
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StateDisplay 
              currentState={currentState} 
              processingIndex={processingIndex} 
              input={input}
              inPushPhase={inPushPhase}
            />
            
            <StackVisualizer 
              stack={stack} 
              inPushPhase={inPushPhase}
              simulationStatus={simulationStatus}
            />
            
            <ResultDisplay 
              result={result} 
              simulationStatus={simulationStatus}
              input={input}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDASimulator;
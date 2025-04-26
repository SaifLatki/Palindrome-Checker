import { PDAState, PDAStepResult } from '../types/pda';

/**
 * Simulates a single step of the Pushdown Automaton for palindrome checking
 */
export const simulatePDAStep = (state: PDAState): PDAStepResult => {
  const { input, stack, currentState, index, inPushPhase } = state;
  let newStack = [...stack];
  let newState = currentState;
  let newPhase = inPushPhase;
  
  const char = input[index];
  const midpoint = Math.floor(input.length / 2);
  
  // If we're at the midpoint of an odd-length string, skip the middle character
  if (index === midpoint && input.length % 2 === 1) {
    newPhase = false;
    newState = 'q1';
    return { newStack, newState, newPhase };
  }
  
  // PUSH phase: reading the first half of the string
  if (inPushPhase) {
    // Push the current character onto the stack
    newStack.push(char);
    
    // Check if we've reached the midpoint (or just after for even-length strings)
    if (index >= midpoint - 1) {
      newPhase = false;
      newState = 'q1';
    }
  } 
  // POP phase: reading the second half of the string
  else {
    // Get the character from the top of the stack
    const stackTop = newStack.pop();
    
    // If the character doesn't match what we've popped, it's not a palindrome
    if (stackTop !== char) {
      newState = 'qReject';
    } else if (index === input.length - 1) {
      // If we're at the end and all characters matched, it's a palindrome
      if (newStack.length === 0) {
        newState = 'qAccept';
      } else {
        newState = 'qReject';
      }
    }
  }
  
  return { newStack, newState, newPhase };
};

/**
 * Utility function to check if a string is a palindrome
 */
export const isPalindrome = (str: string): boolean => {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = cleanStr.split('').reverse().join('');
  return cleanStr === reversed;
};
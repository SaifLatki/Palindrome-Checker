
import PDASimulator from './components/PDASimulator';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-gray-50">
        <PDASimulator />
      </div>
    </ThemeProvider>
  );
}

export default App;
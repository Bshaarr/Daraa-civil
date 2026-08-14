import { TooltipProvider } from "./src/components/ui/tooltip";
import { Toaster } from "./src/components/ui/toaster";
import ErrorBoundary from "./src/components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Home /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}

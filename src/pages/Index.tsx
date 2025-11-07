import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Assessment } from "@/components/Assessment";
import { Results } from "@/components/Results";

type View = "home" | "assessment" | "results";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("home");
  const [assessmentResults, setAssessmentResults] = useState<{
    score: number;
    category: string;
  } | null>(null);

  const handleStartAssessment = () => {
    setCurrentView("assessment");
  };

  const handleAssessmentComplete = (score: number, category: string) => {
    setAssessmentResults({ score, category });
    setCurrentView("results");
  };

  const handleRestart = () => {
    setCurrentView("home");
    setAssessmentResults(null);
  };

  return (
    <div className="min-h-screen">
      {currentView === "home" && (
        <>
          <Hero onStartAssessment={handleStartAssessment} />
          <Features />
        </>
      )}
      
      {currentView === "assessment" && (
        <Assessment
          onComplete={handleAssessmentComplete}
          onBack={handleRestart}
        />
      )}
      
      {currentView === "results" && assessmentResults && (
        <Results
          score={assessmentResults.score}
          category={assessmentResults.category}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Index;

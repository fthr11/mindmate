import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AssessmentProps {
  onComplete: (score: number, category: string) => void;
  onBack: () => void;
}

const questions = [
  // Depression Indicators
  {
    id: 1,
    text: "Over the past two weeks, how often have you felt down, depressed, or hopeless?",
    category: "depression"
  },
  {
    id: 2,
    text: "How often have you had little interest or pleasure in doing things you usually enjoy?",
    category: "depression"
  },
  {
    id: 3,
    text: "How often have you felt bad about yourself or that you are a failure?",
    category: "depression"
  },
  {
    id: 4,
    text: "How often have you had thoughts that you would be better off dead or of hurting yourself?",
    category: "depression"
  },
  // Anxiety Indicators
  {
    id: 5,
    text: "How often have you felt nervous, anxious, or on edge?",
    category: "anxiety"
  },
  {
    id: 6,
    text: "How often have you been unable to stop or control worrying?",
    category: "anxiety"
  },
  {
    id: 7,
    text: "How often have you felt afraid as if something awful might happen?",
    category: "anxiety"
  },
  {
    id: 8,
    text: "How often have you had trouble relaxing?",
    category: "anxiety"
  },
  // Stress & Overwhelm
  {
    id: 9,
    text: "How often have you felt overwhelmed by daily responsibilities?",
    category: "stress"
  },
  {
    id: 10,
    text: "How often have you felt that things were piling up so high you couldn't overcome them?",
    category: "stress"
  },
  {
    id: 11,
    text: "How often have you been upset because of something that happened unexpectedly?",
    category: "stress"
  },
  // Sleep & Energy
  {
    id: 12,
    text: "How often have you had trouble falling or staying asleep, or sleeping too much?",
    category: "sleep"
  },
  {
    id: 13,
    text: "How often have you felt tired or had little energy throughout the day?",
    category: "energy"
  },
  {
    id: 14,
    text: "How often have you had poor appetite or overeating?",
    category: "physical"
  },
  // Cognitive Function
  {
    id: 15,
    text: "How often have you had trouble concentrating on things like reading or watching TV?",
    category: "focus"
  },
  {
    id: 16,
    text: "How often have you had difficulty making decisions?",
    category: "focus"
  },
  {
    id: 17,
    text: "How often have you felt your mind racing with thoughts?",
    category: "focus"
  },
  // Social & Behavioral
  {
    id: 18,
    text: "How often have you avoided social situations or activities?",
    category: "social"
  },
  {
    id: 19,
    text: "How often have you felt disconnected from friends and family?",
    category: "social"
  },
  {
    id: 20,
    text: "How often have you moved or spoken slowly, or been fidgety or restless?",
    category: "behavioral"
  },
  // Physical Symptoms
  {
    id: 21,
    text: "How often have you experienced physical symptoms like headaches, stomachaches, or muscle tension?",
    category: "physical"
  },
  {
    id: 22,
    text: "How often have you felt your heart pounding or racing?",
    category: "physical"
  },
  // Emotional Regulation
  {
    id: 23,
    text: "How often have you felt irritable or easily angered?",
    category: "emotional"
  },
  {
    id: 24,
    text: "How often have you had sudden mood changes or emotional outbursts?",
    category: "emotional"
  },
  // Self-Worth & Motivation
  {
    id: 25,
    text: "How often have you felt confident in your ability to handle personal problems?",
    category: "coping",
    reversed: true
  },
  {
    id: 26,
    text: "How often have you felt motivated to achieve your goals?",
    category: "motivation",
    reversed: true
  },
  {
    id: 27,
    text: "How often have you engaged in activities that help you cope with stress?",
    category: "coping",
    reversed: true
  }
];

const options = [
  { value: "0", label: "Not at all" },
  { value: "1", label: "Several days" },
  { value: "2", label: "More than half the days" },
  { value: "3", label: "Nearly every day" }
];

export const Assessment = ({ onComplete, onBack }: AssessmentProps) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const totalScore = Object.entries(answers).reduce((sum, [index, val]) => {
      const question = questions[parseInt(index)];
      const score = parseInt(val);
      return sum + (question.reversed ? (3 - score) : score);
    }, 0);
    const maxScore = questions.length * 3;
    const percentage = (totalScore / maxScore) * 100;
    let category = "minimal";
    if (percentage > 65) category = "severe";
    else if (percentage > 45) category = "moderate";
    else if (percentage > 25) category = "mild";
    onComplete(percentage, category);
  };

  const allAnswered = questions.every((_, index) => answers[index] !== undefined);
  const currentQuestionData = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <Button variant="ghost" onClick={onBack} className="mb-8">
          <ChevronLeft className="mr-2 w-4 h-4" /> Back to Home
        </Button>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Comprehensive Mental Wellness Assessment</CardTitle>
            <CardDescription>
              Question {currentQuestion + 1} of {questions.length}
            </CardDescription>
            {/* Progress bar */}
            <div className="w-full bg-purple-400 rounded-full h-2 mt-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-6">
                {currentQuestionData.text}
              </h3>
              <RadioGroup
                value={answers[currentQuestion] || ""}
                onValueChange={(value) => handleAnswer(currentQuestion, value)}
                className="space-y-5"
              >
                {options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3">
                    <RadioGroupItem 
                      value={option.value} 
                      id={`${currentQuestionData.id}-${option.value}`} 
                    />
                    <Label htmlFor={`${currentQuestionData.id}-${option.value}`} className="text-lg">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={handlePrevious} 
                disabled={currentQuestion === 0}
              >
                <ChevronLeft className="mr-2 w-4 h-4" /> Previous
              </Button>

              {isLastQuestion ? (
                <Button 
                  onClick={handleSubmit} 
                  disabled={!allAnswered}
                >
                  Complete Assessment
                </Button>
              ) : (
                <Button 
                  onClick={handleNext}
                  disabled={!answers[currentQuestion]}
                >
                  Next <ChevronLeft className="ml-2 w-4 h-4 rotate-180" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
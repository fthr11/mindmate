import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Heart, Phone, BookOpen, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface ResultsProps {
  score: number;
  category: string;
  onRestart: () => void;
}

const categoryInfo = {
  minimal: {
    title: "Minimal Concerns Detected",
    description: "Your responses suggest you're managing well with minimal mental health concerns. Your current coping strategies appear effective!",
    color: "text-accent",
    interpretation: "Based on your comprehensive assessment, you're showing strong resilience and healthy emotional regulation. Continue nurturing your mental wellness.",
    recommendations: [
      "Continue with your current healthy lifestyle habits and routines",
      "Practice regular self-care activities that bring you joy",
      "Maintain strong connections with friends, family, and community",
      "Keep a balanced approach to work, rest, and leisure",
      "Consider journaling to track your mental wellness journey",
      "Share your positive coping strategies with others who might benefit"
    ]
  },
  mild: {
    title: "Mild Concerns Identified",
    description: "Your responses suggest some areas experiencing mild stress or difficulty that could benefit from attention and proactive self-care.",
    color: "text-primary",
    interpretation: "You're experiencing some challenges that are common and manageable with the right support and strategies. Early intervention through lifestyle changes can be very effective.",
    recommendations: [
      "Start a daily mindfulness or meditation practice (even 5-10 minutes helps)",
      "Engage in regular physical activity - aim for 30 minutes most days",
      "Establish a consistent sleep schedule with 7-9 hours nightly",
      "Talk openly with trusted friends or family about your feelings",
      "Monitor your mental health with regular check-ins (weekly assessments)",
      "Learn and practice stress-reduction techniques like deep breathing",
      "Consider keeping a mood journal to identify patterns and triggers",
      "Limit alcohol, caffeine, and screen time before bed"
    ]
  },
  moderate: {
    title: "Moderate Concerns Present",
    description: "Your responses indicate moderate mental health concerns that would benefit from professional support and structured interventions.",
    color: "text-secondary",
    interpretation: "You're experiencing significant challenges that are impacting your daily functioning. Professional guidance can provide effective strategies and support for improvement.",
    recommendations: [
      "Schedule an appointment with a mental health professional (therapist, counselor, or psychologist)",
      "Talk to your primary care doctor about your mental health concerns",
      "Practice daily stress-reduction techniques (meditation, yoga, progressive muscle relaxation)",
      "Establish and maintain a consistent sleep routine",
      "Reach out to support groups - connecting with others helps",
      "Create a crisis plan with trusted contacts and resources",
      "Consider therapy options like CBT (Cognitive Behavioral Therapy)",
      "Limit exposure to stress triggers when possible",
      "Engage in activities you previously enjoyed, even if you don't feel like it",
      "Ask for help with daily responsibilities if feeling overwhelmed"
    ]
  },
  severe: {
    title: "Significant Concerns - Action Needed",
    description: "Your responses indicate significant mental health concerns that require immediate professional attention and support.",
    color: "text-destructive",
    interpretation: "You're experiencing serious symptoms that are likely interfering substantially with your daily life. Please know that help is available, and reaching out is a sign of strength, not weakness.",
    recommendations: [
      "Contact a mental health professional or crisis helpline TODAY - don't wait",
      "If you're having thoughts of self-harm, call 123 (Suicide & Crisis Lifeline) immediately",
      "Schedule an urgent appointment with your doctor or a psychiatrist",
      "Don't isolate yourself - reach out to trusted friends or family members now",
      "Consider both therapy and medication evaluation for comprehensive treatment",
      "Remove any means of self-harm from your environment",
      "Create a safety plan with emergency contacts readily available",
      "Join support groups for ongoing peer support",
      "Take medical leave if work is contributing to severe stress",
      "Visit an emergency room if you feel you're in immediate danger",
      "Remember: This is temporary, treatment works, and recovery is possible"
    ]
  }
};

const resources = [
  {
    icon: Phone,
    title: "Crisis Helpline",
    description: "24/7 support available",
    contact: "123 - Suicide & Crisis Lifeline"
  },
  {
    icon: Users,
    title: "Support Groups",
    description: "Connect with others",
    contact: "Find local groups"
  },
  {
    icon: BookOpen,
    title: "Educational Resources",
    description: "Learn about mental health",
    contact: "Browse articles & guides"
  },
  {
    icon: Heart,
    title: "Self-Care Tools",
    description: "Daily wellness practices",
    contact: "Explore techniques"
  }
];

export const Results = ({ score, category, onRestart }: ResultsProps) => {
  const info = categoryInfo[category as keyof typeof categoryInfo];

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-5xl space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Your Assessment Results</h2>
          <p className="text-xl text-muted-foreground">
            Thank you for taking the time to assess your mental wellness
          </p>
        </div>

        <Card className="shadow-xl border-2" style={{ background: 'var(--gradient-card)' }}>
          <CardHeader className="text-center space-y-4">
            <CardTitle className={`text-3xl ${info.color}`}>
              {info.title}
            </CardTitle>
            <CardDescription className="text-lg">
              {info.description}
            </CardDescription>
            <div className="max-w-2xl mx-auto mt-4 p-4 rounded-lg bg-muted/30 border">
              <p className="text-sm leading-relaxed text-foreground">
                <strong>Understanding Your Results:</strong> {info.interpretation}
              </p>
            </div>
            <div className="pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Concern Level</span>
                <span className="font-semibold">{Math.round(score)}%</span>
              </div>
              <Progress value={score} className="h-3" />
              <p className="text-xs text-muted-foreground pt-1">
                Based on your responses to 27 comprehensive mental health indicators
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                Personalized Action Plan
              </h3>
              <p className="text-muted-foreground mb-4">
                Based on your assessment, here are specific steps to support your mental wellness:
              </p>
              <ul className="space-y-3">
                {info.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors border">
                    <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-base leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t">
              <h3 className="text-2xl font-semibold mb-6">Mental Health Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {resources.map((resource, index) => {
                  const Icon = resource.icon;
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary/10">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{resource.title}</CardTitle>
                            <CardDescription>{resource.description}</CardDescription>
                            <p className="mt-2 text-sm font-semibold text-primary">
                              {resource.contact}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center pt-6 gap-2">
              <Button
                size="lg"
                onClick={onRestart}
                className="text-lg px-8 py-6"
              >
                Return to Home
              </Button>
              <a 
                className="text-lg font-semibold px-8 py-2 hover:bg-cyan-200 hover:text-white items-center bg-card/80 backdrop-blur-sm border-2 rounded-lg"
                href="/chatbot"
              >
                AI Chat
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-2">
          <CardContent className="p-8 space-y-4">
            <div>
              <h4 className="font-semibold text-lg mb-2">Important Disclaimer</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This comprehensive mental wellness assessment is a screening tool designed to help you understand your current mental health status. 
                It is <strong>not a diagnostic instrument</strong> and should not replace professional medical advice, diagnosis, or treatment.
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If you're experiencing mental health concerns, please consult with a qualified healthcare provider, licensed therapist, 
                or psychiatrist. They can provide proper diagnosis, personalized treatment plans, and ongoing support tailored to your specific needs.
              </p>
            </div>
            <div className="pt-2 border-t">
              <p className="text-sm font-semibold text-destructive">
                If you're in crisis or having thoughts of self-harm, please call 123 (Suicide & Crisis Lifeline) or visit your nearest emergency room immediately.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

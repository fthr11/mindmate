import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import heroImage from "@/assets/hero-wellness.jpg";

interface HeroProps {
  onStartAssessment: () => void;
}

export const Hero = ({ onStartAssessment }: HeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3
        }}
      />
      <div className="absolute inset-0 z-0" style={{ background: 'var(--gradient-hero)' }} />
      
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm shadow-lg mb-4">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Your Mental Wellness Matters</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Understanding Your
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Mental Wellbeing
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Take the first step towards better mental health with our comprehensive self-assessment tools and personalized insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="group text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              onClick={onStartAssessment}
            >
              Start Assessment
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <a 
                className="text-lg font-semibold px-8 py-2 hover:bg-cyan-200 hover:text-white items-center bg-card/80 backdrop-blur-sm border-2 rounded-lg"
                href="/chatbot"
            >
              AI Chat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

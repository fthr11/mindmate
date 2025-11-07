import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, MessageCircle, Shield, Sparkles, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Science-Based Assessment",
    description: "Our tools are based on validated psychological screening methods used by professionals worldwide."
  },
  {
    icon: Shield,
    title: "Private & Confidential",
    description: "Your responses are completely anonymous. We prioritize your privacy and data security."
  },
  {
    icon: Sparkles,
    title: "Personalized Insights",
    description: "Receive customized recommendations based on your unique assessment results."
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    description: "Monitor your mental wellness journey with regular assessments and trend analysis."
  },
  {
    icon: Heart,
    title: "Self-Care Resources",
    description: "Access curated resources, coping strategies, and self-care techniques."
  },
  {
    icon: MessageCircle,
    title: "Professional Support",
    description: "Connect with mental health resources and find professional help when needed."
  }
];

export const Features = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive mental health support designed with your wellbeing in mind
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50"
                style={{ background: 'var(--gradient-card)' }}
              >
                <CardHeader>
                  <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

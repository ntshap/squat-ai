import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Camera, Upload, Zap, Target, TrendingUp, Play, ArrowRight, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Demo = () => {
  const features = [
    {
      icon: <Camera className="w-8 h-8 text-dashboard-yellow" />,
      title: "Live Analysis",
      description: "Real-time squat form analysis using your camera with instant feedback"
    },
    {
      icon: <Upload className="w-8 h-8 text-dashboard-yellow" />,
      title: "Video Upload",
      description: "Upload your workout videos for detailed analysis and form correction"
    },
    {
      icon: <Target className="w-8 h-8 text-dashboard-yellow" />,
      title: "Form Correction",
      description: "AI-powered feedback to help you perfect your squat technique"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-dashboard-yellow" />,
      title: "Progress Tracking",
      description: "Track your improvement with detailed statistics and performance metrics"
    },
    {
      icon: <Activity className="w-8 h-8 text-dashboard-yellow" />,
      title: "Movement Efficiency",
      description: "Analyze your movement patterns and optimize your workout efficiency"
    },
    {
      icon: <Zap className="w-8 h-8 text-dashboard-yellow" />,
      title: "Instant Feedback",
      description: "Get immediate corrections and tips to improve your form in real-time"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Clean geometric background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-dashboard-yellow/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-gradient-to-br from-dashboard-yellow/2 via-transparent to-primary/3 opacity-40"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-dashboard-yellow/15 border border-dashboard-yellow/30 rounded-full px-6 py-3 mb-8 animate-fade-in shadow-sm">
            <Sparkles className="w-5 h-5 text-dashboard-yellow" />
            <span className="text-sm font-medium text-dashboard-yellow">AI-Powered Fitness Analysis</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-dashboard-yellow via-dashboard-yellow/80 to-dashboard-yellow bg-clip-text text-transparent">
              AI Squat-Form-Pro
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in font-light">
            Perfect your squat form with AI-powered analysis. Get real-time feedback, 
            track your progress, and achieve your fitness goals with precision.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in">
            <Link to="/app">
              <Button size="lg" className="bg-dashboard-yellow hover:bg-dashboard-yellow/90 text-black font-semibold px-8 py-4 text-lg rounded-xl">
                Start Analyzing
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-dashboard-yellow/30 text-foreground hover:bg-dashboard-yellow/5 px-8 py-4 text-lg rounded-xl">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Why Choose AI Squat-Form-Pro?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in font-light">
              Experience the future of fitness with our cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group border-border hover:border-dashboard-yellow/40 transition-all duration-500 hover:scale-105 bg-card backdrop-blur-sm overflow-hidden relative rounded-2xl shadow-sm hover:shadow-lg"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardHeader className="pb-4 relative text-center">
                  <div className="flex flex-col items-center gap-6 mb-4">
                    <div className="p-6 rounded-2xl bg-dashboard-yellow/15 group-hover:bg-dashboard-yellow/25 transition-colors duration-300 relative border border-dashboard-yellow/20">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-2xl group-hover:text-dashboard-yellow transition-colors duration-300 font-semibold">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-muted-foreground leading-relaxed text-lg font-light">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-muted/50 relative border-t border-border">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-center text-foreground mb-20 animate-fade-in">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                step: "1",
                title: "Set Up",
                description: "Choose between live camera analysis or upload a video of your workout",
                icon: <Camera className="w-16 h-16 text-dashboard-yellow" />
              },
              {
                step: "2", 
                title: "Analyze",
                description: "Our AI analyzes your movements and identifies areas for improvement",
                icon: <Activity className="w-16 h-16 text-dashboard-yellow" />
              },
              {
                step: "3",
                title: "Improve", 
                description: "Get instant feedback and track your progress over time",
                icon: <TrendingUp className="w-16 h-16 text-dashboard-yellow" />
              }
            ].map((item, index) => (
              <div key={index} className="text-center group animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="relative mb-8">
                  <div className="w-40 h-40 mx-auto mb-6 rounded-3xl bg-card border border-border group-hover:border-dashboard-yellow/40 transition-colors duration-300 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    {item.icon}
                  </div>
                  
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-dashboard-yellow rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-2xl font-bold text-black">{item.step}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4 group-hover:text-dashboard-yellow transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 animate-fade-in">
            Ready to Perfect Your Squat Form?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in font-light">
            Join thousands of users who have improved their fitness with AI-powered form analysis
          </p>
          
          <div className="grid grid-cols-3 gap-12 mb-12 max-w-3xl mx-auto">
            {[
              { number: "10K+", label: "Happy Users" },
              { number: "50M+", label: "Squats Analyzed" },
              { number: "95%", label: "Accuracy Rate" }
            ].map((stat, index) => (
              <div key={index} className="text-center group animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="text-3xl md:text-4xl font-bold text-dashboard-yellow mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-light">{stat.label}</div>
              </div>
            ))}
          </div>

          <Link to="/app">
            <Button size="lg" className="bg-dashboard-yellow hover:bg-dashboard-yellow/90 text-black font-semibold px-12 py-6 text-xl rounded-2xl">
              Get Started Now
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Demo;

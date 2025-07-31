import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Camera, Upload, Zap, Target, TrendingUp, Play, ArrowRight, Star, Sparkles, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Demo = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      icon: <Camera className="w-8 h-8 text-dashboard-yellow" />,
      title: "Analisis Langsung",
      description: "Analisis gerakan squat secara real-time menggunakan kamera dengan umpan balik instan"
    },
    {
      icon: <Upload className="w-8 h-8 text-dashboard-yellow" />,
      title: "Unggah Video",
      description: "Unggah video latihan Anda untuk analisis detail dan koreksi postur"
    },
    {
      icon: <Target className="w-8 h-8 text-dashboard-yellow" />,
      title: "Koreksi Postur",
      description: "Umpan balik bertenaga AI untuk membantu menyempurnakan teknik squat Anda"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-dashboard-yellow" />,
      title: "Pelacakan Kemajuan",
      description: "Lacak peningkatan Anda dengan statistik detail dan metrik performa"
    },
    {
      icon: <Activity className="w-8 h-8 text-dashboard-yellow" />,
      title: "Efisiensi Gerakan",
      description: "Analisis pola gerakan Anda dan optimalkan efisiensi latihan"
    },
    {
      icon: <Zap className="w-8 h-8 text-dashboard-yellow" />,
      title: "Umpan Balik Instan",
      description: "Dapatkan koreksi dan tips langsung untuk meningkatkan postur secara real-time"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced animated background with floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating background elements */}
        <div 
          className="absolute top-20 left-10 w-96 h-96 bg-dashboard-yellow/5 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-20 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${-mousePosition.x * 0.015}px, ${-mousePosition.y * 0.015}px)`,
            animationDelay: '1s'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-gradient-to-br from-dashboard-yellow/2 via-transparent to-primary/3 opacity-40"
          style={{
            transform: `translate(-50%, -50%) rotate(${scrollY * 0.05}deg)`
          }}
        ></div>
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-dashboard-yellow/15 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Geometric shapes */}
        <div className="absolute top-40 right-40 w-16 h-16 border-2 border-dashboard-yellow/20 rotate-45 animate-rotate-slow"></div>
        <div className="absolute bottom-40 left-40 w-12 h-12 bg-dashboard-yellow/10 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-60 left-20 w-8 h-8 bg-primary/15 transform rotate-45 animate-float"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-dashboard-yellow/15 border border-dashboard-yellow/30 rounded-full px-6 py-3 mb-8 animate-fade-in shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group">
            <Sparkles className="w-5 h-5 text-dashboard-yellow group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-sm font-medium text-dashboard-yellow">Analisis Kebugaran Bertenaga AI</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-6 animate-fade-in hover:scale-105 transition-transform duration-500 cursor-default">
            <span className="bg-gradient-to-r from-dashboard-yellow via-dashboard-yellow/80 to-dashboard-yellow bg-clip-text text-transparent animate-gradient-x">
              SquatSense AI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in font-light hover:text-slate-800 dark:hover:text-foreground transition-colors duration-300">
            Sempurnakan postur squat Anda dengan analisis bertenaga AI. Dapatkan umpan balik real-time, 
            lacak kemajuan Anda, dan capai tujuan kebugaran dengan presisi.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in mb-12">
            <Link to="/app">
              <Button size="lg" className="bg-dashboard-yellow hover:bg-dashboard-yellow/90 text-black font-semibold px-8 py-4 text-lg rounded-xl group relative overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <span className="relative z-10">Mulai Analisis</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-dashboard-yellow/30 text-foreground hover:bg-dashboard-yellow/5 px-8 py-4 text-lg rounded-xl group hover:scale-105 transition-all duration-300 hover:border-dashboard-yellow/60">
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Tonton Demo
            </Button>
          </div>
          
          {/* Scroll indicator */}
          <div className="animate-bounce mt-16">
            <ChevronDown className="w-8 h-8 text-dashboard-yellow mx-auto opacity-70 hover:opacity-100 transition-opacity cursor-pointer" />
            <p className="text-sm text-slate-500 dark:text-muted-foreground mt-2">Gulir untuk melihat fitur</p>
          </div>
        </div>
        
        {/* Floating action icons */}
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 space-y-6 hidden lg:block">
          {[Camera, Target, Activity].map((Icon, index) => (
            <div
              key={index}
              className="w-12 h-12 bg-dashboard-yellow/10 border border-dashboard-yellow/20 rounded-full flex items-center justify-center hover:bg-dashboard-yellow/20 hover:scale-110 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <Icon className="w-6 h-6 text-dashboard-yellow" />
            </div>
          ))}
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-24 px-6 relative bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-dashboard-yellow/15 border border-dashboard-yellow/30 rounded-full px-6 py-3 mb-8 animate-fade-in">
              <Play className="w-5 h-5 text-dashboard-yellow" />
              <span className="text-sm font-medium text-dashboard-yellow">Lihat Demo</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Demo Analisis Squat
            </h2>
            <p className="text-xl text-slate-600 dark:text-muted-foreground max-w-3xl mx-auto animate-fade-in font-light">
              Saksikan bagaimana SquatSense AI menganalisis postur dan memberikan umpan balik real-time
            </p>
          </div>
          
          {/* Large Video Container */}
          <div className="relative max-w-5xl mx-auto group animate-fade-in">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-dashboard-yellow/10 via-card to-dashboard-yellow/5 border border-dashboard-yellow/20 group-hover:border-dashboard-yellow/40 transition-all duration-500 hover:shadow-3xl hover:shadow-dashboard-yellow/20">
              
              {/* Demo Video */}
              <video 
                className="w-full h-full object-contain rounded-3xl bg-black/5"
                controls
                preload="metadata"
                playsInline
                autoPlay={false}
                muted={false}
              >
                <source src="/original-demo.mp4" type="video/mp4" />
                <source src="/original-demo.mp4" type="video/webm" />
                <p className="text-center text-slate-600 dark:text-muted-foreground p-8">
                  Video tidak dapat dimuat atau browser tidak mendukung format video. 
                  <br />
                  <a href="/original-demo.mp4" className="text-dashboard-yellow hover:underline" target="_blank" rel="noopener noreferrer">
                    Buka video di tab baru
                  </a>
                  {" atau "}
                  <a href="/original-demo.mp4" className="text-dashboard-yellow hover:underline" download>
                    Download video
                  </a>
                </p>
              </video>
              
              {/* Floating UI elements simulation - will show over video */}
              <div className="absolute top-6 left-6 bg-card/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-dashboard-yellow/20 shadow-lg pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">Analisis Real-time</span>
                </div>
              </div>
              
              <div className="absolute top-6 right-6 bg-card/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-dashboard-yellow/20 shadow-lg pointer-events-none">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-dashboard-yellow" />
                  <span className="text-sm font-medium text-foreground">Postur: 92%</span>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-dashboard-yellow/20 shadow-lg pointer-events-none">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-dashboard-yellow" />
                  <span className="text-sm font-medium text-foreground">Repetisi: 15</span>
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 bg-card/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-dashboard-yellow/20 shadow-lg pointer-events-none">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-foreground">Improving</span>
                </div>
              </div>
              
              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-dashboard-yellow/30 rounded-tl-lg pointer-events-none"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-dashboard-yellow/30 rounded-tr-lg pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-dashboard-yellow/30 rounded-bl-lg pointer-events-none"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-dashboard-yellow/30 rounded-br-lg pointer-events-none"></div>
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-dashboard-yellow/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
          </div>
          
          {/* Feature highlights below video */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            {[
              {
                icon: <Activity className="w-6 h-6 text-dashboard-yellow" />,
                title: "Analisis Real-time",
                description: "Umpan balik langsung saat Anda berlatih"
              },
              {
                icon: <Target className="w-6 h-6 text-dashboard-yellow" />,
                title: "Deteksi Postur",
                description: "AI mengidentifikasi kesalahan postur secara akurat"
              },
              {
                icon: <TrendingUp className="w-6 h-6 text-dashboard-yellow" />,
                title: "Tracking Progress",
                description: "Pantau peningkatan performa dari waktu ke waktu"
              }
            ].map((item, index) => (
              <div key={index} className="text-center group animate-fade-in hover-lift" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border group-hover:border-dashboard-yellow/40 transition-all duration-300 hover:shadow-lg">
                  <div className="w-12 h-12 bg-dashboard-yellow/15 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-dashboard-yellow/25 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-dashboard-yellow transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Mengapa Memilih SquatSense AI?
            </h2>
            <p className="text-xl text-slate-600 dark:text-muted-foreground max-w-3xl mx-auto animate-fade-in font-light">
              Rasakan masa depan kebugaran dengan teknologi AI terdepan kami
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group border-border hover:border-dashboard-yellow/40 transition-all duration-500 hover:scale-105 bg-card backdrop-blur-sm overflow-hidden relative rounded-2xl shadow-sm hover:shadow-lg hover:shadow-dashboard-yellow/20 animate-fade-in cursor-pointer"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-dashboard-yellow/5 via-transparent to-dashboard-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating icon animation */}
                <CardHeader className="pb-4 relative text-center">
                  <div className="flex flex-col items-center gap-6 mb-4">
                    <div className="p-6 rounded-2xl bg-dashboard-yellow/15 group-hover:bg-dashboard-yellow/25 transition-all duration-300 relative border border-dashboard-yellow/20 group-hover:border-dashboard-yellow/40 hover:rotate-3 hover:scale-110">
                      <div className="relative z-10">
                        {feature.icon}
                      </div>
                      {/* Glow effect - removed ping animation */}
                      <div className="absolute inset-0 bg-dashboard-yellow/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-dashboard-yellow transition-colors duration-300 font-semibold transform group-hover:scale-105">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <CardDescription className="text-slate-600 dark:text-muted-foreground group-hover:text-slate-800 dark:group-hover:text-foreground leading-relaxed text-lg font-light transition-colors duration-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                
                {/* Corner decoration */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-dashboard-yellow/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-dashboard-yellow/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-muted/50 relative border-t border-border overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-dashboard-yellow/5 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-center text-foreground mb-20 animate-fade-in hover:scale-105 transition-transform duration-300">
            Cara Kerja
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                step: "1",
                title: "Persiapan",
                description: "Pilih antara analisis kamera langsung atau unggah video latihan Anda",
                icon: <Camera className="w-16 h-16 text-dashboard-yellow group-hover-float" />
              },
              {
                step: "2", 
                title: "Analisis",
                description: "AI kami menganalisis gerakan Anda dan mengidentifikasi area yang perlu diperbaiki",
                icon: <Activity className="w-16 h-16 text-dashboard-yellow group-hover-float" />
              },
              {
                step: "3",
                title: "Perbaikan", 
                description: "Dapatkan umpan balik instan dan lacak kemajuan Anda dari waktu ke waktu",
                icon: <TrendingUp className="w-16 h-16 text-dashboard-yellow group-hover-float" />
              }
            ].map((item, index) => (
              <div key={index} className="text-center group animate-fade-in hover-lift cursor-pointer" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="relative mb-8">
                  <div className="w-40 h-40 mx-auto mb-6 rounded-3xl bg-card border border-border group-hover:border-dashboard-yellow/40 transition-all duration-500 flex items-center justify-center group-hover:scale-110 shadow-sm hover:shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                      {item.icon}
                    </div>
                    {/* Ripple effect on hover */}
                    <div className="absolute inset-0 bg-dashboard-yellow/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-dashboard-yellow/5 rounded-3xl scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                  </div>
                  
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-dashboard-yellow rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span className="text-2xl font-bold text-black">{item.step}</span>
                  </div>
                  
                  {/* Connecting line for desktop */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-20 left-full w-16 h-0.5 bg-dashboard-yellow/30 transform translate-x-8">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-dashboard-yellow/50 rounded-full"></div>
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4 group-hover:text-dashboard-yellow transition-colors duration-300 transform group-hover:scale-105">
                  {item.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground leading-relaxed text-lg font-light transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-dashboard-yellow/20 to-transparent"></div>
          <div className="absolute top-20 left-20 w-40 h-40 bg-dashboard-yellow/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Floating elements */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-dashboard-yellow/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 animate-fade-in hover:scale-105 transition-transform duration-300">
            Siap Menyempurnakan Postur Squat Anda?
          </h2>
          <p className="text-xl text-slate-600 dark:text-muted-foreground hover:text-slate-800 dark:hover:text-foreground mb-12 max-w-3xl mx-auto animate-fade-in font-light transition-colors duration-300">
            Bergabunglah dengan ribuan pengguna yang telah meningkatkan kebugaran mereka dengan analisis postur bertenaga AI
          </p>
          
          <div className="grid grid-cols-3 gap-12 mb-12 max-w-3xl mx-auto">
            {[
              { number: "10K+", label: "Pengguna Senang" },
              { number: "50M+", label: "Squat Dianalisis" },
              { number: "95%", label: "Tingkat Akurasi" }
            ].map((stat, index) => (
              <div key={index} className="text-center group animate-fade-in hover-lift cursor-pointer" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative p-6 rounded-2xl bg-card/50 border border-border group-hover:border-dashboard-yellow/40 transition-all duration-300 hover:shadow-lg backdrop-blur-sm">
                  <div className="text-3xl md:text-4xl font-bold text-dashboard-yellow mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground group-hover:text-foreground font-light transition-colors duration-300">{stat.label}</div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-dashboard-yellow/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Corner decoration */}
                  <div className="absolute top-2 right-2 w-1 h-1 bg-dashboard-yellow/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          <Link to="/app" className="inline-block animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Button size="lg" className="bg-dashboard-yellow hover:bg-dashboard-yellow/90 text-black font-semibold px-12 py-6 text-xl rounded-2xl group relative overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-dashboard-yellow/20">
              <span className="relative z-10">Mulai Sekarang</span>
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Ripple effect */}
              <div className="absolute inset-0 bg-white/10 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            </Button>
          </Link>
          
          {/* Floating call-to-action elements */}
          <div className="mt-12 flex justify-center space-x-8">
            {[Star, Zap, Target].map((Icon, index) => (
              <div
                key={index}
                className="w-8 h-8 text-dashboard-yellow opacity-50 hover:opacity-100 hover:scale-110 cursor-pointer transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Icon className="w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Demo;

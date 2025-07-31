// File: src/components/LiveAnalysis.tsx
// Deskripsi: Komponen React untuk analisis real-time yang kompatibel dengan Flask backend

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { 
  Camera, 
  Square, 
  AlertCircle, 
  Activity, 
  Settings,
  Wifi,
  WifiOff
} from 'lucide-react';
import StatCard from './StatCard';
import FeedbackDisplay from './FeedbackDisplay';

interface AnalysisResponse {
  processed_image: string;
  feedback: string;
  rep_count: number;
  incorrect_count: number;
  total_calories: number;
  calories_per_rep: number;
  efficiency: number;
  stage: string;
  error?: string;
}

const LiveAnalysis: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const lastFrameTime = useRef<number>(0);
  const sessionId = useRef<string>(`session_${Date.now()}`);

  // States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<string>('Mulai analisis untuk mendapatkan masukan.');
  const [stats, setStats] = useState({
    repCount: 0,
    incorrectCount: 0,
    totalCalories: 0,
    caloriesPerRep: 0,
    efficiency: 100,
    stage: 'up'
  });
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Settings
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [mode, setMode] = useState<'Beginner' | 'Pro'>('Beginner');
  const [weight, setWeight] = useState([70]);

  // Performance monitoring
  const [fps, setFps] = useState(0);
  const fpsCounter = useRef(0);
  const fpsStartTime = useRef(Date.now());

  // Get available cameras
  useEffect(() => {
    const getDevices = async () => {
      try {
        console.log('Requesting camera permissions...');
        // Request permission first
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // Stop the stream immediately after getting permission
        stream.getTracks().forEach(track => track.stop());
        
        console.log('Enumerating devices...');
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter(device => device.kind === 'videoinput');
        console.log('Found video devices:', videoInputs);
        
        setVideoDevices(videoInputs);
        
        if (videoInputs.length > 0 && !selectedDeviceId) {
          setSelectedDeviceId(videoInputs[0].deviceId);
          console.log('Selected default camera:', videoInputs[0].deviceId);
        } else if (videoInputs.length === 0) {
          setError('Tidak ada kamera yang terdeteksi. Pastikan kamera terhubung dan browser memiliki izin akses.');
        }
      } catch (err: any) {
        console.error("Error accessing camera:", err);
        if (err.name === 'NotAllowedError') {
          setError("Akses kamera ditolak. Silakan berikan izin akses kamera di browser.");
        } else if (err.name === 'NotFoundError') {
          setError("Tidak ada kamera yang ditemukan. Pastikan kamera terhubung dengan benar.");
        } else {
          setError(`Error mengakses kamera: ${err.message}`);
        }
      }
    };
    getDevices();
  }, [selectedDeviceId]);

  // Check server connectivity
  const checkServerHealth = useCallback(async () => {
    try {
      console.log('Checking server health...');
      const response = await fetch('http://127.0.0.1:5000/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add timeout
        signal: AbortSignal.timeout(5000)
      });
      
      console.log('Server response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Server health response:', data);
        setIsConnected(true);
        setError(null);
      } else {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (err: any) {
      console.error('Server health check failed:', err);
      setIsConnected(false);
      if (err.name === 'TimeoutError') {
        setError('Timeout: Server tidak merespons dalam 5 detik. Pastikan backend Flask berjalan di port 5000.');
      } else if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Tidak dapat terhubung ke server. Pastikan backend Flask berjalan di http://127.0.0.1:5000');
      } else {
        setError(`Error koneksi: ${err.message}`);
      }
    }
  }, []);

  // Check server health on mount and periodically
  useEffect(() => {
    checkServerHealth();
    const healthCheckInterval = setInterval(checkServerHealth, 30000); // Check every 30 seconds
    return () => clearInterval(healthCheckInterval);
  }, [checkServerHealth]);

  const startWebcam = async () => {
    console.log('Starting webcam...');
    console.log('Selected device ID:', selectedDeviceId);
    console.log('Available devices:', videoDevices.length);

    try {
      let constraints;
      
      // If no specific device selected, use default
      if (!selectedDeviceId || videoDevices.length === 0) {
        console.log('Using default camera');
        constraints = {
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            frameRate: { ideal: 30 }
          }
        };
      } else {
        console.log('Using selected camera:', selectedDeviceId);
        constraints = {
          video: {
            deviceId: { exact: selectedDeviceId },
            width: { ideal: 1280 },
            height: { ideal: 720 },
            frameRate: { ideal: 30 }
          }
        };
      }
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
        setError(null);
        console.log('Webcam started successfully');
        return true;
      }
    } catch (err: any) {
      console.error("Error accessing webcam:", err);
      
      // If exact device fails, try default camera
      if (selectedDeviceId && err.name === 'OverconstrainedError') {
        console.log('Exact device failed, trying default camera');
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 },
              frameRate: { ideal: 30 }
            }
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play();
            };
            setError(null);
            console.log('Default webcam started successfully');
            return true;
          }
        } catch (defaultErr) {
          console.error("Default camera also failed:", defaultErr);
        }
      }
      
      if (err.name === 'NotAllowedError') {
        setError("Akses kamera ditolak. Berikan izin akses kamera di browser.");
      } else if (err.name === 'NotFoundError') {
        setError("Kamera tidak ditemukan. Pastikan kamera terhubung.");
      } else {
        setError(`Error mengakses kamera: ${err.message}`);
      }
      return false;
    }
    return false;
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const resetSession = async () => {
    try {
      await fetch('http://127.0.0.1:5000/reset_session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId.current })
      });
      
      setStats({
        repCount: 0,
        incorrectCount: 0,
        totalCalories: 0,
        caloriesPerRep: 0,
        efficiency: 100,
        stage: 'up'
      });
      
      toast.success('Session direset');
    } catch (err) {
      console.error('Error resetting session:', err);
    }
  };

  const analyzeFrame = async () => {
    if (!isAnalyzing || !videoRef.current || videoRef.current.readyState < 3) {
      if (isAnalyzing) {
        animationFrameId.current = requestAnimationFrame(analyzeFrame);
      }
      return;
    }

    const currentTime = Date.now();
    // Limit to ~10 FPS to reduce server load
    if (currentTime - lastFrameTime.current < 100) {
      animationFrameId.current = requestAnimationFrame(analyzeFrame);
      return;
    }
    lastFrameTime.current = currentTime;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // If server not connected, just show video without analysis
    if (!isConnected) {
      // Update display canvas with raw video
      if (canvasRef.current) {
        const displayCtx = canvasRef.current.getContext('2d');
        if (displayCtx) {
          canvasRef.current.width = canvas.width;
          canvasRef.current.height = canvas.height;
          displayCtx.drawImage(video, 0, 0);
          
          // Add text overlay indicating no server connection
          displayCtx.fillStyle = 'red';
          displayCtx.font = '20px Arial';
          displayCtx.fillText('Server tidak terhubung - Tidak ada analisis', 10, 30);
        }
      }
      
      setFeedback('Server tidak terhubung. Menampilkan video tanpa analisis.');
      
      if (isAnalyzing) {
        animationFrameId.current = requestAnimationFrame(analyzeFrame);
      }
      return;
    }

    // Continue with server analysis if connected
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);

    try {
      const response = await fetch('http://127.0.0.1:5000/analyze_frame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          image: imageDataUrl,
          session_id: sessionId.current,
          mode: mode,
          weight: weight[0]
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      
      const result: AnalysisResponse = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }

      // Update stats
      setStats(prev => ({
        repCount: result.rep_count || prev.repCount,
        incorrectCount: result.incorrect_count || prev.incorrectCount,
        totalCalories: result.total_calories || prev.totalCalories,
        caloriesPerRep: result.calories_per_rep || prev.caloriesPerRep,
        efficiency: result.efficiency !== undefined ? result.efficiency : prev.efficiency,
        stage: result.stage || prev.stage
      }));

      setFeedback(result.feedback || 'Menganalisis...');

      // Update display canvas
      if (canvasRef.current && result.processed_image) {
        const displayCtx = canvasRef.current.getContext('2d');
        if (displayCtx) {
          const image = new Image();
          image.onload = () => {
            if (canvasRef.current) {
              canvasRef.current.width = image.width;
              canvasRef.current.height = image.height;
              displayCtx.drawImage(image, 0, 0);
            }
          };
          image.onerror = () => {
            console.error('Failed to load processed image');
          };
          image.src = result.processed_image;
        }
      }
      
      setError(null);
      setIsConnected(true);

      // Update FPS counter
      fpsCounter.current++;
      if (currentTime - fpsStartTime.current >= 1000) {
        setFps(fpsCounter.current);
        fpsCounter.current = 0;
        fpsStartTime.current = currentTime;
      }

    } catch (err: any) {
      console.error("Error analyzing frame:", err);
      setIsConnected(false);
      
      // Show video without analysis when server fails
      if (canvasRef.current) {
        const displayCtx = canvasRef.current.getContext('2d');
        if (displayCtx) {
          canvasRef.current.width = canvas.width;
          canvasRef.current.height = canvas.height;
          displayCtx.drawImage(video, 0, 0);
          
          // Add error overlay
          displayCtx.fillStyle = 'red';
          displayCtx.font = '16px Arial';
          displayCtx.fillText(`Error: ${err.message}`, 10, 30);
        }
      }
      
      if (err.message.includes('fetch')) {
        setError("Koneksi ke server terputus. Menampilkan video tanpa analisis.");
        setFeedback("Koneksi server terputus - Video tetap berjalan");
      } else {
        setError(`Gagal menganalisis: ${err.message}`);
        setFeedback("Error dalam analisis - Video tetap berjalan");
      }
    }

    if (isAnalyzing) {
      animationFrameId.current = requestAnimationFrame(analyzeFrame);
    }
  };

  const startAnalysis = async () => {
    console.log('Starting analysis...');
    console.log('Current state:', {
      isConnected,
      videoDevices: videoDevices.length,
      selectedDeviceId,
      isAnalyzing
    });
    
    // Always try to start webcam first
    const webcamStarted = await startWebcam();
    if (!webcamStarted) {
      toast.error("Tidak dapat mengakses kamera. Pastikan kamera tersedia dan browser memiliki izin.");
      return;
    }

    // If not connected, try to connect to server
    if (!isConnected) {
      toast.info("Mencoba menghubungkan ke server...");
      await checkServerHealth();
      
      // If still not connected after check, continue anyway with warning
      if (!isConnected) {
        toast.warning("Server tidak terhubung, namun kamera tetap dimulai. Analisis mungkin tidak akan berfungsi.");
      }
    }

    // Start analysis regardless of server connection
    setIsAnalyzing(true);
    toast.success("Analisis dimulai" + (isConnected ? "" : " (tanpa server)"));
  };

  const stopAnalysis = () => {
    setIsAnalyzing(false);
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    stopWebcam();
    toast.info("Analisis dihentikan");
  };

  useEffect(() => {
    if (isAnalyzing) {
      // Start analysis loop regardless of server connection
      animationFrameId.current = requestAnimationFrame(analyzeFrame);
    }
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      stopWebcam();
    };
  }, [isAnalyzing, mode, weight]); // Removed isConnected dependency

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Analisis Squat Real-time</h1>
        <p className="text-muted-foreground">
          Dapatkan feedback langsung untuk gerakan squat Anda
        </p>
      </div>

      {/* Connection Status */}
      <div className="flex items-center justify-center gap-4 mb-4">
        {isConnected ? (
          <div className="flex items-center gap-2 text-green-600">
            <Wifi className="w-4 h-4" />
            <span className="text-sm">Server terhubung</span>
            {isAnalyzing && <span className="text-xs">({fps} FPS)</span>}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-yellow-600">
              <WifiOff className="w-4 h-4" />
              <span className="text-sm">Server tidak terhubung {isAnalyzing ? "(Video tetap berjalan)" : ""}</span>
            </div>
            <Button 
              onClick={checkServerHealth} 
              size="sm" 
              variant="outline"
              className="text-xs"
            >
              Coba Lagi
            </Button>
          </div>
        )}
        
        {/* Debug info */}
        <div className="text-xs text-muted-foreground">
          Kamera: {videoDevices.length} | 
          Selected: {selectedDeviceId ? 'Ya' : 'Tidak'} |
          Status: {isAnalyzing ? 'Aktif' : 'Berhenti'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Display */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-dashboard-yellow" />
              Analisis Real-time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
              <canvas 
                ref={canvasRef} 
                className="w-full h-full object-cover" 
                style={{ display: isAnalyzing ? 'block' : 'none' }}
              />
              <video 
                ref={videoRef} 
                className="w-full h-full object-cover" 
                playsInline 
                muted
                style={{ 
                  display: isAnalyzing ? 'none' : 'block',
                  opacity: isAnalyzing ? 0 : 1 
                }}
              />
              
              {!isAnalyzing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-center text-white">
                    <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Klik "Mulai Analisis" untuk memulai</p>
                  </div>
                </div>
              )}
            </div>
            
            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Controls and Stats */}
        <div className="space-y-6">
          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-dashboard-yellow" />
                Pengaturan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Camera Selection */}
              <div className="space-y-2">
                <Label htmlFor="camera-select">Pilih Kamera</Label>
                <Select
                  value={selectedDeviceId}
                  onValueChange={setSelectedDeviceId}
                  disabled={isAnalyzing}
                >
                  <SelectTrigger id="camera-select">
                    <SelectValue placeholder="Pilih kamera..." />
                  </SelectTrigger>
                  <SelectContent>
                    {videoDevices.map((device, index) => (
                      <SelectItem key={device.deviceId} value={device.deviceId}>
                        {device.label || `Kamera ${index + 1}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Mode Selection */}
              <div className="space-y-2">
                <Label htmlFor="mode">Mode Latihan</Label>
                <Select 
                  value={mode} 
                  onValueChange={(value: 'Beginner' | 'Pro') => setMode(value)}
                  disabled={isAnalyzing}
                >
                  <SelectTrigger id="mode">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Pemula</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Weight Slider */}
              <div className="space-y-2">
                <Label htmlFor="weight">Berat Badan: {weight[0]} kg</Label>
                <Slider
                  id="weight"
                  min={30}
                  max={150}
                  step={1}
                  value={weight}
                  onValueChange={setWeight}
                  disabled={isAnalyzing}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Control Buttons */}
          <Card>
            <CardContent className="flex flex-col space-y-3 pt-6">
              <Button 
                onClick={startAnalysis} 
                disabled={isAnalyzing}
                className="w-full"
                size="lg"
              >
                <Camera className="mr-2 h-5 w-5" />
                Mulai Analisis
              </Button>
              
              {/* Status info */}
              <div className="text-xs text-muted-foreground text-center space-y-1">
                {videoDevices.length === 0 && (
                  <div className="text-yellow-600">⚠️ Pastikan kamera tersedia</div>
                )}
                {!isConnected && (
                  <div className="text-yellow-600">⚠️ Server akan dicoba hubungkan saat analisis dimulai</div>
                )}
              </div>
              
              <Button 
                onClick={stopAnalysis} 
                disabled={!isAnalyzing} 
                variant="destructive"
                className="w-full"
                size="lg"
              >
                <Square className="mr-2 h-5 w-5" />
                Hentikan Analisis
              </Button>

              <Button 
                onClick={resetSession}
                variant="outline"
                className="w-full"
                size="sm"
              >
                Reset Session
              </Button>
              
              {/* Test buttons for debugging */}
              <div className="flex gap-2">
                <Button 
                  onClick={checkServerHealth}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  Test Server
                </Button>
                <Button 
                  onClick={() => {
                    console.log('Current state:', {
                      isConnected,
                      videoDevices: videoDevices.length,
                      selectedDeviceId,
                      isAnalyzing
                    });
                  }}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  Debug Info
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Squat Benar" value={stats.repCount} />
            <StatCard label="Squat Salah" value={stats.incorrectCount} />
            <StatCard label="Kalori" value={stats.totalCalories.toFixed(1)} />
            <StatCard label="Efisiensi" value={`${stats.efficiency.toFixed(0)}%`} />
          </div>

          {/* Feedback */}
          <FeedbackDisplay feedback={feedback} />
        </div>
      </div>
    </div>
  );
};

export default LiveAnalysis;
// File: ntshap/squat-ai/src/components/LiveAnalysis.tsx
// Deskripsi: Komponen React yang dimodifikasi untuk berinteraksi dengan Flask API dan menambahkan fitur pemilihan kamera.

import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import StatCard from './StatCard';
import FeedbackDisplay from './FeedbackDisplay';

const LiveAnalysis: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<string>('Mulai analisis untuk mendapatkan masukan.');
  const [repCount, setRepCount] = useState(0);
  const [stage, setStage] = useState('up');
  const [error, setError] = useState<string | null>(null);

  // State untuk daftar kamera dan kamera yang dipilih
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');

  // 1. Dapatkan daftar kamera saat komponen dimuat
  useEffect(() => {
    const getDevices = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true }); // Minta izin dulu
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter(device => device.kind === 'videoinput');
        setVideoDevices(videoInputs);
        if (videoInputs.length > 0) {
          setSelectedDeviceId(videoInputs[0].deviceId); // Pilih kamera pertama sebagai default
        }
      } catch (err) {
        console.error("Error enumerating devices:", err);
        setError("Tidak dapat mengakses perangkat media. Pastikan Anda telah memberikan izin.");
      }
    };
    getDevices();
  }, []);

  const startWebcam = async () => {
    if (isAnalyzing) stopWebcam(); // Hentikan stream lama jika ada

    if (!selectedDeviceId) {
        setError("Tidak ada kamera yang dipilih.");
        return;
    }

    try {
      const constraints = {
        video: {
          deviceId: { exact: selectedDeviceId },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        }
        setError(null);
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
      setError("Tidak dapat mengakses webcam yang dipilih. Mungkin sedang digunakan oleh aplikasi lain.");
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const analyzeFrame = async () => {
    if (!isAnalyzing || !videoRef.current || videoRef.current.readyState < 3) {
      if (isAnalyzing) {
        animationFrameId.current = requestAnimationFrame(analyzeFrame);
      }
      return;
    }

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/jpeg');

    try {
      const response = await fetch('http://127.0.0.1:5000/analyze_frame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageDataUrl }),
      });

      if (!response.ok) throw new Error(`API request failed: ${response.statusText}`);
      
      const result = await response.json();
      if (result.error) throw new Error(result.error);

      setFeedback(result.feedback);
      setRepCount(result.rep_count);
      setStage(result.stage);

      const displayCtx = canvasRef.current?.getContext('2d');
      if (displayCtx && canvasRef.current) {
        const image = new Image();
        image.onload = () => {
          canvasRef.current!.width = image.width;
          canvasRef.current!.height = image.height;
          displayCtx.drawImage(image, 0, 0);
        };
        image.src = result.processed_image;
      }
      setError(null);

    } catch (err: any) {
      console.error("Error analyzing frame:", err);
      setError("Gagal terhubung ke server analisis. Pastikan server Python berjalan.");
      stopAnalysis();
    }

    if (isAnalyzing) {
      animationFrameId.current = requestAnimationFrame(analyzeFrame);
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    startWebcam();
  };

  const stopAnalysis = () => {
    setIsAnalyzing(false);
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    stopWebcam();
  };

  useEffect(() => {
    if (isAnalyzing) {
      animationFrameId.current = requestAnimationFrame(analyzeFrame);
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      stopWebcam();
    };
  }, [isAnalyzing, selectedDeviceId]);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">SquatSense AI (Langsung)</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Analisis Langsung</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
              <canvas ref={canvasRef} className="w-full h-full object-cover" />
              <video ref={videoRef} className="absolute w-full h-full object-cover -z-10" playsInline style={{ opacity: 0 }}/>
            </div>
             {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kontrol</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              {/* 2. Tambahkan Dropdown untuk memilih kamera */}
              <div className="space-y-2">
                <Label htmlFor="camera-select">Pilih Kamera</Label>
                <Select
                  value={selectedDeviceId}
                  onValueChange={setSelectedDeviceId}
                  disabled={isAnalyzing}
                >
                  <SelectTrigger id="camera-select">
                    <SelectValue placeholder="Pilih sebuah kamera..." />
                  </SelectTrigger>
                  <SelectContent>
                    {videoDevices.map(device => (
                      <SelectItem key={device.deviceId} value={device.deviceId}>
                        {device.label || `Kamera ${videoDevices.indexOf(device) + 1}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={startAnalysis} disabled={isAnalyzing || videoDevices.length === 0}>
                Mulai Analisis
              </Button>
              <Button onClick={stopAnalysis} disabled={!isAnalyzing} variant="destructive">
                Hentikan Analisis
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Repetisi" value={repCount} />
            <StatCard label="Status" value={stage.charAt(0).toUpperCase() + stage.slice(1)} />
          </div>

          <FeedbackDisplay feedback={feedback} />
        </div>
      </div>
    </div>
  );
};

export default LiveAnalysis;

// File: src/components/UploadVideo.tsx
// Deskripsi: Komponen untuk mengunggah video, mengirimnya ke API, dan menampilkan hasil analisis.

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload, File, X, LoaderCircle } from "lucide-react";
import StatCard from "./StatCard";

// Tipe untuk hasil analisis
interface AnalysisResult {
  correct_squats: number;
  incorrect_squats: number;
  accuracy: number;
  calories_burned: number;
  download_url: string;
}

const UploadVideo = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validasi tipe file
      if (!["video/mp4", "video/quicktime", "video/x-msvideo"].includes(file.type)) {
        toast.error("Tipe file tidak didukung. Harap unggah MP4, MOV, atau AVI.");
        return;
      }
      setSelectedFile(file);
      setAnalysisResult(null); // Reset hasil saat file baru dipilih
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error("Harap pilih file video terlebih dahulu.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/analyze_video", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal menganalisis video.");
      }

      const result: AnalysisResult = await response.json();
      setAnalysisResult(result);
      toast.success("Video berhasil dianalisis!");

    } catch (err: any) {
      console.error("Error analyzing video:", err);
      setError(err.message || "Terjadi kesalahan. Pastikan server Python berjalan.");
      toast.error(err.message || "Gagal terhubung ke server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (analysisResult?.download_url) {
      const fullUrl = `http://127.0.0.1:5000${analysisResult.download_url}`;
      window.open(fullUrl, '_blank');
      toast.info("Unduhan video dimulai...");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Unggah Video Anda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center w-full space-y-4">
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">Klik untuk mengunggah</span> atau seret dan lepas
                </p>
                <p className="text-xs text-gray-500">MP4, MOV, atau AVI</p>
              </div>
              <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="video/mp4,video/quicktime,video/x-msvideo" />
            </label>
            <Button onClick={handleAnalyze} disabled={!selectedFile || isLoading} className="w-full">
              {isLoading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Menganalisis...
                </>
              ) : (
                "Mulai Analisis"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedFile && !analysisResult && (
        <Card>
            <CardHeader>
                <CardTitle>File Terpilih</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <File className="w-6 h-6 text-gray-400" />
                        <div className="text-sm">
                            <p className="font-medium">{selectedFile.name}</p>
                            <p className="text-gray-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            </CardContent>
        </Card>
      )}

      {isLoading && <p className="text-center text-lg animate-pulse">Server sedang bekerja keras menganalisis videomu...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle>Hasil Analisis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Squat Benar" value={analysisResult.correct_squats} />
              <StatCard label="Squat Salah" value={analysisResult.incorrect_squats} />
              <StatCard label="Akurasi" value={analysisResult.accuracy} unit="%" />
              <StatCard label="Kalori Terbakar" value={analysisResult.calories_burned} />
            </div>
            <Button onClick={handleDownload} className="w-full">
              Unduh Video Hasil Analisis
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UploadVideo;

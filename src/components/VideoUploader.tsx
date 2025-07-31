
import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

interface VideoUploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onFileSelect, selectedFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('video/')) {
        onFileSelect(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors duration-200 ${
        isDragOver
          ? 'border-electric-green bg-electric-green/10'
          : 'border-border hover:border-electric-green/50'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".mp4,.mov,.avi"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      
      {selectedFile ? (
        <div>
          <p className="text-lg font-medium text-electric-green mb-2">File Selected</p>
          <p className="text-sm text-foreground">{selectedFile.name}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>
      ) : (
        <div>
          <p className="text-lg font-medium text-foreground mb-2">
            Drop your video here or click to browse
          </p>
          <p className="text-sm text-muted-foreground">
            Supports MP4, MOV, and AVI files
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;

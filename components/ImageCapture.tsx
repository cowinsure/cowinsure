/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState } from "react";

interface ImageCaptureProps {
  image: File | null;
  setImage: (file: File | null) => void;
}

const ImageCapture: React.FC<ImageCaptureProps> = ({  setImage }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Open camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraOpen(true);
    } catch (err) {
      console.error("Camera access denied:", err);
      alert("Cannot access camera. Please check permissions.");
    }
  };

  // Capture photo
  const takePhoto = () => {
    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")!.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      stopCamera();
    });
  };

  // Stop camera
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach((track) => track.stop());
    setCameraOpen(false);
  };

  // Remove image
  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="space-y-3">
      <h1 className="text-sm font-medium text-slate-600">Add Image</h1>
      {/* Preview */}
      {imagePreview ? (
        <div className="relative w-full rounded-xl overflow-hidden border border-slate-300">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={removeImage}
              className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition"
            >
              Remove
            </button>
            <button
              type="button"
              onClick={startCamera}
              className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition"
            >
              Retake
            </button>
          </div>
        </div>
      ) : null}

      {/* Camera preview */}
      {cameraOpen && (
        <div className="space-y-2">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-48 object-cover rounded-xl border border-slate-300"
          />
          <canvas ref={canvasRef} className="hidden" />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={takePhoto}
              className="flex-1 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
            >
              Capture
            </button>
            <button
              type="button"
              onClick={stopCamera}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-xl hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* File upload */}
      {!cameraOpen && !imagePreview && (
        <label className="group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-6 text-center transition-all duration-300 hover:border-green-600 hover:bg-green-50">
          <div className="flex gap-4 justify-center items-center mt-4">
            {/* Upload Option */}
            <label className="group flex flex-col items-center justify-center w-40 p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 cursor-pointer hover:border-slate-500 hover:bg-slate-100 transition">
              <svg
                className="h-10 w-10 text-slate-400 group-hover:text-slate-600 transition"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 6l4.5-4.5L16.5 6M12 1.5V14.25"
                />
              </svg>
              <p className="mt-2 text-sm text-slate-500 text-center">
                Upload Image
              </p>
              <p className="text-xs text-slate-400 text-center">
                PNG, JPG up to 5MB
              </p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setImage(file || null);
                  if (file) setImagePreview(URL.createObjectURL(file));
                }}
              />
            </label>

            {/* Camera Option */}
            <button
              type="button"
              onClick={startCamera}
              className="flex flex-col items-center justify-center w-40 p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:border-slate-500 hover:bg-slate-100 transition"
            >
              <svg
                className="h-10 w-10 text-slate-400 hover:text-slate-600 transition"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7.5h18M3 7.5l3-3h12l3 3M5.25 7.5v11.25A2.25 2.25 0 007.5 21h9a2.25 2.25 0 002.25-2.25V7.5"
                />
              </svg>
              <p className="mt-2 text-sm text-slate-500 text-center">
                Take Photo
              </p>
              <p className="text-xs text-slate-400 text-center">
                Use your camera
              </p>
            </button>
          </div>
        </label>
      )}
    </div>
  );
};

export default ImageCapture;

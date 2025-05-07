import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';

const TryGlasses = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [landmarks, setLandmarks] = useState(null);
  const [glassesImg, setGlassesImg] = useState(null);

  // Kết nối WebSocket đến FastAPI
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLandmarks(data);
    };
    setSocket(ws);
    return () => ws.close();
  }, []);

  // Load ảnh kính
  useEffect(() => {
    const img = new Image();
    img.src = 'https://i.imgur.com/Z5LR7Uw.png'; // Ảnh kính mẫu PNG nền trong suốt
    img.onload = () => setGlassesImg(img);
  }, []);
  
  useEffect(() => {
    const checkVideo = setInterval(() => {
      if (webcamRef.current && webcamRef.current.video) {
        console.log("✅ Webcam video element found.");
        clearInterval(checkVideo);
      } else {
        console.log("⏳ Waiting for webcam...");
      }
    }, 500);
  }, []);
  
  // Gửi hình từ webcam qua WebSocket
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        webcamRef.current &&
        socket &&
        socket.readyState === WebSocket.OPEN
      ) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          const blob = dataURLtoBlob(imageSrc);
          socket.send(blob);
        }
      }
    }, 100); // Gửi ảnh 10 lần/giây

    return () => clearInterval(interval);
  }, [socket]);

  // Vẽ webcam + kính lên canvas
  useEffect(() => {
    if (
      webcamRef.current &&
      canvasRef.current &&
      landmarks &&
      glassesImg
    ) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const video = webcamRef.current.video;

      // Thiết lập kích thước canvas bằng kích thước video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Vẽ hình từ webcam
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Lấy tọa độ mắt từ landmarks
      const [x1, y1] = landmarks.eye_left;
      const [x2, y2] = landmarks.eye_right;
      const width = Math.abs(x2 - x1) * 2; // chiều dài kính
      const centerX = (x1 + x2) / 2 - width / 2;
      const centerY = (y1 + y2) / 2 - width / 4;

      // Vẽ kính vào đúng vị trí
      ctx.drawImage(glassesImg, centerX, centerY, width, width / 2);
    }
  }, [landmarks, glassesImg]);

  // Chuyển ảnh base64 thành Blob để gửi qua socket
  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
  };

  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      {/* Ẩn video, vẫn cho render */}
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{
            width: '100%',
            maxWidth: '640px',
            display: 'block',
            margin: '0 auto',
          }}
      />
      {/* Canvas để hiển thị kết quả */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          maxWidth: '640px',
          border: '1px solid #ccc',
        }}
      />
    </div>
  );
};

export default TryGlasses;

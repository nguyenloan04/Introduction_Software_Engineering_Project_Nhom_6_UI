import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';

const TryGlasses = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [imgResult, setImgResult] = useState(null);

  // Kết nối WebSocket đến FastAPI
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');
    ws.onopen = () => console.log('WebSocket connected');
    ws.onmessage = (event) => {
      // Nhận ảnh đã ghép kính (base64)
      setImgResult(event.data);
    };
    ws.onerror = (e) => console.error('WebSocket error', e);
    ws.onclose = () => console.log('WebSocket closed');
    setSocket(ws);
    return () => ws.close();
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
        console.log('getScreenshot:', imageSrc ? imageSrc.substring(0, 100) : 'null', webcamRef.current.video ? webcamRef.current.video.videoWidth : 'no video');
        // Chỉ gửi nếu ảnh base64 đủ dài (tránh ảnh trống)
        if (imageSrc && imageSrc.length > 1000 && imageSrc.startsWith('data:image')) {
          console.log('Frame gửi lên:', imageSrc.substring(0, 50));
          socket.send(imageSrc);
        } else {
          console.log('Frame bỏ qua (ảnh trống hoặc quá nhỏ)');
        }
      }
    }, 300); // Gửi chậm lại để debug

    return () => clearInterval(interval);
  }, [socket]);

  // Hiển thị ảnh kết quả lên canvas
  useEffect(() => {
    if (imgResult && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new window.Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height);
      };
      img.src = imgResult;
    }
  }, [imgResult]);

  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      {/* Ẩn video, chỉ dùng để lấy frame */}
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/png"
        audio={false}
        width={640}
        height={480}
        style={{
          width: '100%',
          maxWidth: '640px',
        }}
        videoConstraints={{
          width: { ideal: 640, min: 640, max: 640 },
          height: { ideal: 480, min: 480, max: 480 },
          aspectRatio: 4 / 3,
          facingMode: "user"
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
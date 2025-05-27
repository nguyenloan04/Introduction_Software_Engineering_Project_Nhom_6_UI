import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { useParams } from 'react-router-dom';
import { Header } from '../components/ui/Header.jsx';
import '../css/tryGlasses.css';
import { config } from '../config/apiConfig';

const TryGlasses = () => {
  const { glassesUrl } = useParams();
  console.log('TryGlasses page - glassesUrl:', glassesUrl);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [imgResult, setImgResult] = useState(null);
  // Kết nối WebSocket đến FastAPI
  useEffect(() => {
    const ws = new WebSocket(config.WS_URL);
    ws.onopen = () => {
      console.log('WebSocket connected');
      ws.send(JSON.stringify({ glassesUrl }));
    };
    ws.onmessage = (event) => {
      // Nhận ảnh đã ghép kính (base64)
      setImgResult(event.data);
    };
    ws.onerror = (e) => console.error('WebSocket error', e);
    ws.onclose = () => console.log('WebSocket closed');

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [glassesUrl]);

  // Gửi hình từ webcam qua WebSocket
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        webcamRef.current &&
        socket &&
        socket.readyState === WebSocket.OPEN &&
        glassesUrl // Chỉ gửi khi đã chọn kính
      ) {
        const imageSrc = webcamRef.current.getScreenshot();
        // Chỉ gửi nếu ảnh base64 đủ dài (tránh ảnh trống)
        if (imageSrc && imageSrc.length > 1000 && imageSrc.startsWith('data:image')) {
          const payload = {
            image: imageSrc,
            glasses_url: glassesUrl,
          };
          socket.send(JSON.stringify(payload)); // Gửi frame + URL kính
        }
      }
    }, 300); 

    return () => clearInterval(interval);
  }, [socket, glassesUrl]);

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
    <div>
      <Header />
      <div className="try-glasses-container">
        <h2 className="try-glasses-title">Thử kính ảo</h2>
        {/* Ẩn video, chỉ dùng để lấy frame */}
        <div className="webcam-container">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/png"
            audio={false}
            width={640}
            height={480}
            style={{
              width: '100%',
            }}
            videoConstraints={{
              width: { ideal: 640, min: 640, max: 640 },
              height: { ideal: 480, min: 480, max: 480 },
              aspectRatio: 4 / 3,
              facingMode: "user"
            }}
          />
        </div>
        {/* Canvas để hiển thị kết quả */}
        <canvas
          ref={canvasRef}
          className="result-canvas"
        />
        <button 
          className="go-back-button"
          onClick={() => window.history.back()}
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default TryGlasses;

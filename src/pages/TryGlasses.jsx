import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/ui/Header.jsx';
import '../css/tryGlasses.css';
import { config } from '../config/apiConfig';

/* [Bước 3.3. Khởi tạo TryGlasses] */
const TryGlasses = () => {  
    // [Bước 3.17 Chọn kính khác]
    const { glassesUrl } = useParams();  console.log('TryGlasses page - glassesUrl:', glassesUrl);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [imgResult, setImgResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snapshots, setSnapshots] = useState([]);
  const [currentSnapshot, setCurrentSnapshot] = useState(null);
  const [showGuide, setShowGuide] = useState(true);

  /* [Bước 3.4. Yêu cầu quyền camera] */
  useEffect(() => {
    setIsLoading(true);
    setError(null); // Reset lỗi khi kết nối lại    
    // [Bước 3.10 Kết nối WebSocket]
    const ws = new WebSocket(config.WS_URL);ws.onopen = () => {
      console.log('WebSocket connected');
      setError(null); // Đảm bảo không có lỗi khi kết nối thành công
      ws.send(JSON.stringify({ glassesUrl }));
    };
    
    /* [Bước 3.15. Trả ảnh] WebSocket.onmessage() */    
    ws.onmessage = (event) => {
      // Nhận ảnh đã ghép kính (base64)
      setImgResult(event.data);
      setIsLoading(false);
    };
    
    ws.onerror = (e) => {
      console.error('WebSocket error', e);
      setError('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
      setIsLoading(false);
    };
      ws.onclose = () => {
      console.log('WebSocket closed');
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [glassesUrl]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        webcamRef.current &&
        socket &&
        socket.readyState === WebSocket.OPEN &&
        glassesUrl // Chỉ gửi khi đã chọn kính        
      ) {
        /* [Bước 3.13.1. Chụp frame] getScreenshot() */
        const imageSrc = webcamRef.current.getScreenshot();        // Chỉ gửi nếu ảnh base64 đủ dài (tránh ảnh trống)
        if (imageSrc && imageSrc.length > 1000 && imageSrc.startsWith('data:image')) {
          /* [Bước 3.13.2 Gửi frame + URL kính] */          
          const payload = {
            image: imageSrc,
            /* [Bước 3.12. Gửi URL kính]  */
            glasses_url: glassesUrl,
          };
          socket.send(JSON.stringify(payload)); // Gửi frame + URL kính
        }
      }
    }, 300); 

    return () => clearInterval(interval);
  }, [socket, glassesUrl, currentSnapshot]);
  
  useEffect(() => {
    if (imgResult && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new window.Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // [Bước 3.16 Hiển thị kết quả]
        ctx.drawImage(img, 0, 0, img.width, img.height);
      };
      img.src = imgResult;
    }
  }, [imgResult]);
  
  const captureSnapshot = () => {
    if (imgResult) {
      const newSnapshots = [...snapshots, imgResult];
      setSnapshots(newSnapshots);
      setCurrentSnapshot(imgResult);
    }
  };

  // Tắt hướng dẫn sau 10 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGuide(false);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="try-glasses-page">
      <Header />
      
      <div className="try-glasses-hero">
        <h1>Thử Kính Trực Tuyến</h1>
        <p>Hãy thử kính trực tuyến với công nghệ AI để xem kính phù hợp với bạn như thế nào!</p>
      </div>
        <div className="try-glasses-container single-column">
        {/* Phần webcam và kết quả */}
        <div className="try-glasses-section">
          <h2 className="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="10" r="3"></circle>
              <path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"></path>
            </svg>
            Camera Thử Kính
          </h2>
          
          <div className="webcam-result-container">
            {/* Left side: Webcam */}
            <div className="webcam-container">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/png"
                audio={false}
                width={640}
                height={480}
                style={{ width: '100%' }}
                videoConstraints={{
                  width: { ideal: 640, min: 640, max: 640 },
                  height: { ideal: 480, min: 480, max: 480 },
                  aspectRatio: 4 / 3,
                  facingMode: "user"
                }}
              />
              
              {showGuide && (
                <div className="webcam-overlay">
                  <div className="face-guide"></div>
                </div>
              )}
              
              <div className="container-label">Webcam</div>
            </div>
            
            {/* Right side: Result */}
            <div className="result-container">
              <canvas
                ref={canvasRef}
                className="result-canvas"
              />
              <div className="container-label">Kết quả thử kính</div>
              
              {isLoading && (
                <div className="loading-spinner">
                  <span></span>
                  <p>Đang xử lý...</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="camera-controls">
            <button 
              className="camera-button" 
              onClick={captureSnapshot}
              title="Chụp ảnh"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8"></circle>
              </svg>
            </button>
            
            <button 
              className="camera-button" 
              onClick={() => setShowGuide(!showGuide)}
              title={showGuide ? "Tắt hướng dẫn" : "Bật hướng dẫn"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </button>
            
            <button 
              className="camera-button" 
              onClick={() => setCurrentSnapshot(null)}
              title="Quay lại camera"
              disabled={!currentSnapshot}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </button>
          </div>
          
          {error && (
            <div className="instructions" style={{backgroundColor: '#fee2e2', borderColor: '#ef4444'}}>
              <h3 style={{color: '#b91c1c'}}>Lỗi</h3>
              <p>{error}</p>
            </div>
          )}
            {snapshots.length > 0 && (
            <div className="snapshot-section">
              <h3 className="section-title" style={{fontSize: '16px', marginTop: '15px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                Ảnh đã chụp
              </h3>
              <div className="snapshot-gallery">
                {snapshots.map((snapshot, index) => (
                  <div 
                    key={index} 
                    className={`snapshot-item ${currentSnapshot === snapshot ? 'active' : ''}`}
                    onClick={() => setCurrentSnapshot(snapshot)}
                  >
                    <img src={snapshot} alt={`Snapshot ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="instructions">
            <h3>Hướng dẫn sử dụng</h3>
            <ol>
              <li>Đặt khuôn mặt bạn vào vùng khung hình</li>
              <li>Đảm bảo có đủ ánh sáng để nhìn rõ khuôn mặt</li>
              <li>Giữ khuôn mặt cân đối và nhìn thẳng vào camera</li>
              <li>Nhấn nút chụp ảnh để lưu lại kết quả</li>
            </ol>
          </div>
            <div className="action-buttons">
            <Link to="/" className="button secondary-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 8 8 12 12 16"></polyline>
                <line x1="16" y1="12" x2="8" y2="12"></line>
              </svg>
              Quay lại mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryGlasses;

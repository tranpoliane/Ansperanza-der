import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Trash2, Download, Send } from 'lucide-react';

interface DrawingScreenProps {
  onBack: () => void;
  moodColors: string[];
}

export function DrawingScreen({ onBack, moodColors }: DrawingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState(moodColors[0] || '#AEE3E9');
  const [lineWidth, setLineWidth] = useState(3);
  const [sentMessage, setSentMessage] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.strokeStyle = currentColor;
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'mi-dibujo-ansperanza.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const sendToDoctor = () => {
    setSentMessage(true);
    setTimeout(() => setSentMessage(false), 2000);
  };

  const primaryColor = moodColors[0] || '#AEE3E9';
  const secondaryColor = moodColors[1] || '#C9D9F0';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${primaryColor}, ${secondaryColor})`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 backdrop-blur-sm" style={{ background: 'rgba(255, 255, 255, 0.3)' }}>
        <motion.button
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center"
          style={{
            background: 'rgba(255, 255, 255, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
          }}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: '#D4B3D0' }} />
        </motion.button>

        <h1
          style={{
            color: '#D4B3D0',
            fontWeight: 300,
            letterSpacing: '0.05em',
            fontSize: '1.5rem',
          }}
        >
          Lienzo Creativo
        </h1>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={clearCanvas}
            className="w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
            }}
          >
            <Trash2 className="w-5 h-5" style={{ color: '#D4B3D0' }} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={downloadDrawing}
            className="w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
            }}
          >
            <Download className="w-5 h-5" style={{ color: '#D4B3D0' }} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={sendToDoctor}
            className="w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center"
            style={{
              background: 'rgba(188, 224, 195, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
            }}
          >
            <Send className="w-5 h-5" style={{ color: '#FFFFFF' }} />
          </motion.button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 p-6 overflow-hidden">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="h-full rounded-3xl overflow-hidden backdrop-blur-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-full cursor-crosshair"
            style={{ touchAction: 'none' }}
          />
        </motion.div>
      </div>

      {/* Color Palette - Mood Based */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-full backdrop-blur-sm flex items-center gap-3"
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div className="flex gap-2 items-center">
          {moodColors.map((color, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentColor(color)}
              className="w-10 h-10 rounded-full"
              style={{
                background: color,
                border: currentColor === color ? '3px solid #D4B3D0' : '2px solid rgba(255, 255, 255, 0.8)',
                boxShadow: currentColor === color ? '0 0 12px rgba(212, 179, 208, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            />
          ))}
          
          {/* Additional neutral colors */}
          {['#FFFFFF', '#D4B3D0', '#86BCA1', '#6B6B6B'].map((color, index) => (
            <motion.button
              key={`extra-${index}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentColor(color)}
              className="w-10 h-10 rounded-full"
              style={{
                background: color,
                border: currentColor === color ? '3px solid #D4B3D0' : '2px solid rgba(255, 255, 255, 0.8)',
                boxShadow: currentColor === color ? '0 0 12px rgba(212, 179, 208, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            />
          ))}
        </div>

        {/* Brush Size */}
        <div className="ml-4 flex items-center gap-2 pl-4 border-l" style={{ borderColor: 'rgba(212, 179, 208, 0.3)' }}>
          {[2, 4, 8].map((size) => (
            <motion.button
              key={size}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setLineWidth(size)}
              className="rounded-full flex items-center justify-center"
              style={{
                width: size * 4 + 8,
                height: size * 4 + 8,
                background: lineWidth === size ? '#D4B3D0' : 'rgba(212, 179, 208, 0.3)',
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: size * 2,
                  height: size * 2,
                  background: '#FFFFFF',
                }}
              />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Helper Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute top-24 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full backdrop-blur-sm"
        style={{
          background: 'rgba(255, 255, 255, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
        }}
      >
        <p
          className="italic"
          style={{
            color: '#D4B3D0',
            fontWeight: 300,
            letterSpacing: '0.03em',
            fontSize: '0.9rem',
            opacity: 0.8,
          }}
        >
          Colores adaptados a tu estado de ánimo
        </p>
      </motion.div>

      {/* Sent Message */}
      {sentMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="absolute bottom-32 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full backdrop-blur-sm"
          style={{
            background: 'rgba(174, 227, 233, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          }}
        >
          <p
            style={{
              color: '#FFFFFF',
              fontWeight: 300,
              letterSpacing: '0.03em',
            }}
          >
            ✓ Enviado al médico
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

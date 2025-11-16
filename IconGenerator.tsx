import React, { useRef, useEffect } from 'react';
import ansperanzaImage from 'figma:asset/00bdcd52fe88203738573f6549ca64284f5d2f35.png';

export function IconGenerator() {
  const canvas192Ref = useRef<HTMLCanvasElement>(null);
  const canvas512Ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      generateIcon(img, canvas192Ref.current, 192);
      generateIcon(img, canvas512Ref.current, 512);
    };
    img.src = ansperanzaImage;
  }, []);

  const generateIcon = (img: HTMLImageElement, canvas: HTMLCanvasElement | null, size: number) => {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculer le crop carré au centre
    const sourceSize = Math.min(img.width, img.height);
    const sourceX = (img.width - sourceSize) / 2;
    const sourceY = (img.height - sourceSize) / 2;

    // Dessiner l'image recadrée
    ctx.drawImage(
      img,
      sourceX, sourceY, sourceSize, sourceSize,
      0, 0, size, size
    );

    // Ajouter des coins arrondis
    roundCorners(ctx, size);
  };

  const roundCorners = (ctx: CanvasRenderingContext2D, size: number) => {
    const radius = size * 0.1; // 10% de rayon pour les coins arrondis
    
    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(size - radius, 0);
    ctx.quadraticCurveTo(size, 0, size, radius);
    ctx.lineTo(size, size - radius);
    ctx.quadraticCurveTo(size, size, size - radius, size);
    ctx.lineTo(radius, size);
    ctx.quadraticCurveTo(0, size, 0, size - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  };

  const downloadIcon = (canvasRef: React.RefObject<HTMLCanvasElement>, filename: string) => {
    if (!canvasRef.current) return;
    
    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = filename;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#AEE3E9] via-[#C9D9F0] to-[#FBD5D9] p-8 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-center mb-6 text-[#AEE3E9]">🎨 Générateur d'Icônes Ansperanza</h1>
        
        <div className="bg-[#F8F9FA] rounded-2xl p-6 mb-6">
          <h3 className="mb-4">📋 Instructions :</h3>
          <ol className="list-decimal list-inside space-y-2 text-[#666]">
            <li>Les icônes ont été générées automatiquement depuis votre image</li>
            <li>Cliquez sur les boutons ci-dessous pour télécharger</li>
            <li>Remplacez les fichiers dans <code className="bg-[#E9ECEF] px-2 py-1 rounded">/public/</code></li>
            <li>Déployez sur Vercel !</li>
          </ol>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-6">
          {/* Icône 192x192 */}
          <div className="text-center">
            <canvas
              ref={canvas192Ref}
              width={192}
              height={192}
              className="border-2 border-[#AEE3E9] rounded-2xl shadow-lg mb-3"
              style={{ width: '96px', height: '96px' }}
            />
            <p className="text-[#666] text-sm mb-2">192 x 192 px</p>
            <button
              onClick={() => downloadIcon(canvas192Ref, 'icon-192.png')}
              className="bg-gradient-to-r from-[#AEE3E9] to-[#C9D9F0] text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              ⬇️ Télécharger icon-192.png
            </button>
          </div>

          {/* Icône 512x512 */}
          <div className="text-center">
            <canvas
              ref={canvas512Ref}
              width={512}
              height={512}
              className="border-2 border-[#AEE3E9] rounded-2xl shadow-lg mb-3"
              style={{ width: '128px', height: '128px' }}
            />
            <p className="text-[#666] text-sm mb-2">512 x 512 px</p>
            <button
              onClick={() => downloadIcon(canvas512Ref, 'icon-512.png')}
              className="bg-gradient-to-r from-[#AEE3E9] to-[#C9D9F0] text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              ⬇️ Télécharger icon-512.png
            </button>
          </div>
        </div>

        <div className="bg-[#BCE0C3] rounded-2xl p-4 text-center">
          ✅ Icônes générées avec succès ! Téléchargez-les et remplacez les fichiers dans /public/
        </div>

        <div className="mt-6 p-4 bg-[#FFF9E6] rounded-2xl">
          <p className="text-sm text-[#666]">
            💡 <strong>Astuce :</strong> Après avoir téléchargé les icônes, remplacez simplement 
            les fichiers <code>icon-192.png</code> et <code>icon-512.png</code> dans le dossier 
            <code>/public/</code> de votre projet.
          </p>
        </div>
      </div>
    </div>
  );
}

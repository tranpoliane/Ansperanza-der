import { motion } from 'motion/react';
import { Palette, Music, Leaf, Type } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PersonalizationScreenProps {
  onBack: () => void;
  onSelectTheme: (image: string) => void;
}

const themes = [
  {
    id: 'sunset',
    name: 'Atardecer',
    gradient: 'linear-gradient(135deg, #FBD5D9, #E3C8E0)',
    image: 'https://images.unsplash.com/photo-1665890883356-b7eff3f95b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMGJlYWNoJTIwc3Vuc2V0fGVufDF8fHx8MTc2MjA4MTc5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ocean',
    name: 'Océano',
    gradient: 'linear-gradient(135deg, #AEE3E9, #C9D9F0)',
    image: 'https://images.unsplash.com/photo-1621350032995-bb459e23287c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBvY2VhbiUyMHdhdmVzfGVufDF8fHx8MTc2MjEyMDEwOXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'nature',
    name: 'Naturaleza',
    gradient: 'linear-gradient(135deg, #BCE0C3, #86BCA1)',
    image: 'https://images.unsplash.com/photo-1577206640794-4e38308665f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwbmF0dXJlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjIxMjAxMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const musicOptions = [
  { id: 1, name: 'Olas del mar', icon: '🌊' },
  { id: 2, name: 'Lluvia suave', icon: '🌧️' },
  { id: 3, name: 'Pájaros', icon: '🐦' },
  { id: 4, name: 'Viento', icon: '💨' },
];

export function PersonalizationScreen({ onBack, onSelectTheme }: PersonalizationScreenProps) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25 }}
      className="fixed inset-0 overflow-y-auto"
      style={{
        background: 'linear-gradient(to bottom, #AEE3E9 0%, #C9D9F0 40%, #FBD5D9 100%)'
      }}
    >
      <div className="p-6 pb-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={onBack}
            className="transition-colors"
            style={{ 
              color: '#D4B3D0',
              fontWeight: 300
            }}
          >
            ← Volver
          </button>
          <h1 
            style={{ 
              color: '#D4B3D0',
              fontWeight: 300,
              letterSpacing: '0.05em'
            }}
          >
            Personalizar
          </h1>
        </div>

        {/* Color Themes */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5" style={{ color: '#D4B3D0' }} />
              <h2 
                style={{ 
                  color: '#D4B3D0',
                  fontWeight: 300
                }}
              >
                Ambiente
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center"
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.5)'
              }}
            >
              <Type className="w-5 h-5" style={{ color: '#D4B3D0' }} />
            </motion.button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {themes.map((theme) => (
              <motion.button
                key={theme.id}
                onClick={() => onSelectTheme(theme.image)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative aspect-square rounded-3xl overflow-hidden shadow-lg"
              >
                <ImageWithFallback
                  src={theme.image}
                  alt={theme.name}
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: theme.gradient
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span 
                    className="text-sm px-3 py-1 rounded-full backdrop-blur-sm"
                    style={{ 
                      color: '#FFFFFF',
                      fontWeight: 300,
                      background: 'rgba(255, 255, 255, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.5)'
                    }}
                  >
                    {theme.name}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Music Options */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <Music className="w-5 h-5" style={{ color: '#D4B3D0' }} />
            <h2 
              style={{ 
                color: '#D4B3D0',
                fontWeight: 300
              }}
            >
              Sonidos
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 bg-[rgba(0,0,0,0)]">
            {musicOptions.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="backdrop-blur-sm rounded-3xl p-5 flex items-center gap-3 shadow-sm transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.5)'
                }}
              >
                <span className="text-2xl">{option.icon}</span>
                <span 
                  className="text-sm"
                  style={{ 
                    color: '#D4B3D0',
                    fontWeight: 300
                  }}
                >
                  {option.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Quick Settings */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <Leaf className="w-5 h-5" style={{ color: '#6FAA8C' }} />
            <h2 
              style={{ 
                color: '#D4B3D0',
                fontWeight: 300
              }}
            >
              Opciones
            </h2>
          </div>
          <div className="space-y-4">
            <div 
              className="backdrop-blur-sm rounded-3xl p-5 flex items-center justify-between shadow-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.5)'
              }}
            >
              <span 
                className="text-sm"
                style={{ 
                  color: '#D4B3D0',
                  fontWeight: 300
                }}
              >
                Notificaciones diarias
              </span>
              <div 
                className="w-12 h-6 rounded-full"
                style={{
                  background: 'rgba(188, 224, 195, 0.5)'
                }}
              />
            </div>
            <div 
              className="backdrop-blur-sm rounded-3xl p-5 flex items-center justify-between shadow-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.5)'
              }}
            >
              <span 
                className="text-sm"
                style={{ 
                  color: '#D4B3D0',
                  fontWeight: 300
                }}
              >
                Modo nocturno
              </span>
              <div 
                className="w-12 h-6 rounded-full"
                style={{
                  background: 'rgba(201, 217, 240, 0.5)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

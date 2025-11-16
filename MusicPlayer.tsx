import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Volume2, VolumeX, X, Waves, Cloud, CloudRain, Wind } from 'lucide-react';

interface MusicPlayerProps {
  mood: string;
  moodColors: string[];
}

type SoundType = 'harmonie' | 'vagues' | 'pluie' | 'foret' | 'vent';

export function MusicPlayer({ mood, moodColors }: MusicPlayerProps) {
  // Charger le volume depuis localStorage
  const getInitialVolume = () => {
    const saved = localStorage.getItem('ansperanza_music_volume');
    return saved ? parseFloat(saved) : 0.5;
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(getInitialVolume);
  const [showControls, setShowControls] = useState(false);
  const [selectedSound, setSelectedSound] = useState<SoundType>('harmonie');
  const [isFading, setIsFading] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioNodesRef = useRef<(OscillatorNode | AudioBufferSourceNode)[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);
  const masterGainRef = useRef<GainNode | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fréquences pour différentes ambiances selon l'humeur
  const moodFrequencies: Record<string, number[]> = {
    calm: [174.61, 261.63, 329.63, 392.00, 523.25], // Notes apaisantes (F3, C4, E4, G4, C5)
    happy: [261.63, 329.63, 392.00, 493.88, 587.33], // Notes joyeuses (C4, E4, G4, B4, D5)
    sad: [146.83, 220.00, 246.94, 293.66, 349.23], // Notes mélancoliques (D3, A3, B3, D4, F4)
    anxious: [196.00, 246.94, 293.66, 349.23, 415.30], // Notes anxieuses (G3, B3, D4, F4, G#4)
  };

  // Sauvegarder le volume dans localStorage
  useEffect(() => {
    localStorage.setItem('ansperanza_music_volume', volume.toString());
  }, [volume]);

  // Fonction pour créer un bruit blanc
  const createWhiteNoise = (ctx: AudioContext) => {
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    return noiseBuffer;
  };

  // Fonction pour créer un bruit rose (plus naturel que le blanc)
  const createPinkNoise = (ctx: AudioContext) => {
    const bufferSize = 4 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }

    return noiseBuffer;
  };

  // Fonction pour créer le son d'harmonie avec oscillateurs
  const createHarmonieSound = (ctx: AudioContext) => {
    const frequencies = moodFrequencies[mood] || moodFrequencies.calm;
    
    frequencies.forEach((freq, index) => {
      // Oscillateur principal
      const oscillator = ctx.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.value = freq;

      // Gain individuel pour chaque oscillateur
      const gainNode = ctx.createGain();
      gainNode.gain.value = 0;
      
      // Ajouter une variation subtile de fréquence pour un effet plus organique
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.15 + (index * 0.08);
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.8;
      
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);
      
      oscillator.connect(gainNode);
      gainNode.connect(masterGainRef.current!);

      oscillator.start();
      lfo.start();

      // Fade in pour chaque oscillateur
      gainNode.gain.linearRampToValueAtTime(0.12 - (index * 0.015), ctx.currentTime + 2);

      audioNodesRef.current.push(oscillator);
      gainNodesRef.current.push(gainNode);
    });

    // Ajouter une sous-harmonique douce
    const subOsc = ctx.createOscillator();
    subOsc.type = 'triangle';
    subOsc.frequency.value = frequencies[0] / 2;
    const subGain = ctx.createGain();
    subGain.gain.value = 0;
    subOsc.connect(subGain);
    subGain.connect(masterGainRef.current!);
    subOsc.start();
    subGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2);

    audioNodesRef.current.push(subOsc);
    gainNodesRef.current.push(subGain);
  };

  // Fonction pour créer le son de vagues
  const createVaguesSound = (ctx: AudioContext) => {
    const pinkBuffer = createPinkNoise(ctx);
    
    // Source de bruit principal
    const noise = ctx.createBufferSource();
    noise.buffer = pinkBuffer;
    noise.loop = true;

    // Filtre passe-bas pour simuler les vagues
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    filter.Q.value = 1;

    // LFO pour moduler le volume (effet de vagues)
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.2; // Vagues lentes
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.3;

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0;

    lfo.connect(lfoGain);
    lfoGain.connect(noiseGain.gain);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(masterGainRef.current!);

    lfo.start();
    noise.start();
    
    noiseGain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 2);

    audioNodesRef.current.push(noise, lfo);
    gainNodesRef.current.push(noiseGain);

    // Ajouter des harmoniques graves pour plus de profondeur
    const deepOsc = ctx.createOscillator();
    deepOsc.type = 'sine';
    deepOsc.frequency.value = 40;
    const deepGain = ctx.createGain();
    deepGain.gain.value = 0;
    deepOsc.connect(deepGain);
    deepGain.connect(masterGainRef.current!);
    deepOsc.start();
    deepGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 2);

    audioNodesRef.current.push(deepOsc);
    gainNodesRef.current.push(deepGain);
  };

  // Fonction pour créer le son de pluie
  const createPluieSound = (ctx: AudioContext) => {
    const whiteBuffer = createWhiteNoise(ctx);
    
    // Pluie principale
    const rain = ctx.createBufferSource();
    rain.buffer = whiteBuffer;
    rain.loop = true;

    // Filtre passe-bande pour simuler la pluie
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3000;
    filter.Q.value = 0.5;

    const rainGain = ctx.createGain();
    rainGain.gain.value = 0;

    rain.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(masterGainRef.current!);

    rain.start();
    rainGain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 2);

    audioNodesRef.current.push(rain);
    gainNodesRef.current.push(rainGain);

    // Ajouter un bruit rose pour le fond
    const pinkBuffer = createPinkNoise(ctx);
    const background = ctx.createBufferSource();
    background.buffer = pinkBuffer;
    background.loop = true;

    const bgFilter = ctx.createBiquadFilter();
    bgFilter.type = 'lowpass';
    bgFilter.frequency.value = 1200;

    const bgGain = ctx.createGain();
    bgGain.gain.value = 0;

    background.connect(bgFilter);
    bgFilter.connect(bgGain);
    bgGain.connect(masterGainRef.current!);

    background.start();
    bgGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 2);

    audioNodesRef.current.push(background);
    gainNodesRef.current.push(bgGain);
  };

  // Fonction pour créer le son de forêt
  const createForetSound = (ctx: AudioContext) => {
    const pinkBuffer = createPinkNoise(ctx);
    
    // Bruit de fond de forêt
    const forest = ctx.createBufferSource();
    forest.buffer = pinkBuffer;
    forest.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 600;
    filter.Q.value = 2;

    const forestGain = ctx.createGain();
    forestGain.gain.value = 0;

    forest.connect(filter);
    filter.connect(forestGain);
    forestGain.connect(masterGainRef.current!);

    forest.start();
    forestGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 2);

    audioNodesRef.current.push(forest);
    gainNodesRef.current.push(forestGain);

    // Ajouter des oiseaux (oscillateurs modulés)
    for (let i = 0; i < 3; i++) {
      const bird = ctx.createOscillator();
      bird.type = 'sine';
      bird.frequency.value = 1500 + (i * 400);

      const birdLfo = ctx.createOscillator();
      birdLfo.frequency.value = 3 + (i * 0.5);
      const birdLfoGain = ctx.createGain();
      birdLfoGain.gain.value = 200;

      birdLfo.connect(birdLfoGain);
      birdLfoGain.connect(bird.frequency);

      const birdGain = ctx.createGain();
      birdGain.gain.value = 0;

      bird.connect(birdGain);
      birdGain.connect(masterGainRef.current!);

      bird.start();
      birdLfo.start();

      birdGain.gain.linearRampToValueAtTime(0.02 + (i * 0.01), ctx.currentTime + 2 + i);

      audioNodesRef.current.push(bird, birdLfo);
      gainNodesRef.current.push(birdGain);
    }
  };

  // Fonction pour créer le son de vent
  const createVentSound = (ctx: AudioContext) => {
    const whiteBuffer = createWhiteNoise(ctx);
    
    // Vent principal
    const wind = ctx.createBufferSource();
    wind.buffer = whiteBuffer;
    wind.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 400;
    filter.Q.value = 0.3;

    // LFO pour moduler le vent
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.1;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.2;

    const windGain = ctx.createGain();
    windGain.gain.value = 0;

    lfo.connect(lfoGain);
    lfoGain.connect(windGain.gain);
    wind.connect(filter);
    filter.connect(windGain);
    windGain.connect(masterGainRef.current!);

    lfo.start();
    wind.start();

    windGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 2);

    audioNodesRef.current.push(wind, lfo);
    gainNodesRef.current.push(windGain);

    // Ajouter des rafales (oscillateurs graves)
    const gust = ctx.createOscillator();
    gust.type = 'sine';
    gust.frequency.value = 60;

    const gustLfo = ctx.createOscillator();
    gustLfo.frequency.value = 0.15;
    const gustLfoGain = ctx.createGain();
    gustLfoGain.gain.value = 15;

    gustLfo.connect(gustLfoGain);
    gustLfoGain.connect(gust.frequency);

    const gustGain = ctx.createGain();
    gustGain.gain.value = 0;

    gust.connect(gustGain);
    gustGain.connect(masterGainRef.current!);

    gust.start();
    gustLfo.start();

    gustGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 2);

    audioNodesRef.current.push(gust, gustLfo);
    gainNodesRef.current.push(gustGain);
  };

  const initAudio = useCallback(() => {
    if (audioContextRef.current) return;

    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    audioContextRef.current = new AudioContext();
    const ctx = audioContextRef.current;

    // Reprendre le contexte si suspendu (nécessaire pour certains navigateurs)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Master gain pour contrôler le volume global
    masterGainRef.current = ctx.createGain();
    masterGainRef.current.connect(ctx.destination);
    masterGainRef.current.gain.value = volume;

    // Créer le son selon le type sélectionné
    switch (selectedSound) {
      case 'harmonie':
        createHarmonieSound(ctx);
        break;
      case 'vagues':
        createVaguesSound(ctx);
        break;
      case 'pluie':
        createPluieSound(ctx);
        break;
      case 'foret':
        createForetSound(ctx);
        break;
      case 'vent':
        createVentSound(ctx);
        break;
    }
  }, [selectedSound, volume, mood]);

  const fadeOut = useCallback((callback: () => void) => {
    if (!masterGainRef.current) {
      callback();
      return;
    }

    setIsFading(true);
    const currentGain = masterGainRef.current.gain.value;
    const fadeSteps = 30;
    const fadeTime = 1000; // 1 seconde
    let step = 0;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    fadeIntervalRef.current = setInterval(() => {
      step++;
      const newGain = currentGain * (1 - step / fadeSteps);
      if (masterGainRef.current) {
        masterGainRef.current.gain.value = Math.max(0, newGain);
      }

      if (step >= fadeSteps) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }
        setIsFading(false);
        callback();
      }
    }, fadeTime / fadeSteps);
  }, []);

  const stopAudio = useCallback(() => {
    audioNodesRef.current.forEach(node => {
      try {
        if ('stop' in node) {
          node.stop();
        }
      } catch (e) {
        // Nœud déjà arrêté
      }
    });
    audioNodesRef.current = [];
    gainNodesRef.current = [];

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    masterGainRef.current = null;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      fadeOut(() => {
        stopAudio();
        setIsPlaying(false);
      });
    } else {
      initAudio();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (masterGainRef.current && !isFading) {
      masterGainRef.current.gain.value = newVolume;
    }
  };

  const handleSoundTypeChange = (newType: SoundType) => {
    if (newType === selectedSound) return;
    
    setSelectedSound(newType);
    
    if (isPlaying) {
      fadeOut(() => {
        stopAudio();
        // Petit délai avant de redémarrer
        setTimeout(() => {
          initAudio();
        }, 100);
      });
    }
  };

  // Nettoyer à la fin
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [stopAudio]);

  // Gérer les changements d'humeur avec fondu
  useEffect(() => {
    if (isPlaying && selectedSound === 'harmonie') {
      fadeOut(() => {
        stopAudio();
        setTimeout(() => {
          initAudio();
        }, 100);
      });
    }
  }, [mood]);

  const soundIcons = {
    harmonie: Music,
    vagues: Waves,
    pluie: CloudRain,
    foret: Cloud,
    vent: Wind,
  };

  const soundLabels = {
    harmonie: 'Armonía',
    vagues: 'Olas',
    pluie: 'Lluvia',
    foret: 'Bosque',
    vent: 'Viento',
  };

  return (
    <>
      {/* Bouton principal de musique */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowControls(!showControls)}
        className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full backdrop-blur-md flex items-center justify-center shadow-lg"
        style={{
          background: isPlaying 
            ? `linear-gradient(135deg, ${moodColors[0]}CC, ${moodColors[1]}CC)` 
            : 'rgba(255, 255, 255, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 4px 16px rgba(212, 179, 208, 0.3)',
        }}
      >
        <motion.div
          animate={isPlaying ? {
            scale: [1, 1.1, 1],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Music className="w-6 h-6" style={{ color: '#D4B3D0' }} />
        </motion.div>
        
        {/* Indicateur de lecture */}
        {isPlaying && (
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid #D4B3D0',
            }}
          />
        )}
      </motion.button>

      {/* Panneau de contrôles */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-30 p-4 rounded-3xl backdrop-blur-md shadow-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              minWidth: '240px',
              maxWidth: '280px',
            }}
          >
            {/* Bouton fermer */}
            <button
              onClick={() => setShowControls(false)}
              className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(212, 179, 208, 0.2)',
              }}
            >
              <X className="w-3 h-3" style={{ color: '#D4B3D0' }} />
            </button>

            <div className="space-y-4 pt-2">
              {/* Titre */}
              <p 
                className="text-center mb-3"
                style={{ 
                  color: '#D4B3D0',
                  fontWeight: 300,
                  letterSpacing: '0.05em'
                }}
              >
                Música Relajante
              </p>

              {/* Sélection du type de son */}
              <div className="space-y-2">
                <p 
                  className="text-center"
                  style={{ 
                    color: '#D4B3D0',
                    fontWeight: 300,
                    fontSize: '0.85rem',
                    opacity: 0.8
                  }}
                >
                  Sonidos
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {(Object.keys(soundIcons) as SoundType[]).map((soundType) => {
                    const Icon = soundIcons[soundType];
                    return (
                      <motion.button
                        key={soundType}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleSoundTypeChange(soundType)}
                        className="aspect-square rounded-full backdrop-blur-sm flex items-center justify-center"
                        style={{
                          background: selectedSound === soundType
                            ? `linear-gradient(135deg, ${moodColors[0]}, ${moodColors[1]})`
                            : 'rgba(212, 179, 208, 0.2)',
                          border: selectedSound === soundType
                            ? '2px solid rgba(212, 179, 208, 0.5)'
                            : '1px solid rgba(212, 179, 208, 0.3)',
                        }}
                      >
                        <Icon 
                          className="w-4 h-4" 
                          style={{ 
                            color: selectedSound === soundType ? '#FFF' : '#D4B3D0' 
                          }} 
                        />
                      </motion.button>
                    );
                  })}
                </div>
                <p 
                  className="text-center"
                  style={{ 
                    color: '#D4B3D0',
                    fontSize: '0.7rem',
                    opacity: 0.7,
                    fontWeight: 300
                  }}
                >
                  {soundLabels[selectedSound]}
                </p>
              </div>

              {/* Contrôle play/pause */}
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlay}
                  disabled={isFading}
                  className="px-6 py-2 rounded-full"
                  style={{
                    background: isPlaying 
                      ? `linear-gradient(135deg, ${moodColors[0]}, ${moodColors[1]})` 
                      : 'rgba(212, 179, 208, 0.3)',
                    color: isPlaying ? '#FFF' : '#D4B3D0',
                    fontWeight: 300,
                    letterSpacing: '0.05em',
                    opacity: isFading ? 0.5 : 1,
                  }}
                >
                  {isFading ? 'Transición...' : isPlaying ? 'Pausar' : 'Reproducir'}
                </motion.button>
              </div>

              {/* Contrôle de volume */}
              {isPlaying && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2 justify-center">
                    <VolumeX className="w-4 h-4" style={{ color: '#D4B3D0' }} />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, ${moodColors[0]} 0%, ${moodColors[1]} ${volume * 100}%, rgba(212, 179, 208, 0.2) ${volume * 100}%, rgba(212, 179, 208, 0.2) 100%)`,
                      }}
                    />
                    <Volume2 className="w-4 h-4" style={{ color: '#D4B3D0' }} />
                  </div>
                  <p 
                    className="text-center"
                    style={{ 
                      color: '#D4B3D0',
                      fontSize: '0.7rem',
                      opacity: 0.7
                    }}
                  >
                    Volumen: {Math.round(volume * 100)}%
                  </p>
                </motion.div>
              )}

              {/* Ambiance actuelle */}
              {selectedSound === 'harmonie' && (
                <div 
                  className="text-center pt-2 border-t"
                  style={{ 
                    borderColor: 'rgba(212, 179, 208, 0.2)',
                    fontSize: '0.7rem'
                  }}
                >
                  <p style={{ color: '#D4B3D0', opacity: 0.7 }}>
                    Ambiente: {mood === 'calm' ? 'Calma' : mood === 'happy' ? 'Alegría' : mood === 'sad' ? 'Melancolía' : 'Serenidad'}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

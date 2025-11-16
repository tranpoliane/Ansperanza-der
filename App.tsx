import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Music,
  Leaf,
  Wind,
  Flower2,
  Sparkles,
  Menu,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { AmbianceScreen } from "./components/AmbianceScreen";
import { PersonalizationScreen } from "./components/PersonalizationScreen";
import { GamesScreen } from "./components/GamesScreen";
import { SoundsScreen } from "./components/SoundsScreen";
import { ContactsScreen } from "./components/ContactsScreen";
import { MenuDrawer } from "./components/MenuDrawer";
import { MoodSelector } from "./components/MoodSelector";
import { FreeWritingScreen } from "./components/FreeWritingScreen";
import { DrawingScreen } from "./components/DrawingScreen";
import { CreativeSpaceScreen } from "./components/CreativeSpaceScreen";
import { ProgressScreen } from "./components/ProgressScreen";
import { MotivationalMessageScreen } from "./components/MotivationalMessageScreen";
import { SubscriptionScreen } from "./components/SubscriptionScreen";
import { FeedbackScreen } from "./components/FeedbackScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { MusicPlayer } from "./components/MusicPlayer";

type Screen =
  | "home"
  | "ambiance"
  | "personalization"
  | "games"
  | "sounds"
  | "contacts"
  | "writing"
  | "drawing"
  | "mood"
  | "creative"
  | "progress"
  | "motivational"
  | "subscription"
  | "feedback"
  | "settings";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("mood");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [moodColors, setMoodColors] = useState<string[]>([
    "#AEE3E9",
    "#C9D9F0",
    "#E0EFF5",
  ]);
  const [selectedMood, setSelectedMood] = useState("calm");
  const [selectedBackground, setSelectedBackground] = useState(
    "https://images.unsplash.com/photo-1665890883356-b7eff3f95b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMGJlYWNoJTIwc3Vuc2V0fGVufDF8fHx8MTc2MjA4MTc5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
  );
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [largeFontSize, setLargeFontSize] = useState(false);

  const handleSelectMood = (mood: string, colors: string[]) => {
    setMoodColors(colors);
    setSelectedMood(mood);
    setCurrentScreen("motivational");
  };

  const handleSelectTheme = (image: string) => {
    setSelectedBackground(image);
    setCurrentScreen("home");
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{ fontWeight: 300 }}
    >
      <AnimatePresence mode="wait">
        {currentScreen === "mood" && (
          <MoodSelector onSelectMood={handleSelectMood} />
        )}

        {currentScreen === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-between p-6 overflow-hidden"
            style={{
              background:
                "linear-gradient(to bottom, #AEE3E9 0%, #C9D9F0 40%, #FBD5D9 100%)",
            }}
          >
            {/* Decorative floating foliage - left side */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-10 left-0"
              >
                <svg
                  width="80"
                  height="120"
                  viewBox="0 0 80 120"
                  fill="none"
                >
                  <ellipse
                    cx="20"
                    cy="30"
                    rx="15"
                    ry="25"
                    fill="#BCE0C3"
                    opacity="0.6"
                  />
                  <ellipse
                    cx="35"
                    cy="50"
                    rx="18"
                    ry="30"
                    fill="#86BCA1"
                    opacity="0.5"
                  />
                  <ellipse
                    cx="25"
                    cy="80"
                    rx="12"
                    ry="20"
                    fill="#BCE0C3"
                    opacity="0.4"
                  />
                </svg>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 15, 0],
                  x: [0, -8, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute top-40 left-5"
              >
                <svg
                  width="60"
                  height="90"
                  viewBox="0 0 60 90"
                  fill="none"
                >
                  <ellipse
                    cx="30"
                    cy="20"
                    rx="20"
                    ry="30"
                    fill="#86BCA1"
                    opacity="0.4"
                  />
                  <ellipse
                    cx="20"
                    cy="55"
                    rx="15"
                    ry="25"
                    fill="#BCE0C3"
                    opacity="0.5"
                  />
                </svg>
              </motion.div>

              {/* Decorative floating foliage - right side */}
              <motion.div
                animate={{
                  y: [0, -18, 0],
                  x: [0, -10, 0],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute top-24 right-0"
              >
                <svg
                  width="70"
                  height="110"
                  viewBox="0 0 70 110"
                  fill="none"
                >
                  <ellipse
                    cx="50"
                    cy="25"
                    rx="18"
                    ry="28"
                    fill="#BCE0C3"
                    opacity="0.5"
                  />
                  <ellipse
                    cx="35"
                    cy="55"
                    rx="20"
                    ry="32"
                    fill="#86BCA1"
                    opacity="0.6"
                  />
                  <ellipse
                    cx="45"
                    cy="85"
                    rx="15"
                    ry="22"
                    fill="#BCE0C3"
                    opacity="0.4"
                  />
                </svg>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 20, 0],
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 11,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3,
                }}
                className="absolute top-[45%] right-3"
              >
                <svg
                  width="55"
                  height="85"
                  viewBox="0 0 55 85"
                  fill="none"
                >
                  <ellipse
                    cx="28"
                    cy="30"
                    rx="16"
                    ry="24"
                    fill="#86BCA1"
                    opacity="0.5"
                  />
                  <ellipse
                    cx="30"
                    cy="60"
                    rx="18"
                    ry="26"
                    fill="#BCE0C3"
                    opacity="0.4"
                  />
                </svg>
              </motion.div>

              {/* Floating sparkle elements */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-32 right-20"
              >
                <Sparkles
                  className="w-4 h-4"
                  style={{ color: "#D4B3D0" }}
                />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 12, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute top-[60%] left-16"
              >
                <Sparkles
                  className="w-3 h-3"
                  style={{ color: "#D4B3D0" }}
                />
              </motion.div>
            </div>

            {/* Menu Button - Top Left */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(true)}
              className="absolute top-6 left-6 z-20 w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center"
              style={{
                background: "rgba(255, 255, 255, 0.5)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
                boxShadow:
                  "0 4px 12px rgba(212, 179, 208, 0.2)",
              }}
            >
              <Menu
                className="w-4 h-4"
                style={{ color: "#D4B3D0" }}
              />
            </motion.button>

            {/* Progress Button - Top Right */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentScreen("progress")}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center"
              style={{
                background: "rgba(255, 255, 255, 0.5)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
                boxShadow:
                  "0 4px 12px rgba(212, 179, 208, 0.2)",
              }}
            >
              <TrendingUp
                className="w-4 h-4"
                style={{ color: "#D4B3D0" }}
              />
            </motion.button>

            {/* Main content */}
            <div className="flex-1 flex flex-col items-center justify-center z-10 max-w-sm w-full">
              {/* Logo/Title */}
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.3,
                  duration: 1.2,
                  ease: "easeOut",
                }}
                className="mb-3"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.015, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <h1
                    className="text-center tracking-wider mb-2"
                    style={{
                      color: "#D4B3D0",
                      fontWeight: 300,
                      letterSpacing: "0.08em",
                      fontSize: "3rem",
                    }}
                  >
                    Ansperanza
                  </h1>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center tracking-wide italic"
                  style={{
                    color: "#D4B3D0",
                    fontWeight: 300,
                    fontSize: "0.75rem",
                  }}
                >
                  De la ansiedad a la esperanza.
                </motion.p>
              </motion.div>

              {/* Central decorative circle */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.6,
                  duration: 1,
                  type: "spring",
                  bounce: 0.3,
                }}
                className="my-10"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-44 h-44"
                >
                  <div
                    className="absolute inset-0 rounded-full blur-3xl opacity-40"
                    style={{
                      background:
                        "radial-gradient(circle, #AEE3E9, #D4B3D0, #FBD5D9)",
                    }}
                  />
                  <div
                    className="absolute inset-6 rounded-full backdrop-blur-sm flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(174, 227, 233, 0.4), rgba(212, 179, 208, 0.4), rgba(251, 213, 217, 0.4))",
                      boxShadow:
                        "0 8px 32px rgba(212, 179, 208, 0.3)",
                    }}
                  >
                    <Wind
                      className="w-14 h-14"
                      style={{ color: "#D4B3D0" }}
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Main CTA Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentScreen("ambiance")}
                className="px-14 py-4 rounded-full shadow-lg mb-10 backdrop-blur-sm border"
                style={{
                  background: "rgba(227, 200, 224, 0.4)",
                  color: "#D4B3D0",
                  borderColor: "rgba(227, 200, 224, 0.5)",
                  fontWeight: 300,
                  letterSpacing: "0.05em",
                }}
              >
                Respira
              </motion.button>

              {/* Icon buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="flex gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentScreen("contacts")}
                  className="w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center shadow-md"
                  style={{
                    background: "rgba(255, 255, 255, 0.5)",
                    border:
                      "1px solid rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <Wind
                    className="w-5 h-5"
                    style={{ color: "#8BD4DC" }}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentScreen("sounds")}
                  className="w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center shadow-md"
                  style={{
                    background: "rgba(255, 255, 255, 0.5)",
                    border:
                      "1px solid rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <Music
                    className="w-5 h-5"
                    style={{ color: "#F9BFCA" }}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentScreen("creative")}
                  className="w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center shadow-md relative"
                  style={{
                    background: "rgba(255, 255, 255, 0.5)",
                    border:
                      "1px solid rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Lightbulb
                      className="w-5 h-5"
                      style={{ color: "#D4B3D0" }}
                    />
                  </motion.div>
                  <motion.div
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-1 -right-1"
                  >
                    <Sparkles
                      className="w-2 h-2"
                      style={{ color: "#FBD5D9" }}
                    />
                  </motion.div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentScreen("games")}
                  className="w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center shadow-md"
                  style={{
                    background: "rgba(255, 255, 255, 0.5)",
                    border:
                      "1px solid rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <Leaf
                    className="w-5 h-5"
                    style={{ color: "#6FAA8C" }}
                  />
                </motion.button>
              </motion.div>
            </div>

            {/* Bottom decoration */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex gap-8 items-center justify-center pb-6"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Flower2
                  className="w-5 h-5"
                  style={{ color: "#BCE0C3", opacity: 0.6 }}
                />
              </motion.div>
              <div
                className="w-20 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(188, 224, 195, 0.4), transparent)",
                }}
              />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              >
                <Flower2
                  className="w-5 h-5"
                  style={{ color: "#BCE0C3", opacity: 0.6 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {currentScreen === "ambiance" && (
          <AmbianceScreen
            onBack={() => setCurrentScreen("home")}
            backgroundImage={selectedBackground}
          />
        )}

        {currentScreen === "personalization" && (
          <PersonalizationScreen
            onBack={() => setCurrentScreen("home")}
            onSelectTheme={handleSelectTheme}
          />
        )}

        {currentScreen === "games" && (
          <GamesScreen
            onBack={() => setCurrentScreen("home")}
          />
        )}

        {currentScreen === "sounds" && (
          <SoundsScreen
            onBack={() => setCurrentScreen("home")}
          />
        )}

        {currentScreen === "contacts" && (
          <ContactsScreen
            onBack={() => setCurrentScreen("home")}
          />
        )}

        {currentScreen === "creative" && (
          <CreativeSpaceScreen
            onBack={() => setCurrentScreen("home")}
            onSelectWriting={() => setCurrentScreen("writing")}
            onSelectDrawing={() => setCurrentScreen("drawing")}
            moodColors={moodColors}
          />
        )}

        {currentScreen === "writing" && (
          <FreeWritingScreen
            onBack={() => setCurrentScreen("creative")}
            moodColors={moodColors}
          />
        )}

        {currentScreen === "drawing" && (
          <DrawingScreen
            onBack={() => setCurrentScreen("creative")}
            moodColors={moodColors}
          />
        )}

        {currentScreen === "progress" && (
          <ProgressScreen
            onBack={() => setCurrentScreen("home")}
            moodColors={moodColors}
          />
        )}

        {currentScreen === "motivational" && (
          <MotivationalMessageScreen
            mood={selectedMood}
            onContinue={() => setCurrentScreen("home")}
          />
        )}

        {currentScreen === "subscription" && (
          <SubscriptionScreen
            onBack={() => setCurrentScreen("home")}
            moodColors={moodColors}
          />
        )}

        {currentScreen === "feedback" && (
          <FeedbackScreen
            onBack={() => setCurrentScreen("home")}
            moodColors={moodColors}
          />
        )}

        {currentScreen === "settings" && (
          <SettingsScreen
            onBack={() => setCurrentScreen("home")}
            moodColors={moodColors}
            dyslexicFont={dyslexicFont}
            onToggleDyslexicFont={setDyslexicFont}
            largeFontSize={largeFontSize}
            onToggleLargeFontSize={setLargeFontSize}
          />
        )}
      </AnimatePresence>

      {/* Menu Drawer - Available on all screens */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigateToPersonalization={() =>
          setCurrentScreen("personalization")
        }
        onNavigateToSubscription={() =>
          setCurrentScreen("subscription")
        }
        onNavigateToFeedback={() =>
          setCurrentScreen("feedback")
        }
        onNavigateToSettings={() =>
          setCurrentScreen("settings")
        }
      />

      {/* Music Player - Available on all screens except mood selector */}
      {currentScreen !== "mood" && (
        <MusicPlayer
          mood={selectedMood}
          moodColors={moodColors}
        />
      )}
    </div>
  );
}
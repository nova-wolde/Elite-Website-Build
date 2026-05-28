import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("fufut-loaded");
    if (!hasLoaded) {
      setIsVisible(true);
      sessionStorage.setItem("fufut-loaded", "true");
      const timer = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] as [number,number,number,number] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1B1B1B] overflow-hidden"
        >
          <div className="relative w-32 h-40 flex items-center justify-center mb-8">
            {/* Jebena SVG Outline */}
            <svg viewBox="0 0 100 120" className="w-full h-full text-[#0B7A78] fill-transparent stroke-current stroke-2 absolute inset-0 z-10">
              <path d="M 50 10 C 60 10, 65 30, 55 45 C 55 45, 80 65, 80 90 C 80 110, 20 110, 20 90 C 20 65, 45 45, 45 45 C 35 30, 40 10, 50 10 Z" />
              <path d="M 80 70 C 95 70, 95 50, 85 45" className="stroke-current stroke-2 fill-transparent" />
            </svg>

            {/* Liquid Fill Animation */}
            <svg viewBox="0 0 100 120" className="w-full h-full absolute inset-0 z-0">
              <clipPath id="jebena-clip">
                <path d="M 50 10 C 60 10, 65 30, 55 45 C 55 45, 80 65, 80 90 C 80 110, 20 110, 20 90 C 20 65, 45 45, 45 45 C 35 30, 40 10, 50 10 Z M 80 70 C 95 70, 95 50, 85 45" />
              </clipPath>
              <motion.rect
                x="0"
                y="0"
                width="100"
                height="120"
                fill="#0B7A78"
                clipPath="url(#jebena-clip)"
                initial={{ scaleY: 0, transformOrigin: "bottom" }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.4, delay: 0.4, ease: "easeInOut" }}
              />
            </svg>

            {/* Steam Curves */}
            <div className="absolute -top-16 left-0 right-0 h-16 flex justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.svg
                  key={i}
                  width="12"
                  height="40"
                  viewBox="0 0 12 40"
                  className="stroke-[#0B7A78] fill-transparent stroke-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: [0, 1, 0], y: -20 }}
                  transition={{
                    duration: 2,
                    delay: 1.8 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <path d="M 6 40 Q 12 30 6 20 T 6 0" />
                </motion.svg>
              ))}
            </div>
          </div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-serif text-white text-4xl tracking-[0.4em] mb-3 ml-2">FUFUT</h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="font-sans text-xs text-[#67CDD3] tracking-[0.6em] uppercase ml-1"
            >
              Coffee
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1B1B1B]">
            <motion.div
              className="h-full bg-[#0B7A78]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.6, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
"use client";

import { ThemeProvider } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={children.key}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </ThemeProvider>
      </body>
    </html>
  );
}
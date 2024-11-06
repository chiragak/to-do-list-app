"use client";
import './globals.css';
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>To-Do List App</title>
      </head>
      <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
        <body>
          <main>{children}</main>
        </body>
      </ThemeProvider>
    </html>
  );
}

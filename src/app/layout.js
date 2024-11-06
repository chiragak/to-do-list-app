import './globals.css';  

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>To-Do List App</title>
        
      </head>
      <body className="bg-[#F5F9FF] font-sans">
        <main>{children}</main> 
      </body>
    </html>
  );
}

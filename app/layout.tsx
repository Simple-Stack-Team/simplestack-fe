import "./globals.css";
import Home from "./page";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Home />
      </body>
    </html>
  );
}

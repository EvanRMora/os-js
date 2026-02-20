import type { ReactNode } from "react";
import { ThemeProvider } from "lib/theme";
import "./globals.css";

export const metadata = {
  title: "OS-JS",
  description: "Retro desktop OS website boilerplate",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

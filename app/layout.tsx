import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { Header } from "@/components/layout/Header";
import AuthGuard from "@/components/guards/AuthGuard";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BookAction - Learn Healthy Relationships",
  description: "Interactive learning platform for relationship education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-[#F0F9FF]`}>
        <QueryProvider>
          <AuthGuard>
            <Header />
            <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          </AuthGuard>
        </QueryProvider>
      </body>
    </html>
  );
}

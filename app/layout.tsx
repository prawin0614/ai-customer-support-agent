import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { AdminGuard } from '@/components/AdminGuard';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RefundAI - Intelligent Customer Support Agent',
  description: 'AI-powered refund processing with transparent reasoning and manager approval workflow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-white`}>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">
              <AdminGuard>
                {children}
              </AdminGuard>
            </main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

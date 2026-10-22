import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RootLab - Verified Tech Network, Workplace Watercooler & Referral Hub',
  description: 'Verified tech workplace discussions, anonymous company watercoolers, direct job referrals, interview intel, and real-time developer chat.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#080b11] text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}

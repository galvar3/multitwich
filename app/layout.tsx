import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/app/providers';
import { Analytics } from '@vercel/analytics/react';
import { inter } from '@/app/ui/fonts';

export const metadata: Metadata = {
    title: 'Multitwitch Streameow',
    description: 'Watch multiple Twitch streams at the same time',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <Providers>
            {children}
            <Analytics />
        </Providers>
        </body>
        </html>
    );
}

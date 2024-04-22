import React from 'react';
import type { Metadata } from 'next';
import '../../styles/globals.css';
export const metadata: Metadata = {
    title: 'DevOverflow',
    description:
        'Website about developers and needs for jobs demands which the market needs',
    icons: {
        icon: '../assets/images/default-logo.svg',
    },
};
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
                <main className="background-light850_dark100 relative">
                    <div className="flex">
                        <section className="flex min-h-screen flex-1 flex-col max-md:pb-14 sm:px-14">
                            <div className="mx-auto w-full max-w-5xl">{children}</div>
                        </section>
                    </div>
                </main>
    );
}
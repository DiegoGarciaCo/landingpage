"use client";

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function EmailVerifiedPage() {
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        // Get status from URL query parameter
        const params = new URLSearchParams(window.location.search);
        const urlStatus = params.get('status');

        if (urlStatus === 'success') {
            setStatus('success');
        } else if (urlStatus === 'error') {
            setStatus('error');
        } else {
            setStatus('unknown');
        }
    }, []);

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                <div className="animate-pulse text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-emerald-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative max-w-md w-full">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
                    {status === 'success' ? (
                        <div className="text-center space-y-6">
                            <div className="flex justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-emerald-500/30 blur-2xl rounded-full animate-pulse"></div>
                                    <CheckCircle className="relative w-20 h-20 text-emerald-400 animate-bounce" strokeWidth={1.5} />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h1 className="text-3xl md:text-4xl font-bold text-white">
                                    Email Verified!
                                </h1>
                                <p className="text-slate-300 text-lg">
                                    You're all set and ready to go.
                                </p>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-3">
                                <p className="text-slate-200 text-sm leading-relaxed">
                                    Welcome to the VIP Market Insider list! You'll now receive exclusive market updates, trends, and insights for Elgin and Chicago real estate delivered straight to your inbox.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <a
                                    href="https://soldbyghost.com"
                                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 border border-white/20"
                                >
                                    Visit Website
                                </a>
                            </div>
                        </div>
                    ) : status === 'error' ? (
                        <div className="text-center space-y-6">
                            <div className="flex justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-red-500/30 blur-2xl rounded-full animate-pulse"></div>
                                    <XCircle className="relative w-20 h-20 text-red-400" strokeWidth={1.5} />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h1 className="text-3xl md:text-4xl font-bold text-white">
                                    Verification Failed
                                </h1>
                                <p className="text-slate-300 text-lg">
                                    We couldn't verify your email address.
                                </p>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-3">
                                <p className="text-slate-200 text-sm leading-relaxed">
                                    The verification link may have expired or is invalid. Please try requesting a new verification email or contact support if the problem persists.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 pt-4">
                                <a
                                    href="https://server.soldbyghost.com/api/resend-verification"
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/25"
                                >
                                    Request New Link
                                </a>
                                <a
                                    href="https://soldbyghost.com/contact"
                                    className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 border border-white/20"
                                >
                                    Contact Support
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-6">
                            <div className="flex justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-yellow-500/30 blur-2xl rounded-full animate-pulse"></div>
                                    <AlertCircle className="relative w-20 h-20 text-yellow-400" strokeWidth={1.5} />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h1 className="text-3xl md:text-4xl font-bold text-white">
                                    Something's Not Right
                                </h1>
                                <p className="text-slate-300 text-lg">
                                    We couldn't determine the verification status.
                                </p>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-3">
                                <p className="text-slate-200 text-sm leading-relaxed">
                                    Please try clicking the verification link in your email again, or contact our support team for assistance.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 pt-4">
                                <a
                                    href="https://soldbyghost.com"
                                    className="bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-slate-500/25"
                                >
                                    Go Home
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                <div className="text-center mt-8">
                    <p className="text-slate-400 text-sm">
                        © 2025 Sold By Ghost. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

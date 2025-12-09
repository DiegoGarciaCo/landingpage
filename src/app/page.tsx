import { HeroSection } from '@/components/hero-section';
import { BenefitsSection } from '@/components/benefits-section';
import { LeadForm } from '@/components/lead-form';
import { TrustIndicators } from '@/components/trust-indicators';

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    const source = await searchParams
        .then(params => {
            const src = params['source'];
            if (Array.isArray(src)) {
                return src[0];
            }
            if (src === undefined) {
                return "Landing Page";
            }
            return src;
        })
        .catch(() => { return "Landing Page" });

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-blue-950/20">
            <main className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <HeroSection />

                    {/* Benefits Grid */}
                    <BenefitsSection />

                    {/* Lead Form Card */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 sm:p-10 lg:p-12">
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
                                Get Started Today
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Fill out the form below to join our exclusive email list
                            </p>
                        </div>

                        <LeadForm source={source} />
                    </div>

                    {/* Trust Indicators */}
                    <TrustIndicators />

                    {/* Footer */}
                    <footer className="mt-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
                        <p>© {new Date().getFullYear()} Your Realty Company. All rights reserved.</p>
                        <div className="mt-2 flex items-center justify-center gap-4">
                            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                Privacy Policy
                            </a>
                            <span>•</span>
                            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                Terms of Service
                            </a>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
}

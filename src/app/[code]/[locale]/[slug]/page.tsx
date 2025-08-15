import Image from "next/image";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { showNewFeatureFlag, homepageLayoutExperiment, staticFlags } from '@/flags/definitions';


interface PageProps {
  params: Promise<{
    code: string;
    locale: string;
    slug: string
  }>;
}

export const dynamic = "error"

export function generateStaticParams() {
  return []
}

export default async function Home({ params }: PageProps) {
  const { code, locale, slug } = await params;
  const t = await getTranslations('HomePage');

  console.log({ code, locale, slug })

  // Resolve flags using the precomputed code
  const showNewFeature = await showNewFeatureFlag(code, staticFlags);
  const layoutVariant = await homepageLayoutExperiment(code, staticFlags);


  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <p>{t('description')}</p>
        <h3>Slug: {slug}</h3>

        <div className="bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded mb-4">
          <strong>Precomputed Code:</strong> {code}
        </div>

        {showNewFeature && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
            🎉 New feature is now available!
          </div>
        )}

        {layoutVariant !== 'control' && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            You&apos;re seeing layout variant: {layoutVariant}
          </div>
        )}
      </main>
    </div>
  );
}

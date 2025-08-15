import { flag } from 'flags/next';

export const showNewFeatureFlag = flag({
  key: 'show-new-feature',
  decide() {
    // For demo purposes, show to 50% of users
    // In production, this would connect to your feature flag service
    return Math.random() > 0.5;
  },
});

export const homepageLayoutExperiment = flag({
  key: 'experiment-homepage-layout',
  decide() {
    // A/B/C test with three variants
    const random = Math.random();
    if (random < 0.33) return 'control';
    if (random < 0.66) return 'variant-a';
    return 'variant-b';
  },
});


export const staticFlags = [showNewFeatureFlag, homepageLayoutExperiment] as const;

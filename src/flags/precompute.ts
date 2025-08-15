import { staticFlags } from './definitions';
import { precompute } from 'flags/next';

export async function computeFlags() {
  // Use flags SDK precompute
  return await precompute(staticFlags);
}
import { NextResponse, NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { precompute } from 'flags/next';
import { staticFlags } from './flags/definitions';

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(request: NextRequest) {

  const response = intlMiddleware(request);

  const code = await precompute(staticFlags);

  const rewrite = response.headers.get('x-middleware-rewrite');
  if (rewrite) {

    let url = new URL(rewrite);
    let parts = url.pathname.split("/").filter(Boolean);

    // Insert your value at the start of the path
    parts.unshift(code);

    url.pathname = "/" + parts.join("/");
    response.headers.set('x-middleware-rewrite', url.toString())
  }
  console.log("localization i18n", response)



  return response
}

export const config = {
  matcher: ['/', '/((?!_next|_vercel|.*\\..*).*)']
};

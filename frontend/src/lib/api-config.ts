const PROD_API = 'https://tradefxbook-eta.vercel.app';
const DEV_API = 'http://localhost:8000';
const IS_DEV = typeof window !== 'undefined' && window.location.hostname === 'localhost';

const resolvedUrl = process.env.NEXT_PUBLIC_API_URL || (IS_DEV ? DEV_API : PROD_API);

export class API_CONFIG {
  static get BASE_URL(): string {
    return resolvedUrl;
  }
}

export const API_BASE_URL = resolvedUrl;

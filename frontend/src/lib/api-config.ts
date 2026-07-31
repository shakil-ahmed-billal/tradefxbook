export class API_CONFIG {
  static get BASE_URL(): string {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  }
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

import 'server-only';

export const token = process.env.SANITY_API_READ_TOKEN;

if (!token) {
  throw new Error('Missing SANITY_API_TOKEN');
}

// Note: experimental_taintUniqueValue was removed in newer React versions
// The token is already protected by 'server-only' import

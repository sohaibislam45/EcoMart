export const getApiUrl = (path: string = '') => {
  // Client-side can use relative paths
  if (typeof window !== 'undefined') {
    return `/api${path.startsWith('/') ? path : `/${path}`}`;
  }

  // Server-side needs absolute URLs
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const apiBase = `${baseUrl}/api`;
  
  return `${apiBase}${path.startsWith('/') ? path : `/${path}`}`;
};

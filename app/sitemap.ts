import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vedantpatil.dev';
  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/education`, lastModified: new Date() },
    { url: `${baseUrl}/experience`, lastModified: new Date() },
    { url: `${baseUrl}/dossier`, lastModified: new Date() },
  ];
}

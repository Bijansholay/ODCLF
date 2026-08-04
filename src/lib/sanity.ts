import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || import.meta.env.SANITY_PROJECT_ID || 'your-project-id';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || import.meta.env.SANITY_DATASET || 'production';
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || import.meta.env.SANITY_API_VERSION || '2026-08-03';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Serve cached contents from Edge CDN
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  if (!source) return { url: () => '' };
  return builder.image(source);
}

import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

// Define the base URL for your site
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://umidigital.com';

// Query to get all published content with slugs
const getAllSlugsQuery = groq`
  {
    "pages": *[_type == "page" && defined(slug.current) && !(_id in path("drafts.**"))] {
      "slug": slug.current,
      "lastModified": _updatedAt
    },
    "posts": *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] {
      "slug": slug.current,
      "lastModified": _updatedAt
    },
    "projects": *[_type == "project" && defined(slug.current) && !(_id in path("drafts.**"))] {
      "slug": slug.current,
      "lastModified": _updatedAt
    },
    "services": *[_type == "service" && defined(slug.current) && !(_id in path("drafts.**"))] {
      "slug": slug.current,
      "lastModified": _updatedAt
    },
    "team": *[_type == "team" && defined(slug.current) && !(_id in path("drafts.**"))] {
      "slug": slug.current,
      "lastModified": _updatedAt
    },
    "jobs": *[_type == "job" && defined(slug.current) && !(_id in path("drafts.**"))] {
      "slug": slug.current,
      "lastModified": _updatedAt
    }
  }
`;

// Static routes that don't come from Sanity
const staticRoutes = [
  { url: '', priority: '1.0', changefreq: 'weekly' }, // Home page
  { url: '/blog', priority: '0.8', changefreq: 'weekly' },
  { url: '/jobs', priority: '0.7', changefreq: 'weekly' },
  { url: '/labs', priority: '0.7', changefreq: 'weekly' },
  { url: '/our-work', priority: '0.8', changefreq: 'weekly' },
  { url: '/service', priority: '0.9', changefreq: 'weekly' },
  { url: '/team', priority: '0.7', changefreq: 'weekly' },
];

function generateSitemapXml(urls: Array<{ url: string; lastModified?: string; priority: string; changefreq: string }>) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(({ url, lastModified, priority, changefreq }) => {
    const fullUrl = `${baseUrl}${url}`;
    const lastmod = lastModified ? new Date(lastModified).toISOString() : new Date().toISOString();
    
    return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;
}

export async function GET() {
  try {
    // Fetch all content from Sanity
    const data = await client.fetch(getAllSlugsQuery);
    
    // Build URLs array starting with static routes
    const urls: Array<{ url: string; lastModified?: string; priority: string; changefreq: string }> = staticRoutes.map(route => ({
      url: route.url,
      priority: route.priority,
      changefreq: route.changefreq,
    }));

    // Add dynamic content URLs
    if (data.pages) {
      data.pages.forEach((page: { slug: string; lastModified: string }) => {
        urls.push({
          url: `/${page.slug}`,
          lastModified: page.lastModified,
          priority: '0.6',
          changefreq: 'monthly',
        });
      });
    }

    if (data.posts) {
      data.posts.forEach((post: { slug: string; lastModified: string }) => {
        urls.push({
          url: `/blog/${post.slug}`,
          lastModified: post.lastModified,
          priority: '0.7',
          changefreq: 'monthly',
        });
      });
    }

    if (data.projects) {
      data.projects.forEach((project: { slug: string; lastModified: string }) => {
        urls.push({
          url: `/our-work/${project.slug}`,
          lastModified: project.lastModified,
          priority: '0.7',
          changefreq: 'monthly',
        });
      });
    }

    if (data.services) {
      data.services.forEach((service: { slug: string; lastModified: string }) => {
        urls.push({
          url: `/service/${service.slug}`,
          lastModified: service.lastModified,
          priority: '0.9',
          changefreq: 'monthly',
        });
      });
    }

    if (data.team) {
      data.team.forEach((member: { slug: string; lastModified: string }) => {
        urls.push({
          url: `/team/${member.slug}`,
          lastModified: member.lastModified,
          priority: '0.5',
          changefreq: 'monthly',
        });
      });
    }

    if (data.jobs) {
      data.jobs.forEach((job: { slug: string; lastModified: string }) => {
        urls.push({
          url: `/jobs/${job.slug}`,
          lastModified: job.lastModified,
          priority: '0.6',
          changefreq: 'weekly',
        });
      });
    }

    // Generate the sitemap XML
    const sitemap = generateSitemapXml(urls);

    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return a basic sitemap with just static routes if there's an error
    const fallbackUrls = staticRoutes.map(route => ({
      url: route.url,
      priority: route.priority,
      changefreq: route.changefreq,
    }));
    
    const fallbackSitemap = generateSitemapXml(fallbackUrls);
    
    return new Response(fallbackSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300, s-maxage=300', // Cache for 5 minutes on error
      },
    });
  }
}

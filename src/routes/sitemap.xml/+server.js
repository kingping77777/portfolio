import { getStories } from '$lib/utils/stories.js'

export const prerender = true

export async function GET() {
	const stories = await getStories('en')
	const today = new Date().toISOString().split('T')[0]

	const urls = [
		{
			loc: 'https://dakshsengar.dev/',
			lastmod: today,
			priority: '1.0',
			en: 'https://dakshsengar.dev/',
			hi: 'https://dakshsengar.dev/hi'
		},
		{
			loc: 'https://dakshsengar.dev/hi',
			lastmod: today,
			priority: '0.9',
			en: 'https://dakshsengar.dev/',
			hi: 'https://dakshsengar.dev/hi'
		},
		...stories.flatMap((s) => [
			{
				loc: `https://dakshsengar.dev/stories/${s.slug}`,
				lastmod: s.date,
				priority: '0.8',
				en: `https://dakshsengar.dev/stories/${s.slug}`,
				hi: `https://dakshsengar.dev/hi/stories/${s.slug}`
			},
			{
				loc: `https://dakshsengar.dev/hi/stories/${s.slug}`,
				lastmod: s.date,
				priority: '0.7',
				en: `https://dakshsengar.dev/stories/${s.slug}`,
				hi: `https://dakshsengar.dev/hi/stories/${s.slug}`
			}
		])
	]

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
	.map(
		(u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${u.en}"/>
    <xhtml:link rel="alternate" hreflang="hi" href="${u.hi}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${u.en}"/>
  </url>`
	)
	.join('\n')}
</urlset>`

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml' }
	})
}

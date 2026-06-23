import { paraglideMiddleware } from '$lib/paraglide/server'

// creating a handle to use the paraglide middleware
const paraglideHandle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
		event.request = localizedRequest
		return resolve(event, {
			transformPageChunk: ({ html }) => {
				return html.replace('%lang%', locale)
			}
		})
	})

export const handle = async ({ event, resolve }) => {
	const response = await paraglideHandle({ event, resolve })

	// Set security headers to make the website tight
	response.headers.set('X-Frame-Options', 'DENY')
	response.headers.set('X-Content-Type-Options', 'nosniff')
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
	response.headers.set('Permissions-Policy', 'geolocation=(), camera=(), microphone=(), interest-cohort=()')
	response.headers.set('X-XSS-Protection', '1; mode=block')
	
	// Content Security Policy
	response.headers.set(
		'Content-Security-Policy',
		"default-src 'self'; " +
		"script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; " +
		"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
		"font-src 'self' https://fonts.gstatic.com data:; " +
		"img-src 'self' data: https:; " +
		"connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-analytics.com; " +
		"frame-ancestors 'none'; " +
		"object-src 'none'; " +
		"base-uri 'self';"
	)

	return response
}

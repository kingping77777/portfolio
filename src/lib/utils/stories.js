import { getLocale } from '$lib/paraglide/runtime.js'

const files = {
	en: import.meta.glob('/src/content/stories/en/*.md')
}

export async function getStories(locale) {
	const lang = locale || getLocale()
	const localeFiles = files[lang] || files['en']
	const stories = await Promise.all(
		Object.entries(localeFiles).map(async ([, resolver]) => {
			const { metadata } = await resolver()
			return metadata
		})
	)
	return stories.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export async function getStory(slug, locale) {
	const lang = locale || getLocale()
	const localeFiles = files[lang] || files['en']
	for (const [, resolver] of Object.entries(localeFiles)) {
		const { metadata, default: component } = await resolver()
		if (metadata.slug === slug) {
			return { metadata, component }
		}
	}
	return null
}

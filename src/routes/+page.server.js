import { Resend } from 'resend'
import { env } from '$env/dynamic/private'
import { fail } from '@sveltejs/kit'

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null

function escapeHtml(text) {
	if (typeof text !== 'string') return ''
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;')
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData()

		const honeypot = formData.get('website')
		if (honeypot) return fail(400, { error: 'Invalid submission' })

		const t = Number(formData.get('t'))
		if (!t || Date.now() - t < 2000) return fail(400, { error: 'Invalid submission' })

		const name = escapeHtml(formData.get('name'))
		const email = escapeHtml(formData.get('email'))
		const message = escapeHtml(formData.get('message'))
		const company = escapeHtml(formData.get('company'))

		if (!resend) {
			console.log('📬 [Contact Form Mock Submission]:')
			console.log(`   Name: ${name}`)
			console.log(`   Organization: ${company}`)
			console.log(`   Email: ${email}`)
			console.log(`   Message: ${message}`)
			console.log('------------------------------------')
			return { success: true }
		}

		const { data, error } = await resend.emails.send({
			from: 'noreply@dakshsengar.dev',
			to: 'mansionjoker22@email.com',
			subject: 'New portfolio contact message',
			html: `
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Message: ${message}</p>
                <p>Organization: ${company}</p>
            `
		})

		if (error) {
			return fail(500, { error: error.message })
		}

		return { success: true }
	}
}

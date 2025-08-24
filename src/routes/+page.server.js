import { Resend } from 'resend'
import { env } from '$env/dynamic/private'
import { fail } from '@sveltejs/kit'

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null

export const actions = {
	default: async ({ request }) => {
		if (!resend) {
			return fail(500, { error: 'Contact form is not configured yet. Please set RESEND_API_KEY.' })
		}

		const formData = await request.formData()

		const honeypot = formData.get('website')
		if (honeypot) return fail(400, { error: 'Invalid submission' })

		const t = Number(formData.get('t'))
		if (!t || Date.now() - t < 2000) return fail(400, { error: 'Invalid submission' })

		const name = formData.get('name')
		const email = formData.get('email')
		const message = formData.get('message')
		const company = formData.get('company')

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

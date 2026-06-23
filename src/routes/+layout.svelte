<script>
	import '$lib/scss/main.scss'
	import '$lib/scss/reset.scss'
	import { getLocale } from '$lib/paraglide/runtime'
	import { lenis, easeInOutCubic } from '$lib/utils/lenis'
	import { onDestroy, onMount } from 'svelte'
	import { onNavigate } from '$app/navigation'
	import { m } from '$lib/paraglide/messages'
	import WelcomeIntro from '$lib/components/WelcomeIntro.svelte'

	let { children } = $props()

	let scrollY = $state(0)
	let lastScrollY = $state(0)
	let shy = $state(false)
	let isDark = $state(true)

	onMount(() => {
		document.documentElement.setAttribute('data-theme', 'dark')
	})

	onDestroy(() => {
		if (lenis) lenis.destroy()
	})

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})

	const handleScroll = () => {
		const scrollingDown = lastScrollY < scrollY
		shy = scrollingDown && scrollY > 200
		lastScrollY = scrollY
	}
</script>

<svelte:window bind:scrollY onscroll={handleScroll} />

<nav class:hidden={shy && scrollY > 100} class:floating={scrollY > 300}>
	<div class="cta">

		<a href="https://github.com/kingping77777" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
		</a>
		<a href="https://www.linkedin.com/in/daksh-sengar-79ab962ba/" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79V18h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.44v-8h-2.79v8h2.79z"/></svg>
		</a>
		<a href="https://www.instagram.com/anddhebecomess?igsh=MXQ3NzVhenR5YXdhNw==" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Instagram">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
		</a>

		<div class="backdrop"></div>
	</div>

	<a
		href="/#footer"
		class="button"
		onclick={(e) => {
			const target = document.querySelector('#footer')
			if (target) {
				e.preventDefault()
				lenis.scrollTo(target, { duration: 2 })
			}
		}}
	>
		<span class="text">
			{m.nav_contact()}
		</span>

		<span class="icon">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
				><path
					d="M16 13V5H6V13C6 14.1046 6.89543 15 8 15H14C15.1046 15 16 14.1046 16 13ZM5 3H20C21.1046 3 22 3.89543 22 5V8C22 9.10457 21.1046 10 20 10H18V13C18 15.2091 16.2091 17 14 17H8C5.79086 17 4 15.2091 4 13V4C4 3.44772 4.44772 3 5 3ZM18 5V8H20V5H18ZM2 19H20V21H2V19Z"
				></path></svg
			>
		</span>
	</a>
</nav>

<WelcomeIntro />

<div class="layout">
	<div class="wrapper">
		{@render children()}
	</div>
</div>



<style lang="scss">
	@use 'src/lib/scss/variables' as *;

	nav {
		position: fixed;
		top: 0;
		left: 0;
		padding: 20px;
		background-color: var(--color-surface-nav-glass);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border-bottom: solid 1px var(--color-border-glass);
		z-index: 100;
		transition: ease all 500ms;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;

		.cta {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 1.5rem;

			@media (max-width: $mobile) {
				gap: 0.8rem;
			}
		}

		.social-link {
			color: var(--color-black);
			transition: color 0.3s ease, transform 0.3s ease;
			display: flex;
			align-items: center;
			justify-content: center;

			&:hover {
				color: var(--color-accent);
				transform: scale(1.1);
			}
		}

		&.hidden {
			transform: translateY(-200%);
		}

		@media (max-width: $mobile) {
			top: 0;
			bottom: auto;
			left: 0;
			right: 0;
			width: 100%;
			padding: 1rem;
			background-color: var(--color-surface-nav-glass);
			border-bottom: solid 1px var(--color-border-glass);

			&.hidden {
				transform: translateY(-200%);
			}
		}

		@media (min-width: $mobile) {
			border-bottom: solid 1px transparent;
			background-color: var(--color-surface-nav-glass);
			backdrop-filter: blur(16px);
			-webkit-backdrop-filter: blur(16px);

			&.floating {
				border-color: var(--color-border-glass);
			}
		}

		button.locale-toggle {
			display: flex;
			flex-direction: row;
			border: none;
			align-items: center;
			justify-content: center;
			gap: 1rem;

			.handle-wrapper {
				width: 3rem;
				border-radius: 9999px;
				border: solid 2px var(--color-black);
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-top: -0.2rem;
				background-color: var(--color-surface-card);

				&.toggled {
					.handle {
						transform: translateX(calc(3rem - 1.3rem - 0.3rem));
					}
				}

				.handle {
					width: 1.3rem;
					height: 1.3rem;
					color: var(--color-black);
					transition: ease all 500ms;
					transform: translateX(0);
				}
			}
		}

		button.theme-toggle {
			border: none;
			padding: 6px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: var(--color-black);
			transition: ease all 300ms;
			border-radius: 50%;
			background: transparent;
			cursor: pointer;

			&:hover {
				color: var(--color-accent);
				transform: scale(1.1);
			}
		}

		span.lang {
			transition: ease all 500ms;

			&.active {
				color: var(--color-accent);
			}
		}
	}

	.layout {
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;

		.wrapper {
			max-width: 1920px;
			width: 100%;
			margin: 0 auto;
		}
	}

	.button {
		padding: 10px 20px 6px 20px;
		transition: ease all 500ms;
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		align-items: center;
		border-radius: 20px 0 20px 0;

		> * {
			pointer-events: none;
		}

		.icon {
			width: 20px;
			height: 22px;
		}

		&:hover {
			text-decoration: none;
			color: var(--color-accent);
			transform: scale(1.05);
		}
	}
</style>

<script>
	import { onMount } from 'svelte'
	import { browser } from '$app/environment'

	import { welcomeState } from '$lib/utils/state.svelte.js'

	let progress = $state(0)
	let entered = $state(false)

	// Pre-initialize check before mount to prevent visual flashes
	if (browser && sessionStorage.getItem('welcome-intro-played') === 'true') {
		welcomeState.active = false
	}

	onMount(() => {
		if (!browser) return
		
		if (sessionStorage.getItem('welcome-intro-played') === 'true') {
			welcomeState.active = false
			return
		}

		welcomeState.active = true

		// Load simulation over 1.8 seconds
		const duration = 1800
		const intervalTime = 30
		const step = 100 / (duration / intervalTime)

		const interval = setInterval(() => {
			progress = Math.min(progress + step, 100)
			if (progress >= 100) {
				clearInterval(interval)
				setTimeout(() => {
					handleEnter()
				}, 400)
			}
		}, intervalTime)

		return () => clearInterval(interval)
	})

	const handleEnter = () => {
		entered = true
		if (browser) {
			sessionStorage.setItem('welcome-intro-played', 'true')
		}
		setTimeout(() => {
			welcomeState.active = false
		}, 850) // Allow exit transition to complete
	}
</script>

{#if welcomeState.active}
	<div 
		class="welcome-intro" 
		class:fade-out={entered}
		role="dialog"
		aria-modal="true"
	>
		<div class="intro-content">
			<!-- Cinematic glow ring -->
			<div class="glow-orb"></div>

			<!-- Dynamic title in Mod font -->
			<h1 class="welcome-title">
				{#each "welcome to".split(" ") as word, wi}
					<span class="word-wrapper">
						{#each word.split("") as char, ci}
							<span 
								class="char" 
								style="animation-delay: {wi * 150 + ci * 40}ms"
							>{char}</span>
						{/each}
					</span>
				{/each}
				<br />
				<span class="portfolio-name">
					{#each "daksh's portfolio".split(" ") as word, wi}
						<span class="word-wrapper">
							{#each word.split("") as char, ci}
								<span 
									class="char accent" 
									style="animation-delay: {300 + wi * 150 + ci * 40}ms"
								>{char}</span>
							{/each}
						</span>
					{/each}
				</span>
			</h1>

			<!-- Percentage and status -->
			<div class="loader-container">
				<div class="progress-info">
					<span class="status-text">loading experience</span>
					<span class="percentage">{Math.round(progress)}%</span>
				</div>
				<div class="progress-bar-bg">
					<div class="progress-bar-fill" style="width: {progress}%"></div>
				</div>
			</div>

			<!-- Quick skip/enter experience -->
			<button class="skip-btn" onclick={handleEnter}>
				<span>enter experience</span>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
					<path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
				</svg>
			</button>
		</div>
	</div>
{/if}

<style lang="scss">
	@use 'src/lib/scss/variables' as *;

	.welcome-intro {
		position: fixed;
		inset: 0;
		background: radial-gradient(circle at center, #0f0f12 0%, #030305 100%);
		z-index: 10000;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		transition: transform 0.8s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.8s ease;

		&.fade-out {
			transform: translateY(-100%);
			opacity: 0;
			pointer-events: none;
		}
	}

	.intro-content {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		max-width: 600px;
		padding: 2rem;
		text-align: center;
		z-index: 10;
	}

	.glow-orb {
		position: absolute;
		width: 320px;
		height: 320px;
		background: radial-gradient(circle, rgba(79, 124, 255, 0.12) 0%, transparent 70%);
		filter: blur(40px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
		z-index: -1;
		animation: pulse 4s infinite alternate ease-in-out;
	}

	@keyframes pulse {
		0% {
			transform: translate(-50%, -50%) scale(0.9);
			opacity: 0.5;
		}
		100% {
			transform: translate(-50%, -50%) scale(1.1);
			opacity: 1;
		}
	}

	.welcome-title {
		font-family: 'Mod', cursive !important;
		font-size: 2.2rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		line-height: 1.4;
		color: rgba(255, 255, 255, 0.9);
		margin-bottom: 4rem;
		text-transform: lowercase;

		@media (max-width: $mobile) {
			font-size: 1.8rem;
			letter-spacing: 0.05em;
		}

		.word-wrapper {
			display: inline-block;
			white-space: nowrap;
			margin-right: 0.3em;
		}

		.char {
			display: inline-block;
			opacity: 0;
			transform: translateY(20px);
			animation: charReveal 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
		}

		.portfolio-name {
			display: inline-block;
			margin-top: 0.5rem;
			font-size: 3.5rem;
			font-weight: 500;
			letter-spacing: 0.05em;
			color: #ffffff;
			text-transform: lowercase;

			@media (max-width: $mobile) {
				font-size: 2.4rem;
			}

			.char.accent {
				color: var(--color-accent, #4f7cff);
				text-shadow: 0 0 15px rgba(79, 124, 255, 0.25);
			}
		}
	}

	@keyframes charReveal {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.loader-container {
		width: 100%;
		max-width: 320px;
		margin-bottom: 2.5rem;
	}

	.progress-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.15em;
		color: rgba(255, 255, 255, 0.4);
		margin-bottom: 0.6rem;
		font-family: 'Hel', sans-serif;
		text-transform: uppercase;

		.percentage {
			color: var(--color-accent, #4f7cff);
		}
	}

	.progress-bar-bg {
		width: 100%;
		height: 2px;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 99px;
		overflow: hidden;
		position: relative;
	}

	.progress-bar-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--color-accent, #4f7cff) 0%, #ffffff 100%);
		box-shadow: 0 0 8px var(--color-accent, #4f7cff);
		border-radius: 99px;
		transition: width 0.1s ease-out;
	}

	.skip-btn {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 0.7);
		padding: 0.8rem 1.6rem 0.6rem 1.6rem;
		border-radius: 30px;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.15em;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.6rem;
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		font-family: 'Hel', sans-serif;
		text-transform: uppercase;

		&:hover {
			background: var(--color-accent, #4f7cff);
			border-color: var(--color-accent, #4f7cff);
			color: #ffffff;
			box-shadow: 0 0 20px rgba(79, 124, 255, 0.3);
			transform: translateY(-2px);
		}

		&:active {
			transform: translateY(0);
		}

		svg {
			transition: transform 0.3s ease;
		}

		&:hover svg {
			transform: translateX(4px);
		}
	}
</style>

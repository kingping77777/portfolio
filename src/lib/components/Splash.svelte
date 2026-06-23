<script>
	import Arrowhead from '$lib/assets/arrowhead.svg'
	import Pili from '$lib/components/Pili.svelte'
	import { onMount } from 'svelte'
	import { m } from '$lib/paraglide/messages.js'

	const piliCounts = [
		{ breakpoint: 999999, count: 11, extraRowCounts: [1, 2, 3, 9, 16, 13, 8, 3] },
		{ breakpoint: 1440, count: 8, extraRowCounts: [1, 1, 2, 3, 4, 5, 14] },
		{ breakpoint: 1024, count: 6, extraRowCounts: [2, 4, 7, 5, 3] },
		{ breakpoint: 768, count: 20, extraRowCounts: [2, 4, 7, 5, 3] }
	]

	let innerWidth = $state(0)
	let piliCount = $derived.by(() => {
		const idx = piliCounts.findIndex((piliCount) => innerWidth >= piliCount.breakpoint)
		return piliCounts[idx - 1]?.count || 20
	})

	let piliExtraRowCount = $derived.by(() => {
		const idx = piliCounts.findIndex((piliCount) => innerWidth >= piliCount.breakpoint)
		return piliCounts[idx - 1]?.extraRowCounts || [2, 4, 7, 5, 3]
	})

	let ready = $state(false)
	let softAnimations = $state(true)

	onMount(() => {
		softAnimations = false
		setTimeout(() => (ready = true), 10)

		const logoLetters = document.querySelectorAll('#logo_daksh .lt')
		logoLetters.forEach((element) => {
			element.addEventListener('mouseenter', () => {
				if (!element.classList.contains('logo-ping')) {
					element.classList.add('logo-ping')

					setTimeout(() => {
						element.classList.remove('logo-ping')
					}, 1500)
				}
			})
		})
	})
</script>

<svelte:window bind:innerWidth />

<div class="splash" class:ready class:soft-animations={softAnimations}>
	<div class="inner">
		<div class="image-wrapper">
			<svg version="1.1" id="logo_daksh" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
				viewBox="0 0 936 423" xml:space="preserve">
			<style type="text/css">
				.lt {
					fill: var(--color-logo-fill, #00218F);
					transition: fill 0.3s ease;
				}
			</style>
			<!-- D -->
			<path class="lt" id="letter-d" d="M135,0 C160,0 180,20 180,45 V378 C180,403 160,423 135,423 H0 V0 H135 Z M135,72 H53 C29.8,72 8,93.8 8,117 V306 C8,329.2 29.8,351 53,351 H135 C155,351 171,335 171,306 V117 C171,88 155,72 135,72 Z"/>
			<!-- A -->
			<path class="lt" id="letter-a" d="M189,0 H369 V423 H361 V317 C361,294 339,272 316,272 H242 C219,272 197,294 197,317 V423 H189 Z M242,72 C219,72 197,94 197,117 V155 C197,178 219,200 242,200 H316 C339,200 361,178 361,155 V117 C361,94 339,72 316,72 H242 Z"/>
			<!-- K -->
			<path class="lt" id="letter-k" d="M378,0 H386 V150 C386,170 395,185 410,170 L510,0 H558 L445,190 C435,200 435,215 445,225 L558,423 H510 L410,240 C395,225 386,240 386,260 V423 H378 Z"/>
			<!-- S -->
			<path class="lt" id="letter-s" d="M747,0 H567 V190 C567,215 589,247 620,247 H739 V351 C739,351 567,351 567,351 V423 H747 V230 C747,205 725,173 694,173 H575 V117 C575,92 597,72 620,72 H747 Z"/>
			<!-- H -->
			<path class="lt" id="letter-h" d="M756,0 H764 V130 C764,153 786,175 809,175 H883 C906,175 928,153 928,130 V0 H936 V423 H928 V292 C928,269 906,247 883,247 H809 C786,247 764,269 764,292 V423 H756 Z"/>
			</svg>
		</div>

		<div class="decorative-wrapper">
			<div class="text-wrapper">
				<p>{m.splash_tagline_line1()} <br />{m.splash_tagline_line2()}</p>
				<div class="arrow-wrapper">
					<img src={Arrowhead} alt="Arrowhead" />
				</div>
			</div>

			<div class="pili-wrapper">
				{#each { length: piliCount } as _}
					<Pili />
				{/each}

				<div class="pili-extras-wrapper">
					{#each { length: piliExtraRowCount.length } as _, i}
						<div class="column">
							{#each { length: piliExtraRowCount[i] } as _}
								<Pili />
							{/each}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use 'src/lib/scss/variables' as *;

	.splash {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: calc(100vh - 2rem);
		position: relative;

		@media (max-width: $mobile) {
			padding-top: 80px;
			height: calc(100dvh - 80px);
		}

		&:not(.ready):not(.soft-animations) {
			.pili-wrapper,
			.text-wrapper {
				opacity: 0;
			}

			.image-wrapper {
				transform: translateX(10%);
			}

			.image-wrapper path {
				fill: var(--color-white);
			}
		}

		&.soft-animations:not(.ready) {
			.pili-wrapper,
			.text-wrapper {
				opacity: 0;
			}
		}

		.inner {
			display: flex;
			flex-direction: row;
			height: 600px;
			width: 1200px;
			margin: auto;
			gap: 1rem;

			@media (max-width: $desktop) {
				width: 900px;
				height: 450px;
			}

			@media (max-width: $tablet) {
				width: 700px;
				height: 300px;
			}

			@media (max-width: $mobile) {
				width: 100%;
				height: calc(100% - 20px);
				flex-direction: column;
				gap: 1rem;
			}
		}

		.decorative-wrapper {
			display: flex;
			gap: 1rem;

			@media (max-width: $mobile) {
				flex-direction: row;
				justify-content: space-between;
				height: 50dvh;
			}
		}

		.pili-wrapper {
			position: relative;
			transition: ease all 500ms;
			transition-delay: 200ms;

			@media (max-width: $mobile) {
				display: flex;
				flex-direction: column;
				max-height: 300px;
				flex-wrap: wrap;
			}

			.pili-extras-wrapper {
				position: absolute;
				right: 0;
				display: flex;
				flex-direction: row;

				@media (max-width: $mobile) {
					display: none;
				}
			}
		}

		.image-wrapper {
			flex-grow: 1;
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
			transition: ease all 500ms;

			@media (max-width: $mobile) {
				flex-grow: 0;
			}

			svg {
				width: 100%;
				height: 100%;
				object-fit: contain;
				align-self: flex-start;

				path {
					transition: ease all 500ms;

					&:nth-child(1) {
						transition-delay: 0ms;
					}
					&:nth-child(2) {
						transition-delay: 100ms;
					}
					&:nth-child(3) {
						transition-delay: 200ms;
					}
					&:nth-child(4) {
						transition-delay: 300ms;
					}
					&:nth-child(5) {
						transition-delay: 400ms;
					}
				}
			}
		}

		.text-wrapper {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			margin-left: 1rem;
			margin-top: 80px; /* clear fixed desktop header */
			transition: ease all 500ms;
			transition-delay: 100ms;

			@media (max-width: $mobile) {
				margin-left: 0;
				margin-top: 0; /* reset on mobile */
				align-items: center;
				text-align: center;
				width: 100%;
			}

			.arrow-wrapper {
				flex-grow: 1;
				display: flex;
				flex-direction: column;

				&::before {
					content: '';
					display: block;
					width: 1px;
					flex-grow: 1;
					background-color: var(--color-black);
				}

				img {
					width: 20px;
					height: 20px;
					margin-top: -20px;
				}

				@media (max-width: $mobile) {
					display: none;
				}
			}
			p {
				writing-mode: vertical-rl;
				text-transform: uppercase;
				transform: translateX(-8px);
				margin-bottom: 1rem;
				white-space: nowrap;

				@media (max-width: $mobile) {
					writing-mode: horizontal-tb;
					transform: none;
					font-size: 0.85rem;
					letter-spacing: 0.05em;
					white-space: normal;
					text-align: center;
					margin-bottom: 0;
					line-height: 1.6;
				}
			}
		}
	}

	:global(path.logo-ping) {
		animation: logo-ping 1.5s;
	}

	@keyframes logo-ping {
		0% {
			fill: var(--color-black);
		}

		100% {
			fill: var(--color-accent);
		}
	}
</style>

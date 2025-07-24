<script>
	import Logo from '$lib/assets/logo_full.svg'
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
		const changedLocale = localStorage.getItem('changed-locale')

		console.log(changedLocale)

		if (!changedLocale || Date.now() - parseInt(changedLocale) > 60000) {
			softAnimations = false
			setTimeout(() => (ready = true), 10)
		} else {
			setTimeout(() => (ready = true), 10)
		}

		const logoElements = document.querySelectorAll('#DAKSH tspan')
		logoElements.forEach((element) => {
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

<div class="splash" class:ready>
	<div class="inner">
		<div class="image-wrapper">

			<svg version="1.1" id="DAKSH" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
				viewBox="0 0 900 300" xml:space="preserve">
			<style type="text/css">
				.st0{fill:#00218F;}
			</style>
			<text class="st0" x="50%" y="55%" dominant-baseline="middle" text-anchor="middle"
				style="font-family: 'Satoshi', sans-serif; font-weight: 900; font-size: 220px; letter-spacing: 15px;">
				<tspan id="letter-d">D</tspan><tspan id="letter-a">A</tspan><tspan id="letter-k">K</tspan><tspan id="letter-s">S</tspan><tspan id="letter-h">H</tspan>
			</text>
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

		&:not(.ready):not(.soft-animations) {
			.pili-wrapper,
			.text-wrapper {
				opacity: 0;
			}

			.image-wrapper {
				transform: translateX(10%);
			}

			.image-wrapper path {
				fill: $white;
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
				height: 100dvh;
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

				> path {
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
				}
			}
		}

		.text-wrapper {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			margin-left: 1rem;
			transition: ease all 500ms;
			transition-delay: 100ms;

			@media (max-width: $mobile) {
				margin-left: 0;
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
					background-color: $black;
				}

				img {
					width: 20px;
					height: 20px;
					margin-top: -20px;
				}
			}

			p {
				writing-mode: vertical-rl;
				text-transform: uppercase;
				transform: translateX(-8px);
				margin-bottom: 1rem;
			}
		}
	}

	:global(path.logo-ping) {
		animation: logo-ping 1.5s;
	}

	@keyframes logo-ping {
		0% {
			fill: $black;
		}

		100% {
			fill: #00218f; /* Match the original fill color */
		}
	}
</style>

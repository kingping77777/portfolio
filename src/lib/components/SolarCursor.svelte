<script>
	import { onMount } from 'svelte'
	import { spring } from 'svelte/motion'
	import { browser } from '$app/environment'

	let mouse = $state({ x: -100, y: -100 })
	let visible = $state(false)
	let active = $state(false) // Triggered when clicking/hovering active elements

	// Orbit angles
	let angle1 = $state(0)
	let angle2 = $state(0)

	// Smooth coordinates using Svelte spring
	let coords = spring(
		{ x: -100, y: -100 },
		{
			stiffness: 0.08,
			damping: 0.6
		}
	)

	onMount(() => {
		if (!browser) return

		// Detect if device supports hover/fine pointer (ignore touchscreens to prevent jank)
		const hasFinePointer = window.matchMedia('(any-pointer: fine)').matches
		if (!hasFinePointer) return

		document.documentElement.classList.add('has-custom-cursor')

		const handleMouseMove = (e) => {
			mouse = { x: e.clientX, y: e.clientY }
			$coords = mouse
			if (!visible) visible = true
		}

		const handleMouseLeave = () => {
			visible = false
		}

		const handleMouseDown = () => {
			active = true
		}

		const handleMouseUp = () => {
			active = false
		}

		// Attach hover triggers for clickable items (links, buttons)
		const addHoverListeners = () => {
			const clickables = document.querySelectorAll('a, button, [role="button"]')
			clickables.forEach((el) => {
				el.addEventListener('mouseenter', () => { active = true })
				el.addEventListener('mouseleave', () => { active = false })
			})
		}

		window.addEventListener('mousemove', handleMouseMove, { passive: true })
		document.addEventListener('mouseleave', handleMouseLeave)
		window.addEventListener('mousedown', handleMouseDown)
		window.addEventListener('mouseup', handleMouseUp)

		// Set up mutation observer to bind hover listeners to dynamically loaded content
		const observer = new MutationObserver(addHoverListeners)
		observer.observe(document.body, { childList: true, subtree: true })
		addHoverListeners()

		// Silky smooth GPU-accelerated orbit animation
		let animationFrame
		const animateOrbits = () => {
			angle1 += 0.02
			angle2 -= 0.035
			animationFrame = requestAnimationFrame(animateOrbits)
		}
		animateOrbits()

		return () => {
			document.documentElement.classList.remove('has-custom-cursor')
			window.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseleave', handleMouseLeave)
			window.removeEventListener('mousedown', handleMouseDown)
			window.removeEventListener('mouseup', handleMouseUp)
			cancelAnimationFrame(animationFrame)
			observer.disconnect()
		}
	})
</script>

{#if visible}
	<div
		class="solar-cursor-container"
		class:active
		style="left: {$coords.x}px; top: {$coords.y}px;"
	>
		<!-- Sun (Center Core) -->
		<div class="sun"></div>

		<!-- Orbit Path 1 -->
		<div class="orbit orbit-1"></div>
		<!-- Planet 1 -->
		<div
			class="planet planet-1"
			style="transform: translate(calc(-50% + {Math.cos(angle1) * 20}px), calc(-50% + {Math.sin(angle1) * 20}px));"
		></div>

		<!-- Orbit Path 2 -->
		<div class="orbit orbit-2"></div>
		<!-- Planet 2 -->
		<div
			class="planet planet-2"
			style="transform: translate(calc(-50% + {Math.cos(angle2) * 35}px), calc(-50% + {Math.sin(angle2) * 35}px));"
		></div>
	</div>
{/if}

<style lang="scss">
	@use 'src/lib/scss/variables' as *;

	.solar-cursor-container {
		position: fixed;
		width: 0;
		height: 0;
		pointer-events: none;
		z-index: 99999;
		mix-blend-mode: difference;
		transition: transform 0.2s ease;

		&.active {
			transform: scale(1.4);
			.sun {
				background-color: var(--color-accent, #ff3e00);
				box-shadow: 0 0 15px var(--color-accent);
			}
			.orbit {
				border-color: rgba(255, 255, 255, 0.4);
			}
		}
	}

	.sun {
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: var(--color-accent, #ff3e00);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0 0 10px var(--color-accent);
		transition: background-color 0.2s ease, box-shadow 0.2s ease;
	}

	.orbit {
		position: absolute;
		border: 1px dashed rgba(255, 255, 255, 0.15);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		transition: border-color 0.2s ease;

		&.orbit-1 {
			width: 40px;
			height: 40px;
		}

		&.orbit-2 {
			width: 70px;
			height: 70px;
		}
	}

	.planet {
		position: absolute;
		border-radius: 50%;
		background-color: #ffffff;
		box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);

		&.planet-1 {
			width: 5px;
			height: 5px;
			background-color: var(--color-accent);
			box-shadow: 0 0 6px var(--color-accent);
		}

		&.planet-2 {
			width: 3.5px;
			height: 3.5px;
			background-color: var(--color-light-grey);
			opacity: 0.7;
			box-shadow: 0 0 4px var(--color-light-grey);
		}
	}

	:global(.has-custom-cursor),
	:global(.has-custom-cursor *) {
		cursor: none !important;
	}
</style>

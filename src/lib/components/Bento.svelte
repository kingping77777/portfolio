<script>
	import BentoGradient from '$lib/components/BentoGradient.svelte'
	import { lenis } from '$lib/utils/lenis'
	import { m } from '$lib/paraglide/messages'

	const icons = {
		python: `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10V4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h5"/><path d="M12 14v6a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-5"/><circle cx="8.5" cy="5.5" r=".5" fill="currentColor"/><circle cx="15.5" cy="18.5" r=".5" fill="currentColor"/></svg>`,
		ml: `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3.001 3.001 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3.001 3.001 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z"/></svg>`,
		webapps: `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
		research: `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><circle cx="10" cy="13" r="2"/><path d="m14 17-3-3"/></svg>`,
		tools: `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
		cviot: `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line></svg>`
	}

	const tagIcons = {
		'Python': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10V4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h5"/><path d="M12 14v6a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-5"/></svg>`,
		'NumPy / Pandas': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>`,
		'OpenCV': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>`,
		'Streamlit': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/></svg>`,
		'Machine Learning': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3.001 3.001 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 2a2.5 2.5 0 0 0-2.5 2.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3.001 3.001 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z"/></svg>`,
		'Neural Networks': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.5" y1="10.5" x2="15.5" y2="6.5"/><line x1="8.5" y1="13.5" x2="15.5" y2="17.5"/></svg>`,
		'Model Evaluation': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
		'Computer Vision': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
		'HTML': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.55a1 1 0 0 0-.77.37L12 16l-3.68-5.63a1 1 0 0 0-.77-.37H6l6 9z"/><path d="M6 14h12l-6-9z"/></svg>`,
		'CSS': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1 0 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/><path d="M4 8h16"/><path d="M8 12h8"/></svg>`,
		'JavaScript': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3V3z"/><path d="M15 8h-3v5h3"/><path d="M12 11h2"/></svg>`,
		'Firebase': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/></svg>`,
		'Vercel': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M24 22.525H0L12 1.475L24 22.525Z"/></svg>`,
		'Paper Analysis': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
		'AI Research': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3.001 3.001 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 2a2.5 2.5 0 0 0-2.5 2.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3.001 3.001 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z"/></svg>`,
		'Experiment Log': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
		'Git / GitHub': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
		'Jupyter Notebook': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 1 0 10 10"/></svg>`,
		'Raspberry Pi': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/><path d="M5 12a7 7 0 0 0 14 0"/></svg>`,
		'Java (OOP)': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>`,
		'C Language': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 16A6 6 0 1 1 18 8"/></svg>`,
		'YOLO': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>`,
		'IoT': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><circle cx="12" cy="17" r="1"/></svg>`
	}
</script>

{#snippet textItem(title, subtitle, icon, paragraph, tags = [], href = '#footer', linkText = m.nav_contact())}
	<div class="item textual {icon}">
		<div class="icon">
			{@html icons[icon]}
		</div>

		<div class="title">
			<span class="subtitle">
				{subtitle}
			</span>

			<h3 class="title">
				{title}
			</h3>
		</div>

		<p>
			{paragraph}
		</p>

		{#if tags.length > 0}
			<div class="skills-tags">
				{#each tags as tag}
					<span class="tag">
						{#if tagIcons[tag]}
							<span class="tag-icon">{@html tagIcons[tag]}</span>
						{/if}
						{tag}
					</span>
				{/each}
			</div>
		{/if}

		<a
			class="cta"
			{href}
			onclick={(e) => {
				e.preventDefault()
				const target = document.querySelector(href)
				if (target) lenis.scrollTo(target, { duration: 2 })
			}}
		>
			<span class="text">
				{linkText}
			</span>
			<span class="icon">
				<svg
					width="24px"
					height="24px"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					color="currentColor"
					><path
						d="M3 12L21 12M21 12L12.5 3.5M21 12L12.5 20.5"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path></svg
				>
			</span>
		</a>
	</div>
{/snippet}

<div class="bento">

	{@render textItem(
		m.bento_one_title(),
		m.bento_one_subtitle(),
		'python',
		m.bento_one_paragraph(),
		['Python', 'NumPy / Pandas', 'OpenCV', 'Streamlit']
	)}

	{@render textItem(
		m.bento_two_title(),
		m.bento_two_subtitle(),
		'ml',
		m.bento_two_paragraph(),
		['Machine Learning', 'Neural Networks', 'Model Evaluation', 'Computer Vision']
	)}

	{@render textItem(
		m.bento_three_title(),
		m.bento_three_subtitle(),
		'webapps',
		m.bento_three_paragraph(),
		['HTML', 'CSS', 'JavaScript', 'Firebase', 'Vercel']
	)}

	<div class="item gradient">
		<BentoGradient />
	</div>

	{@render textItem(
		m.bento_four_title(),
		m.bento_four_subtitle(),
		'research',
		m.bento_four_paragraph(),
		['Paper Analysis', 'Model Evaluation', 'AI Research', 'Experiment Log'],
		'#research-journal',
		m.read_journal()
	)}

	{@render textItem(
		m.bento_five_title(),
		m.bento_five_subtitle(),
		'tools',
		m.bento_five_paragraph(),
		['Git / GitHub', 'Jupyter Notebook', 'Raspberry Pi', 'Java (OOP)', 'C Language']
	)}

	{@render textItem(
		m.bento_six_title(),
		m.bento_six_subtitle(),
		'cviot',
		m.bento_six_paragraph(),
		['OpenCV', 'YOLO', 'Raspberry Pi', 'IoT']
	)}
</div>

<style lang="scss">
	@use 'src/lib/scss/variables' as *;

	:global(.bento picture) {
		height: 100%;
	}

	.bento {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: stretch;
		gap: 20px;

		@media (max-width: $mobile) {
			margin-top: 8rem;
		}

		.item {
			flex-basis: 21%;
			flex-grow: 1;
			min-height: 220px;
			max-width: calc(100vh - 2rem);
			min-width: 300px;
			background-color: var(--color-surface-card);
			border-radius: 40px;
			transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

			&:hover {
				transform: translateY(-8px);
				border-color: var(--color-accent) !important;
				box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
			}

			&.textual {
				border: solid 1px var(--color-border);
				padding: 3rem;
				display: flex;
				flex-direction: column;
				gap: 3rem;

				@media (max-width: $mobile) {
					padding: 2rem;
				}

				@media (any-pointer: fine) {
					&:not(:hover) {
						a.cta {
							opacity: 0;
						}

						p {
							transform: translateY(40px);
						}
					}
				}

				a.cta {
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					gap: 0.5rem;
					align-items: center;
					margin-bottom: -1rem;
					margin-top: -1.5rem;
					text-decoration: none;
					transition: ease all 300ms;
					height: 20px;

					@media (max-width: $mobile) {
						margin-bottom: -0.5rem;
					}

					&:hover {
						gap: 1rem;
						color: var(--color-accent);
					}
				}

				&.ml {
					min-width: 350px;
 
					@media (max-width: $mobile) {
						min-width: 310px;
					}
				}

				h3 {
					color: var(--color-accent);
					font-size: 3.5rem;
					white-space: pre-wrap;

					@media (max-width: $mobile) {
						font-size: 3rem;
					}
				}

				.subtitle {
					color: var(--color-light-grey);
				}

				p {
					text-transform: none;
					font-size: 1rem;
					margin-top: 0;
					transition: ease all 250ms;
				}

				.skills-tags {
					display: flex;
					flex-wrap: wrap;
					gap: 0.5rem;
					margin-top: auto;
					padding-bottom: 0.5rem;
				}

				.tag {
					font-size: 0.65rem;
					padding: 0.2rem 0.5rem;
					background-color: transparent;
					color: var(--color-light-grey);
					border-radius: 9999px;
					border: 1px solid var(--color-ultralight-grey);
					text-transform: none;
					font-weight: 400;
					white-space: nowrap;
					line-height: 1.3;
					display: inline-flex;
					align-items: center;
					gap: 4px;

					.tag-icon {
						display: inline-flex;
						align-items: center;
						justify-content: center;
						color: var(--color-accent);
					}
				}

				.icon {
					color: var(--color-accent);
				}
			}

		}
	}
</style>

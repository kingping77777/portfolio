<script>
	import BentoGradient from '$lib/components/BentoGradient.svelte'
	import LargePili from '$lib/components/LargePili.svelte'
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
		'Python': ['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg'],
		'NumPy / Pandas': [
			'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg',
			'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg'
		],
		'OpenCV': ['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg'],
		'Streamlit': ['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg'],
		'Machine Learning': [
			'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
			'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg'
		],
		'Computer Vision': ['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg'],
		'HTML': ['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg'],
		'CSS': ['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg'],
		'JavaScript': ['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg'],
		'Firebase': ['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg'],
		'Vercel': ['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg'],
		'Git / GitHub': [
			'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
			'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg'
		],
		'Jupyter Notebook': ['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg'],
		'Raspberry Pi': ['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/raspberrypi/raspberrypi-original.svg'],
		'Java (OOP)': ['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg'],
		'C Language': ['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg'],
		'IoT': ['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg']
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
							{#each tagIcons[tag] as iconUrl}
								<img src={iconUrl} class="tag-logo" alt={tag} />
							{/each}
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
	<div class="item portrait">
		<enhanced:img class="portrait-img" src="/static/polaroideder.webp" alt="Eder" />
	</div>

	{@render textItem(
		m.bento_one_title(),
		m.bento_one_subtitle(),
		'python',
		m.bento_one_paragraph(),
		['Python', 'NumPy / Pandas', 'OpenCV', 'Streamlit']
	)}

	<div class="item pili">
		<LargePili />
	</div>

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
			min-height: 250px;
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

			&.pili {
				display: flex;
				justify-content: center;
				align-items: center;
				border: solid 1px var(--color-border);
				overflow: hidden;
				padding: 120px;

				@media (max-width: 1560px) and (min-width: 942px) {
					display: none;
				}

				img {
					filter: opacity(0.25);
				}
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
					transition: ease all 200ms;
					height: 20px;

					@media (max-width: $mobile) {
						margin-bottom: -0.5rem;
					}

					&:hover {
						gap: 1rem;
						color: var(--color-accent);
					}
				}

				&.webapps {
					flex-basis: 15%;
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
					transition: ease all 180ms;
				}

				.skills-tags {
					display: flex;
					flex-wrap: wrap;
					gap: 0.5rem;
					margin-top: auto;
					padding-bottom: 0.5rem;
				}

				.tag {
					display: inline-flex;
					align-items: center;
					gap: 0.4rem;
					font-size: 0.75rem;
					padding: 0.3rem 0.65rem;
					background-color: var(--color-ultralight-grey);
					color: var(--color-dark-grey);
					border-radius: 9999px;
					border: 1px solid var(--color-border);
					text-transform: none;
					font-weight: 500;
					white-space: nowrap;
					transition: background-color 0.2s ease, border-color 0.2s ease;

					.tag-logo {
						width: 14px;
						height: 14px;
						object-fit: contain;
						display: inline-block;
					}
				}

				.icon {
					color: var(--color-accent);
				}
			}

			&.portrait {
				overflow: hidden;
				min-width: 250px;

				.portrait-img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
		}
	}
</style>

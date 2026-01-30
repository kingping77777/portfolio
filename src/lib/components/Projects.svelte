<script>
	import { m } from '$lib/paraglide/messages'
	
	const projects = [
		{
			title: "FigureFlow",
			subtitle: "Computer Vision & IoT",
			description: "A Raspberry Pi-based gesture-controlled music system using OpenCV. Enables touchless music generation and control through real-time hand gesture recognition. Secured Rs. 1,50,000 institutional funding.",
			tech: ["Raspberry Pi", "OpenCV", "Python", "Computer Vision"],
			link: "https://github.com/kingping77777/ProjectIOT"
		},
		{
			title: "CivicAI",
			subtitle: "AI & Civic Tech",
			description: "An AI-powered civic grievance platform that enables citizens to report, categorize, and track local issues. Shortlisted at the national-level GDG AI Hackathon.",
			tech: ["AI/ML", "Svelte", "Firebase", "Civic Tech"],
			link: "https://github.com/kingping77777/CivicAI"
		},
		{
			title: "SentinelAI",
			subtitle: "Computer Vision & Security",
			description: "Intelligent real-time threat detection and safety analytics platform. Built to identify security hazards from video feeds with Streamlit and YOLO.",
			tech: ["YOLO", "Computer Vision", "Streamlit", "Python"],
			link: "https://github.com/kingping77777/SENTINAL-AI-"
		},
		{
			title: "Tech Pulse",
			subtitle: "Web Platform & Tech News",
			description: "A premium tech aggregate platform hosting discussion, reviews, and latest updates in AI/ML and software engineering. Deployed and optimized on Vercel.",
			tech: ["SvelteKit", "Vite", "Vercel", "Tailwind CSS"],
			link: "https://tech-pulse12.vercel.app/"
		},
		{
			title: "AI Research Journal",
			subtitle: "Research & Development",
			description: "A comprehensive journal documenting my AI research journey, paper reviews, model training insights, and academic ML experiments.",
			tech: ["Machine Learning", "Research", "Git/GitHub"],
			link: "https://github.com/kingping77777/AI-Research-Journal"
		}
	]
</script>

<div class="projects-section" id="projects">
	<div class="header">
		<p>{m.projects_section_intro()}</p>
		<h2>{m.projects_section_heading()}</h2>
		<p class="outro">{m.projects_section_outro()}</p>
	</div>

	<div class="projects-grid">
		{#each projects as project}
			<a href={project.link} target="_blank" rel="noopener noreferrer" class="project-card">
				<div class="category">{project.subtitle}</div>
				<h3 class="title">{project.title}</h3>
				<p class="desc">{project.description}</p>
				
				<div class="tech-tags">
					{#each project.tech as t}
						<span class="tag">{t}</span>
					{/each}
				</div>

				<div class="arrow-icon">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<line x1="7" y1="17" x2="17" y2="7"></line>
						<polyline points="7 7 17 7 17 17"></polyline>
					</svg>
				</div>
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	@use 'src/lib/scss/variables' as *;

	.projects-section {
		padding: 8rem 0;
		display: flex;
		flex-direction: column;
		gap: 4rem;

		@media (max-width: $mobile) {
			padding: 4rem 0;
			gap: 2rem;
		}

		.header {
			text-align: center;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			p {
				max-width: 30ch;
				margin: 0 auto;
				color: var(--color-light-grey);
			}

			.outro {
				font-size: 0.8rem;
				color: var(--color-light-grey);
			}
		}

		.projects-grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
			gap: 20px;
			width: 100%;

			@media (max-width: $mobile) {
				grid-template-columns: 1fr;
			}
		}

		.project-card {
			background-color: var(--color-surface-card);
			border: solid 1px var(--color-border);
			border-radius: 40px;
			padding: 2.5rem;
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
			position: relative;
			text-decoration: none;
			color: inherit;
			transition: all 0.3s ease;
			min-height: 280px;

			@media (max-width: $mobile) {
				padding: 2rem;
				border-radius: 30px;
			}

			&:hover {
				transform: translateY(-5px);
				border-color: var(--color-accent);
				box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

				.arrow-icon {
					transform: translate(3px, -3px);
					color: var(--color-accent);
				}
			}

			.category {
				font-size: 0.75rem;
				color: var(--color-light-grey);
				font-family: 'Hel', sans-serif;
				letter-spacing: 0.05em;
			}

			h3.title {
				font-size: 2.2rem;
				color: var(--color-accent);
				margin: 0;
				line-height: 1.1;
			}

			.desc {
				font-size: 0.95rem;
				color: var(--color-dark-grey);
				line-height: 1.5;
				text-transform: none;
				margin: 0;
			}

			.tech-tags {
				display: flex;
				flex-wrap: wrap;
				gap: 0.5rem;
				margin-top: auto;
			}

			.tag {
				font-size: 0.7rem;
				padding: 0.25rem 0.6rem;
				background-color: var(--color-ultralight-grey);
				color: var(--color-dark-grey);
				border-radius: 9999px;
				border: 1px solid var(--color-border);
				text-transform: none;
				font-weight: 500;
			}

			.arrow-icon {
				position: absolute;
				bottom: 2.5rem;
				right: 2.5rem;
				color: var(--color-light-grey);
				transition: all 0.3s ease;

				@media (max-width: $mobile) {
					bottom: 2rem;
					right: 2rem;
				}
			}
		}
	}
</style>

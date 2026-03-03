<script>
	import { m } from '$lib/paraglide/messages'

	const achievements = [
		{
			title: "Secured Institutional Funding (Rs. 1,50,000)",
			event: "FigureFlow Innovation Project",
			description: "Awarded institutional grant for developing FigureFlow—a custom gesture-controlled music system combining IoT hardware with advanced computer vision algorithms."
		},
		{
			title: "Shortlisted at GDG AI Hackathon",
			event: "Google Developer Group • CivicAI",
			description: "Created and pitched CivicAI—an AI-powered community grievance portal—shortlisted during a rapid 2-hour sprint."
		},
		{
			title: "Smart India Hackathon (National Level)",
			event: "NawaEd — Rural Ed Platform",
			description: "Competed at the national level with NawaEd, a custom remote learning and accessibility educational platform tailored for rural students."
		},
		{
			title: "Presented at ORBIX Hackathon (IIIT Delhi)",
			event: "IIIT Delhi • 18-hr AI Track Overnight",
			description: "Designed, developed, and live-presented our prototype under intense overnight timelines in a highly competitive AI track."
		},
		{
			title: "Mind Installers Hackathon (MIS 3.2)",
			event: "Delhi NCR • Event Scheduler",
			description: "Built and deployed an automated, real-time event scheduler using Firebase database triggers and instant notifications."
		},
		{
			title: "Technical Content Creator",
			event: "LinkedIn Creator Community",
			description: "Actively publish technical deep-dives, industry trends, and analysis on new model releases (LLMs, Computer Vision), building an engaged network."
		}
	]
</script>

<div class="achievements-section" id="achievements">
	<div class="header">
		<p>{m.achievements_section_intro()}</p>
		<h2>{m.achievements_section_heading()}</h2>
		<p class="outro">{m.achievements_section_outro()}</p>
	</div>

	<div class="achievements-grid">
		{#each achievements as ach}
			<div class="ach-card">
				<div class="header-group">
					<h3 class="title">{ach.title}</h3>
					<div class="event">{ach.event}</div>
				</div>
				<p class="desc">{ach.description}</p>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@use 'src/lib/scss/variables' as *;

	.achievements-section {
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

		.achievements-grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
			gap: 20px;
			width: 100%;

			@media (max-width: $mobile) {
				grid-template-columns: 1fr;
			}
		}

		.ach-card {
			background-color: var(--color-surface-card);
			border: solid 1px var(--color-border);
			border-radius: 40px;
			padding: 2.5rem;
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
			transition: all 0.3s ease;
			min-height: 200px;

			@media (max-width: $mobile) {
				padding: 2rem;
				border-radius: 30px;
				min-height: auto;
			}

			&:hover {
				border-color: var(--color-accent);
				transform: translateY(-3px);
				box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
			}

			.header-group {
				display: flex;
				flex-direction: column;
				gap: 0.25rem;
			}

			h3.title {
				font-size: 1.8rem;
				color: var(--color-accent);
				margin: 0;
				line-height: 1.1;
			}

			.event {
				font-size: 0.8rem;
				color: var(--color-light-grey);
				font-family: 'Hel', sans-serif;
				letter-spacing: 0.05em;
			}

			.desc {
				font-size: 0.95rem;
				color: var(--color-dark-grey);
				line-height: 1.5;
				text-transform: none;
				margin: 0;
			}
		}
	}
</style>

<script>
	import { m } from '$lib/paraglide/messages'
</script>

<div class="education-section" id="education">
	<div class="header">
		<p>{m.education_section_intro()}</p>
		<h2>{m.education_section_heading()}</h2>
		<p class="outro">{m.education_section_outro()}</p>
	</div>

	<div class="education-container">
		<div class="education-card">
			<div class="timeline">2024 — Present</div>
			<div class="details">
				<h3 class="institution">IIMT College of Engineering</h3>
				<div class="location">Greater Noida, Uttar Pradesh, India</div>
				<h4 class="degree">Bachelor of Technology (B.Tech)</h4>
				<p class="specialization">Computer Science & Engineering (AI & ML)</p>
				<p class="description">Pursuing my B.Tech degree with a focus on Computer Science and specialized modules in AI and Machine Learning. I study core computer science subjects while building projects in data science, predictive modeling, and deep learning.</p>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use 'src/lib/scss/variables' as *;

	.education-section {
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

		.education-container {
			max-width: 800px;
			width: 100%;
			margin: 0 auto;
		}

		.education-card {
			background-color: var(--color-surface-card);
			border: solid 1px var(--color-border);
			border-radius: 40px;
			padding: 3rem;
			display: flex;
			flex-direction: row;
			gap: 3rem;
			align-items: flex-start;
			transition: all 0.3s ease;

			@media (max-width: $mobile) {
				flex-direction: column;
				gap: 1.5rem;
				padding: 2rem;
				border-radius: 30px;
			}

			&:hover {
				border-color: var(--color-accent);
				transform: translateY(-2px);
			}

			.timeline {
				font-size: 1rem;
				font-weight: bold;
				color: var(--color-accent);
				white-space: nowrap;
				font-family: 'Hel', sans-serif;
			}

			.details {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;

				.institution {
					font-size: 2.2rem;
					color: var(--color-black);
					margin: 0;
					line-height: 1.1;
				}

				.location {
					font-size: 0.85rem;
					color: var(--color-light-grey);
					font-family: 'Hel', sans-serif;
				}

				.degree {
					font-size: 1.2rem;
					color: var(--color-accent);
					margin-top: 0.5rem;
					margin-bottom: 0;
				}

				.specialization {
					font-size: 1rem;
					color: var(--color-dark-grey);
					text-transform: none;
					margin: 0;
					font-weight: bold;
				}

				.description {
					font-size: 0.95rem;
					color: var(--color-light-grey);
					line-height: 1.6;
					text-transform: none;
					margin: 0;
					margin-top: 0.5rem;
				}
			}
		}
	}
</style>

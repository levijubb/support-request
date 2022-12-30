<script>
	import { enhance } from '$app/forms';
	import { fly, fade } from 'svelte/transition';
	import { backIn } from 'svelte/easing';

	let formShowing = true;
	let loading = false;
</script>

<svelte:head>
	<title>CPRO Support</title>
	<meta name="description" content="Submit a support request" />
</svelte:head>

<main class="container">
	<section>
		<div class="logo-header">
			<img src="/logo.png" alt="Logo" />
			<h2>ompetition Pro Support</h2>
		</div>
		<p>Please fill in the form below. We'll get in touch shortly!</p>
	</section>
	{#if formShowing}
		<article transition:fly={{ x: 1000, easing: backIn }}>
			<form
				method="POST"
				use:enhance={() => {
					formShowing = false;
					loading = true;

					return async ({ result }) => {
						loading = false;
					};
				}}
			>
				<div class="grid">
					<label for="firstname">
						First name <span>*</span>
						<input type="text" id="firstname" name="firstname" required />
					</label>

					<label for="lastname">
						Last name
						<input type="text" id="lastname" name="lastname" />
					</label>
				</div>

				<label for="email"
					>Email address<span>*</span>
					<input type="email" id="email" name="email" required />
				</label>

				<label for="description">
					Description<span>*</span>
					<textarea
						placeholder="Please give us your feedback..."
						id="description"
						name="description"
						required
					/>
				</label>

				<button type="submit">Submit</button>
			</form>
		</article>
	{:else}
		<div aria-busy={loading}>
			{#if !loading}
				<article transition:fade={{ delay: 400 }}>
					<h2>Thank you!</h2>
					<p>We'll get back to you shortly.</p>
				</article>
			{/if}
		</div>
	{/if}
</main>

<style>
	h2,
	p {
		margin-bottom: 0;
	}

	main {
		margin-top: 2rem;
	}

	span {
		color: red;
	}

	textarea {
		resize: vertical;
	}

	.logo-header {
		display: flex;
		align-items: center;
	}

	.logo-header img {
		width: 50px;
		height: 50px;
	}
</style>

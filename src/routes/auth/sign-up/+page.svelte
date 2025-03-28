<script lang="ts">
	import SignUp from 'clerk-sveltekit/client/SignUp.svelte'
</script>

<div class="h-screen flex items-center justify-center">
	<SignUp redirectUrl="/chat" />
</div>
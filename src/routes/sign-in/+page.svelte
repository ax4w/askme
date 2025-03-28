<script lang="ts">
    let { signInSuccess } = $props();
    let password = $state('');
    async function signIn() {
        const response = await fetch('/sign-in', {
            method: 'POST',
            body: JSON.stringify({ password: password }),
        }); 
        const data = await response.json();
        if (data.success) {
            signInSuccess();
        } else {
            alert('Invalid password');
        }
    }
</script>

<div class="h-screen flex items-center justify-center">
    <fieldset class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend class="fieldset-legend">Login</legend> 
        <label class="fieldset-label" for="password">Password</label>
        <input type="password" class="input" placeholder="Password" name="password" bind:value={password}/> 
        <button class="btn btn-neutral mt-4" onclick={() => signIn()}>Login</button>
      </fieldset>
</div>
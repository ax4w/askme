<script lang="ts">
    let { signInSuccess } = $props();
    let password = $state('');
    let username = $state('');
    let error = $state(false);
    
    async function handleSubmit(event: Event) {
      event.preventDefault();
      if (username.trim() === '' || password.trim() === '') {
        error = true;
        return;
      }
      const response = await fetch('/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      if (data.success) {
        signInSuccess();
      } else {
        error = true;
      }
    }
  </script>
  
  <div class="h-screen flex items-center justify-center">
    <form method="POST" action="/sign-in" onsubmit={handleSubmit}>
      <fieldset class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend class="fieldset-legend">Login</legend>
        <label class="fieldset-label" for="username">Username</label>
        <input type="text" class="input" placeholder="hi" name="username" bind:value={username}/>
        <label class="fieldset-label" for="password">Password</label>
        <input type="password" class="input" placeholder="Password!" name="password" bind:value={password}/>
        {#if error}
          <div class="text-error">Invalid password</div>
        {/if}
        <button class="btn btn-neutral mt-4" type="submit">Login</button>
      </fieldset>
    </form>
  </div>
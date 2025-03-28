<script>
	import { goto } from "$app/navigation";
    import "../app.css";
    import SignIn from "./sign-in/+page.svelte";
    function signInSuccess() {
        goto("/chat");
    }
</script>

<div>
    <SignIn {signInSuccess} />
</div>
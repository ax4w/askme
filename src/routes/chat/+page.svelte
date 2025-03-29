<script lang="ts">
	import { onMount } from "svelte";
    import  Chat from "./chat.svelte";
	import { goto } from "$app/navigation";

    onMount(async () => {
        const response = await fetch('/chat/session')
        const data = await response.json()
        if (!data.success) goto('/')
    })
</script>

<Chat />
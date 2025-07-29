<script lang="ts">
    import Check from "@lucide/svelte/icons/check";
    import Link from "@lucide/svelte/icons/link";

    const { label, url } = $props();

    let isCopied = $state(false);

    const handleClick = () => {
        isCopied = true;

        navigator.clipboard.writeText(url);

        setTimeout(() => {
            isCopied = false;
        }, 1500);
    };
</script>

<button onclick={handleClick} class="flex items-center gap-1">
    {#if isCopied}
        <Check size={20} />
        Link Copied
    {:else}
        <Link size={20} />
        <p>{label}</p>
    {/if}
</button>

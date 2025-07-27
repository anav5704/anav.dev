<script lang="ts">
    import CopyUrl from "@components/CopyUrl.svelte";
    import { Github } from "@lucide/svelte";

    interface Props {
        url: string;
        title: string;
        repo: string;
    }

    const { url, title, repo }: Props = $props();
</script>

<header>
    <h1>{title}</h1>

    <p class="flex items-center gap-5">
        <a target="_blank" href={repo} class="flex items-center gap-1">
            <Github size={20} />
            Source Code
        </a>

        <CopyUrl {url} label="Share Project" />
    </p>
</header>

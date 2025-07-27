<script lang="ts">
    import CopyUrl from "@components/CopyUrl.svelte";
    import { Calendar } from "@lucide/svelte";
    import { long } from "@utils/getDate";

    interface Props {
        url: string;
        title: string;
        date: Date;
    }

    const { url, title, date }: Props = $props();
</script>

<header>
    <h1>{title}</h1>

    <div class="flex items-center gap-5">
        <p class="flex items-center gap-2">
            <Calendar size={20} />
            <time datetime={date.toISOString()}>{long(date)}</time>
        </p>

        <CopyUrl {url} label="Share Blog" />
    </div>
</header>

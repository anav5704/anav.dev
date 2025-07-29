<script lang="ts">
    import Menu from "@lucide/svelte/icons/menu";
    import X from "@lucide/svelte/icons/x";

    const { children, pathname } = $props();

    let isOpen = $state(false);

    const links = [
        {
            label: "Home",
            href: "/",
            event: "link-home",
            active: pathname == "/"
        },
        {
            label: "Projects",
            href: "/projects",
            event: "link-projects",
            active: pathname.includes("/projects")
        },
        {
            label: "Skills",
            href: "/skills",
            event: "link-skills",
            active: pathname.includes("/skills")
        },
        {
            label: "Experience",
            href: "/experience",
            event: "link-experience",
            active: pathname.includes("/experience")
        },
        {
            label: "Blogs",
            href: "/blogs",
            event: "link-blogs",
            active: pathname.includes("/blogs")
        },
        {
            label: "Links",
            href: "https://links.anav.dev",
            event: "link-links",
            active: false
        }
    ];
</script>

<div
    class="fixed w-screen max-w-7xl left-1/2 -translate-x-1/2 bg-transparent top-5"
>
    <nav
        class="gap-3 md:gap-0 flex items-center p-2 w-11/12 md:w-3/4 lg:w-1/2 mx-auto bg-white border border-zinc-200 rounded-lg md:rounded-full"
    >
        <a class="w-full md:w-fit" data-umami-event="link-home" href="/">
            {@render children()}
        </a>

        <ul class="hidden md:flex w-full justify-around">
            {#each links as { href, label, event, active }}
                <li>
                    <a
                        class={`${active && "text-[#444444]"} hover:text-[#444444] faded no-underline text-base`}
                        data-umami-event={event}
                        {href}
                    >
                        {label}
                    </a>
                </li>
            {/each}
        </ul>

        <button onclick={() => (isOpen = true)} class="px-2 block md:hidden">
            <Menu size={20} />
        </button>
    </nav>
</div>

{#if isOpen}
    <div
        class="fixed flex items-center top-0 left-0 backdrop-blur-lg w-screen h-screen"
    >
        <nav
            class="relative bg-white border-zinc-200 border mx-auto w-11/12 h-fit rounded-lg py-10"
        >
            <button
                onclick={() => (isOpen = false)}
                class="absolute top-0 right-0 p-5"
            >
                <X size={20} />
            </button>
            <ul class="space-y-10 text-center">
                {#each links as { href, label, event, active }}
                    <li>
                        <a
                            class={`${active && "text-[#444444]"} hover:text-[#444444] block faded no-underline text-base`}
                            data-umami-event={event}
                            {href}
                        >
                            {label}
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
    </div>
{/if}

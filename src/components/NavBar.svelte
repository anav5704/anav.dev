<script lang="ts">
    import {
        Home,
        Crown,
        SquareTerminal,
        Briefcase,
        Book,
        Link
    } from "@lucide/svelte";

    const { children } = $props();

    let current = $state("");

    const links = $derived([
        {
            label: "Home",
            icon: Home,
            href: "/",
            event: "link-home",
            active: current == "/"
        },
        {
            label: "Projects",
            icon: SquareTerminal,
            href: "/projects",
            event: "link-projects",
            active: current.includes("/projects")
        },
        {
            label: "Skills",
            icon: Crown,
            href: "/skills",
            event: "link-skills",
            active: current.includes("/skills")
        },
        {
            label: "Experience",
            icon: Briefcase,
            href: "/experience",
            event: "link-experience",
            active: current.includes("/experience")
        },
        {
            label: "Blogs",
            icon: Book,
            href: "/blogs",
            event: "link-blogs",
            active: current.includes("/blogs")
        },
        {
            label: "Links",
            icon: Link,
            href: "https://links.anav.dev",
            event: "link-links",
            active: false
        }
    ]);

    $effect(() => {
        current = window.location.pathname;
    });
</script>

<nav
    class="fixed w-screen max-w-7xl left-1/2 -translate-x-1/2 bg-transparent bottom-5 md:bottom-auto md:top-5"
>
    <div
        class="gap-3 md:gap-0 flex items-center p-2 w-11/12 md:w-3/4 lg:w-1/2 mx-auto bg-white border border-zinc-200 rounded-full"
    >
        <a class="w-fit" data-umami-event="link-home" href="/">
            {@render children()}
        </a>

        <ul class="flex w-full justify-around">
            {#each links as { href, icon: Icon, label, event, active }}
                <li>
                    <a
                        class={`${active && "text-[#444444]"} faded no-underline text-base`}
                        data-umami-event={event}
                        {href}
                    >
                        <Icon size={20} class="md:hidden" />

                        <span class="hidden md:inline">{label}</span>
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</nav>

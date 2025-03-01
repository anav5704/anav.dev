<h1 align="center">www.anav.dev</h1>

<p align="center">
    <a href="https://github.com/anav5704/anav.dev/commits/main">
        <img src="https://img.shields.io/github/commit-activity/m/anav5704/anav.dev/main?logo=github&label=Commits&logoColor=white&color=white&labelColor=6E40C9" alt="GitHub Commit Activity">
    </a>
    <a href="https://gitlab.com/anav5704/anav.dev/-/pipelines">
        <img src="https://img.shields.io/gitlab/pipeline-status/anav5704%2Fanav.dev?logo=gitlab&label=Pipeline&logoColor=white&color=white&labelColor=FC6D26" alt="GitLab Pipeline Status">
    </a>
    <a href="https://hub.docker.com/r/anav5704/anav.dev/tags">
        <img src="https://img.shields.io/docker/v/anav5704/anav.dev?sort=semver&label=Image&logo=docker&logoColor=white&color=white&labelColor=2496ED" alt="Docker Latest Image">
    </a>
    <a href="https://anav.dev">
        <img src="https://img.shields.io/website?url=https://anav.dev&logo=nginx&label=Server&logoColor=white&color=white&labelColor=009639&up_message=online&down_message=offline" alt="Nginx Web Server">
    </a>
</p>

## Technologies Used

- Astro.js - generates static site and Node.js server
- TailwindCSS - CSS framework for styling the website
- Markdown - content source (supports math and diagrams)
- D2 - generates technical diagrams during buildtime
- Satori - generates dynamic open graph images during runtime
- Docker - containerizes whole app using Node.js image
- Nginx - reverse proxy running on a Ubuntu virtual machine
- Cloudflare - provides DNS management, SSL encryption and caching  
- GitLab CI- builds Docker image and deploys it to Oracle Cloud

## Learning Resources

- [Add dynamic open graph images to an Astro site](https://dietcode.io/p/astro-og)
- [Add diagrams to an Asto site with D2](https://aaronjbecker.com/posts/adding-d2-diagrams-to-astro)
- [Build an Astro site with Docker](https://docs.astro.build/en/recipes/docker)

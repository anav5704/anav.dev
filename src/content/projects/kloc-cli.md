---
id: 20
featured: false
title: Kloc CLI
metaTitle: Kloc CLI | Node.js Lines of Code CLI
description:  Simple CLI tool to count lines of code in current working directory.
metaDescription: mock
createdAt: 2024-11-01T00:00:00+12:00
updatedAt: 2024-11-11T00:00:00+12:00
repo:  https://github.com/anav5704/kloc
site:  https://npmjs.com/package/kloc-cli 
---

## Project Overview

---

Kloc is a command line tool I built to count the lines of code for a codebase. It is the official successor to another project of mine, [codebase-stats](https://github.com/anav5704/codebase-stats). This newer CLI comes with more output formatting and configuration options.

<iframe allowfullscreen src="https://www.youtube.com/embed/ac_zoq3HYt0"></iframe>

## Project Motivation

---

In my first year of University, we had this course called CS140: Introduction to Software Engineering. This is where I learnt about hte term Kloc (kilo lines of code). It was one of the method of measuring a projects cost and effort. 

```math
kloc = \text{total lines of code} \div 1000
```

I thought it was a pretty cool concept and wanted to find out how many lines of code my personal projects had. I was initially using a Visual Studio Code extension called [VS Code Counter](https://marketplace.visualstudio.com/items?itemName=uctakeoff.vscode-counter). It worked well but I had to open VS Code every time I wanted to calculate the Kloc.

To streamline the process, I decided to make a CLI to calculate the lines of code. This wway, I would just run a command in the terminal and get the statistics. I ended up building [codebase-stats](https://github.com/anav5704/codebase-stats). However, this project was quite rigid, as it only worked for Node.js based projects.

Following this, I decided to build Kloc. I wanted to make somethings aht was more flexible and gave me configuration options. The core features were the same as the previous CLI, but with some improvements to the overall user experience and branding.


## Project Details

---

There are 2 main parts to using this tool: configuration and formatting. To configure the CLI, I made a `get` command with 2 flags. This will print the location of the `kloc.config.json` and `.klocignore` files.
```sh
kloc get --config
kloc get --ignore
```

These files can then be edited to configure what kloc will and will not count.

```json
// kloc.config.json 
{
    "count": [".js", ".ts"],
    "ignore": [".json"]
}

//.klocignore
node_modules
build
dist
```

To format the output, I add 3 flags to the main `count` command. These flags a used to decided between whether the outout will be in a single line, a file tree format or a table format.

```sh
kloc count --oneline
kloc count --table
 kloc count --file
```

## Project Outcomes

---

I ended up with a minimal CLI tool which fixed all the issues I had with my previous solutions. I was very proud the configuration options I had added. I'm able to count lines of code for projects in a language, framework and environment agnostic way. For instance, I can use it for a SvelteKit app, React app, Django app, Golang CLI or C++ project. It doesn't matter what I'm using the tool for, all I have to do is edit the config files.
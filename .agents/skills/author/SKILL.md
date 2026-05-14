---
name: author-skill
description: "Write blog posts, project descriptions, and technical documentation in a conversational yet technically credible voice. Use this skill whenever the user wants to create content that mirrors a software engineering student's perspective—whether it's an article sharing personal experience, a project writeup showcasing technical work, or a tutorial helping peers learn. Captures a specific style: confident and direct, leads with problems not context, respects reader intelligence, and prioritizes clarity over formality. Include this skill for any content where authenticity, relatability, and practical focus matter."
---

## Overview

This skill guides you in writing content that mirrors Anav's voice: a software engineering student writing for peers. The style is conversational but technically precise, educational but not condescending, and always grounded in real experience. Whether you're writing a blog post, project description, or technical guide, this skill ensures consistency in voice, structure, and presentation.

## Voice & Tone

### Core Principles

**Confident and Direct**
- Never hedge unnecessarily. Say what you know.
- Avoid phrases like "I think", "arguably", "it could be said that". If you're uncertain about something specific, acknowledge it directly ("I'm not sure why X happens, but...") rather than softening the entire statement.

**Conversational but Technically Credible**
- Write how you speak, but don't sacrifice precision. Use contractions ("I'm", "won't", "it's"), casual connectors ("Turns out", "Luckily", "Honestly"), and active voice.
- Explain technical concepts clearly without over-explaining basics. Respect the reader's intelligence—they can handle complexity if you lay it out clearly.

**Mentor-like Authority from Experience**
- Speak from personal experience. Use first-person ("I built", "I learnt", "I discovered") to ground claims in reality.
- Share both wins and mistakes. Failures are learning opportunities, not embarrassments. "I got absolutely cooked by X" is more credible than "X was challenging".
- Acknowledge the learning curve. Normalize struggle for the reader without making them feel inadequate.

**Actionable and Practical**
- Focus on "what works" over theory. Include specific tools, workflows, and examples the reader can apply immediately.
- **Justify decisions inline—always explain the why.** Don't just say "I use Firebase" — say "I use Firebase because real-time sync was essential and it handles authentication built-in, saving weeks of backend work." Weave reasoning naturally into sentences. The reader needs to understand your logic, not just know what you picked. This pattern appears throughout your best writing: "I chose X because Y meant..." or "This matters because...".

### Tone Markers to Use

- Rhetorical questions: "Why build a personal website?" (engages the reader)
- Analogies for complex concepts: "Think of an API as the interface between different applications" (makes abstract concrete)
- Specific references: Real dates, course codes, project names, people (builds credibility)
- Casual language: "I was lazy so I hard-coded the data" (humanizes you)
- Mild self-deprecation: Balanced with competence (makes you relatable)

### Tone Markers to Avoid

- Excessive enthusiasm or AI-sounding affirmations ("This is amazing!", "You'll love this!")
- Hedging language that undermines confidence ("arguably", "perhaps", "it could be said that")
- Overly formal transitions ("Furthermore", "In conclusion", "To summarize")
- Filler closing paragraphs that just recap what was already said
- Em dashes (—) and colons to extend thoughts; break into separate sentences instead

## Structure

### The Spine: Problem → Why → Solution → Result

Every piece should follow this logical flow:

1. **Problem/Tension**: Lead with what's broken, unclear, or needed. This is your hook.
2. **Why It Matters**: Explain the stakes or context briefly. Why should the reader care?
3. **Solution/Approach**: Show how you solved it, what you built, or what you learned. Include the specifics.
4. **Result/Takeaway**: What was the outcome? What can the reader apply?

This spine works for blogs, project descriptions, tutorials, and guides. You're not telling a story for its own sake—you're solving a problem or sharing a discovery.

### Anti-pattern: Throat-clearing

Avoid long introductions that set context before diving in. Don't spend three paragraphs on "what is X" when you can mention it inline as you go. Get to the substance fast.

**Bad**: "Before we talk about REST APIs, let me explain what they are. APIs stand for Application Programming Interfaces. They're fundamental to modern software development..."

**Good**: "I built a REST API that exposes our database to the frontend. The key challenge was handling authentication without exposing secrets in the client code."

### Hierarchical Structure

Your content uses **H2 and H3 headers only**. Never use H1 (that's the title). Start every piece with an H2.

- **H2**: Major sections (Problem, Solution, Architecture, Results)
- **H3**: Subsections within those (Frontend, Backend, Database under Architecture)
- Use horizontal rules (---) after each H2 header for visual clarity

**Pattern:**
```
## Section Title

---

Content here.

### Subsection

---

Content here.
```

### Prose Over Bullet Points

Strongly prefer prose over bullet lists. Bullets work for:
- Short feature lists (3-5 items max)
- Installation steps where sequence matters
- Quick reference tables

Avoid bullets for:
- Advice or conceptual ideas (write as connected paragraphs instead)
- Explanations that need reasoning (readers follow logic better in prose)
- Step-by-step workflows (use numbered steps or prose walkthrough)

When you're tempted to write a bulleted list, ask: would this flow better as sentences? Usually yes. Example: instead of "- Use branches, - Make commits often, - Write good messages", write: "Branch for every feature so main stays deployable. Commit frequently with messages that explain why you made the change, not just what you changed—your future self needs that context."

## Formatting Conventions

### Headers

- Use sentence-style capitalization, not title case ("Solution architecture" not "Solution Architecture")
- Headers are action-oriented or problem-focused when possible ("Problem Statement", "Why This Matters", not "Introduction")

### Code Blocks

- Include language identification: ` ```d2 `, ` ```bash `, ` ```python `, etc.
- Code blocks are for shell commands, configuration, or substantial code snippets
- Short inline code references (variable names, command flags) use backticks: `createdAt`, `--verbose`

### Diagrams with D2

Use D2 diagrams for architecture, data flow, or system interactions. D2 is a text-based diagramming language that produces clean, professional visualizations.

#### When to Use D2

- Architecture overviews (showing how major components connect)
- Data flow pipelines (showing how data moves through the system)
- System interactions (frontend → backend → database)
- Avoid D2 for simple concepts that don't need visualization

#### Real Example: AOG Zero Architecture

The AOG Zero project (an aircraft health monitoring system) uses D2 to show how three layers work together:

```d2
*.style.border-radius: 6
*.*.style.border-radius: 6
*.style.fill: "#fff"
*.*.style.fill: "#fff"
*.style.font-color: "#444"
*.*.style.font-color: "#444"
*.style.double-border: false

Frontend: Dashboard

Backend: "" 
Backend.A: Auth & Routing
Backend.B: Business Logic
Backend.C: SQLAlchemy ORM

ML: "" 
ML.A: Feature Extraction
ML.B: PCA Health Indicator
ML.C: RUL Regression

DB: PostgreSQL 
APU: APU Sensors

Frontend -> Backend: HTTP Req {
  style: { animated: true } 
}

Frontend <- Backend: API Res {
  style: { animated: true }
}

Backend.A -> Backend.B {
  style: { animated: true }
}

Backend.B -> Backend.C {
  style: { animated: true }
}

Backend.C -> DB {
  style: { animated: true }
}

APU -> ML.A {
  style: { animated: true }
}

ML.A -> ML.B {
  style: { animated: true }
}

ML.B -> ML.C {
  style: { animated: true }
}

ML.C -> Backend.B: RUL {
  style: { animated: true }
}
```

**What This Diagram Shows:**

The diagram separates three independent concerns. APU sensors feed into the ML pipeline (feature extraction → health indicator → RUL prediction). Meanwhile, the frontend sends requests through backend routing, which handles authentication, business logic, and database queries. The ML layer outputs predictions back to the backend so the dashboard can display them. Each arrow has `animated: true` to emphasize data flow.

**Key D2 Patterns:**

- **Containers**: `Backend: ""` groups related components; `Backend.A:` creates nested items within that group
- **Connections**: `A -> B` shows direction; `: "label"` adds text to arrows (e.g., `: "HTTP Req"`)
- **Styling**: `style: { animated: true }` adds movement to show data flow vs. static structure
- **Hierarchy**: Global styles at the top (`*.style.border-radius: 6`) apply to all elements; keep diagrams clean by avoiding clutter

### Links

- Embed links inline, not as separate "References" sections
- Use descriptive anchor text: `[Read more about PCA](link)` not `[here](link)`
- Link to your own work naturally when relevant, but don't over-promote

### Images and Image Placeholders

Images should enhance understanding, not clutter. Instead of embedding markdown-style placeholders, use plain text notes to guide where images should go and why.

#### Image Guidance Format

Add plain text notes explaining what image is needed:

**Example:**
```
Add screenshot of the final dashboard showing real-time APU health metrics, temperature sensors, and the RUL countdown timer. Shows what users see after opening the app.
```

**Better:**
```
Add demo screenshot of dashboard in action. Show:
- Fleet overview with 5-6 aircraft
- One selected APU with real-time sensor graphs
- Maintenance alert highlighted in red
Purpose: Shows the end product and main features at a glance.
```

#### Image Placement Strategy

- **After intro**: Hero/overview image (shows the finished product)
- **After problem statement**: Screenshot or diagram showing the problem context
- **After architecture**: The D2 diagram (if included)
- **After results/features**: Screenshots of key functionality

#### Writing Image Guidance

Be specific about what the image should show and why it matters:
- Not: "Add an image here"
- Better: "Add screenshot of terminal showing `npm install` completing. Shows green success output and confirms installation worked."

Frame it as a note to yourself or a designer:
```
Add diagram showing payment flow: user clicks "checkout" → frontend sends card data → Stripe processes → backend records transaction. Shows how payment integrates with the backend.
```

## What to Avoid

### AI-Sounding Language

- Excessive exclamation marks
- Adverbs like "truly", "actually", "really" used for emphasis
- Phrases like "It's important to note that...", "As mentioned earlier...", "Let me explain..."
- Filler affirmations at the end ("You've got this!", "Keep learning!", "Never give up!")

### Structural Anti-patterns

- **Filler closing paragraphs that just recap.** An ending that says "In conclusion, we learned X, Y, Z" when you already explained X, Y, Z wastes space. Instead: end with a concrete next step ("Now try building X"), a reflection that reframes what came before ("This shift changed how I think about..."), or simply stop when you've made your point. Let the last section feel final, not repeated.
- **Overly long introductions that delay the main point.** Get to the problem within the first paragraph. Context comes naturally as you explain the problem, not before.
- **Lists of bullet points when prose reads better.** A list of features is fine. A list of conceptual advice reads better as paragraphs with connective tissue between ideas.
- **Unnecessary repetition of concepts.** Mention something once clearly. Reference it again only if you're building on it, not restating it.

### Writing Anti-patterns

- Em dashes (—) for asides. Use a new sentence instead: "The API rate limit is 1000/min. This means you need to batch requests carefully." Not: "The API rate limit is 1000/min — something you need to account for when batching requests."
- Colons (:) to extend thoughts. Same fix: break into separate sentences.
- Hedging: "I think", "arguably", "it could be said"
- Apologizing for decisions: "Unfortunately, I had to use X instead of Y" (just explain why you used X)

## Example Structure: Blog Post

Here's how a blog post comes together:

```markdown
## Why Tutorial Hell Exists

---

Tutorial hell is real. You watch five courses, follow along with the code, feel productive in the moment, then realize you can't build anything on your own. I spent my first year of university stuck here, and I think it's actually a necessary part of learning, not something to feel bad about.

### What Tutorial Hell Actually Is

---

Tutorial hell isn't failure—it's a phase. You're learning syntax, patterns, and how to think through problems, but you're not making decisions or debugging your own mistakes. That's okay. It's a stepping stone, not a dead end.

### Why I Stayed in Tutorial Hell 

---

Three reasons kept me there. First, I was afraid of building something that didn't work. Second, building something felt harder than following along. Third, I couldn't figure out what to build anyway.

The breakthrough came when I built something stupid...

### Moving Past Tutorial Hell

---

I started small...

(Follows the spine: Problem stated → Why it matters → Solution/approach → Result/takeaway)
```

## Content Type Guidelines

This skill covers two primary content types:

### Blog Posts

- **Length**: 60–300+ lines (varies widely depending on topic depth)
- **Tone**: Conversational, narrative-driven, grounded in personal experience
- **Structure**: Problem/insight → Why it matters → Solution/reflection → Takeaway
- **When to write**: Share something you learned, make sense of a struggle, explain a tool or concept from your perspective
- **Example topics**: "How I learnt X", "Why tutorial hell is okay", "My first encounter with Y", "Building X: lessons learned"

### Project Descriptions

- **Length**: 50–150 lines (concise and punchy)
- **Tone**: Professional yet personal, achievement-focused, technically grounded
- **Structure**: What it is → Problem it solves → How it works → Results
- **When to write**: Portfolio pieces showcasing technical work, hackathon projects, or learning projects
- **Example pattern**: "This is a system that does X. We built it because Y [the problem]. Here's the architecture. We achieved Z [the outcome]."

## Quick Checklist

Before finishing, scan for:

- ✓ Does it start with a problem or tension, not throat-clearing?
- ✓ Are headers H2/H3 only, with no H1?
- ✓ Is the voice confident and direct, without unnecessary hedging?
- ✓ Are decisions justified inline with clear reasoning? ("I chose X because Y meant...")
- ✓ Does it follow the spine: Problem → Why → Solution → Result?
- ✓ Are there any em dashes or colons extending thoughts? (Replace with separate sentences.)
- ✓ Does the ending give a concrete takeaway or next step, not just a recap?
- ✓ Are bullet points minimal? (<6 per piece, used only when truly necessary)
- ✓ Are image guidance notes specific and purposeful? (e.g., "Add screenshot of error message showing validation failure")
- ✓ Do D2 diagrams (if included) show architecture or data flow, not simple concepts?
- ✓ Does the tone feel conversational and credible, not AI-sounding?

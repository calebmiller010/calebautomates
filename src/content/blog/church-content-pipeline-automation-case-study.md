---
title: "How I Automated a Church's Entire Content Pipeline"
description: "A real automation build for a 200-person church: recording to published bulletin, one approval, about an hour a month of upkeep. Honest about what it is and isn't."
order: 1
tags: ["Case study"]
published: true
---
Every Sunday and Wednesday, a 200-plus-member church used to run the same manual routine after every service. Someone had to pull the recording, write it up into usable notes, update two separate websites by hand, format video chapters and a description, assemble the bulletin from all of that, and send it out.

None of it was hard. It was repetitive, detail-sensitive, and dependent on one person doing it right every time, with no backup if they got busy or missed a step. I see that same shape in small businesses constantly — different subject matter, same risk: not that the work is difficult, but that it has no redundancy.

I rebuilt this one end to end, as a volunteer, not a paid engagement. Here's exactly what that means, what didn't work on the first try, and what I think it does and doesn't prove.

## The starting problem

Twice a week, a volunteer had to:

- Pull the service recording
- Write it up into an outline with key points
- Update two separate websites with that content
- Add chapters and a description to the video
- Assemble the bulletin from all of the above
- Send everything out

Every step was manageable on its own. Together, twice a week, they added up to real time — and the whole thing lived in one person's head.

## What "automated" actually means here

I want to be precise about this, because the word gets used loosely.

The recording now triggers the process. An AI step turns it into a formatted outline. That outline feeds both websites, so they update without anyone touching a CMS by hand. The same source generates the video chapters and description. The bulletin gets assembled from the same material. Then a human reviews and approves everything before it goes out — one approval step, not zero.

Automate the assembly, keep a person on the send button. It's been running since early 2026, hasn't missed a service, and takes about an hour a month to maintain.

## What almost didn't work

The choice that mattered most was keeping a human approval step instead of going fully hands-off. That was possible. I didn't do it, because the cost of a wrong or embarrassing publish is much higher than the cost of one person spending two minutes checking the output before it goes live.

I'll also say plainly: it didn't work well on the first pass. The AI-formatted outline was too rough to trust without heavy editing, which defeated the point. The fix wasn't a smarter model — it was breaking one big transformation into smaller, well-defined steps, so each stage did one clear job instead of guessing at all of them at once. That produced output a non-technical volunteer could actually approve in a couple minutes instead of rewriting.

## The shape of it, in plain terms

You don't need the tool names to follow this, and that's intentional — a system a non-technical team can trust should have a simple shape even when the internals aren't simple.

It's a pipeline: recording in, formatted content out, distributed to the right places, with one checkpoint where a person looks at it before it's public. Each stage does one job, so if a stage breaks, it breaks in isolation instead of taking the whole process down. That's the same pattern I'd apply to a business process — capture the raw input, transform it into the shapes different destinations need, distribute it, and put a person where judgment actually matters.

## An honest note on what this is

This was a volunteer project for a church, not a paid client engagement. I'm not going to imply otherwise.

But the pattern underneath it — capture, transform, distribute, with one human checkpoint — is exactly what shows up in small business operations too. A report assembled by hand from three sources every week. Customer data reformatted and pushed into two systems. Documents that need a review step before they go out. Same shape, different subject matter.

## What this proves, and what it doesn't

It doesn't prove I've delivered this kind of system for a paying client — I haven't yet. I have zero paying consulting clients so far, and no testimonials or client logos. I'm not going to invent any to sound more established than I am.

Here's what does back it up. I spent 9 years as a senior software engineer before going independent in 2022. At a healthcare-technology company, I worked on FHIR healthcare-data services handling around a million requests a day, under GDPR compliance requirements — a production system with real regulatory stakes, not a side project. At a fintech company, as lead architect, I built an integration platform that automated customer file-mapping, with an estimated $10 million a year in savings. That was employee work, before I went independent — I'm not counting it as a consulting result, just as evidence of the kind of system I've been trusted to design. At the same company I built an internal AI tool that turned specs directly into configuration, and separately cut a test suite by 80% and query times by 60%.

The church pipeline is the one system that's fully mine, end to end, still running, unattended, in production, without an employer's team behind it.

Being early also means something practical for you: right now you'd get direct access to the person who designed the systems above — not a junior consultant, not an account manager, not a team you get routed through. There's no bench to hide behind and no markup for layers you don't need. You talk to the person who builds it.

## Where this goes from here

If a volunteer project I built runs this reliably, imagine what I'd build when it's your livelihood on the line.

If you're running a manual, recurring process that depends on one person doing it right every time, I'd like to look at it. I offer a free 20-minute call and a guarantee: I'll find at least 5 hours a week your team could get back, or I'll tell you straight there's nothing here. No price pitched before we've actually talked about your process. There's also a quick ROI calculator on the site if you want to estimate what your manual task is costing you per year before we talk.

[Book a call](https://calendar.app.google/NUxmMR4GipiHsD7d9)

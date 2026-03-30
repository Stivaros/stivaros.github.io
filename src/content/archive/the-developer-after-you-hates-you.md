---
title: "The Developer After You, Hates You"
date: "2020-05-18T22:57:04.023Z"
originalUrl: "https://blog.stivaros.com/the-developer-after-you-hates-you"
isLegacy: true
description: "The person who stumbles upon your code six months after your commit is predisposed to hate you, it's natural"
---

> **Archive:** This post was originally published on the legacy blog at blog.stivaros.com. It is preserved here for historical reference and may no longer reflect current thinking.

Hopefully, every developer, developer-in-training and ex-developer knows some variation of [The Boy Scout Rule](https://www.oreilly.com/library/view/97-things-every/9780596809515/ch08.html):

> Always leave the campground cleaner than you found it

There are multiple blog posts and chapters in books dedicated to what this means and how to implement it as best practice. My aim here is to look at this from the other perspective, what happens if you _don't_ try to leave things in good shape. I'll touch on the psychology surrounding the problem, explain how it may affect you and highlight some relatively simple ways to ease the problem.

## The Psychology

You've got to write a feature in a part of the codebase that hasn't been touched in half a year. No-one else seemed keen to pick up the ticket. Upon first glance the code is unfamiliar, difficult to read and you feel like you're stranded in the middle of the desert. You want to lash out, scream and cry. This code _sucks_. It's _the worst_. How can anyone decipher this meaningless garble? You will _never_ understand this. Any difficulty you have in implementing your feature is down to the absolute morons who wrote the code before you.

This is, by default, how most developers approach legacy code. Well, perhaps not that extreme, but something along those lines. I know I've been guilty of it and I'm sure I'll be guilty of it again in the future. The point here is that this is how our relationship with legacy code can often start - on the wrong foot. It's a moment of panic, externalising all the blame for whatever will happen next. It's comforting to excuse yourself rather than admit fault. It's not ideal, nor productive, but we aren't robots.

When you're writing code, it's important to keep that moment of panic in mind. You can't stop the next developer from hating you but you can make them feel silly for doing so. You can even take an enemy and turn them into a friend.

## The Effect on You

Two ways spring to mind. The first, quite simply, is to reverse the roles above. You are no longer the person writing the code and leaving it to be picked up. You are now the person picking up code that was last touched six months ago. That panic is _your_ panic. It's easy to brush off someone else's problem but now it's _yours_.

Secondly, let's say you're a detailed, considerate developer but still fell into this trap. This can happen for legitimate reasons, by the way, usually looming deadlines or an innocent misbelief that you're "going to come back to it next week".

You're now working on a different project but at the same employer. The new developer is picking up where you left off and kicking up a fuss. Your team agrees with them, the existing code is awful. There is now a small group of people examining your work and highlighting its awfulness. That'll do wonders for your reputation.

## Easing the Problem

Don't forget, the "new person" is sometimes you. You're almost certainly going to be a better developer in half a year, capable of writing better code. However, those improved coding skills have little impact on the time it takes you to understand the code you previously wrote. If it takes you 30 minutes to remember what the old code did and why you did things a certain way, that's 30 minutes you're going to spend hating past you. It's going to be significantly more time for someone else.

The problem will always exist, developers still have to read to understand what code does and why. However, here is a checklist to think about when writing the code. Doing so will help you make the future task of understanding the code much easier.

### Readability

There are a million articles on readable code on the internet. Here are some tips to get you started:

- Use easily understood class, [method](https://github.com/uohzxela/clean-code-ruby#method-names-should-say-what-they-do) and [variable names](https://github.com/uohzxela/clean-code-ruby#use-meaningful-and-pronounceable-variable-names)
- Eradicate [magic numbers](https://github.com/uohzxela/clean-code-ruby#use-searchable-names-and-use-constants)
- Abstract bits of [conditional logic in a readable way](https://github.com/uohzxela/clean-code-ruby#encapsulate-conditionals)
- Aim to be readable, not clever
- Adhere to the principles of [Clean Code](https://www.oreilly.com/library/view/clean-code/9780136083238/)

Remember, just because you are _capable_ of writing nested ternaries and complex one-line algorithms doesn't mean you _should_.

### Keep a log of **why** you did things

We strive to implement the best solution possible. With an additional six months under our belt, we often realise there was a better way to go about doing something. By documenting the factors that influenced a decision, we can quickly reassess the decision at a later stage. How can we log these decisions?

- [Architectural Decision Records](https://adr.github.io/) (ADRs)
- Comments in the code
- Notes in expanded commit messages
- [PR descriptions](https://www.atlassian.com/blog/git/written-unwritten-guide-pull-requests) that fully describe all the 'gotchas' encountered

You don't need to utilise _all_ the above (in fact some people would actively discourage comments in the code) but even one is better than none.

### Documentation

Assuming you are responsible for the documentation, ensure that you've created the appropriate documentation. If someone else is responsible, liaise with them to ensure the documentation is to a high standard. If no-one is responsible, it's time to become a trendsetter; be the first to write meaningful documentation. Here are some examples of documentation:

- Automated tests with descriptive names and contexts
- Appropriately labelled diagrams
- Full audit trail on the ticket
- Clear and concise [commit messages](https://chris.beams.io/posts/git-commit/)
- Confluence, Wiki, Asana, etc.

None of these suggestions are particularly innovative but there's a reason they're so popular - they do the job.

## Summary

The developer after you is inevitably going to hate you. You probably can't change that. Take some time to identify the 'tricky' bits of your code and use the suggestions above to reduce the friction a new developer will feel. The less friction, the less time they'll spend hating you. The less time they spend hating you, the more time they can spend on being productive.

Having a reputation for writing codebases that are easy to maintain is high praise. As with all skills, writing maintainable, easily-understood code takes deliberate care and practice. These skills will help the next developer who touches the code, whether that's you or someone else. If nothing else, that's reason enough to leave the codebase a little bit better than you found it. Say 'no' to hate.

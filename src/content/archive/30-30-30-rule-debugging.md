---
title: "30-30-30 Rule for Debugging"
date: "2021-07-13T21:20:13.233Z"
originalUrl: "https://blog.stivaros.com/30-30-30-rule-debugging"
isLegacy: true
description: "A tip for developers (especially juniors) to structure their debugging time"
---

This is a set of debugging phases for engineers of all abilities and experience levels. First taught to me as a junior (thank you [Gary Taylor!](https://github.com/garytaylor)), they still serve me well as I lead a small team of my own.

They are:

- 30 minutes spent exploring the problem
- 30 minutes spent attempting solutions
- 30 minutes spent pairing

## Explore the Problem

For the first 30 minutes, it should only be you, your IDE/editor and the official documentation.

Put some breakpoints into your code and explore what the values look like as they flow through the app. Before your code gets executed, what are the values? Are they as expected? Are they the correct data type? As your code gets executed, is it working exactly as intended? Are its outputs as you expect? If not, why not? What is happening that you weren't anticipating? Where is it going awry?

At this stage, you are **not allowed** to Google error messages or use StackOverflow. You **should** look at official documentation, though. Between your language's stdlib or your framework's public API, it is likely:

- There's a method that does something you need
- There's a better way to write some of your application code
- There has been a poor understanding that is leading to poor implementation

If you can solve the problem at this stage, fantastic. Gold star. Sometimes, the problem is more complex, so move to the next stage.

## Attempt a Solution

This is the stage where you start Googling. Your exploration means you should be able to ask better questions.

A good long-term solution is to look at Github Issues if you are working with an open-source package. Have others had the same issue? Has the maintainer provided a solution?

If you're not working with open-source code, search for the problem domain first. If someone has written a blog post on solving the same problem then pour through it and look at other blog posts. You have 30 minutes, make use of them!

An alternative would be to search for the error message. Again, try to find a long-form explanation that resolves the error. Try not to copy code, without an explanation, because "it works". It's valuable to your code, and fixing this problem, but not to your knowledge. Long-term, you will be better off having learned things in detail and how their solution works.

The reality is, most people will hit up StackOverflow at this stage. If it does provide the right answer here, you'll have more context about how or why it works. This is light years better than going to SO and copying code you don't understand because "it works".

## Pair with Someone

Asking for help is a noble thing. Three of the noblest words in the English language are "I don't know". When hiring, I always listen for a candidate to utter those crucial words. Humility is important in an engineer. You aren't expected to know everything, so why pretend you do? I digress.

Pairing with someone isn't about finding the most senior/experienced person you can. In an ideal world, you will pair with the person who will help you find a solution but who is otherwise the least busy.

That's where the final 30-minute rule comes in. This rule isn't about you, or the problem you're trying to solve, it's about _next time_. You want colleagues to know that a debugging adventure with you is a short story, not a novel. Offering to pair with you for 30 minutes means pairing with you for... 30 minutes, not an undefined amount of time until you or they solve the problem.

Time-box your paired session to 30 minutes. Whether you have a solution or not at the end of the half-hour, call time. After 30 minutes of pairing, you should have new avenues to investigate.

Ask your colleague if they'd like to pencil in more time later to help you resolve the issue. If they do, great, pencil in an appropriate amount of time. You may find yourself surprised at how often colleagues want to revisit a problem with you. People like the satisfaction of seeing the story through to its end. If they don't, thank them for their time and ask another colleague for 30 time-boxed minutes.

While you wait for someone else to pair with you, try starting again. Take the new avenues your partner suggested and spend 30 minutes of exploration.

## Document your Findings

OK, this isn't part of the 30-30-30 rule but it's a fitting conclusion here. When you solve the problem, document it. That may be a blog post of your own, a comprehensive PR description or adding something to the company wiki.

Someone else will encounter the same issue, why not pre-empt that and share your wisdom ahead of time? Caring about [the person who comes after you](https://blog.stivaros.com/the-developer-after-you-hates-you/) is a great habit.

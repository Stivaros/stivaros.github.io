---
title: "Estimate-Talk-Estimate for Better Estimation"
date: "2022-10-25T09:51:58.637Z"
originalUrl: "https://blog.stivaros.com/tips-for-estimates"
isLegacy: true
description: "Moving towards effective estimation within a dev team"
---

## In Summary (tl;dr)

The "Delphi Method" (Estimate-Talk-Estimate) works for engineering teams. It doesn't need experts to be successful.

Communication is a _good thing_.

---
## Introduction

It's common within agile (Scrum or Kanban) to request some form of estimation. This is usually via story points, time-based estimates or Service Level Expectations (SLEs).

It seems we're all agreed that estimation is hard. Unfortunately, there aren't many systems that increase accuracy or precision. There's no need to reinvent the wheel, our old friend **communication** works well here.

## The Underlying Issue

Estimation is hard. It's hard because there's a matrix of uncertainty. Factors such as technical expertise and codebase familiarity are spread across many engineers. The engineers who are the most certain are likely working on bigger problems.

The largest factor is peer pressure. Whether internal or external, engineers feel pressured to provide smaller estimates. This is usually to keep "higher-ups" happy.

Without doubt, things will start to go wrong. A small refactor will bring a larger issue to the fore. A test in an unrelated area starts to fail. The more this friction builds up, the more unobtainable the estimate. This then plays on the mind and increases pressure. The failure to meet the deadline becomes self-fulfilling. I thinks juniors should take their best estimate, double it and add some change to avoid this problem.

## Estimate-Talk-Estimate

As with pretty much everything, communication is the best way to share knowledge. The [Delphi Method](https://en.wikipedia.org/wiki/Delphi_method) is an excellent framework for this. It's got a tech background but wasn't created with software development in mind. From this point on, I'll refer to it as Estimate-Talk-Estimate.

### What is it?

Within the context of software development, it's a three-round process:

1. Estimate - With minimal context, everyone (often anonymously) provides a perceived complexity
1. Talk - Questions based upon the results of the first round, talking points may include:
   - How spread out the estimates are (i.e. how **precise** the collection is)
   - Whether people are generally measuring in the same unit such as hours, days or weeks
   - The highest and lowest estimate
1. Estimate - Another round of estimates given the shared context everyone now possesses

### Why does this work?

Most places only have the first round of estimates, with a little discussion. This framework takes those estimates and uses them solely to facilitate discussion. During this discussion, everyone can chip in with their thoughts. The shared context should lead to a tighter second round of estimates. The discussion phase usually bubbles up perceived issues, sometimes with solutions.

For example, a junior engineer may say something like:
"This will take two weeks because I am not confident in touching this bit of the codebase. So, it'll take me a week to get comfortable". This may resolved by an opportunity to pair with a more senior engineer for two hours, to help.

Another example, may be that there is a dependency on another area of the codebase. A second engineer may already be working on that bit of the codebase. They may be able to take a quick detour to clear the path for this body of work.

The inverse is also true, the first round of estimates may be optimistic. A previously-unknown issue may be raised during the talk phase.

## Indirect Benefits

There are other advantages gained by using this approach.

### Time management gets flagged

This one is my favourite. Are you reading this and thinking "our refinement meetings are already overfull as it is"? I'm willing to guess you struggle to complete your sprint scope.

Not sure you'll have time for this method? That's an excellent indicator that you're overfilling your sprints. If you can't plan properly, you're not getting the proper amount of work done.

### Interactivity enhances focus

There's a lot of talk about gamification and keeping people focussed. I've found that I'm most focussed when an activity is interactive and relevant to me. In classic refinement meetings, it's easy to lose focus when the tickets "aren't yours". With Estimate-Talk-Estimate, engineers have to focus during the talk phase. If they don't, they'll miss the context to deliver a good estimate.

### Reducing knowledge silos

Estimates that seem out of sync with the rest of the team highlight gaps in an individual's knowledge. Highlighting these, in the right way, can lead to more knowledge sharing. More knowledge sharing ensures everyone has a similar level of base knowledge. No more assumptions.

Also, engineers are human and take time off. Shocking, I know. In the absence of a leading engineer, there should be a bit more context available within the team.

### Highlighting team scope issues

This goes hand-in-hand with the interactivity benefit, above. You may find that Estimate-Talk-Estimate approach isn't working due to a lack of focus. Engineers may be struggling to engage with tickets that aren't for them or their part of the codebase. This suggests that the team are scoped too widely.

Take your large, unfocussed team and split them into two (or more) focussed teams instead.

## Estimate-free Alternatives

Estimate-Talk-Estimate will help, but not solve, the problem with estimation. It will still be difficult for engineers and unreliable for PMO. If you don't have a team of senior engineers who have spent a long time working on your codebase, there is no solution.

So why not do away with estimation altogether?

### Uniform tickets

There is a school of thought that states that a good planning process results in tickets of the same size. In my opinion, vastly different sizes are a failure of the planning process.

Settle on a rough idea of what a ticket should look like. For example, five story points. Now, split up every ticket so that it's the same size. No need to estimate if everything should be the same.

### Keep tickets as small as possible

Like the above, let's assume variance in ticket size is the underlying issue. I must admit I'm of this opinion, too.

By keeping tickets as small as possible, tickets shouldn't take more than, say, a day to complete. Does the estimate matter that much when tickets are this size? At the end of the day, you're unlikely to have nasty surprises when tickets are this atomic.

The problem, I've found, is that this moves the load from engineering to PMO. That's a topic for another day.

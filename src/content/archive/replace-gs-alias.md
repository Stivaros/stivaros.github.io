---
title: "Replace the gs Alias in Ubuntu"
date: "2021-01-16T16:15:56.945Z"
originalUrl: "https://blog.stivaros.com/replace-gs-alias"
isLegacy: true
description: "Accidentally typing gs into the terminal is no longer a source of frustration"
---

This post was originally going to be called "Remove the `git›gs` alias in Ubuntu" but,
as it transpires, removing it is actually super difficult so it's easier to just replace it.
So, what to replace it to? Luckily, as of [git 2.23](https://github.blog/2019-08-16-highlights-from-git-2-23/),
there is a new `git›git switch` command, with [docs here](https://git-scm.com/docs/git-switch/).

Essentially, `git›git switch` is for switching between branches,
lifting a bit of the heavy load that `git›git checkout` carries.

## How to Replace the Alias

Now, how to replace the existing `git›gs` alias? With great ease, thankfully.
I use (and recommend) [oh_my_zsh](https://github.com/ohmyzsh/ohmyzsh) but similar steps are available for bash, etc.
Firstly, as per [my previous post on getting the current DateTime](../timestamp-iso8601-terminal),
I need to open my alias file.

```shell
nano $ZSH/plugins/common-aliases/common-aliases.plugin.zsh
```

Towards the bottom I have:

```shell
[...]
# Custom

alias current_time="date --utc +%FT%T.%3NZ"
```

To which I simply add:

```shell
[...]
# Custom

alias current_time="date --utc +%FT%T.%3NZ"
alias gs
```

Reload the terminal and it works!

## Reasons to Change the Alias

To admit to my ignorance, I don't know what GhostScript is, have never used it and don't know _why_ I'd use it.
Given that I've never wanted to open it, having it aliased seems silly.
That accidentally opening it feels like six-hour round-trip to load and then close it is reason enough to get rid.

In particular, however, I have `git›gss` aliased for `git›git status -s`, which is one of my most used aliases.
Due to the brilliant piece of trolling that was the placement of the `text›s` key on the pinky of the left hand
(because a) it's the weakest finger of the generally weaker hand and b) it's one of the most popular characters for typing),
I often typo `git›gss` as `git›gs`.

After implementing my new alias, if I accidentally typo `git›gs` outside of a repo, it throws a harmless error:

```shell
➜  ~ gs
fatal: not a git repository (or any of the parent directories): .git
# Ignore that it says `fatal`, it is harmless to us in that it doesn't have any other side effects bar this message
```

If I am in a repo, typing `git›gs` without parameters also throws a harmless error:

```shell
➜  test-repo git:(develop) gs
fatal: missing branch or commit argument

# Again, harmless despite the `fatal` label.
# No side effects.

➜  test-repo git:(develop) gs master
Switched to branch 'master'
Your branch is up-to-date with 'origin/master'.

# Working as expected, neat!

➜  test-repo git:(master) gs develop
Switched to branch 'develop'
Your branch is up-to-date with 'origin/develop'.

# Working as expected again.

➜  test-repo git:(develop) gs
fatal: missing branch or commit argument

# Harmless error rather than unexpected behaviour
# where it may "switch" to the last branch
```

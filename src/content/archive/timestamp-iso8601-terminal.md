---
title: "Current DateTime in ISO 8601 Format from the Terminal"
date: "2020-04-11T14:06:40.256Z"
originalUrl: "https://blog.stivaros.com/timestamp-iso8601-terminal"
isLegacy: true
description: "Using the terminal to provide a formatted DateTime"
---

> **Archive:** This post was originally published on the legacy blog at blog.stivaros.com. It is preserved here for historical reference and may no longer reflect current thinking.

While preparing this blog I realised that the timestamps were not automatically generated.
That actually makes a lot of sense, considering the lack of database and that I'm using [Gatsby](https://www.gatsbyjs.org/),
a static site generator. How would timestamps be automatically generated?
At _best_ they would be based upon commit time or something equally inaccurate, unless they're hardcoded.

The [timestamps on the template](https://github.com/gatsbyjs/gatsby-starter-blog/blob/master/content/blog/hello-world/index.md)
were in full [ISO 8601 format](https://www.iso.org/iso-8601-date-and-time-format.html),
including timezone and nanoseconds.

Before I paused to tinker with other formats, I began wondering how I could automate this process.

Onward, then, to solving the problem.

I began by wondering what linux's `zsh›date` would spit out. Answer: `Sat 11 Apr 15:02:15 BST 2020
`. Good but no cigar, specifically due to the lack of timezone.
Some quick Googling turned [this up](https://zxq9.com/archives/795),
with the answer I wanted:

```shell
➜  blog git:(master) ✗ date --utc +%FT%T.%3NZ
2020-04-11T14:03:43.012Z
```

That was good but how was I going to remember all that? Best to store it in an alias I think.

I use [Oh My ZSH!](https://ohmyz.sh/) so I opened my `zsh›~/.zshrc` and prepared to add the alias.
As I was looking for a good spot I found this note:

> Aliases can be placed here, though oh-my-zsh
> users are encouraged to define aliases within the ZSH_CUSTOM folder.
> For a full list of active aliases, run `zsh›alias`.

I'd never heard of that file before so had to do some digging to find it.
Upon finding the file
(`zsh›~/.oh-my-zsh/plugins/common-aliases/common-aliases.plugin.zsh`, before you ask)
I saw an accompanying README, with this note:

> To use it add `zsh›common-aliases` to the plugins array in your zshrc file:
>
> ```zsh
> plugins=(... common-aliases)
> ```

So, back to my `zsh›~/.zshrc` file I went, made the amendment there and returned to `zsh›common-alises.plugin.zsh`.
At the foot of the file I added these lines:

```zsh
# Custom

alias current_time="date --utc +%FT%T.%3NZ"
```

I then reloaded my terminal:

`zsh›. ~/.zshrc`

And gave it a whirl:

```shell
➜  blog git:(master) ✗ current_time
2020-04-11T14:04:15.005Z
```

Nice!

I then finished off by realising that `date: "2020-04-11"` was fine, anyway.
I need more [cooling fluid](https://podcastnotes.org/tim-ferris-show/savage/).

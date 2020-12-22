---
layout: post.njk
title: Product Definition
description: After a successful launch on Notion, it was time to move to AWS. Here is what I did.
cover: posts/twiske-water.jpeg
date: 2020-12-22 11:24:00
author: nonken
excerpt: The direction of SaaS Manual is becoming more clear, so let me dive right in. First of all, since I [relaunched SaaS Manual](https://saasmanual.com/articles/moving-to-aws/) on AWS (Amazon Web Services), I have started to work on several new features. Notion was a great starting point for testing if SaaS Manual could provide value to folks, but it didn't allow me to build custom features, now this is possible, so let me share what's new
---

Last week, The Netherlands went into lockdown again. This time, most of everything will be closed until January 19th. Hopefully, this will be the last of the Coronavirus lockdowns. And hopefully, we can slowly get back to a more normal rhythm of life. But most importantly, I hope you are well, and that all of this isn't impacting you too heavily. 

All this aside, I am excited about this post. The direction of SaaS Manual is becoming more clear, so let me dive right in. First of all, since I [relaunched SaaS Manual](https://saasmanual.com/articles/moving-to-aws/) on AWS (Amazon Web Services), I have started to work on several new features. Let me share what's new:

## What's New

**Human-friendly URLs:** Notion has URL's which are not that easy to remember, for example: [/2020-11-18-Reinventing-The-Wheel-d3e0460b52784c94938db5cf0e67ee43](https://saasmanual.com/2020-11-18-Reinventing-The-Wheel-d3e0460b52784c94938db5cf0e67ee43) - I implemented a simple redirect. Moving forward you can find all posts under "articles", for instance, [/articles/reinventing-the-wheel/](https://saasmanual.com/articles/reinventing-the-wheel/).

**Tools directory:** @alejandromarco on [Discord](https://discord.gg/wHtewNG) asked if it was possible to list all tools which I am using to build SaaS Manual. Based on this ask, I implemented a "highlighter" which goes through all articles and highlights words that mention a tool I am using. I will explain the thought process which went into building this feature in this post below.

**Redirect *'www.'* to the naked domain:** Until this week, [www.saasmanual.com](https://www.saasmanual.com) was a CNAME which pointed to the same CloudFront distribution as [saasmanual.com](https://saasmanual.com) (notice the lack of www). I implemented a redirect from [www.saasmanual.com](https://www.saasmanual.com) to [saasmanual.com](https://saasmanual.com). I will cover the "how" in a separate post.

**Image embed:** I wrote a new Markdown plugin that embeds images and adds rounded corners and a light drop-shadow. You can find the source code [on GitHub](https://github.com/saasmanual/website/blob/main/src/lib/embed-image/index.js).

## Shaping a product

When I launched SaaS Manual, I had only a vague idea about how the site will develop in the long run. What was clear is that I wanted to show you **1. How to build SaaS products** and **2. How to do this based on a real-world example: SaaS Manual**. I didn't yet know how the best format for this would look like. 

After a couple of posts and moving SaaS Manual to AWS, I am now having a much clearer idea. Let me lay out my thought process:

### Vague ideas

Usually, when I think about products, it starts with an idea: 

> Share my knowledge around building SaaS products, and do it based on a real-world product.

As I thought about this, I wondered whether this "real-world product" should be a completely new product I would build. Say a new CRM or something like that. As I thought about this, one important lesson came up: 

**"Eat your own dogfood"**

"Eating your own dogfood" is something that I learned during my time at Cloud9 which later was acquired by AWS. It means that you use the software, which you build. If you build a CRM, you use the CRM yourself. If you build an Email client, you use it. Dogfooding is incredible because it provides you with a very similar experience as your customers might have. With Cloud9, we would "feel" when the IDE was slow, and when that would happen, we would invest a lot of time into making it fast.

Based on this experience, my conclusion was that I needed SaaS Manual to be the example itself. I wanted to use SaaS Manual myself, every day. Since you are using it as well. I had to come up with an idea on how I could make this happen.

**But how?**

I started with the SaaS Manual landing page and the idea to send out a regular email to anyone who signed up. It turned out that there is a lot that goes into building a SaaS product. After sending out a few emails, I started feeling that I wasn't able to go into enough detail in one post so I started thinking about a solution for this. At the same time, I started adding the "What's new" section to posts. You see in this post, a lot already has happened in the past week. 

Based on a few conversations in the SaaS Manual Discord channel, I got two ideas:

## 1. Allow to dive deep into topics

When I write new posts, I use a lot of terminology which might not be clear to folks. Terminology like CodePipeline, Cloudflare Workers, and much more. It is impossible to explain everything in one post, the post simply would become too large. I was looking for a way to allow you to dive deeper into topics, based on your need and your current understanding of technology. 

At the same time, a SaaS Manual user, Alejandro suggested having a "tools" directory, of all tools I am using, because there are a lot. I put these two requirements together and came up with the following list:

* As a SaaS Manual user, I want to be able to dive deeper into certain topics if I am interested in a certain topic.
* As a SaaS Manual author, I want to be able to write dedicated articles about an in-depth topic.
* As a SaaS Manual author, I want those articles to be automatically referenced anywhere on the site where certain keywords show up. So I don't have to do this manually.

Based on these requirements, I built a simple Markdown plugin that would go through the text of all posts and wrap found occurrences with a small tooltip decorator. You can find this feature live on the "[Building a website on Notion](https://saasmanual.com/articles/building-a-website-on-notion/)" post. Search for the word "Cloudflare" and you will see the tooltip show up.

I can now add new content by simply creating a new Markdown file in the `/content/tools` directory and assigning a title and a few keywords:

::embed-image{src='/product-definition/tools-content.png' alt='Tooltip Content' className=''}

And my build chain automatically highlights the words matching the keywords above with a dotted line. On hover (or tap on mobile), you get a tooltip:

::embed-image{src='/product-definition/tooltip.png' alt='Tooltip'}

With this feature, I would now be able to write higher-level posts and dive into detailed topics by writing in-depth posts. So my first idea had a working solution.

## 2. Reference actual source code in posts.

The second issue I wanted to address is the need to reference source code in my posts. Up until now, I would copy and paste code into articles. And if the underlying code changed, the article would be out of date. Instead, I had this idea for SaaS Manual to be a self-documenting service. I wanted the ability to embed "living" source code into my posts. Here was my requirements list for this feature:

* As a SaaS Manual user, I always want to see up to date source code in SaaS Manual posts.
* As a SaaS Manual author, I want to easily be able to embed real source code into my posts.
* As a SaaS Manual author, I want source code that I embed into posts, to automatically update when the underlying code changes.
* As a SaaS Manual author, I want to get a warning if a post embeds source code that no longer exists.
* As a SaaS Manual author, I want to be able to move code around without breaking articles.

I came up with a simple mechanism to do this. Say I have source code looking like this.

```
function someCodeIWantToEmbed() {}
```

And I would like to embed this snipped into a couple of posts. I also want the snippet to update if the code changes. I thought I could simply wrap the code into a simple comment:

```
// [embed:ID]
function someCodeIWantToEmbed() {}
// [/embed]
```

And then I could embed the source in a post in the following way:

```
Here is some text for a post, which explains how a certain function works:

::embed-source{ID}

And the text continues
```

with this, I can create an index of all snippets which I can embed. I would have to:

1. Parse the source code and look for the `[embed:ID]` and `[/embed]` pattern.
2. Create a map with all embeddable code snippets.
3. Write a Markdown plugin that would allow me to use a Markdown directive to embed source code.
3. Embed the snippets into the generated HTML when I transform the Markdown.

So here I have a rough outline for a simple implementation of this feature. It covers all current needs and allows me to take the next step: Building this feature. I have not built this feature just yet, but will do so next, as this will result in SaaS Manual having a minimum of features that allow me to dive deep into topics.

## Conclusion

My current product development process is very fluid. I am collecting feedback and ideas from you, and combine that with what I think works best in the short-term. I am starting to collect ideas in the [ideas repository](https://github.com/saasmanual/ideas/projects/1) and prioritize those based on what I think will provide the most value to you. I prefer to take small iterative steps over having a long-term roadmap at this point. 

## Next update

The basic building blocks to dive deeply into topics are now in place. I am now planning to cover certain topics in more depth and at the same time share the high-level SaaS Manual journey. Here is how I see the coming updates break down:

### 1. Email update every other week

This update mostly covers two parts: 

1. What happened in the past two weeks: The high-level SaaS Manual journey
2. Short summaries to in-depth articles of new features I have built in the past two weeks.

### 2. Regular feature updates to the Saas Manual website

I will push new updates to the SaaS Manual website regularly. I will also start writing in-depth posts on certain topics. Those posts will go live whenever I think they are ready to go out. I will share those on social media and other channels. And link to them in the bi-weekly email I mentioned above.

---


That's it for this post. If you celebrate Christmas, I want to wish you a safe and joyful holiday period. And if you don't celebrate Christmas, have a wonderful remainder of the week. 

[Follow me on Twitter](https://twitter.com/nonken) if you are curious about more regular updates on SaaS Manual. And as usual, please reach out to nikolai@saasmanual.com if you have any feedback, questions, or comments. 

– Nikolai
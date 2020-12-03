---
layout: post.njk
title: Building a website on Notion
description: Learn how to build SaaS products from scratch.
cover: posts/zandvoort-grey.jpeg
author: nonken
date: 2020-11-03 17:15:00
---

Before I will dive into the topic of this week, I want to announce the [SaaS Manual Discord channel](https://discord.gg/gGTD6eX). The purpose of this channel is to create a space for us to exchange ideas, questions, feedback, or really anything related to building SaaS projects. If you are curious about it please [feel welcome to join here](https://discord.gg/gGTD6eX).

I also want to thank a few folks: Reshen Amin and Justin Dray for reviewing the initial content for SaaS Manual, [Luca Cipriani](https://twitter.com/mastrolinux) who started contributing to the SaaS Manual list of topics, reviewed a bunch of content, and started writing, and everybody who reached out through email, on the Discord channel or other channels. It is so cool that we are starting to create a small, friendly, and welcoming community of folks who love to build things through code.

If you haven't signed up for SaaS Manual yet, you can do so below:

:iframe{src=https://landing.mailerlite.com/webforms/landing/b4c8x1}

Welcome! Time for another post 🎉 Now that you have some context on [why I started SaaS Manual](2020-10-22%20Introduction%20422e0c9a4939447e8587d4229c2fcd3d.md), it finally is time to dive into how I launched the initial landing page at [https://saasmanual.com](https://saasmanual.com). With a very tiny budget and in a very short amount of time.

## Desired Outcome

1. A setup, where I can easily create and edit content for the SaaS Manual landing page.
2. Allow interested people to access this site via [https://saasmanual.com](https://saasmanual.com).
3. Have privacy friendly metrics for website visits.

## Ingredients needed

- 1 Domain (< $10,- year)
- 1 [Cloudflare](https://cloudflare.com) account (free)
- 1 [Notion](https://notion.so) account (free)
- 1 [Plausible](https://plausible.io/) account
- 1 Idea to translate into content (free)

## Time to launch

- A couple of hours

## Recipe

Ok, here is the deal. To get the SaaS Manual landing page up and running, I simply followed a few steps from this awesome site [https://fruitionsite.com](https://fruitionsite.com/). The tutorial also explains how you can use custom scripts to add behavior to your page. I used this "feature" to integrate Plausible analytics into the SaaS Manual pages. 

I also had a look at [https://super.so/](https://super.so/) but you need to pay for their services. My current goal is to keep the budget low until SaaS Manual has meaningful revenue. That was all, done and dusted.

The biggest amount of work was the creation of the content of the page. I initially started with [a simple outline](https://saasmanual.com/Initial-TOC-d2461f8c177643feb6447c69dd4b70d9) of all topics which I wanted to cover. I sat down, and just wrote down all topics which came to mind when thinking about building SaaS products. I then organized them into categories and added more content. After some time, I shared this list with two former colleagues at AWS who provided really valuable feedback. Thank you Reshen and Justin! 

After this, I started writing the content for the landing page. I will cover this in a separate post, but the content is working well. **22% of visitors sign up for the list**. This is a really good conversion rate. 

If you are curious already, have a look at [https://saasmanual.com](https://saasmanual.com) and identify yourself how I structured the content of the landing page. Simply write out the different sections and their purpose in your mind. Then try and apply the same or similar recipe to your own landing page.

## Launch Results

I launched the SaaS Manual website on October 15th, 2020 on [Product Hunt.](https://www.producthunt.com/posts/saas-manual) Here are the metrics:

- Signups: **722** (until October 29th)
- Website visitors: **3.3k** (until October 29th)
- Product Hunt Rank: **#9**

When I announced the project I didn't define a threshold of when I would declare success or failure. I had a vague number of 500 signups in my mind but fewer would have been ok as well. Based on those numbers, I concluded that my "experiment" succeeded and that I have a shot at creating something which might be of value to others. 

You might say: *Wait, Nikolai, you promised to show how to build a SaaS service and now you're just pointing to some other tutorial?* 

Yep, that is what is happening. Let me explain:

## Validating value

When building a new product, it is important to get clarity quickly on whether your idea can provide value to potential users. Even if it is a tiny bit of value. Why is it important? Because your idea of something valuable might be very different from your audiences idea. You want to validate or fail quickly. 

For SaaS Manual, I concluded that the most valuable thing I could provide would be a detailed overview of what SaaS Manual might become and what you can learn. If this was valuable to you, I hoped you would sign up. For this, I didn't need a fancy landing page or even a complete website. A simple and cheap Notion page seemed like just the right tool to get the job done. And it would allow me to validate quickly. 

I could have spent weeks building a beautiful site, with a magnificent technical architecture, scalable to the moon, but it could have all been a waste of time. Finding the right tool for the job is difficult because we're surrounded by incredibly shiny tools, all the time. And they all promise you to make you successful. I made a conscious decision to not build anything significant until I had some validation. Following the steps from [https://fruitionsite.com](https://fruitionsite.com/) was the fastest way to launch.

## How does it actually work?

I am still gauging how deep you would like me to go in these posts. Do you want to learn about how Cloudflare workers actually work? Are you interested in understanding how the Domain Name System (DNS) works? What actually happens when you hit enter after typing a URL into the browser bar? Please reach out and let me know. My goal is for SaaS Manual to provide value to you and your feedback helps me to do exactly that.

## Next update

The coming update will cover how I announced SaaS Manual on Product Hunt and other places. I'll share the launch timing, launch metrics, and how I dealt with responses from the community.

[Follow me on Twitter](https://twitter.com/nonken) if you are curious about more regular updates on SaaS Manual. And as usual, please reach out to nikolai@saasmanual.com if you have any feedback, questions, or comments.

[Initial TOC](2020-11-03%20Building%20a%20website%20on%20Notion%20bf98c2cb108e4370b291b375b377eb18/Initial%20TOC%20d2461f8c177643feb6447c69dd4b70d9.md)
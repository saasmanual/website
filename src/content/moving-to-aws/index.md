---
layout: post.njk
title: Moving to AWS
description: After a succesful launch on Notion, it was time to move to AWS. Here is what I did.
cover: posts/twiske-sunset.jpeg
date: 2020-12-08 14:45:00
author: nonken
excerpt: The year is coming to an end, and wow, what a strange year. Time flew, yet the world stood still in many ways. First of all, I hope you are well and that you managed to get through 2020 without too many bruises. In this weeks post, I will share more context on how I migrated the SaaS Manual website to AWS. And here's the news.
draft: true
---

The year is coming to an end, and wow, what a strange year. Time flew, yet the world stood still in many ways. First of all, I hope you are well and that you managed to get through 2020 without too many bruises. In this weeks post, I will share more context on how I migrated the SaaS Manual website to AWS. And here's the news: It is done 🎉 Before diving in though, let me share what's new:

## What's New

**Generator updates:** I added small updates to the site generator which we built [in the last post](/2020-11-18-Reinventing-The-Wheel-d3e0460b52784c94938db5cf0e67ee43). You can now write draft posts without those being published to the website. This was a request by Luca Capriani.

**Discord community:** This is not exactly new, but since there is such an awesome community happening, I am sharing it again: [Join the SaaS Manual community here](https://discord.gg/wHtewNG).

If you haven't signed up for SaaS Manual yet, you can do so below:

:iframe{src=https://landing.mailerlite.com/webforms/landing/b4c8x1}

## SaaS Manual on AWS

I launched [SaaS Manual on Notion](/2020-11-03-Building-a-website-on-Notion-bf98c2cb108e4370b291b375b377eb18), because it was the fastest way I could validate the idea. After the launch and more than 500 signups to the email list, I decided to invest some time into building the new SaaS Manual website, the foundation for this course. Let me dive into some of the details of what I did to make this happen:

## Infrastructure

There are many ways you can host a new website. You might decide to use [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/), you might host on [Wordpress](https://wordpress.com/) or [Ghost](https://ghost.org/). Instead of building on top of these platforms I will show you how to do this on AWS. This means that we will go a little bit lower level than these platforms. This because I would love to show you what happens under the hood for many of the SaaS products you are using. Let's dive into the infrastructure setup. 

The current SaaS Manual website is still pretty simple, there is a landing page and there are a bunch of articles. We have an email list signup form, some metrics and that is pretty much all there is to it at this point. 

This is the perfect time to run you through the "journey" the code makes from being written to being visible to a visitor on SaaS Manual. 

# Local development

I am developing SaaS Manual on my laptop. This means that I can have a fast iteration cycle between making changes and verifying that those changes are working correctly. As we are increasingly moving into the cloud you can also setup your entire development environment in the cloud. If you are curious about that, I can recomend checking out some of the cloud environments, like [Cloud9](https://c9.io). For my requirements, my laptop works really well.

Usually, I setup one directory for all repositories related to one project. In my case the directory is `~/dev/saasmanual`. 

![/assets/img/posts/moving-to-aws/local-setup.png](/assets/img/posts/moving-to-aws/local-setup.png)

In there, you see I cloned a few GitHub repositories. The `website` repo being the selected one. I usually open a termial session with a few terminals running. In this case, the main session is the one which I use to start the local process which runs a lightweight server on my machine. Let's try this out, simply run the following commands in a new terminal session:

```
git clone https://github.com/saasmanual/website.git
cd website
npm install
npm run dev
```

You should see similar terminal output as the one below:

![/assets/img/posts/moving-to-aws/local-terminal.png](/assets/img/posts/moving-to-aws/local-terminal.png)

If that is the case, you can now preview the website by accessing [http://localhost:5001](http://localhost:5001) 🎉. 
Now when we make changes, like writing a new post, I eventually commit the changes to Git and push them to GitHub. 

Now the magic happens:


* AWS CDK
* S3
* Cloudfront
* CodePipelines
* CodeBuild

```javascript
function foo() {}
```

## UX / Layout

## Markdown Plugins




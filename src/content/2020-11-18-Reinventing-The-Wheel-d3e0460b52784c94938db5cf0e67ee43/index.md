---
layout: post.njk
title: Reinventing The Wheel
description: Learn how to build SaaS products from scratch.
cover: posts/twiske-fields.jpeg
date: 2020-11-18 17:15:00
author: nonken
excerpt: Welcome to another episode of SaaS Manual 🎉 The past weeks have been wonderful, it is really awesome to see how many folks are curious about building SaaS products. In this post, I want to dive into the topic of "reinventing the wheel" and how I am creating a simple site generator for the new SaaS Manual landing page. Before that, let me introduce a new section of this weekly post
---

Welcome to another episode of SaaS Manual 🎉 The past weeks have been wonderful, it is really awesome to see how many folks are curious about building SaaS products. In this post, I want to dive into the topic of "reinventing the wheel" and how I am creating a simple site generator for the new SaaS Manual landing page. Before that, let me introduce a new section of this weekly post: 

## What's New

**Ideas:** You have been sharing really awesome ideas about what you would love me to dive into and I started losing track of this. That was not good 🙈. Say hi to the #ideas repository for SaaS Manual: [https://github.com/saasmanual/ideas/issues](https://github.com/saasmanual/ideas/issues) If you have any ideas or topics which you would love to learn about, you can simply open a new "issue", share your thoughts and I will get back to you there.

**Previous Posts:** For folks who have joined later, you can [find all previous posts here](https://saasmanual.com/articles). They almost read like a diary, as I am covering topics as I build SaaS Manual. So you can easily catch up there.

**Discord community:** This is not exactly new, but since there is such an awesome community happening, I am sharing it again: Join the SaaS Manual community here.

If you haven't signed up for SaaS Manual yet, you can do so below:

:iframe{src=https://landing.mailerlite.com/webforms/landing/b4c8x1}

## To build or not to build

We love to build stuff, it somehow is part of being human. I remember that I have been building things since I was a kid. I used to build model ships, windmills, electronic hardware, computers, learned how to write code, dug holes into the ground to build tunnel systems (it ended up as a simple hole in the ground), built sheds, all kinds of stuff. I made music, played violin, guitar. Music is also a form of creating. Why did I do this you might ask? It brought me joy. And why did it bring joy? I can't claim to know, but maybe because it was a wonderful feeling to create things and let my creativity take me to places I haven't been before. 

As we can now build things based on software, we are able to build in a world where there are few limits to our creativity. Sure, you can't build a rocket and fly to Mars only with software, nor can you plant trees with software only, or even make food, but your mind has a really large playing field in this new world. And on top, you can now get a glimpse into other people's minds across the entire planet. That's an impactful shift.

With this incredible freedom comes a challenge. Especially when your goal is one of building something which provides value to others. The challenge is that we have too many options, too many paths to "success". And it can be tricky to find the right path in a world full of options. 

I have learned to ask the following questions when embarking on new ideas, especially in the virtual software world:

1. Should I build this at all?
2. Should I use something which already exists?
3. Should I build this myself?

I have listed those questions in the order in which I tend to ask them when I embark on building something new. I admit, I am stubborn and when I have an idea, usually the first question gets a sound **"Yes".** Either way, this post is focusing more on the second and third questions. 

You might wonder, why am I writing about this at all? Well, I have to answer those exact questions for the next iteration of SaaS Manual. After having launched the site on Notion, I am now planning to move away and start building the actual product. Notion will eventually run into limitations and most importantly, there isn't much I can share about how Notion works under the hood. There isn't much you can learn if I'd stick to Notion.

## Building or not building a site generator

So moving away from Notion is going to happen. But how? I could decide to move over to a platform like Wordpress or Ghost, or could dive into one of the many site generators which are out there. Let's find the right answer to the three questions above:

**1. Should I build this at all?**
I think we can answer with a sound Yes. You joined this journey to learn about building SaaS Products. So if I wouldn't move away from Notion, I would get stuck pretty quickly and you would get bored.

**2. Should I use something which already exists?** 
On the surface, this seems like a simple question, but actually, it is not that simple at all. For any given project out there, it is good to briefly review a couple of questions:
 

1. **How well is the project maintained?**
Generally, I prefer to use projects which are well maintained. There are certain libraries which don't need to be maintained because they are simple and well built or cover a very straight forward use-case. 
2. **How many dependencies does it have, are they maintained?**
The fewer the better, it's simple.
3. **What is the code quality, docs, test coverage?**
It gives a sense of craftsmanship. Try and read the code, can you follow? Are there tests? Can you understand them?
4. **Is the documentation clear and does it feel complete?**
If the docs are bad, you will have to dive into code. That might be easy or not. 
5. **How well does the project cover my needs? What if my needs are no longer covered? Can I easily take over the codebase?**
This seems obvious, but it's kind of like finding a new jacket, it should fit well, not too small or too big. 
6. **What is the license of this project?**
I will cover licensing in a different post, but for now, simply make sure to have a look at [https://choosealicense.com/](https://choosealicense.com/) and that the license aligns with your needs.
7. **How much effort would it take to learn this tool vs. building your own?**
This is a difficult one to assess, especially with larger projects. Try to answer, even if only vaguely.

My conclusion for the SaaS Manual site generator was: **I will build one from scratch**. 

Here is why: **First of all**, SaaS Manual is there to show you how to build SaaS Products, so I will always have a bias towards building something from scratch. This way you can learn most and hopefully get value out of SaaS Manual. **Second**, building a site generator is actually really simple. And it would be faster **for me** to just build one instead of learning a new tool. **And third**, I actually have worked with a bunch of site generators before, and somehow most projects went stale after some time. Writing a simple one myself would simply be more maintainable.

Maybe your conclusion would be to use an existing one, and that conclusion is probably right, because ultimately there is no right or wrong way, it all depends on where you are heading.

## How does a site generator work?

You can find the source code here: [https://github.com/saasmanual/generator](https://github.com/saasmanual/generator) - it works in a very simple way:

1. Read content from a "source" directory. That content is written using [Markdown](https://en.wikipedia.org/wiki/Markdown).
2. Parse those Markdown files and allow you to "do something with them". After parsing, you can transform the content. This is called the "tranformation step". So you could for example extract the Author from the file and store all posts for one Author in some map.
3. Convert the content of each transformed Markdown to HTML and use a templating engine for this so you can work with HTML templates.
4. Write the generated HTML to disk. 
5. Done! 🎉

This is the code you would write to actually use the generator:

```jsx
import {Generator} from '../src/generator';

(new Generator)
  .source('./content')
  .destination('./out')
  .templates('./templates')
  .build();
```

The `source()` call sets the source directory which contains your Markdown files. This could for example be blog posts. The `destination()` call sets the destination directory where your HTML files will be written to. The `templates()` call sets the directory where you can define a `layout.njk` which would be the HTML template used for your posts. `.njk` is the extension for Nunjuck templates. It is basically HTML. And `build()` simply kicks off the entire process. That's all, [in about 100 lines of code](https://github.com/saasmanual/generator/blob/main/src/generator.js).

Here we are, it took me a couple of hours to build this generator. At this point, I think the decision to write one from scratch was the right call. I will see in the future if that decision can hold. If you have some time, have a look at the site generator I build. And try and build one yourself. It really is much simpler than you might think.

## Conclusion

Over time I have learned, there are no recipes that can guarantee "success". Even though we are surrounded by blog posts that claim that there are (10 steps to happiness anyone?). It is much more rewarding in my mind to think about the questions which you ask to determine the right path forward. And over time, you will get better at asking the right questions. I hope that this post can give you some insight into the questions I am asking when evaluating technology and ideas. Those questions can guide me in the hopefully right direction, and still, sometimes there will be a wrong answer. That's just life 🤗.

## Next update

Now that we have built a simple site generator, I can actually build the new SaaS Manual website. In the coming update, I will share the steps I am taking to set up the required infrastructure and deploying our new website to production 🎉.

[Follow me on Twitter](https://twitter.com/nonken) if you are curious about more regular updates on SaaS Manual. And as usual, please reach out to nikolai@saasmanual.com if you have any feedback, questions, or comments. I am especially curious about whether there are any topics you'd like me to cover regarding the initial launch of SaaS Manual.
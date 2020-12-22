---
layout: post.njk
title: Introduction
description: Learn how to build SaaS products from scratch.
cover: posts/zandvoort-sun.jpeg
date: 2020-10-22 17:15:00
author: nonken
excerpt: Wow! Here we are, I announced [SaaS Manual](https://saasmanual.com) a week ago (October 15th, 2020) and by now 655 people have signed up to join this adventure. This is my first post to you and it is a bit of a read but I ask you to stay with me as it provides context on how this all started.
---

If you haven't signed up for this course yet, you can do so below:

:iframe{src=https://landing.mailerlite.com/webforms/landing/b4c8x1 title="Join the SaaS Manual journey"}

Wow! Here we are, I announced [SaaS Manual](https://saasmanual.com) a week ago (October 15th, 2020) and by now 655 people have signed up to join this adventure. This is my first post to you and it is a bit of a read but I ask you to stay with me as it provides context on how this all started.

There are a few things I would like to say:

**Thank you**
The fact that you are curious about how to build SaaS products means a lot to me, it is really awesome. It also provides a ton of inspiration to pull this through, because it is a big project. Welcome to each of you.

**Full Transparency**
I will be as transparent as possible in the process of building SaaS Manual. So you will see that building a product is not a thing which just happens overnight and that there are ups and downs. Instead of telling a success story, like "How I gained 500 email subscribers in one day", I will tell it as close to reality as it actually is. I do this so that you see that nothing happens overnight. The overnight stories most of the time are just cherry-picking the good parts. This also means that while I have a lot of experience, I don't know if SaaS Manual will be successful. Because no startup founder really knows if they will be. Even if their daily story is: We're doing super well and growing by 10% week over week.

**Ask me anything**
Always feel welcome to ask any questions about what I am sharing with you. When you read a paragraph and think "oh, I'd like to know more" or when something is not clear to you please reach out to me [through email (nikolai@saasmanual.com)](mailto:nikolai@saasmanual.com) or [Twitter](https://twitter.com/nonken). I really will appreciate this, as it will make SaaS Manual a better course.

## What's on the menu for today?

Today I will share how the idea for SaaS Manual was born. I won't yet dive into the technical details, because that is not how it all started. This part is quite abstract because it is much more about life than about tech.

## A long journey

![/assets/img/posts/introduction/journey.png](/assets/img/posts/introduction/journey.png)

**August 2019:** I left AWS after 5 years of experiencing the rollercoaster of being part of a startup called [Cloud9 IDE](https://aws.amazon.com/cloud9/). We searched and found product-market fit, we scaled up, we hired, we gained many active users, we went through an acquisition by AWS, and then learned how to build and operate products at AWS. It was a very intense, yet fulfilling 5 years. And after those 5 years, I decided to take a bit of time off and be okay with the fact that I didn't know what was coming next. 

## Side projects

During my time at AWS I was building a few fun products on the side. I always felt joy building my own products and I felt that it would keep my skills up to date. I loved working on everything required to build products: coding, design, marketing, customer interaction, you name it. 

One project was called Connectr. I built Connectr to help me stay connected with friends. It worked well but running the service cost way too much and it wasn't profitable. So I took it offline. Connectr's codebase was taken from another project I built before: Wundermill. Wundermill was a service that would let me know when fresh produce arrived at local stores. It never went anywhere, but was fun to build as well.

Before Cloud9 and AWS, I was running a consulting business, called [uxebu](https://www.uxebu.com/), which allowed me to build many really interesting and challenging products for a number of great customers. One product that stood out was a magazine app for [Sports Illustrated](https://www.reuters.com/article/uk-hp-palm/hp-to-pit-touchpad-against-apples-ipad-google-idUSLNE71902220110210) and other magazines for the HP WebOS launch. We built an application, based 100% on JavaScript, which served gigabytes of content (videos, etc.). And it worked well. I also was involved in open source software, and a contributor to [Dojo Toolkit](https://dojotoolkit.org/), a collection of JavaScript tools.

## Seeing patterns

As I was building these products, patterns emerged. I was struck every time how involved it is to get a production-ready service running. Don't get me wrong, you can build certain products very quickly, you can even go the no-code route. And still, many products require way too much bootstrapping and boilerplate - I saw myself repeating the same patterns again and again, throughout my career. So as I was building those products, I started to re-use many principles so that I could focus on writing actual product code.

## Almost there

I left AWS in August 2019. In March 2020, I had an idea for a new service: [Baseline](https://baseline.dev). A tool that helps you audit who in your team has access to the different SaaS products you use. Think of access to tools like Slack, GitHub, AWS, etc. - Baseline generates an access report so that you always have an accurate overview of who has access to these tools. I started building Baseline using the same patterns I used for Connectr and Wundermill and all the other products I have built, and I was able to launch the first version within two weeks. Whoop whoop!! That was cool.

At the same time, I was reading [The DynamoDB Handbook](https://gumroad.com/l/WPLqz?recommended_by=library) by Alex De Brie and it inspired me to move Baseline to a serverless architecture. I had this idea already for a while but put it off because I didn't feel like investing in the architectural change. It also felt like a mental hurdle I had to overcome. The book gave me the needed push, so I moved to DynamoDB and Lambda instead of MySQL and EC2 or Kubernetes or something similar. This was not a customer focussed decision. This move didn't make the service any better or faster. But it made it cheaper, for me. And it created the foundation for me to be able to launch new services, cheap and fast. Kind of nice!

## The idea

As I moved Baseline to serverless I finally have found a model that allows me to launch new products super quickly. **And as I realized this, the idea for SaaS Manual was born.** Because as I moved to serverless I thought: could it be useful for others if I were to share this knowledge? 

There is a lot of history to the idea of SaaS Manual. I think that a lot of product ideas develop like this. One thing leads to the next, you try and you fail. You try again. 

## The name

I don't remember exactly how I came up with the name, I think I just tried a few ideas in [domainr.com](https://domainr.com). All I remember was that I was very surprised that the domain [saasmanual.com](http://saasmanual.com) was still available 🤯. Not only that! [Twitter](https://twitter.com/saasmanual), [Facebook](https://facebook.com/saasmanual), [GitHub](https://github.com/saasmanual), all were available. On July 12, 2020 I bought the domain, registered all the social accounts, and let it sit for a while. 

## Takeaways

Ideas for products have all kinds of origins. There is no one approach that works for everybody. To get the idea for SaaS Manual, I had to go through building several products over a long period of time, some failed, some succeeded. In this case, my work at Cloud9 and AWS also helped me realize how much there is which we can learn when building software for the web. 

Because of this, I thought I should give it a shot and see if people would be interested in SaaS Manual. 

## Next update

In the next update, I will share how I built the SaaS Manual landing page which I used to announce the product. I will also start to write down everything I am doing and share this in a "log". [Follow me on Twitter](https://twitter.com/nonken) if you are interested in those updates. This way you will see what really is happening behind the scenes. 

With this, I want to ask you for feedback: I am exploring how to best structure lesson content with you. Should this be in the form of self-paced learning, lesson-content by email, videos, or other forms of sharing my knowledge? I would really appreciate it if you can share with me, how you would prefer to take part in the journey of SaaS Manual. Simply send an email to nikolai@saasmanual.com with your ideas.

*Nikolai*
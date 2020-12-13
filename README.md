# SaaS Manual website

This is the repository for the website of https://saasmanual.com

## Installation

Simply clone the repository and run `npm install` and you are ready to run the SaaS Manual stack.

## Local development

Run `npm run dev` to launch a local preview server. You can access the site at http://localhost:5001

## Infrastructure setup

Before setting up the website, you need to bootstrap shared infrastructure like Route53. Simply follow the [README.md of the shared-infrastructure repository](https://github.com/saasmanual/shared-infrastructure/blob/main/README.md). After you have provisioned the shared infrastructure you can setup the infrastructure for the website by running `npm run cdk:deploy`. 

> NOTE: Make sure you change the profile defined in the package.json to match your profile.
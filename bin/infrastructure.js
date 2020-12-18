#!/usr/bin/env node

const { App } = require('@aws-cdk/core');
const { PipelineStack } = require('../infra/stack/pipeline');

const app = new App();
new PipelineStack(app, 'Website-Pipeline', {
  stackName: 'Website-Pipeline',
  description: 'Pipeline stack for SaaS Manual website.',
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION 
  }
});

app.synth();
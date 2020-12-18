#!/usr/bin/env node

const { App } = require('@aws-cdk/core');
const { PipelineStack } = require('../infra/stack/pipeline');

const app = new App();
new PipelineStack(app, 'Website-Pipeline', {
  stackName: 'Website-Pipeline',
  description: 'Pipeline stack for SaaS Manual website.',
  env: {
    region: 'us-east-1'
  }
});

app.synth();
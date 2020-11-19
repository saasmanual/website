const { Stage, CfnOutput } = require('@aws-cdk/core');
const { WebsiteStack } = require('../stack/website');

class Application extends Stage {
  constructor(scope, id, props) {
    super(scope, id, props);

    const website = new WebsiteStack(this, 'Website', {});

    this.cloudfrontDistributionId = new CfnOutput(website, 'WebsiteDistributionId', {
      value: website.productionDistribution.distributionId
    });
  }
}

module.exports = {
  Application
}
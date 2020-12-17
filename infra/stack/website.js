const { join, relative } = require('path');
const { Stack, Duration } = require('@aws-cdk/core');
const { PublicHostedZone, RecordTarget, ARecord } = require('@aws-cdk/aws-route53');
const { CloudFrontTarget } = require('@aws-cdk/aws-route53-targets');
const { PriceClass, CloudFrontWebDistribution, OriginProtocolPolicy } = require('@aws-cdk/aws-cloudfront');
const { Bucket, BucketAccessControl, RedirectProtocol, ReplaceKey } = require('@aws-cdk/aws-s3');
const { BucketDeployment, Source, CacheControl } = require('@aws-cdk/aws-s3-deployment');
const { readFileSync } = require('fs');
const glob = require('glob');

const DEPRECATED_PATH = join(__dirname, '..', '..', 'src', 'deprecated');

class WebsiteStack extends Stack {

  constructor(app, id, props) {
    super(app, id, props);

    const hostName = this.node.tryGetContext('hostName');
    const certificateArn = this.node.tryGetContext('certificateArn');
    const { hostedZoneId, zoneName } = this.node.tryGetContext('zone');

    const zone = PublicHostedZone.fromHostedZoneAttributes(this, 'route-53', {
      hostedZoneId,
      zoneName
    });

    const files = glob.sync(join(DEPRECATED_PATH, '**/*'));
    
    const redirectRules = files.map((path) => {
      const redirectFrom = relative(DEPRECATED_PATH, path);
      const redirectTo = readFileSync(path).toString();

      return {
        hostName: 'saasmanual.com',
        httpRedirectCode: '301',
        protocol: RedirectProtocol.HTTPS,
        replaceKey: ReplaceKey.with(redirectTo),
        condition: {
          keyPrefixEquals: redirectFrom,
        }
      }
    });
    

    const websiteAssets = new Bucket(this, `${id}-website-production-assets`, {
      accessControl: BucketAccessControl.PUBLIC_READ,
      bucketName: `saas-manual-website-prod-static-assets`,
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: '404/index.html',
      websiteRoutingRules: redirectRules
    });

    new BucketDeployment(this, 'DeployWebsite', {
      actionName: 'Website Deployment',
      sources: [Source.asset(join(__dirname, '..', '..', 'build'))],
      destinationBucket: websiteAssets,
      cacheControl: [CacheControl.setPublic(), CacheControl.maxAge(Duration.days(1))],
      prune: false
    });

    this.productionDistribution = new CloudFrontWebDistribution(this, `${id}-website-production-distribution`, {
      originConfigs: [{
        customOriginSource: {
          originProtocolPolicy: OriginProtocolPolicy.HTTP_ONLY,
          domainName: websiteAssets.bucketWebsiteDomainName
        },
        behaviors: [{
          isDefaultBehavior: true,
          compress: true
        }]
      }],
      aliasConfiguration: {
        acmCertRef: certificateArn,
        names: [hostName, `www.${hostName}`]
      },
      priceClass: PriceClass.PRICE_CLASS_100
    });

    new ARecord(this, `${id}-alias-record-production`, {
      zone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(this.productionDistribution)),
      recordName: hostName
    });
  }
}

module.exports = { WebsiteStack }
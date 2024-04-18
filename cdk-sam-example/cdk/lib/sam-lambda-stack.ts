import * as cdk from "aws-cdk-lib";
import { App, Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import * as sam from "aws-cdk-lib/aws-sam";
import { Construct } from 'constructs';
import * as logs from "aws-cdk-lib/aws-logs";
import { resolve, join } from "path";
import { CfnFunctionProps } from "aws-cdk-lib/aws-lambda";

interface ApiGatewayProps {}

export class SamApiGateway extends Construct {
  public readonly api: sam.CfnApi;
  public readonly output: CfnOutput;
  props: ApiGatewayProps;

  constructor(scope: Construct, id: string, props: ApiGatewayProps) {
    super(scope, id);
    this.props = props;
  }

  this.api = new sam.CfnApi(this, props?.name, props);

}

export const getLambdaDefaults = (
  name: string,
) => {
    return {
        runtime: "nodejs14.x",
        timeout: 10,
        memorySize: 128,
        autoPublishAlias: "live",
        deploymentPreference: {
            type: "AllAtOnce",
            enabled: true,
        },
        tracing: "Active",
        codeUri: `build/${name}/`,
        handler: `${name[0].toLowerCase()}${name.substring(1)}.handler`,
        description: `${name} Lambda`,
        role: cdk.Fn.sub("arn:aws:iam::${AWS::AccountId}:role/${LambdaRole}"),
    }
};

export class CdkSamExampleStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const opts = getLambdaDefaults("HelloWorld");

    const lambda = new sam.CfnFunction(scope, 'HelloWorld', opts);

    const apiGw = new sam.CfnApi(scope, 'HelloWorld', {
      stageName: "prod",
      cors: {
        allowOrigin: "*",
        allowMethods: "GET,POST,OPTIONS",
        allowHeaders: "*",
      },
      tracingEnabled: true,
      methodSettings: [{
        HttpMethod: "*",
        ResourcePath: "/*",
        LoggingLevel: "ERROR",
        DataTraceEnabled: true,
        MetricsEnabled: true,
      }],
    });

    
    // const sampleLambda = new lambda.Function(this, "sampleHandler", {
    //   code: lambda.Code.fromAsset(`${resolve(__dirname)}/handlers`),
    //   runtime: lambda.Runtime.NODEJS_12_X,
    //   functionName: "sampleHandler",
    //   description: "a sample lambda function",
    //   handler: "../handlers/sample.handler.ts",
    // });

    // const api = new aws_apigateway.RestApi(this, "sampleAPI", {
    //   description: "a sample API Gateway",
    //   restApiName: "Sample API",
    //   handler: sampleLambda,
    //   cloudWatchRole: true
    // });
  }
}

const app = new App();
new CdkSamExampleStack(app, "CdkSamExampleStack");

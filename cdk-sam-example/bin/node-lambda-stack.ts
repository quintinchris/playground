import * as cdk from "aws-cdk-lib";
import { App, Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as aws_apigateway from "aws-cdk-lib/aws-apigateway";
import { resolve, join } from "path";

export class CdkSamExampleStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const sampleLambda = new lambda.Function(this, "sampleHandler", {
      code: lambda.Code.fromInline(join(__dirname, "../handlers/sample.handler.ts")),
      runtime: lambda.Runtime.NODEJS_12_X,
      functionName: "sampleHandler",
      description: "a sample lambda function",
      handler: "../handlers/sample.handler.ts",
    });

    new aws_apigateway.LambdaRestApi(this, "myApi", {
      handler: sampleLambda,
    });
  }
}

const app = new App();
new CdkSamExampleStack(app, "CdkSamExampleStack");

import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";

export class CdkSampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new apigw.RestApi(this, "ApiGateway", {
      restApiName: "Sample Api Gateway",
      description: "a sample API Gateway",
    });

    const helloHandler = new lambda.Function(this, "HelloHandler", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("handlers"),
      handler: "hello.helloHandler",
    });

    const sampleHandler = new lambda.Function(this, "SampleHandler", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("handlers"),
      handler: "sample.handler",
    });

    api.root
      .addResource("hello")
      .addMethod("GET", new apigw.LambdaIntegration(helloHandler));
    api.root
      .addResource("sample")
      .addMethod("GET", new apigw.LambdaIntegration(sampleHandler));

    // testing a way to dynamically add API resources based on an array entry for each lambda
    const handlers = [
      {
        name: "Hello",
        fileName: "hello.ts",
        method: "GET",
      },
      {
        name: "Sample",
        fileName: "sample.ts",
        method: "GET",
      },
    ];

    handlers.forEach((handler) => {
      api.root.addResource(handler.name).addMethod(
        handler.method,
        new apigw.LambdaIntegration(
          new lambda.Function(this, `${handler.name}Handler`, {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset("handlers"),
            handler: `${handler.fileName}.handler`,
          })
        )
      );
    });
  }
}

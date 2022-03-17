// NOTE: make sure all aws-cdk-* deps have exact same version
import * as cdk from "aws-cdk-lib";
import { App, Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from "aws-cdk-lib/aws-lambda-nodejs";
import * as aws_apigateway from "aws-cdk-lib/aws-apigateway";
import { resolve } from "path";

export class CdkSamExampleStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    // WARNING - cdk would not compile this, kept having errors connecting to npm registry on docker...?
    const nodeLambda = new lambda.NodejsFunction(this, "sampleHandler", {
      functionName: "sampleHandler",
      entry: resolve(__dirname, "../handlers/sample.handler.ts"),
      handler: resolve(__dirname, "../handlers/sample.handler.ts"),
      timeout: cdk.Duration.seconds(10),
      environment: {
        // key-value pairs that lambda caches and makes available for your lambda functions
        NODE_ENV: 'production',
      },
      bundling: {
        minify: true,
        sourceMap: true,
        sourceMapMode: lambda.SourceMapMode.INLINE,
        sourcesContent: true,
        target: "es2020",
        define: {
          // Replace strings during build time
          "process.env.API_KEY": JSON.stringify("xxx-xxxx-xxx"),
          "process.env.PRODUCTION": JSON.stringify(true),
          "process.env.NUMBER": JSON.stringify(123),
        },
        logLevel: lambda.LogLevel.INFO,
        keepNames: true,
        tsconfig: "custom-tsconfig.json", // use custom-tsconfig.json instead of default,
        charset: lambda.Charset.UTF8,
        format: lambda.OutputFormat.ESM,
        mainFields: ["module", "main"],
        commandHooks: {
          // runs before all bundling commands
          beforeBundling(inputDir: string, outputDir: string): string[] {
            return [
              `echo hello > ${inputDir}/a.txt`,
              `cp ${inputDir}/a.txt ${outputDir}`,
            ];
          },
          // runs before node modules installation
          afterBundling(inputDir: string, outputDir: string): string[] {
            return [`cp ${inputDir}/b.txt ${outputDir}/txt`];
          },
          // runs after all bundling commands
          beforeInstall() {
            return [];
          },
        },
        environment: {
          // define env vars when esbuild runs
          NODE_ENV: 'production',
        },
        buildArgs: {
          // pass build arguments when building the Docker bundling image
          HTTPS_PROXY: 'https://127.0.0.1:3001',
        },
      },
    });

    new aws_apigateway.LambdaRestApi(this, "myApi", {
      handler: nodeLambda,
    });
  }
}

const app = new App();
new CdkSamExampleStack(app, "CdkSamExampleStack");

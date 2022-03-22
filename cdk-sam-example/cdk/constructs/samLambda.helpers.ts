import * as cdk from 'aws-cdk-lib';

export const getSamLambdaDefaults = (
  name: string,
  variables: Record<string, string>
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
        environment: variables,
        codeUri: `build/${name}/`,
        handler: `${name[0].toLowerCase()}${name.substring(1)}.handler`,
        description: `${name} Lambda`,
        role: cdk.Fn.sub("arn:aws:iam::${AWS::AccountId}:role/${LambdaRole}"),
    }
};

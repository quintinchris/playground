import { CfnFunctionProps } from "aws-cdk-lib/aws-lambda";
import * as cdk from "aws-cdk-lib";

export interface SamLambdaProps extends CfnFunctionProps {
    name: string;
    environmentVariables?: EnvironmentVar[];
}

export interface EnvironmentVar {
    name: string;
    value?: string;
    cfnParameter?: cdk.CfnParameter,
    editable?: boolean;
}
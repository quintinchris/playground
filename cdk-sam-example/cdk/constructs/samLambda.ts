import { Construct } from "constructs";
import * as sam from "aws-cdk-lib/aws-sam";
import { SamLambdaProps } from "./samLambda.types";
import { getSamLambdaDefaults } from "./samLambda.helpers";

export class SamLambda extends Construct {
    public readonly lambda: sam.CfnFunction;
    constructor(scope: Construct, id: string, props: SamLambdaProps) {
        super(scope, id);
        
        const {
            name,
            environmentVariables,
            ...rest
        } = props;

        const defaults = getSamLambdaDefaults(name, environmentVariables);
    }
}
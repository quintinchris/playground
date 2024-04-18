#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkSampleStack } from '../lib/cdk-sample-stack';

const app = new cdk.App();
new CdkSampleStack(app, 'CdkSampleStack');

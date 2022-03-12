"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkSamExampleStack = void 0;
const cdk = require("aws-cdk-lib");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda-nodejs");
const aws_apigateway = require("aws-cdk-lib/aws-apigateway");
const path_1 = require("path");
class CdkSamExampleStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const nodeLambda = new lambda.NodejsFunction(this, "sampleHandler", {
            functionName: "sampleHandler",
            entry: path_1.resolve(__dirname, "../handlers/sample.handler.ts"),
            handler: path_1.resolve(__dirname, "../handlers/sample.handler.ts"),
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
                tsconfig: "custom-tsconfig.json",
                charset: lambda.Charset.UTF8,
                format: lambda.OutputFormat.ESM,
                mainFields: ["module", "main"],
                commandHooks: {
                    // runs before all bundling commands
                    beforeBundling(inputDir, outputDir) {
                        return [
                            `echo hello > ${inputDir}/a.txt`,
                            `cp ${inputDir}/a.txt ${outputDir}`,
                        ];
                    },
                    // runs before node modules installation
                    afterBundling(inputDir, outputDir) {
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
exports.CdkSamExampleStack = CdkSamExampleStack;
const app = new aws_cdk_lib_1.App();
new CdkSamExampleStack(app, "CdkSamExampleStack");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FtcGxlLnN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2FtcGxlLnN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUNuQyw2Q0FBcUQ7QUFDckQsd0RBQXdEO0FBQ3hELDZEQUE2RDtBQUM3RCwrQkFBK0I7QUFFL0IsTUFBYSxrQkFBbUIsU0FBUSxtQkFBSztJQUMzQyxZQUFZLEtBQVUsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDcEQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDbEUsWUFBWSxFQUFFLGVBQWU7WUFDN0IsS0FBSyxFQUFFLGNBQU8sQ0FBQyxTQUFTLEVBQUUsK0JBQStCLENBQUM7WUFDMUQsT0FBTyxFQUFFLGNBQU8sQ0FBQyxTQUFTLEVBQUUsK0JBQStCLENBQUM7WUFDNUQsT0FBTyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsbUZBQW1GO2dCQUNuRixRQUFRLEVBQUUsWUFBWTthQUN2QjtZQUNELFFBQVEsRUFBRTtnQkFDUixNQUFNLEVBQUUsSUFBSTtnQkFDWixTQUFTLEVBQUUsSUFBSTtnQkFDZixhQUFhLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2dCQUMxQyxjQUFjLEVBQUUsSUFBSTtnQkFDcEIsTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLE1BQU0sRUFBRTtvQkFDTixvQ0FBb0M7b0JBQ3BDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDO29CQUNyRCx3QkFBd0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztvQkFDOUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7aUJBQzFDO2dCQUNELFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUk7Z0JBQzlCLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUk7Z0JBQzVCLE1BQU0sRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUc7Z0JBQy9CLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7Z0JBQzlCLFlBQVksRUFBRTtvQkFDWixvQ0FBb0M7b0JBQ3BDLGNBQWMsQ0FBQyxRQUFnQixFQUFFLFNBQWlCO3dCQUNoRCxPQUFPOzRCQUNMLGdCQUFnQixRQUFRLFFBQVE7NEJBQ2hDLE1BQU0sUUFBUSxVQUFVLFNBQVMsRUFBRTt5QkFDcEMsQ0FBQztvQkFDSixDQUFDO29CQUNELHdDQUF3QztvQkFDeEMsYUFBYSxDQUFDLFFBQWdCLEVBQUUsU0FBaUI7d0JBQy9DLE9BQU8sQ0FBQyxNQUFNLFFBQVEsVUFBVSxTQUFTLE1BQU0sQ0FBQyxDQUFDO29CQUNuRCxDQUFDO29CQUNELG1DQUFtQztvQkFDbkMsYUFBYTt3QkFDWCxPQUFPLEVBQUUsQ0FBQztvQkFDWixDQUFDO2lCQUNGO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxvQ0FBb0M7b0JBQ3BDLFFBQVEsRUFBRSxZQUFZO2lCQUN2QjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsK0RBQStEO29CQUMvRCxXQUFXLEVBQUUsd0JBQXdCO2lCQUN0QzthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxjQUFjLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7WUFDOUMsT0FBTyxFQUFFLFVBQVU7U0FDcEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBL0RELGdEQStEQztBQUVELE1BQU0sR0FBRyxHQUFHLElBQUksaUJBQUcsRUFBRSxDQUFDO0FBQ3RCLElBQUksa0JBQWtCLENBQUMsR0FBRyxFQUFFLG9CQUFvQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQgeyBBcHAsIFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhLW5vZGVqc1wiO1xuaW1wb3J0ICogYXMgYXdzX2FwaWdhdGV3YXkgZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5XCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcblxuZXhwb3J0IGNsYXNzIENka1NhbUV4YW1wbGVTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IEFwcCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCBub2RlTGFtYmRhID0gbmV3IGxhbWJkYS5Ob2RlanNGdW5jdGlvbih0aGlzLCBcInNhbXBsZUhhbmRsZXJcIiwge1xuICAgICAgZnVuY3Rpb25OYW1lOiBcInNhbXBsZUhhbmRsZXJcIixcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCIuLi9oYW5kbGVycy9zYW1wbGUuaGFuZGxlci50c1wiKSxcbiAgICAgIGhhbmRsZXI6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4uL2hhbmRsZXJzL3NhbXBsZS5oYW5kbGVyLnRzXCIpLFxuICAgICAgdGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMoMTApLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgLy8ga2V5LXZhbHVlIHBhaXJzIHRoYXQgbGFtYmRhIGNhY2hlcyBhbmQgbWFrZXMgYXZhaWxhYmxlIGZvciB5b3VyIGxhbWJkYSBmdW5jdGlvbnNcbiAgICAgICAgTk9ERV9FTlY6ICdwcm9kdWN0aW9uJyxcbiAgICAgIH0sXG4gICAgICBidW5kbGluZzoge1xuICAgICAgICBtaW5pZnk6IHRydWUsXG4gICAgICAgIHNvdXJjZU1hcDogdHJ1ZSxcbiAgICAgICAgc291cmNlTWFwTW9kZTogbGFtYmRhLlNvdXJjZU1hcE1vZGUuSU5MSU5FLFxuICAgICAgICBzb3VyY2VzQ29udGVudDogdHJ1ZSxcbiAgICAgICAgdGFyZ2V0OiBcImVzMjAyMFwiLFxuICAgICAgICBkZWZpbmU6IHtcbiAgICAgICAgICAvLyBSZXBsYWNlIHN0cmluZ3MgZHVyaW5nIGJ1aWxkIHRpbWVcbiAgICAgICAgICBcInByb2Nlc3MuZW52LkFQSV9LRVlcIjogSlNPTi5zdHJpbmdpZnkoXCJ4eHgteHh4eC14eHhcIiksXG4gICAgICAgICAgXCJwcm9jZXNzLmVudi5QUk9EVUNUSU9OXCI6IEpTT04uc3RyaW5naWZ5KHRydWUpLFxuICAgICAgICAgIFwicHJvY2Vzcy5lbnYuTlVNQkVSXCI6IEpTT04uc3RyaW5naWZ5KDEyMyksXG4gICAgICAgIH0sXG4gICAgICAgIGxvZ0xldmVsOiBsYW1iZGEuTG9nTGV2ZWwuSU5GTyxcbiAgICAgICAga2VlcE5hbWVzOiB0cnVlLFxuICAgICAgICB0c2NvbmZpZzogXCJjdXN0b20tdHNjb25maWcuanNvblwiLCAvLyB1c2UgY3VzdG9tLXRzY29uZmlnLmpzb24gaW5zdGVhZCBvZiBkZWZhdWx0LFxuICAgICAgICBjaGFyc2V0OiBsYW1iZGEuQ2hhcnNldC5VVEY4LFxuICAgICAgICBmb3JtYXQ6IGxhbWJkYS5PdXRwdXRGb3JtYXQuRVNNLFxuICAgICAgICBtYWluRmllbGRzOiBbXCJtb2R1bGVcIiwgXCJtYWluXCJdLFxuICAgICAgICBjb21tYW5kSG9va3M6IHtcbiAgICAgICAgICAvLyBydW5zIGJlZm9yZSBhbGwgYnVuZGxpbmcgY29tbWFuZHNcbiAgICAgICAgICBiZWZvcmVCdW5kbGluZyhpbnB1dERpcjogc3RyaW5nLCBvdXRwdXREaXI6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgIGBlY2hvIGhlbGxvID4gJHtpbnB1dERpcn0vYS50eHRgLFxuICAgICAgICAgICAgICBgY3AgJHtpbnB1dERpcn0vYS50eHQgJHtvdXRwdXREaXJ9YCxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgfSxcbiAgICAgICAgICAvLyBydW5zIGJlZm9yZSBub2RlIG1vZHVsZXMgaW5zdGFsbGF0aW9uXG4gICAgICAgICAgYWZ0ZXJCdW5kbGluZyhpbnB1dERpcjogc3RyaW5nLCBvdXRwdXREaXI6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICAgICAgICAgIHJldHVybiBbYGNwICR7aW5wdXREaXJ9L2IudHh0ICR7b3V0cHV0RGlyfS90eHRgXTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIC8vIHJ1bnMgYWZ0ZXIgYWxsIGJ1bmRsaW5nIGNvbW1hbmRzXG4gICAgICAgICAgYmVmb3JlSW5zdGFsbCgpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAgIC8vIGRlZmluZSBlbnYgdmFycyB3aGVuIGVzYnVpbGQgcnVuc1xuICAgICAgICAgIE5PREVfRU5WOiAncHJvZHVjdGlvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkQXJnczoge1xuICAgICAgICAgIC8vIHBhc3MgYnVpbGQgYXJndW1lbnRzIHdoZW4gYnVpbGRpbmcgdGhlIERvY2tlciBidW5kbGluZyBpbWFnZVxuICAgICAgICAgIEhUVFBTX1BST1hZOiAnaHR0cHM6Ly8xMjcuMC4wLjE6MzAwMScsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgbmV3IGF3c19hcGlnYXRld2F5LkxhbWJkYVJlc3RBcGkodGhpcywgXCJteUFwaVwiLCB7XG4gICAgICBoYW5kbGVyOiBub2RlTGFtYmRhLFxuICAgIH0pO1xuICB9XG59XG5cbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbm5ldyBDZGtTYW1FeGFtcGxlU3RhY2soYXBwLCBcIkNka1NhbUV4YW1wbGVTdGFja1wiKTtcbiJdfQ==
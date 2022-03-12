"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleHandler = void 0;
exports.sampleHandler = async (event) => {
    let response;
    try {
        response = {
            statusCode: 200,
            body: JSON.stringify({
                message: "hello world",
            }),
        };
    }
    catch (err) {
        console.log(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: "some error happened",
            }),
        };
    }
    return response;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FtcGxlLmhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYW1wbGUuaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFPYSxRQUFBLGFBQWEsR0FHdEIsS0FBSyxFQUFFLEtBQTJCLEVBQUUsRUFBRTtJQUN4QyxJQUFJLFFBQStCLENBQUM7SUFDcEMsSUFBSTtRQUNGLFFBQVEsR0FBRztZQUNULFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ25CLE9BQU8sRUFBRSxhQUFhO2FBQ3ZCLENBQUM7U0FDSCxDQUFDO0tBQ0g7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsUUFBUSxHQUFHO1lBQ1QsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDbkIsT0FBTyxFQUFFLHFCQUFxQjthQUMvQixDQUFDO1NBQ0gsQ0FBQztLQUNIO0lBRUQsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBIYW5kbGVyLFxyXG4gIEFQSUdhdGV3YXlQcm94eUV2ZW50LFxyXG4gIEFQSUdhdGV3YXlQcm94eVJlc3VsdCxcclxuICBDb250ZXh0LFxyXG59IGZyb20gXCJhd3MtbGFtYmRhXCI7XHJcblxyXG5leHBvcnQgY29uc3Qgc2FtcGxlSGFuZGxlcjogSGFuZGxlcjxcclxuICBBUElHYXRld2F5UHJveHlFdmVudCxcclxuICBBUElHYXRld2F5UHJveHlSZXN1bHRcclxuPiA9IGFzeW5jIChldmVudDogQVBJR2F0ZXdheVByb3h5RXZlbnQpID0+IHtcclxuICBsZXQgcmVzcG9uc2U6IEFQSUdhdGV3YXlQcm94eVJlc3VsdDtcclxuICB0cnkge1xyXG4gICAgcmVzcG9uc2UgPSB7XHJcbiAgICAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIG1lc3NhZ2U6IFwiaGVsbG8gd29ybGRcIixcclxuICAgICAgfSksXHJcbiAgICB9O1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIHJlc3BvbnNlID0ge1xyXG4gICAgICBzdGF0dXNDb2RlOiA1MDAsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICBtZXNzYWdlOiBcInNvbWUgZXJyb3IgaGFwcGVuZWRcIixcclxuICAgICAgfSksXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc3BvbnNlO1xyXG59O1xyXG4iXX0=
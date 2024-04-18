import {
    Path,
    Controller,
    Get,
    Route
} from "tsoa";

@Route("")
export class ApiGateway extends Controller {
    @Get("/")
    public async sampleHandler(
        // @Path() id: string
    ): Promise<string> {
        return "";
    }
}
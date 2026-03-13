import { extractBillFromImage } from "@/services/billExtraction";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const imageFile = formData.get("image") as File;

        // Validate the image file
        if (!imageFile) {
            return Response.json(
                { error: "No image file provided" },
                { status: 400 },
            );
        }

        // Check if the file is an image
        if (!imageFile.type.startsWith("image/")) {
            return Response.json(
                { error: "Provided file is not an image" },
                { status: 400 },
            );
        }

        // Convert the image file to a buffer
        const arrayBuffer = await imageFile.arrayBuffer();
        const imageBuffer = Buffer.from(arrayBuffer);

        const result = await extractBillFromImage(imageBuffer);

        return Response.json(result);
    } catch (error) {
        console.error("Extraction failed:", error);

        const message =
            error instanceof Error ? error.message : "Failed to extract bill";

        return Response.json({ error: message }, { status: 500 });
    }
}

import { billExtraction } from "@/lib/gemini";
import { ExtractedBill } from "@/types/bill";

const prompt = `
You are a bill/receipt parser. Analyze this restaurant bill image and extract the information.

CRITICAL RULES:
1. If an item has quantity 2, list it twice as separate entries with the SAME price
2. DO NOT use quantity fields - repeat the item object for each quantity
3. Return ONLY valid JSON, no markdown, no explanations
4. If you cannot read the restaurant name, use "Unknown Restaurant"
5. Prices should be numbers without currency symbols (e.g., 12.99, not "£12.99")
6. Service charge should be the percentage number only (e.g., 13 for 13%, or 0 if no service charge)
7. Currency should be the symbol used on the bill (e.g., "$", "£", "€", "R$")

Return JSON in this exact format:
{
  "restaurantName": "Name of the restaurant",
  "items": [
    { "name": "Item name", "price": 12.99 }
  ],
  "serviceChargePercent": 10,
  "currency": "£"
}

Example - if the bill shows:
- Pizza (x2): £10.00 each
- Fries (x1): £3.50
- Service charge: 12.5%

You should return:
{
  "restaurantName": "Pizza Place",
  "items": [
    { "name": "Pizza", "price": 10.00 },
    { "name": "Pizza", "price": 10.00 },
    { "name": "Fries", "price": 3.50 }
  ],
  "serviceChargePercent": 12.5,
  "currency": "£"
}
`;

export async function extractBillFromImage(
    imageBuffer: Buffer,
    mimeType: string,
): Promise<ExtractedBill> {
    try {
        const base64Image = imageBuffer.toString("base64");

        const responseText = await billExtraction(
            prompt,
            base64Image,
            mimeType,
        );
        const parsedData = JSON.parse(responseText) as Omit<
            ExtractedBill,
            "items"
        > & {
            items: Array<Omit<ExtractedBill["items"][number], "id">>;
        };

        const extractedData: ExtractedBill = {
            ...parsedData,
            items: parsedData.items.map((item) => ({
                ...item,
                id: crypto.randomUUID(),
            })),
        };

        return extractedData;
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error("Gemini returned invalid JSON");
        }

        if (error instanceof Error) {
            throw new Error(`Bill extraction failed: ${error.message}`);
        }

        throw new Error("Unknown extraction error");
    }
}

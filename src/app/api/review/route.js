import { Mistral } from "@mistralai/mistralai";
import { extractText } from "unpdf";

const mistral = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

export async function POST(request) {
    try {
    const { pdfBase64 } = await request.json();

    const buffer = Buffer.from(pdfBase64, "base64");
    const { text: pdfText } = await extractText(new Uint8Array(buffer));

    const prompt = `You are an expert CV/Resume reviewer. Analyze this CV and return ONLY a JSON object with no markdown, no backticks, just raw JSON in this exact format:
    {
        "score": <number 0-100>,
        "summary": "<2-3 sentence overall summary>",
        "sections": {
        "experience": { "score": <0-100>, "feedback": "<feedback>", "suggestions": ["<suggestion1>", "<suggestion2>"] },
        "skills": { "score": <0-100>, "feedback": "<feedback>", "suggestions": ["<suggestion1>", "<suggestion2>"] },
        "education": { "score": <0-100>, "feedback": "<feedback>", "suggestions": ["<suggestion1>", "<suggestion2>"] },
        "formatting": { "score": <0-100>, "feedback": "<feedback>", "suggestions": ["<suggestion1>", "<suggestion2>"] }
        },
        "red_flags": ["<flag1>", "<flag2>"],
        "top_improvements": ["<improvement1>", "<improvement2>", "<improvement3>"]
    }
    
    CV Content:
    ${pdfText}`;

    const response = await mistral.chat.complete({
        model: "mistral-small-latest",
        messages: [{ role: "user", content: prompt }],
    });

    const text = response.choices[0].message.content;
    const parsed = JSON.parse(text);

    return Response.json(parsed);

    } catch (error) {
        console.error(error);
        return Response.json({ error: "Something went wrong" }, { status: 500 });
    }
}
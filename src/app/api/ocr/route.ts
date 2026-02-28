import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";
import { OCR_SYSTEM_PROMPT, OCR_USER_PROMPT } from "@/lib/claude/ocr-prompt";

export async function POST(request: Request) {
  // Verify auth
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const { image, mediaType } = await request.json();

  if (!image) {
    return NextResponse.json(
      { error: "Geen afbeelding meegegeven" },
      { status: 400 }
    );
  }

  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: OCR_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType || "image/jpeg",
                data: image,
              },
            },
            {
              type: "text",
              text: OCR_USER_PROMPT,
            },
          ],
        },
      ],
    });

    // Extract text from response
    const textContent = response.content.find((c) => c.type === "text");
    if (!textContent || textContent.type !== "text") {
      return NextResponse.json(
        { error: "Geen tekst in respons" },
        { status: 500 }
      );
    }

    // Parse JSON from response
    const jsonMatch = textContent.text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Kon geen woordenlijst extraheren" },
        { status: 500 }
      );
    }

    const words = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ words });
  } catch (error) {
    console.error("OCR error:", error);
    return NextResponse.json(
      { error: "OCR verwerking mislukt" },
      { status: 500 }
    );
  }
}

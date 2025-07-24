import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  if (!message) {
    return NextResponse.json({ error: "No message provided" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "No OpenAI API key configured" }, { status: 500 });
  }

  const prompt = `Eres un agente de soporte profesional de Codevendi. Solo puedes responder sobre la empresa Codevendi, sus productos, servicios, soporte, pagos, promociones y funcionamiento de la web. Si te preguntan sobre cualquier otro tema, responde amablemente que solo puedes ayudar con temas de Codevendi. No reveles información interna, confidencial ni técnica sensible. Responde siempre de forma profesional, cálida y humana.\n\nUsuario: ${message}\nSoporte:`;

  const body = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: message }
    ],
    max_tokens: 256,
    temperature: 0.7
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Error al conectar con OpenAI" }, { status: 500 });
  }

  const data = await response.json();
  const answer = data.choices?.[0]?.message?.content?.trim() || "Lo siento, no puedo responder en este momento.";
  return NextResponse.json({ answer });
} 
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
console.log(process.env.OPENAI_API_KEY);
export async function streamAIResponse(
  prompt: string,
  onData: (chunk: string) => void
) {
  const stream = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  });

  for await (const part of stream) {
    const text = part.choices?.[0]?.delta?.content;
    if (text) onData(text);
  }
}

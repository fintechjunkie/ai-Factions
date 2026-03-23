import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { ORACLE_SYSTEM_PROMPT } from '@/lib/prompts/oracle';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Missing required field: messages' },
        { status: 400 }
      );
    }

    const client = new Anthropic();

    const response = await client.messages.create({
      model: 'claude-sonnet-4-5-20241022',
      max_tokens: 2000,
      system: ORACLE_SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    });

    const text =
      response.content[0].type === 'text' ? response.content[0].text : '';

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error('Oracle error:', error);
    const message =
      error instanceof Error ? error.message : 'Oracle request failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

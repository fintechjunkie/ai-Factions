import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { SIMULATE_PROMPT, buildUserMessage } from '@/lib/prompts/simulate';
import { EVENTS } from '@/lib/data/events';

export async function POST(req: NextRequest) {
  try {
    const { groupId, groupName, groupDesc, targetYear, responses } = await req.json();
    const year = targetYear || 2028;

    if (!groupId || !groupName || !responses || !Array.isArray(responses)) {
      return NextResponse.json(
        { error: 'Missing required fields: groupId, groupName, responses' },
        { status: 400 }
      );
    }

    const formattedResponses = responses.map(
      (r: { choice: string; text: string } | null, i: number) => {
        const event = EVENTS[i];
        if (!r) {
          return {
            eventTitle: event?.title ?? `Event ${i + 1}`,
            choiceLabel: 'not answered',
            choiceDesc: '',
            text: '',
          };
        }
        const choiceObj = event?.choices.find((c) => c.v === r.choice);
        return {
          eventTitle: event?.title ?? `Event ${i + 1}`,
          choiceLabel: choiceObj?.label ?? r.choice,
          choiceDesc: choiceObj?.desc ?? '',
          text: r.text ?? '',
        };
      }
    );

    const userMessage = buildUserMessage(groupName, groupDesc, formattedResponses, year);

    const client = new Anthropic();

    const message = await client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 3000,
      system: SIMULATE_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    });

    const raw =
      message.content[0].type === 'text' ? message.content[0].text : '';

    let result;
    try {
      result = JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        result = JSON.parse(match[0]);
      } else {
        throw new Error('Failed to parse simulation output');
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Simulation error:', error);
    const message =
      error instanceof Error ? error.message : 'Simulation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

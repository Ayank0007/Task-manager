import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function POST(request: Request) {
  let taskTitle = '';
  let taskDescription = '';
  
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    taskTitle = body.taskTitle;
    taskDescription = body.taskDescription;
    
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'AI feature not configured' },
        { status: 503 }
      );
    }
    
    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt: `Based on the following task, suggest:
1. A detailed description (if not provided or needs enhancement)
2. Recommended priority (LOW, MEDIUM, or HIGH)
3. Suggested subtasks or action items
4. Relevant tags

Task Title: ${taskTitle}
Task Description: ${taskDescription || 'Not provided'}

Provide the response in JSON format with keys: description, priority, subtasks (array), tags (array).`,
    });
    
    try {
      const suggestions = JSON.parse(text);
      return NextResponse.json({ suggestions });
    } catch {
      return NextResponse.json({
        suggestions: {
          description: text,
          priority: 'MEDIUM',
          subtasks: [],
          tags: [],
        },
      });
    }
  } catch (error: any) {
    console.error('AI suggestion error:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions', details: error.message },
      { status: 500 }
    );
  }
}

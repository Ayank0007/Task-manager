import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { taskSchema } from '@/lib/validations';

// GET all tasks for the authenticated user
export async function GET(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    
    const where: any = {
      userId: (session.user as any).id,
    };
    
    if (status) where.status = status;
    if (priority) where.priority = priority;
    
    const tasks = await prisma.task.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Get tasks error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create a new task
export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const validatedData = taskSchema.parse(body);
    
    const task = await prisma.task.create({
      data: {
        ...validatedData,
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
        tags: validatedData.tags || [],
        userId: (session.user as any).id,
      },
    });
    
    return NextResponse.json({ task }, { status: 201 });
  } catch (error: any) {
    console.error('Create task error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

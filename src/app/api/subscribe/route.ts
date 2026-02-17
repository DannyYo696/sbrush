import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingSubscriber = await db.subscriber.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existingSubscriber) {
      return NextResponse.json(
        { message: 'You are already subscribed!' },
        { status: 200 }
      )
    }

    // Save to database
    await db.subscriber.create({
      data: {
        email: email.toLowerCase(),
        createdAt: new Date(),
      }
    })

    // In a real application, you might want to:
    // 1. Send a confirmation email
    // 2. Add to a mailing list service (e.g., SendGrid, Mailchimp)
    // 3. Log this action

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}

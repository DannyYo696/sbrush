import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, company, clientType, message } = body

    // Validate required fields
    if (!firstName || typeof firstName !== 'string') {
      return NextResponse.json(
        { error: 'First name is required' },
        { status: 400 }
      )
    }

    if (!lastName || typeof lastName !== 'string') {
      return NextResponse.json(
        { error: 'Last name is required' },
        { status: 400 }
      )
    }

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

    if (!clientType || typeof clientType !== 'string') {
      return NextResponse.json(
        { error: 'Client type is required' },
        { status: 400 }
      )
    }

    // Validate client type
    const validClientTypes = ['private', 'professional', 'institutional']
    if (!validClientTypes.includes(clientType)) {
      return NextResponse.json(
        { error: 'Invalid client type' },
        { status: 400 }
      )
    }

    // Save to database
    await db.consultationRequest.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        phone: phone?.trim() || null,
        company: company?.trim() || null,
        clientType,
        message: message?.trim() || null,
        createdAt: new Date(),
      }
    })

    // In a real application, you might want to:
    // 1. Send confirmation email to the user
    // 2. Send notification email to the team
    // 3. Create a lead in a CRM system
    // 4. Log this action

    return NextResponse.json(
      { message: 'Consultation request submitted successfully!' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Consultation request error:', error)
    return NextResponse.json(
      { error: 'Failed to submit request. Please try again.' },
      { status: 500 }
    )
  }
}

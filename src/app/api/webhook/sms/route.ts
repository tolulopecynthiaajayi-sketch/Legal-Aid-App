import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

// Simple mock webhook endpoint for Africa's Talking / Twilio SMS intake
export async function POST(request: Request) {
    try {
        const supabase = createClient()

        // Depending on the provider, the payload will be different.
        // For AT: phoneNumber, text, etc.
        const formData = await request.formData()
        const fromNumber = formData.get('from') || formData.get('phoneNumber') as string
        const message = formData.get('text') || formData.get('Body') as string

        if (!fromNumber || !message) {
            return new NextResponse('Missing parameters', { status: 400 })
        }

        // 1. Identify or Create a Profile for this phone number
        let { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('phone_number', fromNumber)
            .single()

        if (!profile) {
            // In a real app, we'd use an admin service role to bypass RLS here,
            // but assuming the webhook is public, we log the SMS as an 'unassigned' case temporarily
            // so NGOs can claim it.
            console.log(`New user from SMS: ${fromNumber}`)
        }

        // 2. Parse the message for intent and create an Intake Matter
        const { data: matter, error } = await supabase
            .from('matters')
            .insert({
                title: `SMS Intake from ${fromNumber}`,
                description: message,
                type: 'litigation', // Assuming prisoner aid is litigation
                status: 'intake',
                // In reality, this requires an admin bypass to assign a null or system client_id
            })

        if (error) {
            console.error("SMS Webhook DB Error:", error)
            return new NextResponse('Internal Server Error', { status: 500 })
        }

        // 3. Respond back to Africa's Talking / Twilio
        // Simple plain text response
        return new NextResponse('LegalAid Case Received. A volunteer will review it shortly.', {
            status: 200,
            headers: {
                'Content-Type': 'text/plain',
            },
        })
    } catch (error) {
        console.error("SMS Webhook catch:", error)
        return new NextResponse('Server Error', { status: 500 })
    }
}

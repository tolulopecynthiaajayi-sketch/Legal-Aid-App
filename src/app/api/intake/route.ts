import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
    try {
        const supabase = createClient()
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { title, description, type, customClientName, customClientPhone } = body

        // Validate required fields
        if (!title || !description || !type) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Determine the Client ID (if a volunteer/lawyer is creating it on behalf of someone else, 
        // we would ideally look up or create an unauthenticated profile. For MVP, we attach it to the creator or an empty profile)

        // Create the Matter in Supabase
        const { data, error } = await supabase
            .from('matters')
            .insert({
                title,
                description,
                type,
                status: 'intake',
                client_id: user.id, // For DIY Track, the user is the client. For NGO, we'd adjust logic.
                parties: customClientName ? customClientName : undefined, // Quick hack to store third party name for volunteers
            })
            .select()
            .single()

        if (error) {
            console.error('Database Error:', error)
            return NextResponse.json({ error: 'Failed to create case intake' }, { status: 500 })
        }

        return NextResponse.json({ message: 'Case created successfully', matter: data }, { status: 201 })
    } catch (err) {
        console.error('Server Error:', err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

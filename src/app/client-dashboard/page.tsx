import { signout } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function ClientDashboard() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Client Dashboard</h1>
                    <form action={signout}>
                        <Button variant="outline">Sign Out</Button>
                    </form>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Welcome, {profile?.full_name || user.email}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">This is your personal dashboard for your legal cases.</p>
                        <Button asChild>
                            <Link href="/client-dashboard/intake">Start a New Case</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

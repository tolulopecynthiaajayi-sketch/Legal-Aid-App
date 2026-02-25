'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function NGOIntakeForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setError('')

        const formData = new FormData(event.currentTarget)
        const data = {
            title: formData.get('title'),
            description: formData.get('description'),
            type: 'litigation', // PRISONER cases defaults to Litigation
            customClientName: formData.get('clientName'),
            customClientPhone: formData.get('clientPhone'),
        }

        try {
            const response = await fetch('/api/intake', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error('Failed to submit NGO case')
            }

            router.push('/lawyer-dashboard?message=Prisoner Case Digitized Successfully')
            router.refresh()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Digitize Prisoner File (Internal Intake)</CardTitle>
                    <CardDescription>
                        Enter the details obtained from the physical prison intake forms to generate a digital trackable file.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={onSubmit}>
                        {error && (
                            <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Prisoner Name</label>
                                <Input name="clientName" required placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Family / Emergency Contact (Phone)</label>
                                <Input name="clientPhone" required placeholder="+234..." />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Charge / Matter Title</label>
                            <Input name="title" required placeholder="e.g., Awaiting Trial - Armed Robbery (File No. 123)" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Case Facts / Description</label>
                            <textarea
                                name="description"
                                required
                                rows={6}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                placeholder="List the date of arrest, location, holding facility, assigned investigating officer, and basic facts of the case..."
                            />
                        </div>

                        <div className="pt-4 flex justify-end gap-4">
                            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Digitizing File...' : 'Create Digital File'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

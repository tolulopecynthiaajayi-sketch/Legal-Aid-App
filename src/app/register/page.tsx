import { signup } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import Link from 'next/link'
import { Scale } from 'lucide-react'

export default function RegisterPage({
    searchParams,
}: {
    searchParams: { message: string }
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md space-y-6">
                <div className="flex justify-center flex-col items-center">
                    <Link href="/">
                        <Scale className="h-10 w-10 text-slate-900 mb-2" />
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">Join LegalAid Vanguard</h1>
                    <p className="text-slate-500 text-sm">Create an account to manage your legal matters</p>
                </div>

                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-xl">Create Account</CardTitle>
                        <CardDescription>Fill in your details below to get started.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" action={signup}>
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="fullName">Full Name</label>
                                <Input id="fullName" name="fullName" placeholder="John Doe" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="email">Email</label>
                                <Input id="email" name="email" placeholder="m@example.com" required type="email" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="password">Password</label>
                                <Input id="password" name="password" required type="password" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="role">Account Type</label>
                                <select
                                    id="role"
                                    name="role"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    required
                                >
                                    <option value="" disabled selected>Select your role...</option>
                                    <option value="client">Private Client / NGO Case</option>
                                    <option value="lawyer">Lawyer / Practice Manager</option>
                                    <option value="volunteer">Volunteer Data Entry</option>
                                </select>
                            </div>
                            <Button className="w-full" type="submit">Sign Up</Button>
                        </form>
                    </CardContent>
                    {searchParams?.message && (
                        <CardFooter>
                            <p className="text-sm text-center w-full text-blue-800 border border-blue-200 p-3 rounded-md bg-blue-50">
                                {searchParams.message}
                            </p>
                        </CardFooter>
                    )}
                </Card>

                <div className="text-center text-sm text-slate-500">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-primary hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    )
}

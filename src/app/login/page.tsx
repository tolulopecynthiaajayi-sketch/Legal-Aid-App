import { login } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import Link from 'next/link'
import { Scale } from 'lucide-react'

export default function LoginPage({
    searchParams,
}: {
    searchParams: { message: string }
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-sm space-y-6">
                <div className="flex justify-center flex-col items-center">
                    <Link href="/">
                        <Scale className="h-10 w-10 text-slate-900 mb-2" />
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
                    <p className="text-slate-500 text-sm">Sign in to your account</p>
                </div>

                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-xl">Email Login</CardTitle>
                        <CardDescription>Enter your email and password to log in.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" action={login}>
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="email">Email</label>
                                <Input id="email" name="email" placeholder="m@example.com" required type="email" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="password">Password</label>
                                <Input id="password" name="password" required type="password" />
                            </div>
                            <Button className="w-full" type="submit">Sign In</Button>
                        </form>
                    </CardContent>
                    {searchParams?.message && (
                        <CardFooter>
                            <p className="text-sm text-center w-full text-destructive border border-destructive p-3 rounded-md bg-destructive/10">
                                {searchParams.message}
                            </p>
                        </CardFooter>
                    )}
                </Card>

                <div className="text-center text-sm text-slate-500">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="font-semibold text-primary hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, Users, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navigation */}
            <nav className="border-b bg-white">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Scale className="h-6 w-6 text-slate-900" />
                        <span className="text-xl font-bold tracking-tight">LegalAid Vanguard</span>
                    </div>
                    <div className="space-x-4">
                        <Button variant="ghost" asChild>
                            <Link href="/login">Log in</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/register">Get Started</Link>
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
                <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 max-w-3xl mb-6">
                    Democratizing Access to Justice with Digital Case Management
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mb-10">
                    The all-in-one platform for Pro-Bono Prisoner aid, SME legal tracking, and Law Firm practice management.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-20">
                    <Button size="lg" className="h-12 px-8 text-base">
                        Start a Case
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-white">
                        For Law Firms
                    </Button>
                </div>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl text-left">
                    <Card className="border-none shadow-md">
                        <CardHeader>
                            <Users className="h-8 w-8 text-blue-600 mb-2" />
                            <CardTitle>NGO & Prisoner Track</CardTitle>
                            <CardDescription>Free Legal Aid Management</CardDescription>
                        </CardHeader>
                        <CardContent>
                            Low-tech SMS intake allows prisoners and families to generate digital files instantly. Vetted human rights lawyers can assign themselves pro-bono cases.
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-md">
                        <CardHeader>
                            <FileText className="h-8 w-8 text-emerald-600 mb-2" />
                            <CardTitle>Private Client Track</CardTitle>
                            <CardDescription>Digital File Storage & Tracking</CardDescription>
                        </CardHeader>
                        <CardContent>
                            SMEs and Diaspora clients can manage their legal documents securely, receive automated hearing reminders, and maintain transparency with their hired lawyers.
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-md">
                        <CardHeader>
                            <Scale className="h-8 w-8 text-purple-600 mb-2" />
                            <CardTitle>Lawyer Practice Hub</CardTitle>
                            <CardDescription>Premium Management Tools</CardDescription>
                        </CardHeader>
                        <CardContent>
                            A robust marketplace for legal talent. Includes secure document vaulting, interactive timeline audit trails, and automated client status integrations.
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}

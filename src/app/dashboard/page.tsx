import { redirect } from 'next/navigation'

export default function DashboardRedirect() {
    // This page just acts as a fallback for /dashboard, 
    // the middleware should normally intercept this and send to the correct role dashboard
    redirect('/login')
}

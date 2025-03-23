import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to ExpenseTracker</h1>
          <p className="text-muted-foreground">Manage your expenses with ease and efficiency</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Get Started</CardTitle>
            <CardDescription>Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-3">
              <Button asChild className="w-full">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            Track, analyze, and manage your expenses in one place
          </CardFooter>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ExpenseTracker. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}


"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, DollarSign, TrendingUp, PlusCircle } from "lucide-react";
import Navigation from "@/components/navigation";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  // const [uerId,setUserId] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [sampleExpenses, setSampleExpenses] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/expenses/all/${userId}`);
        const data = await res.json();
        setSampleExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setIsClient(true);
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  if (!isClient) {
    return null;
  }


  const totalExpenses = sampleExpenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);


  const recentExpenses = sampleExpenses.length > 0 ? sampleExpenses.slice(0, 3) : [];

  const largestExpense = sampleExpenses.length > 0
  ? sampleExpenses.reduce((max, expense) => (expense.amount > max.amount ? expense : max), sampleExpenses[0])
  : null;


  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main className="container mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back to your expense tracker</p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link href="/expenses">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Expense
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">+2.5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Average</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(totalExpenses / 2).toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Based on current month data</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Largest Expense</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${largestExpense ? largestExpense.amount.toFixed(2) : "0.00"}
              </div>
              <p className="text-xs text-muted-foreground">
                {largestExpense ? largestExpense.description : "No expenses available"}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>Your latest expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentExpenses.length > 0 ? (
                recentExpenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{expense.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {expense.category} • {expense.date}
                      </p>
                    </div>
                    <div className="font-medium">${expense.amount.toFixed(2)}</div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No recent expenses</p>
              )}

              <Button variant="outline" asChild className="w-full mt-4">
                <Link href="/expenses">View All Expenses</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

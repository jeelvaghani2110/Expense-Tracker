"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react"
import Navigation from "@/components/navigation"

const categories = [
  "Food",
  "Transportation",
  "Housing",
  "Utilities",
  "Entertainment",
  "Healthcare",
  "Education",
  "Shopping",
  "Personal",
  "Other",
]



export default function ExpensesPage() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [expenses, setExpenses] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    date: new Date().toISOString().split(".")[0],
    category: "Other",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  console.log(userId);


  const [editingExpense, setEditingExpense] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/expenses/all/${userId}`);
        const data = await res.json();
        setExpenses(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [editingExpense]);


  useEffect(() => {
    setIsClient(true)

    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  if (!isClient) {
    return null
  }



  const filteredExpenses = Array.isArray(expenses) ? expenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];


  const handleAddExpense = async () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.date) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (!Array.isArray(expenses)) {
      console.error("Error: expenses is not an array", expenses);
      return;
    }

    const amount = Number.parseFloat(newExpense.amount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive number for the amount.",
        variant: "destructive",
      })
      return
    }

    const newId = Math.max(...expenses.map((e) => e.id), 0) + 1
    const expenseToAdd = {
      id: newId,
      description: newExpense.description,
      amount,
      date: newExpense.date,
      category: newExpense.category,
    }

    try {
      const response = await fetch(`http://localhost:8080/expenses/add/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseToAdd),
      })

      if (!response.ok) {
        throw new Error("Failed to add expense")
      }

      const data = await response.json()

      setExpenses([data, ...expenses])
      setNewExpense({
        description: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        category: "Other",
      })
      setIsDialogOpen(false)

      toast({
        title: "Expense added",
        description: "Your expense has been added successfully.",
      })
    } catch (error) {
      console.error("Error adding expense:", error)
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        variant: "destructive",
      })
    }
  }


  const handleUpdateExpense = async () => {
    if (!editingExpense) return;

    if (!editingExpense.description || !editingExpense.amount || !editingExpense.date) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const amount = Number.parseFloat(editingExpense.amount.toString());
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive number for the amount.",
        variant: "destructive",
      });
      return;
    }

    const updatedExpense = {
      id: editingExpense.id,
      description: editingExpense.description,
      amount,
      date: editingExpense.date,
      category: editingExpense.category,
    };

    try {
      const response = await fetch(`http://localhost:8080/expenses/edit/${editingExpense.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedExpense),
      });

      if (!response.ok) {
        throw new Error("Failed to update expense");
      }

      const data = await response.json();

      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) => (expense.id === data.id ? data : expense))
      );

      setEditingExpense(null);

      toast({
        title: "Expense updated",
        description: "Your expense has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating expense:", error);
      toast({
        title: "Error",
        description: "Failed to update expense. Please try again.",
        variant: "destructive",
      });
    }
  };


  const handleDeleteExpense = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/expenses/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }

      const updatedExpenses = expenses.filter((expense) => expense.id !== id);
      setExpenses(updatedExpenses);

      toast({
        title: "Expense deleted",
        description: "Your expense has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete expense. Please try again.",
        status: "error",
      });
    }
  };


  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main className="container mx-auto max-w-7xl px-4 py-6">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
            <p className="text-muted-foreground">Manage and track your expenses</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search expenses..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Expense
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Expense</DialogTitle>
                  <DialogDescription>Enter the details of your expense below.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="What did you spend on?"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newExpense.category}
                      onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddExpense}>Add Expense</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Expenses</CardTitle>
            <CardDescription>
              You have {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.description}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog open={!!editingExpense} onOpenChange={(isOpen) => !isOpen && setEditingExpense(null)}>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  setEditingExpense({
                                    id: expense.id,
                                    description: expense.description,
                                    amount: expense.amount.toString(),
                                    date: expense.date,
                                    category: expense.category,
                                  })
                                }
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Expense</DialogTitle>
                                <DialogDescription>Update the details of your expense.</DialogDescription>
                              </DialogHeader>
                              {editingExpense && (
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-description">Description</Label>
                                    <Input
                                      id="edit-description"
                                      placeholder="What did you spend on?"
                                      value={editingExpense.description}
                                      onChange={(e) =>
                                        setEditingExpense({ ...editingExpense, description: e.target.value })
                                      }
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-amount">Amount ($)</Label>
                                    <Input
                                      id="edit-amount"
                                      type="number"
                                      step="0.01"
                                      placeholder="0.00"
                                      value={editingExpense.amount}
                                      onChange={(e) =>
                                        setEditingExpense({ ...editingExpense, amount: e.target.value })
                                      }
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-date">Date</Label>
                                    <Input
                                      id="edit-date"
                                      type="date"
                                      value={editingExpense.date}
                                      onChange={(e) =>
                                        setEditingExpense({ ...editingExpense, date: e.target.value })
                                      }
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-category">Category</Label>
                                    <Select
                                      value={editingExpense.category}
                                      onValueChange={(value) =>
                                        setEditingExpense({ ...editingExpense, category: value })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {categories.map((category) => (
                                          <SelectItem key={category} value={category}>
                                            {category}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setEditingExpense(null)}>
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => {
                                    handleUpdateExpense();
                                    setEditingExpense(null); // Close the dialog after updating
                                  }}
                                >
                                  Update Expense
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>


                          <Button variant="ghost" size="icon" onClick={() => handleDeleteExpense(expense.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                      No expenses found. Add a new expense to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Total: ${filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}


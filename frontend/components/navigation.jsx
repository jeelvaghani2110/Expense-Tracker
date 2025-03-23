// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import { Menu, Home, DollarSign, LogOut } from "lucide-react"

// export default function Navigation() {
//   const pathname = usePathname()
//   const [isClient, setIsClient] = useState(false)

//   useEffect(() => {
//     setIsClient(true)
//   }, [])

//   const handleLogout = () => {
//     // Clear authentication data
//     localStorage.removeItem("isAuthenticated")
//     localStorage.removeItem("user")

//     // Redirect to welcome page
//     window.location.href = "/"
//   }

//   // Only render navigation on authenticated pages
//   if (!isClient || pathname === "/" || pathname === "/login" || pathname === "/signup") {
//     return null
//   }

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-14 items-center">
//         <Sheet>
//           <SheetTrigger asChild>
//             <Button variant="outline" size="icon" className="mr-2 md:hidden">
//               <Menu className="h-5 w-5" />
//               <span className="sr-only">Toggle navigation menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left" className="w-[240px] sm:w-[300px]">
//             <nav className="flex flex-col gap-4 mt-8">
//               <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
//                 <Home className="h-5 w-5" />
//                 Home
//               </Link>
//               <Link href="/expenses" className="flex items-center gap-2 text-lg font-semibold">
//                 <DollarSign className="h-5 w-5" />
//                 Expenses
//               </Link>
//               <Button variant="outline" className="flex items-center gap-2 mt-4" onClick={handleLogout}>
//                 <LogOut className="h-5 w-5" />
//                 Logout
//               </Button>
//             </nav>
//           </SheetContent>
//         </Sheet>

//         <div className="flex items-center space-x-2 md:space-x-4">
//           <Link href="/dashboard" className="flex items-center space-x-2">
//             <DollarSign className="h-6 w-6" />
//             <span className="font-bold hidden md:inline-block">ExpenseTracker</span>
//           </Link>
//         </div>

//         <nav className="hidden md:flex items-center space-x-10 ml-8">
//           {/* <Link
//             href="/dashboard"
//             className={`text-xl font-medium transition-colors hover:text-primary ${
//               pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
//             }`}
//           >
//             Home
//           </Link> */}
//           <Link
//             href="/dashboard"
//             className={`relative text-xl font-medium transition-all duration-300 ease-in-out ${pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
//               } hover:text-primary hover:before:w-full before:w-0 before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-primary before:transition-all before:duration-300 before:ease-in-out before:origin-left`}
//           >
//             Home
//           </Link>



//           {/* <Link
//             href="/expenses"
//             className={`text-xl font-medium transition-colors hover:text-primary ${pathname === "/expenses" ? "text-primary" : "text-muted-foreground"
//               }`}
//           >
//             Expenses
//           </Link> */}
//           <Link
//             href="/expenses"
//             className={`relative text-xl font-medium transition-all duration-300 ease-in-out ${pathname === "/expenses" ? "text-primary" : "text-muted-foreground"
//               } hover:text-primary hover:before:w-full before:w-0 before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-primary before:transition-all before:duration-300 before:ease-in-out before:origin-left`}
//           >
//             Expenses
//           </Link>

//         </nav>

//         <div className="ml-auto flex items- space-x-2 ">
//           <Button variant="ghost" size="sm" className="hidden md:flex" onClick={handleLogout}>
//             <LogOut className="h-4 w-4 mr-2" />
//             Logout
//           </Button>
//         </div>
//       </div>
//     </header>
//   )
// }


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, DollarSign, LogOut } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");

    // Redirect to welcome page
    window.location.href = "/";
  };

  // Only render navigation on authenticated pages
  if (
    !isClient ||
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/signup"
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Home className="h-5 w-5" />
                Home
              </Link>
              <Link
                href="/expenses"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <DollarSign className="h-5 w-5" />
                Expenses
              </Link>
              <Button
                variant="outline"
                className="flex items-center gap-2 mt-4"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Brand Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <DollarSign className="h-6 w-6" />
            <span className="font-bold hidden md:inline-block">
              ExpenseTracker
            </span>
          </Link>
        </div>

        {/* Main navigation and logout button aligned to the right */}
        <div className="ml-auto flex items-center space-x-8">
          <nav className="hidden md:flex items-center space-x-8">
            {/* HOME Link */}
            <Link
              href="/dashboard"
              className={`relative text-xl font-medium transition-all duration-300 ease-in-out ${
                pathname === "/dashboard"
                  ? "text-primary"
                  : "text-muted-foreground"
              } hover:text-primary hover:before:w-full before:w-0 before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-primary before:transition-all before:duration-300 before:ease-in-out before:origin-left`}
            >
              Home
            </Link>

            {/* EXPENSES Link */}
            <Link
              href="/expenses"
              className={`relative text-xl font-medium transition-all duration-300 ease-in-out ${
                pathname === "/expenses"
                  ? "text-primary"
                  : "text-muted-foreground"
              } hover:text-primary hover:before:w-full before:w-0 before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-primary before:transition-all before:duration-300 before:ease-in-out before:origin-left`}
            >
              Expenses
            </Link>
          </nav>

          {/* Logout button */}
          {/* <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button> */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex items-center gap-2 text-xl text-red-600 hover:bg-red-600 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import SignIn from "./signin";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-around p-4 shadow-md">
      <div className="flex items-center">
        <h1 className="text-white text-lg font-bold">Logo</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button>Home</Button>
        </Link>
        <Link href="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
        <SignIn />
      </div>
    </nav>
  );
}
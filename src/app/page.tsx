import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="h-screen">
      <Navbar />
      <div>
        <h1 className="text-4xl text-center mt-32">
          Dynamic scheduler
        </h1>
      </div>
    </div>
  )
}
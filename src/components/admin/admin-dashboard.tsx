"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from "react"
import AdminAvailability from "./availability"
import AdminSession from "./session"

export default function AdminDashboard() {
  return (
    <div className="flex justify-center items-center p-2 h-screen">
      <div className="absolute right-4 top-4 text-xl">
        Admin
      </div>
      <Tabs defaultValue="UserAvailability" className="justify-center items-center flex flex-col">
        <TabsList>
          <TabsTrigger value="UserAvailability">Availability</TabsTrigger>
          <TabsTrigger value="AdminSession">Session</TabsTrigger>
        </TabsList>
        <TabsContent className="h-[calc(100vh-4rem)] w-[calc(100vw-1rem)]" value="UserAvailability">
          <AdminAvailability />
        </TabsContent>
        <TabsContent className="h-[calc(100vh-4rem)] w-[calc(100vw-1rem)]" value="AdminSession">
          <AdminSession />
        </TabsContent>
      </Tabs>
    </div>
  )
}
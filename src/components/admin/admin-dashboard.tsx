"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from "react"
import AdminAvaibility from "./availability"
import AdminSession from "./session"

export default function UserDashboard() {
  return (
    <div className="flex justify-center items-center p-2 h-screen">
      <Tabs defaultValue="Availability" className="justify-center items-center flex flex-col">
        <TabsList>
          <TabsTrigger value="Availability">Availability</TabsTrigger>
          <TabsTrigger value="Session">Session</TabsTrigger>
        </TabsList>
        <TabsContent className="h-[calc(100vh-4rem)] w-[calc(100vw-1rem)]" value="Availability">
          <AdminAvaibility />
        </TabsContent>
        <TabsContent className="h-[calc(100vh-4rem)] w-[calc(100vw-1rem)]" value="Session">
          <AdminSession />
        </TabsContent>
      </Tabs>
    </div>
  )
}
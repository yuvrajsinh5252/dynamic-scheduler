"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from "react"
import UserSession from "../user/session"
import UserAvailability from "./availability"

export default function UserDashboard() {
  return (
    <div className="flex justify-center items-center p-2 h-screen">
      <Tabs defaultValue="Availability" className="justify-center items-center flex flex-col">
        <TabsList>
          <TabsTrigger value="Availability">Availability</TabsTrigger>
          <TabsTrigger value="Session">Session</TabsTrigger>
        </TabsList>
        <TabsContent className="h-[calc(100vh-4rem)] w-[calc(100vw-1rem)]" value="Availability">
          <UserAvailability />
        </TabsContent>
        <TabsContent className="h-[calc(100vh-4rem)] w-[calc(100vw-1rem)]" value="Session">
          <UserSession />
        </TabsContent>
      </Tabs>
    </div>
  )
}
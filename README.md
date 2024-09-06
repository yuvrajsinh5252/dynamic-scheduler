# Dynamic Availability and Session Scheduling

## Preivew

https://github.com/user-attachments/assets/493675cf-7980-4daf-b50d-d9df19d49f50

## Project Overview

This web-based application allows users to dynamically set their availability for specific days or the entire week. The admin can view all users availability and schedule one-on-one or multi-participant sessions based on it. There are also features to manage scheduled sessions, including conflict handling

---

## Features

### 1. **User Availability Management**

- **Login**: Users can log in selecting their role as either a user or an admin.
- **Dynamic Availability Input**: Users can input their availability for specific days or the entire week.
- **Add/Update/Delete Slots**: Users can easily add, update, or delete their availability slots.
- **Visual Representation**: A user-friendly interface, such as a calendar view.

### 2. **Admin Scheduling Interface**

- **View User Availability**: Admins can view availability for any user in a detailed, date-wise format.
- **Schedule Sessions**: Admins can select user's available slots to schedule sessions of specified durations (e.g., 30 minutes) while avoiding conflicts.
- **Session Type Selection**: Admins can create sessions that are either one-on-one or multi-participant, specifying multiple attendees if needed.

### 3. **Session Management**

- **Scheduled Sessions Overview**: Both users and admins can view upcoming sessions, including participant details, times, and more.
- **Conflict Handling**: The system prevents scheduling conflicts by warning admins if the selected time overlaps with existing availability or sessions.

### 4. **Frontend**

- **Framework**
  - **Nextjs**
  - **ShadcnUI**
  - **FullCalendar**
- **Key Components**:
  - **Time Selection**: Interactive time-block components for selecting and managing availability.
  - **Calendar View**: A calendar or grid view to visually manage user availability and scheduling.
  - **Admin Dashboard**: A comprehensive admin interface to view availability, schedule sessions, and manage participants.

### 5. **Backend Api Integration**

- **Nextjs API Routes**
- **MongoDB**

## Setup

### 1. **Clone the Repository**

```bash
git clone https://github.com/yuvrajsinh5252/dynamic-scheduler
```

### 2. **Install Dependencies**

```bash
bun install
```

### 3. **Setup Environment Variables**

- Create a `.env.local` file in the root directory.

```bash
cp .example.env .env
```

### 4. **Run the Application**

```bash
bun dev
```

---

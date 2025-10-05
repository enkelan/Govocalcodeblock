# Meeting Calendar Application

A simple and efficient calendar application built with React, TypeScript, and Tailwind CSS that allows users to schedule, view, edit, and delete meetings.

## Features

- Interactive monthly calendar view
- Schedule meetings with title, time, description, and attendee information
- View meetings for a selected date
- Edit existing meetings
- Delete meetings
- Search meetings by title, attendee, description, or email
- Data local storage
- Instant UI updates when meetings are added/edited/deleted

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS for styling
- Vite for build tooling


## Project Structure

```
src/
  components/      # Reusable React components (Calendar, MeetingForm, MeetingList, SearchBar, ConfirmModal)
  hooks/           # Custom React hooks (useMeetings, useMeetingForm, useDeleteModal)
  utils/           # Utility functions (date, time, validation, meeting filtering, meetingHandlers, storage)
  types.ts         # TypeScript type definitions
  App.tsx          # Main application component
  main.tsx         # Entry point
  index.css        # Global styles
```

## Architecture & Code Quality

- **Separation of Concerns:** UI, logic, and utilities are separated for maintainability.
- **Reusable Utilities & Hooks:** All date, time, validation, and meeting logic is in `src/utils` and `src/hooks` for easy reuse and testing.
- **Instant State Updates:** The UI updates immediately when meetings are created, edited, or deleted—no manual refresh needed.
- **Local Timezone Support:** Dates are handled in the user's local timezone to avoid off-by-one errors.

## Data Flow

- The main state (meetings, selected date, search term) is managed in `App.tsx`.
- Child components receive data and callbacks via props.
- Meetings are persisted in local storage and loaded on app start.
- Components communicate via props and callbacks.
- The main state (meetings, selected date, search term) is managed in `App.tsx`.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd meeting-calendar
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000`

## Usage

- Click on a date in the calendar to view or schedule meetings for that day.
- Use the form to add or edit meetings.
- Use the search bar to find meetings by title, attendee, description, or email.


## Author

- **Author:** Enkelan Rami

---

# QuickBook - Frontend

The React frontend for the QuickBook room booking application. Built with React and Vite for fast development and optimized production builds.

## Features

- 🏠 **Home Page** - Landing page with featured rooms
- 🛏️ **Room Browsing** - Browse and filter available rooms
- 📅 **Room Booking** - Easy-to-use booking system
- 🔐 **Authentication** - User login and registration
- 👤 **User Profile** - View and manage personal bookings
- 📝 **Contact Form** - Get in touch with support
- 🛡️ **Protected Routes** - Authenticated user access control
- 👨‍💼 **Admin Dashboard** - Manage rooms and view messages

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS** - Styling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server with hot module replacement:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build

Build for production:
```bash
npm run build
```

## Preview

Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation bar
│   ├── ProtectedRoute.jsx # Route protection wrapper
│   └── RoomCard.jsx    # Room display component
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Rooms.jsx       # All rooms listing
│   ├── BookRoom.jsx    # Booking interface
│   ├── Login.jsx       # User login
│   ├── Register.jsx    # User registration
│   ├── MyBookings.jsx  # User's bookings
│   ├── Contact.jsx     # Contact form
│   ├── About.jsx       # About page
│   ├── AdminLogin.jsx  # Admin authentication
│   ├── AdminRooms.jsx  # Room management
│   └── AdminMessages.jsx # Message management
├── App.jsx             # Main app component
├── main.jsx            # Entry point
├── App.css             # App styles
└── index.css           # Global styles
```

## Environment Variables

Create a `.env` file in the frontend directory:
```
VITE_API_URL=http://localhost:5000
```

Adjust the API URL to match your backend server address.

## Linting

Run ESLint:
```bash
npm run lint
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

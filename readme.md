# 🗳️ EasyVote

**EasyVote** is a premium, real-time voting application designed to make group decisions fast, fair, and visually engaging. Whether you're deciding on a team lunch, a movie night, or a project name, EasyVote provides a seamless experience for creators and participants alike.

---

## ✨ Key Features

- **Real-Time Interaction**: Built with Socket.io for instantaneous updates across all devices.
- **Integrated Waiting Room**: Add and manage choices directly on the main page—no clunky modals.
- **Ranked-Choice Voting**: Users can rank their top choices, ensuring the final result reflects the group's true preference.
- **Beautiful Visualizations**: Results are displayed using a custom-built, interactive SVG Donut Chart with vibrant color palettes.
- **Mobile-First Design**: A responsive, premium UI that looks great on any screen.
- **One-Click Sharing**: Quickly share your 6-character Poll ID with a dedicated copy button and instant visual feedback.
- **Admin Controls**: Creators have full control to start the vote, close the poll, or reset for a new session.

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Valtio (State Management).
- **Backend**: NestJS, TypeScript, Socket.io.
- **Database/Cache**: Redis (via ioredis).
- **Infrastructure**: Docker Compose (for easy local setup).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Docker (for Redis)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone [repository-url]
    cd EasyVote
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # This will install dependencies for both client and server
    ```

3.  **Start Redis**:
    ```bash
    docker-compose up -d
    ```

4.  **Start the application**:
    - **Server**: 
      ```bash
      cd server
      npm start
      ```
    - **Client**: 
      ```bash
      cd client
      npm run dev
      ```

---

## 📖 How to Use

1.  **Start a Poll**: Click "Start a New Poll", enter your topic (e.g., "Team Lunch"), and set the number of votes allowed per person.
2.  **Add Choices**: In the Waiting Room, type your options and press Enter.
3.  **Invite Friends**: Share the **Poll ID** displayed in the header.
4.  **Vote**: Participants rank their top choices.
5.  **View Results**: The Admin closes the poll to reveal the **Donut Chart** with percentage breakdowns!

---

## 🎨 UI Aesthetics
EasyVote uses a modern **Emerald & Pearl** design system, featuring:
- Soft shadows and glassmorphism effects.
- Smooth transitions and micro-animations.
- High-contrast typography (Inter/Outfit style).
- Conversational labels that make the app feel alive.

---

## 🛡️ License
This project is licensed under the MIT License.

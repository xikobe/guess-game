# Guessing Game Frontend

  

## Overview

  

This is the frontend application for the Bitcoin price guessing game. Built with Next.js, the application provides users with a user-friendly interface to interact with the backend, place bets, and view results. The application is deployed on Vercel for production use.

  
## Features

  

-  **User Registration**: Users can sign up and place their bets on whether the price of Bitcoin will increase or decrease.

-  **Betting Interface**: Allows users to make their guesses and see the current Bitcoin price.

-  **Result Display**: Shows whether the user's guess was correct and updates their score accordingly.

-  **Current Bitcoin Price**: Fetches and displays the latest Bitcoin price.

  

## Getting Started

  

### Prerequisites

  

Ensure you have the following installed:

  

-  **Node.js** (recommended version: 18.x or higher)

-  **pnpm** (for managing dependencies)

  

### Installation

  

1.  **Clone the Repository**:

```bash

git clone <repository-url>

cd <repository-directory>

```

  

2.  **Install Dependencies**:

```bash

pnpm install

```

  

### Running Locally

  

To start the development server:

  

```bash

pnpm  run  dev

```

  

Visit `http://localhost:3000` in your browser to see the application in action.

You'll need to have the backend running as well - check https://github.com/xikobe/guess-game-be

  

## Deployment

  

The application is deployed on Vercel. Any changes pushed to the main branch will trigger a new deployment automatically.

  

## Improvements

  

Here are some planned improvements for the application:

  

-  **Backend and Frontend Price Feed Sync**:

- Ensure that the Bitcoin price feed used by the frontend and backend is synchronized to prevent discrepancies in price information.

  

-  **Complete Test Coverage**:

- Write and execute comprehensive tests for all components and functionalities to ensure reliability and maintainability.

  

-  **Design Enhancements**:

- Improve the overall design of the application to make it more user-friendly and visually appealing. Consider adding responsive design features for better usability on various devices.

  

-  **Leaderboard Feature**:

- Implement a leaderboard to display top users based on their scores, providing a competitive aspect to the game.
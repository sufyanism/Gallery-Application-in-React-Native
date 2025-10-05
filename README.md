# React Native Gallery App - Setup & Introduction
This repository contains a React Native project for building a beautiful Gallery App where users can browse images, preview them in full-screen, and apply filters or search. This README covers the initial setup, project structure, and overview based on the introductory video.

</br>

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Running the App](#running-the-app)
- [Next Steps](#next-steps)
- [Acknowledgements](#acknowledgements)

</br>

## Introduction
Welcome to the React Native Gallery App tutorial! In this project, we'll build a user-friendly app that displays images in a grid, allows full-screen previews, and includes features like filtering and searching. 
This setup guide walks you through the initial environment setup and project creation using Expo CLI.

</br>

## Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)
- [Expo CLI](https://expo.dev/) (install globally)
  
To install Expo CLI globally, run:
`npm install -g expo-cli`


Setup Instructions

1. Create a New Project
Open your terminal and run:
`expo init GalleryApp`
When prompted, select the blank template.

2. Navigate into the Project Folder
`cd GalleryApp`

3. Start the Development Server
`expo start`

This command will launch the Expo Developer Tools in browser.

</br>

## Project Structure
After creation, your project folder (GalleryApp/) will have the following structure:
```
GalleryApp/
├── App.js               # Main entry point of the app
├── package.json         # Dependencies and scripts
├── assets/              # Images, fonts, icons
└── node_modules/        # Installed dependencies
```

</br>

## Running the App

On a Physical Device: 📱
- Install the Expo Go app from the App Store or Google Play.
- Make sure your device and development machine are on the same Wi-Fi network.
- Run expo start in your project directory.
- Scan the QR code with Expo Go to view the app.

On an Emulator: 💻
- For Android, start an emulator via Android Studio.
- For iOS, open the project in Xcode (macOS only).
- Run expo start and select the emulator to launch.

React Native Gallery App by Zeba Academy ========================
=
Welcome to the React Native Gallery App tutorial project by Zeba Academy! This app is a
step-by-step implementation from our video series, teaching you how to build a fully interactive
image gallery in React Native.
---
## Features
1. **Gallery Grid & Image Preview Modal** - Displays images in a 2-column grid. - Tap an image to
view it fullscreen.
2. **Search Bar & Filters** - Search images by title. - Filter images by categories: All, Nature,
Urban, Other, and Favorites.
3. **Favorites Feature** - Tap the heart icon to favorite/unfavorite an image. - Filter by Favorites
category to see liked images.
---
## Installation
Clone the repo: ``` git clone https://github.com/sufyanism/allery-Application-in-React-Native
.git cd

react-native-gallery-app ```

Install dependencies: ``` npm install # or yarn install ```

Run the app: ``` npm run ios # or npx react-native run-android ```

---
## Usage
- Use the search bar at the top to filter images by title. - Tap on category buttons to filter images by
category or view favorites. - Tap an image to open it fullscreen. - Tap the heart icon on any image to
toggle favorites. - Close fullscreen preview with the X button.
---
## Code Overview
- **App.jsx** handles all core features: gallery grid, search, filtering, favorites, and modal. - React
Native components like FlatList, Modal, TextInput, TouchableOpacity are used. - React hooks
manage state (useState, useRef). - Animated API powers the heart toggle effect.
---
## Technologies Used
- React Native - JavaScript / JSX - React Hooks - React Native Animated API
---
## About Zeba Academy

This project is part of Zeba Academy’s hands-on React Native tutorials. We focus on clear, practical
lessons for beginners and intermediate developers. Explore more tutorials and join our community
at [https://zebacademy.com](https://zebacademy.com).
---
## License
MIT License © 2025 zeba.academy

# Little Lemon Restaurant App

A React Native Expo application for the Little Lemon Mediterranean restaurant.

## Features

### Onboarding Screen
- Greet users with an onboarding screen on first app launch
- Collect personal details: First name, Last name, Email
- Avatar selection from device gallery
- Next button enabled only when required fields are filled
- Data persisted to AsyncStorage

### Home Screen
- **Header**: Logo and profile button for navigation
- **Hero Section**: Restaurant name, location, description, and food image
- **Search Bar**: Filter menu items by name
- **Menu Breakdown**: Selectable category filters (All, Starters, Mains, Desserts, Drinks)
- **Food Menu List**: Display menu items with images, descriptions, and prices

### Profile Screen
- Display user data from onboarding
- Edit personal information fields
- Change or remove avatar
- Email notification preferences with toggles
- Save changes to AsyncStorage
- Discard changes option
- Log out functionality that clears all data and returns to onboarding

### Navigation
- Stack navigation allowing back button functionality
- Conditional navigation based on onboarding status

## Design

### Colors
- **Primary Color 1 (Green)**: #495E57
- **Primary Color 2 (Yellow)**: #F4CE14
- **Secondary Color 1 (Orange)**: #EE9972
- **Secondary Color 2 (Light Pink)**: #FBDABB

### Fonts
- **Titles**: Markazi Text
- **Body Text**: Karla

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Add custom fonts to `assets/fonts/`:
   - MarkaziText-Regular.ttf
   - MarkaziText-Bold.ttf
   - Karla-Regular.ttf
   - Karla-Bold.ttf

3. Start the app:
   ```bash
   npm start
   ```

## Tech Stack

- React Native
- Expo
- React Navigation (Stack Navigator)
- AsyncStorage for data persistence
- Expo Image Picker for avatar selection

## Project Structure

```
.
├── App.js                          # Main app component
├── screens/
│   ├── OnboardingScreen.js        # User registration screen
│   ├── HomeScreen.js              # Main menu screen
│   └── ProfileScreen.js           # User profile management
├── constants/
│   └── colors.js                  # Design tokens
├── assets/
│   └── fonts/                     # Custom fonts
└── package.json
```

## Requirements Met

✅ Onboarding screen with personal details input  
✅ Next button enabled only when fields are filled  
✅ Home screen with header, hero, menu breakdown, and food list  
✅ Profile screen populated with onboarding data  
✅ Changes persist on app restart  
✅ Log out clears all data  
✅ Stack navigation with back button  
✅ Hero section with restaurant description and search bar  
✅ Selectable menu categories  
✅ Food menu list with item summaries  

## Suggestions for Improvement

1. **Backend Integration**: Connect to a real API for menu items and user management
2. **Shopping Cart**: Add ability to add items to cart and checkout
3. **Order History**: Display past orders and reorder functionality
4. **Favorites**: Allow users to mark favorite menu items
5. **Ratings & Reviews**: User can rate and review menu items
6. **Payment Integration**: Add Stripe or PayPal for order payments
7. **Push Notifications**: Send order updates and special offers
8. **Location Services**: Show nearest restaurant locations
9. **Reservations**: Book tables in advance
10. **Dark Mode**: Add dark theme option
11. **Filters**: Advanced filtering by price, calories, allergies
12. **Real-time Tracking**: Track order status in real-time
13. **Social Sharing**: Share favorite dishes on social media
14. **Loyalty Program**: Implement points and rewards system
15. **Multi-language Support**: Support multiple languages

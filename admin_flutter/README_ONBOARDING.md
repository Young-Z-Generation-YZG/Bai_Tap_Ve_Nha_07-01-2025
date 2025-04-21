# Onboarding Screen Implementation

This document provides information about the onboarding screen implementation in the Admin Flutter app.

## Overview

The onboarding screen is shown to users on their first launch of the application. It provides a brief introduction to the key features of the admin dashboard.

## Features

- Multi-page swipeable onboarding with smooth animations
- Progress indicators showing current page position
- Skip button to bypass onboarding
- Next and Get Started buttons for navigation
- Persistence using SharedPreferences to show onboarding only once

## Customizing Onboarding Content

To modify the onboarding content, edit the `onboardingItems` list in `lib/domain/onboarding.dart`:

```dart
final List<OnboardingItem> onboardingItems = [
  OnboardingItem(
    title: 'Your Title',
    description: 'Your description text',
    imagePath: 'assets/images/onboarding/your_image.png',
  ),
  // Add more items as needed
];
```

## Adding Custom Images

1. Place your image assets in the `assets/images/onboarding/` directory
2. Update the image paths in the `onboardingItems` list
3. Run `flutter pub get` to ensure assets are recognized

## Resetting Onboarding

During development, you may want to reset the onboarding screen to view it again:

```dart
// Add this code somewhere in your app (like a settings page)
await PreferencesService.setOnboardingComplete(false);
```

## Implementation Details

- `OnboardingPage`: Main UI component for the onboarding experience
- `PreferencesService`: Handles persistence of onboarding completion status
- `OnboardingItem`: Data model for onboarding content 
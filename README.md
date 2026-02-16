# HRMS Mobile (React Native – no Expo)

This is the same HRMS mobile app built with **bare React Native** (React Native CLI), without Expo.

## Features

- **Authentication** – Login and demo mode (no backend required for demo)
- **Check-in / Check-out** – With geofencing (uses `@react-native-community/geolocation`)
- **Attendance** – Today’s summary and history
- **Leave** – Leave requests and balance
- **Team** – Team members (manager role)
- **Profile** – User info and logout

## Tech stack

- React Native 0.74
- React Navigation (native stack + bottom tabs)
- `react-native-keychain` for secure token storage
- `@react-native-community/geolocation` for location
- Axios, Zustand, date-fns, Lucide icons

## Prerequisites

- Node.js 18+
- Android Studio (for Android) / Xcode (for iOS)
- JDK 17 (Android)
- CocoaPods (iOS): `sudo gem install cocoapods`

## Install and run

### 1. Install dependencies

```bash
cd HRMSMobile
npm install
```

(Or use `pnpm install` if you use pnpm in this repo.)

### 2. Android

```bash
npm run android
```

Make sure an emulator is running or a device is connected.

### 3. iOS (macOS only)

```bash
cd ios && pod install && cd ..
npm run ios
```

### 4. Start Metro (if not started by run-android/run-ios)

```bash
npm start
```

## Configuration

- **API base URL** – Edit `src/constants/api.ts`: set `API_CONFIG.BASE_URL` or use `REACT_APP_API_URL` if you add a dotenv solution.
- **Geofence** – Edit `src/constants/geofencing.ts`: `GEOFENCE_CONFIG.OFFICE_LAT`, `OFFICE_LNG`, `RADIUS`, or use env (e.g. `REACT_APP_OFFICE_LAT` etc.) if you add one.

## Demo mode

On the login screen, tap **“Continue as demo (no backend)”** to use the app without a backend. All other features (tabs, UI) work; API calls will fail until you connect a real backend.

## Project layout

- `App.tsx` – Root: `AuthProvider` + `NavigationContainer` + `RootNavigator`
- `src/navigation/` – `AuthStack`, `MainTabs`, `RootNavigator`
- `src/screens/` – Login, Home, Attendance, Leave, Team, Profile
- `src/context/` – `AuthContext`
- `src/api/` – API modules
- `src/components/` – UI and feature components
- `src/utils/`, `src/constants/`, `src/hooks/`, `src/types/` – Shared logic and types

## Difference from Expo version

| Expo (mobile-hrms)     | This project (HRMSMobile)        |
|------------------------|----------------------------------|
| Expo SDK, Expo Router  | Bare React Native, React Navigation |
| expo-secure-store      | react-native-keychain            |
| expo-location          | @react-native-community/geolocation |
| File-based routing     | Explicit navigators and screens  |
| `pnpm start` / Expo Go | `npm run android` / `npm run ios` |

You can keep both: `mobile-hrms` for Expo, `HRMSMobile` for bare React Native.

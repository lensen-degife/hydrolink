# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Backend Integration

HydroLink frontend connects to the HydroLink Node.js/Express backend API.

### Endpoints Configuration
- **Production API URL (Default)**: `https://hydrolink-backend.onrender.com/api/v1`
- **Local Development**: `http://localhost:4000/api/v1`
- **Android Emulator**: `http://10.0.2.2:4000/api/v1`

You can customize `API_BASE_URL` inside `services/api.ts` to switch environments.

### Seed Login Credentials
Use the pre-seeded account to test real backend data integration:
- **Email**: `abebe.bikila@example.com`
- **Password**: `Password123!`

### Note on Schedule API (`/schedule/*`)
The backend schedule endpoints require the authenticated user to have a `kebele` specified on their profile (e.g. `"Kebele 01"`). If `kebele` is omitted, schedule queries will return a message instructing the user to set their kebele. You can update your user profile via `PUT /users/me` with `{ "kebele": "Kebele 01" }`.


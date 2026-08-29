/** @type {import('expo/config').ExpoConfig} */
export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    apiUrl:
      process.env.EXPO_PUBLIC_API_URL ??
      'https://hydrolink-backend.onrender.com/api/v1',
  },
});

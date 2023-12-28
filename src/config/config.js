import "dotenv/config";

export default {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT || 8080,
  PERSISTENCE: process.env.PERSISTENCE,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

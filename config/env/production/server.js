module.exports = ({ env }) => ({
  url: env("MY_HEROKU_URL"),
  emitErrors: true,
  app: {
    keys: env.array("APP_KEYS", ["testKey1", "testKey2"]),
  },
});

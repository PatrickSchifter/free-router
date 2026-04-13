module.exports = {
  apps: [
    {
      name: 'free-router',
      script: './dist/src/main.js',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};

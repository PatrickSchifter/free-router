module.exports = {
  apps: [
    {
      name: 'free-router',
      script: './dist/main.js',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};

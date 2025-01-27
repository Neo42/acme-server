module.exports = {
  apps: [
    {
      name: "acme-server",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};

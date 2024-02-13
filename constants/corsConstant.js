module.exports = {
  CorsConfig: {
    origin: ["*"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Signature-Headers",
      "client_id",
      "access_token",
      "sign",
      "sign_method",
      "stringToSign",
      "t",
      "nonce",
    ],
  },
};

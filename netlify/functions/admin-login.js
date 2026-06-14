const crypto = require("crypto");
const { json, signToken } = require("./_shared");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed." });

  try {
    const body = JSON.parse(event.body || "{}");
    const supplied = String(body.password || "");
    const expected = String(process.env.ADMIN_PASSWORD || "");

    const a = Buffer.from(supplied);
    const b = Buffer.from(expected);
    const valid = expected && a.length === b.length && crypto.timingSafeEqual(a, b);

    if (!valid) return json(401, { error: "Incorrect password." });
    return json(200, { success: true, token: signToken() });
  } catch (error) {
    console.error(error);
    return json(500, { error: "Could not log in." });
  }
};

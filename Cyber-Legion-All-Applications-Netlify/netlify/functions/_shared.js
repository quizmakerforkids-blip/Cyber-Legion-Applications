const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");

function json(statusCode, data) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify(data)
  };
}

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase environment variables are missing.");
  return createClient(url, key, { auth: { persistSession: false } });
}

function signToken() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is missing.");
  const payload = {
    role: "admin",
    exp: Date.now() + 8 * 60 * 60 * 1000
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

function verifyToken(event) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) return false;

  const auth = event.headers.authorization || event.headers.Authorization || "";
  if (!auth.startsWith("Bearer ")) return false;

  const token = auth.slice(7);
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return false;

  const expected = crypto.createHmac("sha256", secret).update(encoded).digest("base64url");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    return payload.role === "admin" && Number(payload.exp) > Date.now();
  } catch {
    return false;
  }
}

module.exports = { json, getSupabase, signToken, verifyToken };

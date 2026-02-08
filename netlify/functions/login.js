import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const isProd =
  (process.env.CONTEXT || process.env.NETLIFY_CONTEXT) === "production"

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false }),
    }
  }

  let body
  try {
    body = JSON.parse(event.body || "{}")
  } catch {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false }),
    }
  }

  const code = String(body.code || "")
  const hash = process.env.CREATIVE_VAZ_PASSWORD_HASH
  const secret = process.env.SESSION_SECRET

  if (!hash || !secret) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false }),
    }
  }

  const ok = await bcrypt.compare(code, hash)
  if (!ok) {
    return {
      statusCode: 401,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false }),
    }
  }

  const token = jwt.sign({ ok: true }, secret, { expiresIn: "7d" })

  const maxAge = 7 * 24 * 60 * 60
  const securePart = isProd ? " Secure;" : ""

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "Set-Cookie": `cvaz_auth=${token}; Path=/; HttpOnly;${securePart} SameSite=Lax; Max-Age=${maxAge}`,
    },
    body: JSON.stringify({ ok: true }),
  }
}

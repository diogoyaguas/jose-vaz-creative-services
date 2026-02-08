import jwt from "jsonwebtoken"

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false }),
    }
  }

  const secret = process.env.SESSION_SECRET
  if (!secret) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false }),
    }
  }

  const cookie = event.headers.cookie || event.headers.Cookie || ""
  const match = String(cookie).match(/(?:^|;\s*)cvaz_auth=([^;]+)/)
  const token = match?.[1]

  if (!token) {
    return {
      statusCode: 401,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false }),
    }
  }

  try {
    jwt.verify(token, secret)
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      body: JSON.stringify({ ok: true }),
    }
  } catch {
    return {
      statusCode: 401,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false }),
    }
  }
}

import { verifySessionToken } from "../_lib/otpStore";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const token = (searchParams.get("token") || "").trim();

    if (!token) {
      return Response.json({ error: "Token is required." }, { status: 400 });
    }

    const result = verifySessionToken(token);
    if (!result.valid) {
      return Response.json(
        {
          error:
            "This reset link is invalid or has expired. Please request a new OTP.",
        },
        { status: 401 }
      );
    }

    return Response.json({ valid: true });
  } catch (error) {
    console.error("[verify-reset-token] Error:", error);
    return Response.json(
      { error: "Token verification failed." },
      { status: 500 }
    );
  }
}

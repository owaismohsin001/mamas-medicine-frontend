import { consumeSessionToken } from "../_lib/otpStore";

const XANO_BASE = "https://xnrw-fohw-scw8.a2.xano.io/api:uUEiFEze/";

/**
 * POST /api/auth/reset-password
 * Body: { token: string, newPassword: string }
 *
 * 1. Validates and consumes the OTP session token.
 * 2. Extracts the verified email from the session.
 * 3. Calls the Xano endpoint with { email, newPassword } to update the password.
 *
 * NOTE: Xano's built-in `auth/reset_password` expects a token it issued
 * during its own forgot-password flow. Since we use our own OTP flow,
 * ensure your Xano backend has a custom endpoint that accepts
 * { email, newPassword } to update a user's password directly.
 * Adjust the endpoint and payload below to match your Xano setup.
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const token       = (body?.token       || "").trim();
    const newPassword = (body?.newPassword || "").trim();

    // ── Validation ─────────────────────────────────────────────
    if (!token) {
      return Response.json({ error: "Reset token is required." }, { status: 400 });
    }
    if (!newPassword) {
      return Response.json({ error: "New password is required." }, { status: 400 });
    }
    if (newPassword.length < 8) {
      return Response.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    // ── Verify & consume the OTP session token ──────────────────
    const session = consumeSessionToken(token);
    if (!session.valid) {
      return Response.json(
        { error: "Your reset session has expired. Please request a new OTP." },
        { status: 401 }
      );
    }

    // ── Forward to Xano ─────────────────────────────────────────
    // Send the verified email + new password to Xano.
    // If your Xano backend uses a different endpoint or payload,
    // update the URL and body below accordingly.
    const xanoRes = await fetch(`${XANO_BASE}auth/reset_password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session.email, newPassword }),
    });

    const contentType = xanoRes.headers.get("content-type");
    const xanoData = contentType?.includes("application/json")
      ? await xanoRes.json()
      : await xanoRes.text();

    if (!xanoRes.ok) {
      return Response.json(
        { error: xanoData?.message || "Password reset failed. Please try again." },
        { status: xanoRes.status }
      );
    }

    return Response.json({ success: true, message: "Password reset successfully." });
  } catch (error) {
    console.error("[reset-password] Error:", error);
    return Response.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}

export async function resetPassword(token, newPassword) {
  const res = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw { status: res.status, message: data?.error || "Password reset failed" };
  }

  return data;
}

export async function verifyResetToken(token) {
  const res = await fetch(`/api/auth/verify-reset-token?token=${encodeURIComponent(token)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (!res.ok) {
    throw { status: res.status, message: data?.error || "Token verification failed" };
  }

  return data;
}

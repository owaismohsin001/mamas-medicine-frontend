export async function sendOtp(email) {
  const res = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw { status: res.status, message: data?.error || "Failed to send OTP" };
  }

  return data;
}

export async function verifyOtp(email, otp) {
  const res = await fetch("/api/auth/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw { status: res.status, message: data?.error || "OTP verification failed" };
  }

  return data;
}

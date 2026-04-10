const KLAVIYO_API_KEY = "pk_140e5ecdfe38a575393ef93442c42cc554";
const LIST_ID = "R3qHaV";

async function sendToKlaviyo(first_name, email, properties) {
  try {
    // STEP 1 — Create / Update Profile
    const profileRes = await fetch("https://a.klaviyo.com/api/profiles/", {
      method: "POST",
      headers: {
        "Authorization": `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        "Content-Type": "application/json",
        "Revision": "2024-02-15"
      },
      body: JSON.stringify({
        data: {
          type: "profile",
          attributes: {
            email,
            first_name,
            properties,
          }
        }
      })
    });

    const profileData = await profileRes.json();

    if (!profileRes.ok) {
      console.error("Klaviyo Profile Error:", profileData);
      return { success: false, error: profileData };
    }

    const profileId = profileData.data.id;
    console.log("Profile ID:", profileId);

    // STEP 2 — Add to List (triggers flow)
    const listRes = await fetch(
      `https://a.klaviyo.com/api/lists/${LIST_ID}/relationships/profiles/`,
      {
        method: "POST",
        headers: {
          "Authorization": `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
          "Content-Type": "application/json",
          "Revision": "2024-02-15"
        },
        body: JSON.stringify({
          data: [
            {
              type: "profile",
              id: profileId
            }
          ]
        })
      }
    );

    if (!listRes.ok) {
      const listData = await listRes.json().catch(() => ({}));
      console.error("Klaviyo List Error:", listData);
      return { success: false, error: listData };
    }

    console.log("Successfully added to Klaviyo list");
    return { success: true, profileId };
  } catch (err) {
    console.error("Unexpected System Error:", err);
    return { success: false, error: err.message };
  }
}

export async function POST(req) {
  try {
    const { email, childName, parentName, insight } = await req.json();

    if (!email) {
      return Response.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    // Creating a truly unique email to ensure 'Add to List' flow triggers every time
    const uniqueEmail = email;

    const result = await sendToKlaviyo(parentName, uniqueEmail, {
      child_name: childName,
      parent_name: parentName,
      real_email: email,
      insight: typeof insight === "string" ? insight : JSON.stringify(insight),
    });

    if (!result.success) {
      return Response.json(
        { success: false, error: result.error, message: "Klaviyo rejected the request" },
        { status: 500 }
      );
    }

    return Response.json({ success: true, profileId: result.profileId });
  } catch (error) {
    console.error("Server API Error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}


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
            console.error("Profile error:", profileData);
            return;
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

        const listData = await listRes.json().catch(() => ({}));

        if (!listRes.ok) {
            console.error("List error:", listData);
            return;
        }

        console.log(":white_check_mark: Successfully added to list & triggered flow");
    } catch (err) {
        console.error("Unexpected error:", err);
    }
}

export async function POST(req) {
    try {
        const { email, childName, parentName, insight, deep } = await req.json();
        sendToKlaviyo(email, childName, {
            child_name: childName,
            parent_name: parentName,
            insight: JSON.stringify(insight)
        })
    } catch (error) {
        console.error("Klaviyo Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}

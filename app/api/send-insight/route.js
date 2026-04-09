import nodemailer from "nodemailer";

function generateSoulReadingHTML(insight) {
  const [summary, deep, childName] = [
    insight.summary_text,
    insight.deep_text,
    insight.child_name,
  ].map((s) => s || "");

  function preprocess(text) {
    return text
      .replace(/^#{1,6}\s*/gm, "")
      .replace(/^\s*[-*]\s+/gm, "• ")
      .replace(/^\s*\d+\.\s+/gm, "• ")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/`+/g, "")
      .trim();
  }

  const cleanedDeep = preprocess(deep);

  const deepBlocks = cleanedDeep
    .split("\n\n")
    .map((b) => b.trim())
    .filter(Boolean);

  const isSectionHeader = (b) => /^[🌿🌞💫🌱]/.test(b);
  const isClusterHeader = (b) => /^[0-9️⃣]/.test(b);
  const isKeyTip = (b) => b.startsWith("💡 Key Tip");
  const isList = (b) => b.startsWith("•");

  const renderList = (block) => {
    const items = block
      .split("\n")
      .map((line) => line.replace(/^•\s*/, "").trim())
      .filter(Boolean)
      .map(
        (item) => `
        <tr>
          <td style="padding:4px 0;font-size:16px;line-height:1.6;color:#2F2A26;">
            • ${item}
          </td>
        </tr>`
      )
      .join("");

    return `<table width="100%" cellpadding="0" cellspacing="0">${items}</table>`;
  };

  const renderKeyTip = (block) => {
    const content = block.replace("💡 Key Tip", "").trim();

    return `
      <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
        <tr>
          <td style="background:#FCE4D6;border-left:4px solid #FABD96;padding:14px;">
            <div style="font-weight:bold;margin-bottom:6px;color:#1F1A17;">
              💡 Key Tip
            </div>
            <div style="font-size:16px;line-height:1.6;color:#2F2A26;">
              ${content}
            </div>
          </td>
        </tr>
      </table>
    `;
  };

  const renderBlock = (block) => {
    if (isKeyTip(block)) return renderKeyTip(block);

    if (isSectionHeader(block)) {
      return `
        <tr>
          <td style="font-size:24px;font-weight:bold;color:#1F1A17;padding:30px 0 10px;">
            ${block}
          </td>
        </tr>
      `;
    }

    if (isClusterHeader(block)) {
      return `
        <tr>
          <td style="font-size:20px;font-weight:bold;color:#1F1A17;padding:20px 0 8px;">
            ${block}
          </td>
        </tr>
      `;
    }

    if (isList(block)) {
      return `<tr><td>${renderList(block)}</td></tr>`;
    }

    return `
      <tr>
        <td style="font-size:16px;line-height:1.7;color:#2F2A26;padding:8px 0;">
          ${block}
        </td>
      </tr>
    `;
  };

  // SUMMARY
  const summaryItems = summary
    ? summary
      .split("\n")
      .map((line) => line.replace(/^[-•]\s*/, "").trim())
      .filter(Boolean)
    : [];

  const summaryHTML =
    summaryItems.length > 0
      ? `
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF9F6;margin-bottom:24px;">
        <tr>
          <td style="padding:24px;">

            <div style="font-size:26px;font-weight:bold;color:#1F1A17;margin-bottom:10px;">
              🌟 Soul Snapshot — You + ${childName}
            </div>

            <div style="width:50px;height:4px;background:#FABD96;margin-bottom:16px;"></div>

            <table width="100%" cellpadding="0" cellspacing="0">
              ${summaryItems
        .map((item) => {
          const chars = [...item];
          const bullet = chars[0] || "";
          const value = chars.slice(1).join("");

          return `
                    <tr>
                      <td style="font-size:18px;width:24px;vertical-align:top;">
                        ${bullet}
                      </td>
                      <td style="font-size:16px;line-height:1.6;color:#2F2A26;padding-bottom:10px;">
                        ${value}
                      </td>
                    </tr>
                  `;
        })
        .join("")}
            </table>

          </td>
        </tr>
      </table>
    `
      : "";

  // DEEP CONTENT TABLE
  const deepHTML = `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFFFF;">
      <tr>
        <td style="padding:24px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${deepBlocks.map((block) => renderBlock(block)).join("")}
          </table>
        </td>
      </tr>
    </table>
  `;

  // WRAPPER
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#D8DFFF;padding:30px 10px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="width:100%;">
            <tr>
              <td>
                ${summaryHTML}
                ${deepHTML}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

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

    console.log("Successfully added to Klaviyo list");
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

export async function POST(req) {
  try {
    const { email, childName, parentName, insight } = await req.json();
    const info = sendToKlaviyo(parentName, email.split('@')[0] + Math.random() * 100000 + 100000 + "@" + email.split('@')[1], {
      child_name: childName,
      parent_name: parentName,
      real_email: email,
      insight: JSON.stringify(insight)
    });
    return Response.json({ success: true, info });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

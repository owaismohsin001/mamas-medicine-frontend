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

export async function POST(req) {
  try {
    const { email, childName, insight } = await req.json();

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const ChildName = childName || "Child";

    const html = `${generateSoulReadingHTML({
      ...insight,
      child_name: ChildName,
    })}`;

    // Configure the Nodemailer transporter for Gmail
    console.log(html);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ramshamzamop@gmail.com",
        pass: "denl xlhu orci ydcm",
      },
    });

    // Email content
    const mailOptions = {
      from: `"Mama's Medicine" <ramshamzamop@gmail.com>`,
      to: email,
      subject: `🌟 Soul Snapshot for ${ChildName} is Ready!`,
      html,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return Response.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

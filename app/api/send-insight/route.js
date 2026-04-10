import nodemailer from "nodemailer";
import { getFirstEmail } from "./first";
import getDeepEmail from "./deep";
import { getTestimonalInvite } from "./testimonial-invite-1";
import getSummary from "./summary";
import { getHowItWorks } from "./how-it-works";
import { getCLosing } from "./closing";

const MAIL_USER = process.env.MAIL_USER || "ramshamzamop@gmail.com";
const MAIL_PASS = process.env.MAIL_PASS || "denl xlhu orci ydcm";
const SCHEDULED_EMAIL_ENDPOINT =
  "https://xnrw-fohw-scw8.a2.xano.io/api:uUEiFEze/scheduled_email";

const SCHEDULE_DELAY_MS = 2 * 60 * 1000;
const FOLLOW_UP_DELAY_MS = 6 * 60 * 60 * 1000;
const TESTIMONIAL_INVITE_DELAY_MS = 24 * 60 * 60 * 1000;
const HOW_IT_WORKS_DELAY_MS = 24 * 60 * 60 * 1000;
const CLOSING_DELAY_MS = 24 * 60 * 60 * 1000;
const ONE_MINUTE_MS = 60 * 1000;

// const SCHEDULE_DELAY_MS = ONE_MINUTE_MS;
// const FOLLOW_UP_DELAY_MS = ONE_MINUTE_MS;
// const TESTIMONIAL_INVITE_DELAY_MS = ONE_MINUTE_MS;
// const HOW_IT_WORKS_DELAY_MS = ONE_MINUTE_MS;
// const CLOSING_DELAY_MS = ONE_MINUTE_MS;

// --- HTML generation ---

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

const isSectionHeader = (b) =>
  /^(?:🌿|🔆|💫|🌱|🌞|:herb:|:sun_with_face:|:dizzy:|:seedling:)/.test(b);
const isClusterHeader = (b) =>
  /^(?:[0-9]|[0-9]\uFE0F\u20E3|:nine:|:one:|:two:|:three:|:four:|:five:|:six:|:seven:|:eight:)/.test(b);
const isKeyTip = (b) =>
  b.startsWith("💡 Key Tip") || b.startsWith(":bulb: Key Tip");
const isList = (b) => b.startsWith("•");

function renderList(block) {
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
}

function renderKeyTip(block) {
  const content = block
    .replace(/^(?:💡|:bulb:) Key Tip[:–\s🌟💖⚖️🔍]*/i, "")
    .trim();

  return `
<table width="100%" cellpadding="0" cellspacing="0" align="left" style="margin:18px 0 28px;">
  <tr>
    <td style="background:#FCE4D6;border-left:4px solid #FABD96;padding:16px;border-radius:12px;">

      <div style="font-weight:bold;margin-bottom:6px;color:#1F1A17;">
        💡 Key Tip
      </div>

      <div style="font-size:16px;line-height:1.7;color:#2F2A26;">
        ${content}
      </div>

    </td>
  </tr>
</table>
`;
}

function renderBlock(block) {
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
}

function generateSoulReadingHTML(insight = {}) {
  const summaryContent = insight?.summary_text || "";
  const deepContent = insight?.deep_text || "";
  const childName = insight?.insights_api_payload?.childName || "";
  const parentName = insight?.insights_api_payload?.parentName || "";

  const deepBlocks = preprocess(deepContent)
    .split("\n\n")
    .map((b) => b.trim())
    .filter(Boolean);

  const summaryItems = summaryContent
    ? summaryContent
        .split("\n")
        .map((line) => line.replace(/^[-•]\s*/, "").trim())
        .filter(Boolean)
    : [];

  const summaryHTML =
    summaryItems.length > 0
      ? `
<table width="100%" cellpadding="0" cellspacing="0" align="left" style="margin-bottom:32px;">
  <tr>
    <td align="left">

      <!-- CARD -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF9F6;border-radius:16px;">
        <tr>
          <td style="padding:24px;">

            <!-- TITLE -->
            <div style="font-size:26px;font-weight:bold;color:#1F1A17;margin-bottom:10px;">
              🌟 Soul Snapshot — You + ${childName}
            </div>

            <!-- ACCENT LINE -->
            <div style="width:50px;height:4px;background:#FABD96;margin-bottom:18px;"></div>

            <!-- LIST -->
            <table width="100%" cellpadding="0" cellspacing="0">
              ${summaryItems
                .map(
                  (item) => `
                  <tr>
                    <td style="font-size:16px;line-height:1.7;color:#2F2A26;padding-bottom:12px;">
                      • ${item}
                    </td>
                  </tr>
                  `
                )
                .join("")}
            </table>

          </td>
        </tr>
      </table>

    </td>
  </tr>
</table>
`
      : "";

  const deepHTML = `
<table width="100%" cellpadding="0" cellspacing="0" align="left">
  <tr>
    <td align="left">

      <!-- CARD -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:16px;">
        <tr>
          <td style="padding:28px 24px;">

            <table width="100%" cellpadding="0" cellspacing="0">
              ${deepBlocks.map((block) => renderBlock(block)).join("")}
            </table>

          </td>
        </tr>
      </table>

    </td>
  </tr>
</table>
`;

  return {
    childName,
    parentName,
    deep: getDeepEmail(deepHTML),
    summary: getSummary(childName, summaryHTML),
  };
}

// --- Email scheduling ---

async function scheduleEmail(email, subject, body, delayMs) {
  try {
    const response = await fetch(SCHEDULED_EMAIL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        subject,
        body,
        scheduled_time: Date.now() + delayMs,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      console.error(`Scheduled Email API Error (${subject}):`, response.status, errorBody);
    }
  } catch (error) {
    console.error(`Scheduled Email Request Failed (${subject}):`, error);
  }
}

function buildEmailSequence({ childName, parentName, deepHTML, summaryHTML }) {
  let cumulative = SCHEDULE_DELAY_MS;

  const steps = [
    { subject: "Deep summary", body: deepHTML, delay: SCHEDULE_DELAY_MS },
    { subject: "Tell me what you thought", body: getTestimonalInvite(childName, parentName), delay: FOLLOW_UP_DELAY_MS },
    { subject: "Summary", body: summaryHTML, delay: TESTIMONIAL_INVITE_DELAY_MS },
    { subject: "There Is Depth Here. Let Me Show You.", body: getHowItWorks(parentName), delay: HOW_IT_WORKS_DELAY_MS },
    { subject: "Stay with this.", body: getCLosing(parentName), delay: CLOSING_DELAY_MS },
  ];

  return steps.map((step) => {
    const absoluteDelay = cumulative;
    cumulative += step.delay;
    return { ...step, absoluteDelay };
  });
}

// --- Route handler ---

export async function POST(req) {
  try {
    const { email, insight } = await req.json();

    if (!email) {
      return Response.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: MAIL_USER, pass: MAIL_PASS },
    });

    const info = await transporter.sendMail({
      from: `"Soul-Sighted" <${MAIL_USER}>`,
      to: email,
      subject: "You are in",
      html: getFirstEmail(),
    });

    const { childName, parentName, deep, summary } = generateSoulReadingHTML(insight);
    const sequence = buildEmailSequence({ childName, parentName, deepHTML: deep, summaryHTML: summary });

    await Promise.all(
      sequence.map((step) =>
        scheduleEmail(email, step.subject, step.body, step.absoluteDelay)
      )
    );

    return Response.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

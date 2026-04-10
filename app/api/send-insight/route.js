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
// const SCHEDULE_DELAY_MS = 5 * 60 * 1000;
// const FOLLOW_UP_DELAY_MS = 6 * 60 * 60 * 1000;
// const TESTIMONIAL_INVITE_DELAY_MS = 24 * 60 * 60 * 1000;
// const HOW_IT_WORKS_DELAY_MS = 24 * 60 * 60 * 1000;
// const CLOSING_DELAY_MS = 24 * 60 * 60 * 1000;
const ONE_MINUTE_MS = 60 * 1000;

const SCHEDULE_DELAY_MS = ONE_MINUTE_MS;
const FOLLOW_UP_DELAY_MS = ONE_MINUTE_MS;
const TESTIMONIAL_INVITE_DELAY_MS = ONE_MINUTE_MS;
const HOW_IT_WORKS_DELAY_MS = ONE_MINUTE_MS;
const CLOSING_DELAY_MS = ONE_MINUTE_MS;

const summary = () => getSummary("");
const howItWorks = () => getHowItWorks();
const closing = () => getCLosing();

function generateSoulReadingHTML(insight = {}) {
  const [summaryContent, deepContent, childName] = [
    insight?.summary_text,
    insight?.deep_text,
    insight?.child_name,
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

  const cleanedDeep = preprocess(deepContent);

  const deepBlocks = cleanedDeep
    .split("\n\n")
    .map((b) => b.trim())
    .filter(Boolean);

  const isSectionHeader = (b) =>
    /^[:herb::sun_with_face::dizzy::seedling:]/.test(b);
  const isClusterHeader = (b) => /^[0-:nine:]/.test(b);
  const isKeyTip = (b) => b.startsWith(":bulb: Key Tip");
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
    const content = block.replace(":bulb: Key Tip", "").trim();

    return `
 <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
        <tr>
          <td style="background:#FCE4D6;border-left:4px solid #FABD96;padding:14px;">
            <div style="font-weight:bold;margin-bottom:6px;color:#1F1A17;">
              :bulb: Key Tip
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
  const summaryItems = summaryContent
    ? summaryContent
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
              :star2: Soul Snapshot — You + ${childName}
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
  return { deep: getDeepEmail(deepHTML), summary: getSummary(summaryHTML) };
}

async function scheduleDeepSummaryEmail(email, content) {
  try {
    const scheduleTime = Date.now() + SCHEDULE_DELAY_MS;

    const response = await fetch(SCHEDULED_EMAIL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        subject: "Deep summary",
        body: content || getDeepEmail(""),
        scheduled_time: scheduleTime,
      }),
    });


    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      console.error("Scheduled Email API Error:", response.status, errorBody);
    }
  } catch (error) {
    // Non-blocking by design: immediate email success should not be affected.
    console.error("Scheduled Email Request Failed:", error);
  }
} //testimonal invite should go out 6 hours after the deep summary, asking for feedback and testimonials

async function scheduleFollowUpEmail(email) {
  try {
    const scheduleTime = Date.now() + SCHEDULE_DELAY_MS + FOLLOW_UP_DELAY_MS;

    const response = await fetch(SCHEDULED_EMAIL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        subject: "Tell me what you thought",
        body: getTestimonalInvite(),
        scheduled_time: scheduleTime,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      console.error("Follow-up Email API Error:", response.status, errorBody);
    }
  } catch (error) {
    console.error("Follow-up Email Request Failed:", error);
  }
}
//summary email should go out 24 hours after the deep summary, asking for feedback and testimonials

async function scheduleTestimonialInviteEmail(email, content) {
  try {
    const scheduleTime =
      Date.now() +
      SCHEDULE_DELAY_MS +
      FOLLOW_UP_DELAY_MS +
      TESTIMONIAL_INVITE_DELAY_MS;

    const response = await fetch(SCHEDULED_EMAIL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        subject: "Summary",
        body: content || summary(),
        scheduled_time: scheduleTime,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      console.error(
        "Testimonial Invite Email API Error:",
        response.status,
        errorBody
      );
    }
  } catch (error) {
    console.error("Testimonial Invite Email Request Failed:", error);
  }
}
//how it works email should go out 24 hours after the testimonial invite, providing more information about the service and how to get the most out of it

async function scheduleHowItWorksEmail(email) {
  try {
    const scheduleTime =
      Date.now() +
      SCHEDULE_DELAY_MS +
      FOLLOW_UP_DELAY_MS +
      TESTIMONIAL_INVITE_DELAY_MS +
      HOW_IT_WORKS_DELAY_MS;

    const response = await fetch(SCHEDULED_EMAIL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        subject: "There Is Depth Here. Let Me Show You.",
        body: howItWorks(),
        scheduled_time: scheduleTime,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      console.error(
        "How It Works Email API Error:",
        response.status,
        errorBody
      );
    }
  } catch (error) {
    console.error("How It Works Email Request Failed:", error);
  }
}
//closing email should go out 24 hours after the how it works email, providing a final message and encouraging the user to stay engaged with the service

async function scheduleClosingEmail(email) {
  try {
    const scheduleTime =
      Date.now() +
      SCHEDULE_DELAY_MS +
      FOLLOW_UP_DELAY_MS +
      TESTIMONIAL_INVITE_DELAY_MS +
      HOW_IT_WORKS_DELAY_MS +
      CLOSING_DELAY_MS;

    const response = await fetch(SCHEDULED_EMAIL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        subject: "Stay with this.",
        body: closing(),
        scheduled_time: scheduleTime,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      console.error("Closing Email API Error:", response.status, errorBody);
    }
  } catch (error) {
    console.error("Closing Email Request Failed:", error);
  }
}

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
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Mama's Medicine" <${MAIL_USER}>`,
      to: email,
      subject: "You are in",
      html: getFirstEmail(),
    });

    const { deep: deepHTML, summary: summaryHTML } = generateSoulReadingHTML(insight);

    await scheduleDeepSummaryEmail(email, deepHTML);
    await scheduleFollowUpEmail(email);
    await scheduleTestimonialInviteEmail(email, summaryHTML);
    await scheduleHowItWorksEmail(email);
    await scheduleClosingEmail(email);

    return Response.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

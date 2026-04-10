export default function summaryFormat(html) {
  return `
<html>

<body style="
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;
      color: #333;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    ">
  <!-- Header Image -->
  <img
    src="https://mamas-medicine-frontend.vercel.app/email-summary-header.png" "
      alt=""
      width=" 100%" style="width: 100%; max-width: 100%; height: auto; display: block" />

  <!-- Container -->
  <div style="
        width: 100%;
        max-width: 100%;
        margin: 0 auto;
        padding: 40px 20px;
        box-sizing: border-box;
    ">
      ${html}
    </div>

    <!-- Image -->
    <img
      src="https://mamas-medicine-frontend.vercel.app/email-summary-body.png"
      alt="" style=" width: 100%; max-width: 100%; height: auto; display: block; margin: 20px 0; " />

    <!-- Footer Section -->
    <div style=" margin-top: 40px; font-size: 14px; color: #555">
    <p>Your reading is also saved in your private portal here → [link]</p>
    <p>I’ve loved mapping this with you.</p>
    <p>Warmly,</p>

    <img
      src="https://mamas-medicine-frontend.vercel.app/email-logo.png"
      alt="" style="width: 160px; height: auto; margin: 10px 0" />

    <p>Founder, Mama’s Medicine</p>
    <p style="color: #888; font-size: 13px">
      P.S. This work spreads quietly, from one conversation to the next. If
      it felt meaningful, passing it on helps another family find a little
      more ease.
    </p>
  </div>
  </div>
</body>

</html>
`;
}

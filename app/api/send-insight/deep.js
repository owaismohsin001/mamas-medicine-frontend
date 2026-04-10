export default function deepFormat(html) {
  return `
<html>

<body style="
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;
      color: #333;
      line-height: 1.6;
    ">
  <!-- Header Image -->
  <img
    src="/email-deep-header.png""
      alt=""
      width=" 100%" style="max-width: 100%; height: auto; display: block" />

  <!-- Container -->
  <div style="
        width: 100%;
        margin: 0 auto;
        background: #ffffff;
        padding: 40px 20px;
        box-sizing: border-box;
      ">
      ${html}
    </div>

    <!-- Image -->
    <img
      src="/email-deep-body.png" width=" 100%" style="max-width: 100%; height: auto; display: block; margin: 20px 0" />

    <!-- Footer Section -->
    <div style="margin-top: 30px">
      <p>Your reading is also saved in your private portal here → [link]</p>
      <p>I’ve loved mapping this with you.</p>
      <p>Warmly,</p>

      <img
        src="/email-logo.png"
        alt="" width="160" style="display: block; margin: 10px 0" />

      <p>Founder, Mama’s Medicine</p>

      <p style="font-size: 13px; color: #888; margin-top: 20px">
        P.S. This work spreads quietly, from one conversation to the next. If
        it felt meaningful, passing it on helps another family find a little
        more ease.
      </p>
    </div>
  </div>
</body>

</html>
  `
}
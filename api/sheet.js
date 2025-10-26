// api/sheet.js — проксі до Google Apps Script (CommonJS)
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(200).send("ok");
  }

  try {
    const body =
      typeof req.body === "string" ? req.body : JSON.stringify(req.body || {});

    // Node 18 на Vercel має вбудований fetch
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("sheet proxy error:", err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
};

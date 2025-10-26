// api/sheet.js — проксі до Google Apps Script (CommonJS, без ESM)
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(200).send("ok"); // ручний тест GET
  }

  try {
    if (!APPS_SCRIPT_URL) {
      return res.status(500).json({ ok: false, error: "APPS_SCRIPT_URL is missing" });
    }

    // Тіло: об'єкт або рядок — приводимо до JSON-рядка
    const bodyStr = typeof req.body === "string" ? req.body : JSON.stringify(req.body || {});

    // Форвард у Apps Script (приймає і application/json, і text/plain)
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: bodyStr,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("sheet proxy error:", err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
};

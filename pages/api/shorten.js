import { nanoid } from "nanoid";
import { saveShortUrl } from "../../lib/urlDatabase";

function normalizeUrl(rawUrl) {
  const candidate = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

export default async function shorten(req, res) {
  if (req.method === "POST") {
    const { url } = req.body;
    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "A valid URL is required" });
    }

    const normalizedUrl = normalizeUrl(url.trim());
    if (!normalizedUrl) {
      return res.status(400).json({ error: "Please provide a valid http(s) URL" });
    }

    const id = nanoid(6);
    await saveShortUrl(id, normalizedUrl);
    res.status(201).json({ id });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

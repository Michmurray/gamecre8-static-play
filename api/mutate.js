// /api/mutate.js — applies quick upgrades and returns new config

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch {} }
  const { config, upgrade } = body || {};
  if (!config || !upgrade) {
    return res.status(400).json({ error: "Missing config or upgrade" });
  }

  const out = JSON.parse(JSON.stringify(config)); // clone

  switch (upgrade) {
    case "triple_shot":
      out.gameplay.tripleShot = true;
      out.gameplay.bulletCooldown = Math.max(6, out.gameplay.bulletCooldown - 2);
      break;
    case "faster_enemies":
      out.gameplay.enemySpeedMultiplier = (out.gameplay.enemySpeedMultiplier || 1) * 1.25;
      out.gameplay.enemySpawnBase = out.gameplay.enemySpawnBase * 1.15;
      break;
    case "rapid_fire":
      out.gameplay.bulletCooldown = Math.max(4, out.gameplay.bulletCooldown - 3);
      break;
    case "more_meteors":
      out.gameplay.meteorMultiplier = (out.gameplay.meteorMultiplier || 1) * 1.4;
      break;
    default:
      return res.status(400).json({ error: "Unknown upgrade" });
  }

  return res.status(200).json(out);
}

// /api/generate.js — uses your repo's exact file paths (works with ASSETS_BASE set to raw GitHub OR Supabase)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const ASSETS_BASE = (process.env.ASSETS_BASE || "").replace(/\/+$/, "");
  if (!ASSETS_BASE) {
    return res.status(500).json({ error: "ASSETS_BASE env var is missing" });
  }

  // IMPORTANT: these paths match your repo:
  // - Backgrounds/black.png            ✅
  // - Spritesheet/playerShip1_blue.png ✅ (no "Players/" folder)
  // - Enemies/enemyBlue3.png           ✅
  // - Meteors/meteorBrown_big1.png     ✅
  // - Lasers/laserBlue06.png           ✅
  const config = {
    meta: { template: "galaxy_blaster", seed: Date.now() },
    sprites: {
      background: `${ASSETS_BASE}/Backgrounds/black.png`,
      player:     `${ASSETS_BASE}/Spritesheet/playerShip1_blue.png`,
      enemy:      `${ASSETS_BASE}/Enemies/enemyBlue3.png`,
      meteor:     `${ASSETS_BASE}/Meteors/meteorBrown_big1.png`,
      bullet:     `${ASSETS_BASE}/Lasers/laserBlue06.png`
    },
    gameplay: {
      playerSpeed: 4.2,
      bulletCooldown: 9,
      enemySpeedBase: 2.6,
      enemySpawnBase: 0.024,
      meteorSpawnBase: 0.02,
      tripleShot: false,
      enemySpeedMultiplier: 1,
      meteorMultiplier: 1
    }
  };

  return res.status(200).json(config);
}

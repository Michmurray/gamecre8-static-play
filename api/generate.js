// /api/generate.js — minimal, known-good paths
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const ASSETS_BASE = (process.env.ASSETS_BASE || "").replace(/\/+$/, "");
  if (!ASSETS_BASE) {
    return res.status(500).json({ error: "ASSETS_BASE env var is missing" });
  }

  // Use the exact Kenney file names/paths you uploaded
  const config = {
    meta: { template: "galaxy_blaster", seed: Date.now(), prompt: "" },
    sprites: {
      background: `${ASSETS_BASE}/Backgrounds/black.png`,
      player:     `${ASSETS_BASE}/Spritesheet/Players/playerShip1_blue.png`,
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

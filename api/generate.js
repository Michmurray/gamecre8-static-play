// /api/generate.js  — returns game config using your Supabase bucket (ASSETS_BASE)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch {} }
  const { prompt = "" } = body || {};

  const ASSETS_BASE = (process.env.ASSETS_BASE || "").replace(/\/+$/, "");
  if (!ASSETS_BASE) {
    return res.status(500).json({ error: "ASSETS_BASE env var is missing" });
  }

  // simple palette switch from prompt word
  const p = String(prompt).toLowerCase();
  const palette = p.includes("green")
    ? { player: "Spritesheet/Players/playerShip2_green.png", laser: "Lasers/laserGreen06.png", enemy: "Enemies/enemyGreen3.png" }
    : p.includes("red")
    ? { player: "Spritesheet/Players/playerShip1_red.png",   laser: "Lasers/laserBlue06.png",  enemy: "Enemies/enemyRed3.png" }
    : { player: "Spritesheet/Players/playerShip1_blue.png",  laser: "Lasers/laserBlue06.png",  enemy: "Enemies/enemyBlue3.png" };

  const config = {
    meta: { template: "galaxy_blaster", seed: Date.now(), prompt },
    sprites: {
      background: `${ASSETS_BASE}/Backgrounds/black.png`,
      player:     `${ASSETS_BASE}/${palette.player}`,
      enemy:      `${ASSETS_BASE}/${palette.enemy}`,
      meteor:     `${ASSETS_BASE}/Meteors/meteorBrown_big1.png`,
      bullet:     `${ASSETS_BASE}/${palette.laser}`
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

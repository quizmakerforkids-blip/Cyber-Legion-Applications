const { json, getSupabase } = require("./_shared");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed." });

  try {
    const body = JSON.parse(event.body || "{}");
    const role = String(body.application_role || "").trim().slice(0, 80);
    const roblox = String(body.roblox_username || "").trim().slice(0, 80);
    const discord = String(body.discord_username || "").trim().slice(0, 80);
    const answers = body.answers;

    if (!role || !roblox || !discord || !answers || typeof answers !== "object") {
      return json(400, { error: "Position, Roblox username, Discord username, and answers are required." });
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("applications")
      .insert({
        application_role: role,
        roblox_username: roblox,
        discord_username: discord,
        answers
      })
      .select("id, created_at")
      .single();

    if (error) throw error;
    return json(201, { success: true, id: data.id, created_at: data.created_at });
  } catch (error) {
    console.error(error);
    return json(500, { error: "Could not submit the application." });
  }
};

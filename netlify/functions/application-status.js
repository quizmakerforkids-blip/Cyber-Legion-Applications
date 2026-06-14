const { json, getSupabase } = require("./_shared");

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") return json(405, { error: "Method not allowed." });

  try {
    const id = String(event.queryStringParameters?.id || "").trim();
    const code = String(event.queryStringParameters?.code || "").trim();

    if (!id || !code) return json(400, { error: "Tracking details are missing." });

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("applications")
      .select("id, application_role, roblox_username, discord_username, answers, status, created_at")
      .eq("id", id)
      .eq("tracking_code", code)
      .single();

    if (error || !data) return json(404, { error: "Application not found." });
    return json(200, { application: data });
  } catch (error) {
    console.error(error);
    return json(500, { error: "Could not load the application." });
  }
};
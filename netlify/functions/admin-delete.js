const { json, getSupabase, verifyToken } = require("./_shared");

exports.handler = async (event) => {
  if (event.httpMethod !== "DELETE") return json(405, { error: "Method not allowed." });
  if (!verifyToken(event)) return json(401, { error: "Unauthorized." });

  try {
    const body = JSON.parse(event.body || "{}");
    const id = String(body.id || "").trim();
    if (!id) return json(400, { error: "Application ID is required." });

    const supabase = getSupabase();
    const { error } = await supabase.from("applications").delete().eq("id", id);
    if (error) throw error;

    return json(200, { success: true });
  } catch (error) {
    console.error(error);
    return json(500, { error: "Could not delete the application." });
  }
};

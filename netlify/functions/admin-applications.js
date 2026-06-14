const { json, getSupabase, verifyToken } = require("./_shared");

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") return json(405, { error: "Method not allowed." });
  if (!verifyToken(event)) return json(401, { error: "Unauthorized." });

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return json(200, { applications: data || [] });
  } catch (error) {
    console.error(error);
    return json(500, { error: "Could not load applications." });
  }
};

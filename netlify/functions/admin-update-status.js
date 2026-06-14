const { json, getSupabase, verifyToken } = require("./_shared");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed." });
  if (!verifyToken(event)) return json(401, { error: "Unauthorized." });

  try {
    const body = JSON.parse(event.body || "{}");
    const id = String(body.id || "").trim();
    const status = String(body.status || "").trim();
    const allowed = ["Pending", "Under Review", "Accepted", "Rejected"];

    if (!id || !allowed.includes(status)) {
      return json(400, { error: "Invalid application or status." });
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;
    return json(200, { success: true, application: data });
  } catch (error) {
    console.error(error);
    return json(500, { error: "Could not update status." });
  }
};
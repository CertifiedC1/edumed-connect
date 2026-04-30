import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subject, content, recipient, from_name, reply_to, reply_name, is_html } = await req.json();

    if (!subject || !content || !recipient) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailRes = await fetch("https://www.fixafrica.co.ke/carenthusiast/api/email/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject,
        content,
        recipient,
        from_name: from_name || "Edumed Trust Website",
        reply_to: reply_to || "",
        reply_name: reply_name || "",
        is_html: is_html !== false,
      }),
    });

    const responseText = await emailRes.text();
    console.log("Email API response:", emailRes.status, responseText);

    return new Response(JSON.stringify({ success: true, status: emailRes.status }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

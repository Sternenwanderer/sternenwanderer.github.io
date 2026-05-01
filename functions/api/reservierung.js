import config from "../../_data/reservierung.json";

const GAS_URL = config.spreadsheet_deployment;

export async function onRequestGet() {
  const res = await fetch(GAS_URL, { redirect: "follow", cache: "no-store" });
  const body = await res.arrayBuffer();
  return new Response(body, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("Content-Type") || "application/json",
      "Cache-Control": "no-store",
    },
  });
}

export async function onRequestPost(context) {
  const body = await context.request.text();
  const res = await fetch(GAS_URL, {
    method: "POST",
    body,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    redirect: "follow",
  });
  const text = await res.text();
  return new Response(text, {
    status: res.status,
    headers: { "Content-Type": "text/plain" },
  });
}

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbw0R82m2vEGMHNE2XFkHG4f3Og6Ud_DdMZofKiVZqesKlDjFaDbpdscu_nwGieW8PD5/exec";

export async function onRequestGet() {
  const res = await fetch(GAS_URL, { redirect: "follow" });
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

// Cloudflare Pages Function
// 路徑對應：/api/data
// 需要在 Cloudflare Pages 專案設定 > Functions > KV namespace bindings
// 綁定一個叫做 CLASSROOM_KV 的 KV namespace，本檔案才能運作。

const KEY = "state";
const DEFAULT_STATE = JSON.stringify({ classes: {}, currentClassId: null });

export async function onRequestGet(context) {
  const { env } = context;
  if (!env.CLASSROOM_KV) {
    return new Response(
      JSON.stringify({ error: "尚未綁定 CLASSROOM_KV，請至 Cloudflare Pages 設定 KV namespace" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
  const data = await env.CLASSROOM_KV.get(KEY);
  return new Response(data || DEFAULT_STATE, {
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!env.CLASSROOM_KV) {
    return new Response(
      JSON.stringify({ error: "尚未綁定 CLASSROOM_KV，請至 Cloudflare Pages 設定 KV namespace" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
  let body;
  try {
    body = await request.text();
    JSON.parse(body); // 驗證是合法 JSON，不合法就丟出錯誤
  } catch (e) {
    return new Response(JSON.stringify({ error: "資料格式不正確" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  await env.CLASSROOM_KV.put(KEY, body);
  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
}

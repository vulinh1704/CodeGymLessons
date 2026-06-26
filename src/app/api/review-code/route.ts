import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { studentCode, targetCode } = await req.json();

  if (!studentCode || !targetCode) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "⚠️ Chưa cấu hình `OPENROUTER_API_KEY` trong `.env.local`." }, { status: 500 });
  }

  const model = process.env.OPENROUTER_MODEL ?? "openrouter/auto";
  const siteUrl = process.env.OPENROUTER_SITE_URL ?? "";
  const appName = process.env.OPENROUTER_APP_NAME ?? "";

  const prompt = `Bạn là giáo viên HTML. So sánh code học viên với code mẫu, nhận xét ngắn gọn bằng tiếng Việt.

Quy tắc bắt buộc:
- Chỉ nhận xét về cú pháp HTML, thẻ, thuộc tính, cấu trúc lồng nhau
- Bỏ qua khoảng trắng và thụt lề
- Mỗi lỗi chỉ nêu 1 lần, không lặp lại
- Mỗi block code chỉ minh họa đúng phần cần sửa (1-3 dòng), KHÔNG copy nguyên code học viên
- Tối đa 5 lỗi. Nếu có nhiều hơn, chọn lỗi quan trọng nhất

Định dạng (Markdown):
- Nếu đúng: "✅ Code của bạn chính xác! ..."
- Nếu có lỗi:
  - Mỗi lỗi: mô tả ngắn + block \`\`\`html chỉ chứa dòng cần sửa
  - Cuối: 1 câu tổng kết

Code mẫu:
\`\`\`html
${targetCode}
\`\`\`

Code học viên:
\`\`\`html
${studentCode}
\`\`\``;

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": siteUrl,
        "X-Title": appName,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("OpenRouter error:", err);
      if (res.status === 429) {
        return NextResponse.json({ error: "⚠️ **Vượt giới hạn request.** Vui lòng thử lại sau ít phút." }, { status: 429 });
      }
      if (res.status === 401) {
        return NextResponse.json({ error: "⚠️ **API key không hợp lệ.** Kiểm tra lại `OPENROUTER_API_KEY`." }, { status: 401 });
      }
      return NextResponse.json({ error: "⚠️ Lỗi từ OpenRouter. Vui lòng thử lại." }, { status: 500 });
    }

    const data = await res.json();
    const feedback = data.choices?.[0]?.message?.content ?? "Không có phản hồi.";
    return NextResponse.json({ feedback });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "⚠️ Lỗi kết nối. Vui lòng thử lại." }, { status: 500 });
  }
}

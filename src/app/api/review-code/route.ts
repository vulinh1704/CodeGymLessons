import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

export async function POST(req: NextRequest) {
  const { studentCode, targetCode } = await req.json();

  if (!studentCode || !targetCode) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Bạn là giáo viên HTML. Hãy so sánh code của học viên với code mẫu và đưa ra nhận xét ngắn gọn bằng tiếng Việt.

**Tập trung vào:**
- Cú pháp HTML (thẻ, thuộc tính, cấu trúc lồng nhau)
- Các lỗi hoặc thiếu sót quan trọng
- Không cần nhận xét về khoảng trắng hay thụt lề

**Định dạng phản hồi (dùng Markdown):**
- Nếu code đúng: khen ngắn gọn ✅
- Nếu có lỗi: liệt kê từng lỗi bằng dấu đầu dòng, kèm đoạn code minh họa trong block \`\`\`html
- Cuối cùng: 1-2 câu lời khuyên tổng quát

**Code mẫu:**
\`\`\`html
${targetCode}
\`\`\`

**Code của học viên:**
\`\`\`html
${studentCode}
\`\`\``;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return NextResponse.json({ feedback: text });
  } catch (err: unknown) {
    console.error(err);
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("429") || msg.includes("quota") || msg.includes("Too Many Requests")) {
      return NextResponse.json(
        { error: "⚠️ **Gemini API đã vượt giới hạn.** Vui lòng thử lại sau hoặc kiểm tra quota tại [Google AI Studio](https://aistudio.google.com)." },
        { status: 429 }
      );
    }
    if (msg.includes("API key") || msg.includes("401")) {
      return NextResponse.json(
        { error: "⚠️ **API key không hợp lệ.** Kiểm tra lại `GEMINI_API_KEY` trong `.env.local`." },
        { status: 401 }
      );
    }
    return NextResponse.json({ error: "⚠️ Lỗi kết nối Gemini. Vui lòng thử lại." }, { status: 500 });
  }
}

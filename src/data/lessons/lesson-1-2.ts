import type { Lesson } from "../types";

export const lesson1_2: Lesson = {
  id: "lesson-1-2",
  title: "Bài 2: Sử dụng AI hiệu quả khi học lập trình",
  duration: "2 giờ",
  objective:
    "Học viên biết cách dùng AI để hỏi đúng, hiểu code nhanh hơn, sửa lỗi có hướng dẫn và áp dụng ngay vào bài HTML đầu tiên.",
  slides: [
    {
      id: "ai-intro",
      title: "Sử dụng AI hiệu quả khi học lập trình",
      displayNumber: "01",
      eyebrow: "Module 1 / Bài 2",
      icon: "fa-robot",
      tone: "intro",
      body: [
        "Buổi học này giúp bạn biến AI thành công cụ học tập: biết hỏi rõ, biết yêu cầu ví dụ và biết kiểm tra lại trước khi dùng code.",
        "Kết thúc buổi học, bạn sẽ có 3 công thức prompt cốt lõi để tự học HTML, đọc hiểu code và xử lý lỗi tốt hơn.",
      ],
      callout: {
        label: "Mục tiêu",
        text: "Không phải dùng AI để chép câu trả lời. Mà là dùng AI để học nhanh hơn, hiểu sâu hơn và tự làm được.",
      },
    },
    {
      id: "ai-role",
      title: "AI là người hướng dẫn 24/7",
      displayNumber: "02",
      eyebrow: "AI trong học tập",
      icon: "fa-robot",
      tone: "concept",
      body: [
        "Khi gặp kiến thức mới hoặc bài tập khó, bạn thường làm gì? Google, YouTube, hỏi bạn, hỏi giảng viên — AI là thêm một lựa chọn.",
        "AI giống như bạn học luôn trực tuyến, sẵn sàng giải thích lại bất cứ lúc nào, không ngại câu hỏi lặp.",
      ],
      callout: {
        label: "Vai trò của AI",
        text: "Không phải người trả lời thay bạn. Mà là người giúp bạn hiểu câu trả lời.",
      },
      visual: {
        src: "/lesson-assets/ai-guide.svg",
        alt: "Minh họa AI như người hướng dẫn học tập trực tuyến 24/7.",
      },
    },
    {
      id: "ai-demo-compare",
      title: "Demo: Câu hỏi càng rõ, kết quả càng hữu ích",
      displayNumber: "02.1",
      isSubSlide: true,
      eyebrow: "Demo nhanh",
      icon: "fa-flask",
      tone: "practice",
      body: [
        "Thử hai câu hỏi với AI và so sánh kết quả trực tiếp trong lớp.",
      ],
      copyPrompts: [
        {
          label: "Prompt 1",
          prompt: "HTML là gì?",
        },
        {
          label: "Prompt 2",
          prompt: "Giải thích HTML như tôi là người chưa từng học lập trình.",
        },
      ],
      checklist: [
        "So sánh: độ rõ, độ chi tiết và độ hữu ích của hai câu trả lời",
      ],
      callout: {
        label: "Kết luận quan sát",
        text: "Cùng một AI, cùng một câu hỏi cơ bản — nhưng câu hỏi rõ hơn cho kết quả hoàn toàn khác.",
      },
    },
    {
      id: "ai-context",
      title: "Bí mật: Context quyết định chất lượng câu trả lời",
      displayNumber: "03",
      eyebrow: "Nguyên tắc cơ bản",
      icon: "fa-key",
      tone: "concept",
      body: [
        "AI không tự biết bạn là ai, bạn đang học gì và bạn muốn kết quả như thế nào. Bạn phải nói cho nó biết.",
        "AI không thông minh hơn khi bạn đổi công cụ. AI thông minh hơn khi bạn đặt câu hỏi rõ ràng hơn.",
      ],
      checklist: [
        "Chưa tốt: \"Dạy tôi HTML\"",
        "Tốt hơn: \"Tôi là người mới học lập trình. Hãy dạy tôi HTML từ đầu. Giải thích đơn giản, có ví dụ thực tế.\"",
      ],
      callout: {
        label: "Quy tắc vàng",
        text: "Thêm context = nhận được câu trả lời phù hợp đúng với trình độ và nhu cầu của bạn.",
      },
    },
    {
      id: "ai-3-formulas",
      title: "3 Công thức prompt quan trọng nhất",
      displayNumber: "04",
      eyebrow: "Hộp công cụ",
      icon: "fa-toolbox",
      tone: "concept",
      body: [
        "Thay vì nhớ 20 kỹ thuật, hãy thuộc 3 công thức này. Chúng xử lý được 80% tình huống bạn gặp khi học HTML.",
        "Click từng thẻ để xem mô tả và khi nào dùng.",
      ],
      keywordCards: [
        {
          term: "3W",
          title: "What · Who · Way",
          description: "Công thức mở đầu: cho AI biết bạn muốn học gì, bạn là ai và muốn học như thế nào.",
          icon: "fa-bullseye",
          detail: "Dùng khi bắt đầu học chủ đề mới hoặc muốn AI giải thích đúng trình độ của bạn.",
          example: "\"Tôi là người mới học (Who). Tôi muốn học thẻ img (What). Giải thích dễ hiểu, có ví dụ (Way).\"",
        },
        {
          term: "G→V→B",
          title: "Giải thích → Ví dụ → Bài tập",
          description: "Công thức học chủ động: yêu cầu AI dạy đúng thứ tự của việc học thật sự.",
          icon: "fa-graduation-cap",
          detail: "Dùng khi muốn học một khái niệm mới và thực sự hiểu thay vì chỉ đọc lý thuyết.",
          example: "\"Giải thích thẻ h1. Sau đó cho ví dụ. Sau đó cho bài tập — đừng đưa đáp án ngay.\"",
        },
        {
          term: "Debug",
          title: "Tìm lỗi · Giải thích · Sửa · Tại sao",
          description: "Công thức sửa lỗi: không chỉ lấy code đúng mà còn hiểu tại sao code cũ sai.",
          icon: "fa-bug",
          detail: "Dùng mỗi khi code không chạy đúng. Yêu cầu AI giải thích nguyên nhân thay vì chỉ đưa kết quả sửa.",
          example: "\"Đây là code: [...]. Lỗi tôi gặp: [...]. Hãy giải thích lỗi, chỉ vị trí và hướng dẫn sửa.\"",
        },
      ],
    },
    {
      id: "formula-3w",
      title: "Công thức 1: 3W — What, Who, Way",
      displayNumber: "05",
      eyebrow: "Công thức 1 / 3",
      icon: "fa-bullseye",
      tone: "concept",
      body: [
        "Ba yếu tố AI cần biết để trả lời đúng trình độ và nhu cầu của bạn.",
      ],
      keywordCards: [
        {
          term: "Who",
          title: "Bạn là ai?",
          description: "Trình độ và kinh nghiệm của bạn ảnh hưởng đến cách AI giải thích.",
          icon: "fa-user",
          detail: "\"Người mới học lập trình\" sẽ nhận được giải thích đơn giản hơn \"sinh viên CNTT năm 2\".",
          example: "\"Tôi là người chưa từng học lập trình, đang học khóa CodeGym.\"",
        },
        {
          term: "What",
          title: "Muốn học gì?",
          description: "Chủ đề, khái niệm hoặc kỹ năng cụ thể bạn cần giải thích.",
          icon: "fa-lightbulb",
          detail: "Càng cụ thể càng tốt: \"thẻ img trong HTML\" rõ hơn \"HTML\".",
          example: "\"Tôi muốn học cách dùng thẻ img để thêm hình ảnh vào trang web.\"",
        },
        {
          term: "Way",
          title: "Học như thế nào?",
          description: "Phong cách giải thích, độ chi tiết và loại ví dụ bạn muốn nhận.",
          icon: "fa-gear",
          detail: "\"Dễ hiểu, ví dụ thực tế\" vs \"ngắn gọn\" vs \"từng bước có code mẫu\" — mỗi cách cho kết quả khác.",
          example: "\"Hãy giải thích dễ hiểu và cho ví dụ thực tế có thể dùng ngay.\"",
        },
      ],
      visual: {
        src: "/lesson-assets/formula-3w.svg",
        alt: "Sơ đồ ba yếu tố WHO, WHAT, WAY kết hợp tạo câu prompt hiệu quả.",
      },
    },
    {
      id: "formula-3w-apply",
      title: "Ví dụ áp dụng Công thức 3W",
      displayNumber: "05.1",
      isSubSlide: true,
      eyebrow: "Thực hành",
      icon: "fa-pen-to-square",
      tone: "practice",
      body: [
        "Ghép ba yếu tố lại thành một prompt hoàn chỉnh — ngắn gọn, đủ context, rõ mục tiêu.",
      ],
      copyPrompts: [
        {
          label: "Prompt hoàn chỉnh",
          prompt:
            "Tôi là sinh viên mới học lập trình. Tôi muốn học thẻ img trong HTML. Hãy giải thích dễ hiểu và cho ví dụ thực tế.",
        },
      ],
      checklist: [
        "Who: \"Tôi là sinh viên mới học lập trình\"",
        "What: \"Tôi muốn học thẻ img trong HTML\"",
        "Way: \"Hãy giải thích dễ hiểu và cho ví dụ thực tế\"",
      ],
      callout: {
        label: "Cách dùng",
        text: "Bấm nút copy, dán vào AI và thay phần Who/What/Way bằng tình huống của bạn.",
      },
    },
    {
      id: "formula-explain",
      title: "Công thức 2: Giải thích → Ví dụ → Bài tập",
      displayNumber: "06",
      eyebrow: "Công thức 2 / 3",
      icon: "fa-graduation-cap",
      tone: "concept",
      body: [
        "Đây là công thức học tập hiệu quả nhất khi bắt đầu một khái niệm mới.",
        "Thay vì chỉ đọc lý thuyết, bạn yêu cầu AI dạy theo đúng quy trình: hiểu → xem → tự làm.",
      ],
      checklist: [
        "Bước 1 — Giải thích: yêu cầu AI mô tả khái niệm theo ngôn ngữ đơn giản",
        "Bước 2 — Ví dụ: yêu cầu AI cho ví dụ code cụ thể có thể chạy được",
        "Bước 3 — Bài tập: yêu cầu bài tập và đừng đưa đáp án ngay",
      ],
      callout: {
        label: "Ví dụ prompt",
        text: "Giải thích thẻ h1 trong HTML. Sau đó cho ví dụ. Sau đó cho bài tập thực hành — không đưa đáp án ngay.",
      },
    },
    {
      id: "formula-debug",
      title: "Công thức 3: Sửa lỗi với AI",
      displayNumber: "07",
      eyebrow: "Công thức 3 / 3",
      icon: "fa-bug",
      tone: "practice",
      body: [
        "Đây là công thức bạn sẽ dùng nhiều nhất. Mục tiêu không phải lấy code đúng — mà là hiểu tại sao code cũ sai.",
      ],
      checklist: [
        "Dán toàn bộ code của bạn vào (dù đang có lỗi)",
        "Mô tả lỗi bạn gặp: thông báo lỗi hoặc hành vi sai bạn quan sát thấy",
        "Yêu cầu: (1) giải thích lỗi, (2) chỉ vị trí, (3) hướng dẫn sửa, (4) giải thích tại sao cần sửa như vậy",
      ],
      callout: {
        label: "Quan trọng",
        text: "Đừng chỉ hỏi \"Sửa giúp tôi\" — hãy yêu cầu giải thích để bạn không gặp lỗi đó lần thứ hai.",
      },
      visual: {
        src: "/lesson-assets/debug-formula.svg",
        alt: "Sơ đồ 4 bước sửa lỗi code với AI: dán code, mô tả lỗi, AI giải thích, hiểu và sửa.",
      },
    },
    {
      id: "formula-debug-example",
      title: "Ví dụ sửa lỗi HTML với AI",
      displayNumber: "07.1",
      isSubSlide: true,
      eyebrow: "Demo sửa lỗi",
      icon: "fa-code",
      tone: "practice",
      body: [
        "Code HTML có lỗi — thử dùng AI theo đúng công thức 4 bước.",
      ],
      copyPrompts: [
        {
          label: "Prompt sửa lỗi",
          prompt:
            "Đây là code của tôi: <h1>Xin chào  (thiếu thẻ đóng)</p>. Lỗi tôi gặp là tiêu đề h1 không hiển thị đúng. Hãy giải thích lỗi, chỉ vị trí sai, hướng dẫn sửa và nói tại sao cần sửa như vậy.",
        },
      ],
      checklist: [
        "Lỗi quan sát thấy: tiêu đề h1 không hiển thị đúng",
        "Đọc và hiểu giải thích trước khi dùng code đã sửa",
      ],
      callout: {
        label: "Nhận xét",
        text: "Lỗi thiếu thẻ đóng </h1> — AI sẽ giải thích cấu trúc đóng-mở của HTML và bạn sẽ không quên lần sau.",
      },
    },
    {
      id: "demo-html-ai",
      title: "Demo: Học HTML cùng AI",
      displayNumber: "08",
      eyebrow: "Demo thực tế",
      icon: "fa-laptop-code",
      tone: "practice",
      body: [
        "Xem demo ba prompt học HTML theo đúng thứ tự từ dễ đến phức tạp.",
        "Sau mỗi demo: AI không chỉ viết code — AI còn giúp bạn hiểu code đó.",
      ],
      copyPrompts: [
        {
          label: "Prompt 1",
          prompt: "Tôi là người mới học. Giải thích HTML là gì. Cho ví dụ đơn giản.",
        },
        {
          label: "Prompt 2",
          prompt: "Giải thích các thẻ h1, p, img. Cho ví dụ dễ hiểu.",
        },
        {
          label: "Prompt 3",
          prompt:
            "Tạo trang giới thiệu bản thân bằng HTML đơn giản. Sau đó giải thích từng dòng code trên cho tôi.",
        },
      ],
      checklist: [
        "Dùng từng prompt theo đúng thứ tự từ dễ đến khó",
        "So sánh câu trả lời để thấy prompt càng rõ thì AI càng hữu ích",
      ],
      callout: {
        label: "Điểm mấu chốt",
        text: "AI không chỉ viết code — AI còn giúp bạn hiểu code. Luôn yêu cầu giải thích.",
      },
    },
    {
      id: "practice-group",
      title: "Tạo trang giới thiệu bản thân",
      displayNumber: "09",
      eyebrow: "Thực hành",
      icon: "fa-people-group",
      tone: "practice",
      body: [
        "Nhấn để xem các bước làm với AI và prompt mẫu cho từng bước.",
      ],
      keywordCards: [
        {
          term: "Xem chi tiết",
          title: "Các bước thực hiện với AI",
          description: "Nhấn để xem từng bước làm và prompt mẫu tương ứng.",
          icon: "fa-clipboard-list",
          detailSteps: [
            {
              step: "1. Chat để hiểu HTML",
              formula: "3W",
              guidance: "Trước khi viết code, hỏi AI để biết HTML là gì, dùng để làm gì và trang giới thiệu bản thân sẽ cần những thẻ nào.",
              prompt:
                "Tôi là người mới học (Who). Tôi muốn hiểu HTML là gì và cần những thẻ nào để làm trang giới thiệu bản thân (What). Hãy giải thích đơn giản, có ví dụ ngắn và dễ làm theo (Way).",
            },
            {
              step: "2. Tải và cài ứng dụng code",
              formula: "3W",
              guidance: "Chọn một ứng dụng code miễn phí, phổ biến và dễ dùng cho người mới, rồi cài trên máy.",
              prompt:
                "Tôi là người mới học (Who). Tôi muốn cài một ứng dụng code miễn phí, phổ biến và dễ dùng trên máy để bắt đầu làm bài HTML (What). Hãy hướng dẫn từng bước, thật chậm và dễ làm theo (Way).",
            },
            {
              step: "3. Mở file đầu tiên",
              formula: "3W",
              guidance: "Sau khi cài xong, tạo file HTML để bắt đầu bài thực hành.",
              prompt:
                "Tôi là người mới học (Who). Tôi muốn tạo file HTML đầu tiên trong ứng dụng code (What). Hãy hướng dẫn từng bước, ngắn gọn và dễ làm theo (Way).",
            },
            {
              step: "4. Xin mẫu khởi đầu",
              formula: "3W",
              guidance: "Nhờ AI gợi ý khung trang giới thiệu bản thân thật đơn giản.",
              prompt:
                "Tôi là người mới học (Who). Tôi muốn tạo trang giới thiệu bản thân gồm tên, tuổi, sở thích và 1 hình ảnh (What). Hãy cho mẫu HTML thật đơn giản, dễ hiểu (Way).",
            },
            {
              step: "5. Hiểu code trước khi dùng",
              formula: "Giải thích -> Ví dụ -> Bài tập",
              guidance: "Đọc lại code và yêu cầu AI giải thích từng phần để tránh copy mà không hiểu.",
              prompt:
                "Giải thích từng dòng code bên dưới cho tôi theo cách dễ hiểu. Sau đó cho tôi 1 ví dụ ngắn minh họa và 1 câu hỏi nhỏ để tự kiểm tra.",
            },
            {
              step: "6. Tự chỉnh theo bài học",
              formula: "3W",
              guidance: "Dùng những gì đã học để sửa trang cho phù hợp với mức của người mới.",
              prompt:
                "Tôi là người mới học (Who). Tôi muốn chỉnh trang này cho đơn giản hơn nhưng vẫn giữ nội dung chính (What). Hãy gợi ý cách sửa ngắn gọn, rõ ràng và phù hợp với người mới (Way).",
            },
            {
              step: "7. Kiểm tra và ghi nhớ",
              formula: "Debug",
              guidance: "Nhờ AI kiểm tra lỗi và tóm tắt lại điểm quan trọng để học viên tự nhớ bài.",
              prompt:
                "Đây là code của tôi: [...]. Lỗi tôi gặp là: [...]. Hãy giải thích lỗi, chỉ vị trí sai, hướng dẫn sửa và nói tại sao cần sửa như vậy.",
            },
          ],
        },
      ],
      visual: {
        src: "/lesson-assets/practice-group.svg",
        alt: "Minh họa học viên thực hành với laptop và AI hỗ trợ.",
      },
    },
    {
      id: "ai-summary",
      title: "Tổng kết: 3 điều cần nhớ",
      displayNumber: "10",
      eyebrow: "Cần nhớ",
      icon: "fa-flag-checkered",
      tone: "summary",
      body: [
        "AI sẽ theo suốt hành trình học lập trình của bạn. Ba nguyên tắc này giúp bạn dùng AI đúng cách từ đầu.",
        "Người biết đặt câu hỏi tốt sẽ học nhanh hơn người chỉ biết tìm đáp án.",
      ],
      checklist: [
        "Hỏi rõ hơn: thêm Who, What, Way thay vì hỏi ngắn gọn",
        "Luôn yêu cầu ví dụ — lý thuyết không đủ để code được",
        "Dùng AI để hiểu, không phải để chép — hỏi tại sao trước khi dùng code",
      ],
      callout: {
        label: "Thông điệp kết thúc",
        text: "AI không thay thế người học lập trình. AI giúp bạn học nhanh hơn, hiểu sâu hơn và tự tin hơn.",
      },
    },
  ],
};

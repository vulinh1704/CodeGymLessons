export type SlideTone = "intro" | "concept" | "practice" | "summary";

export type LessonVisual = {
  src: string;
  alt: string;
};

export type KeywordCard = {
  term: string;
  title: string;
  description: string;
  icon: string;
  detail?: string;
  detailSteps?: {
    step: string;
    formula?: string;
    guidance: string;
    prompt: string;
  }[];
  example?: string;
};

export type LessonSlide = {
  id: string;
  title: string;
  displayNumber?: string;
  isSubSlide?: boolean;
  eyebrow?: string;
  icon?: string;
  tone: SlideTone;
  body: string[];
  copyPrompts?: {
    label: string;
    prompt: string;
  }[];
  checklist?: string[];
  keywordCards?: KeywordCard[];
  callout?: {
    label: string;
    text: string;
  };
  visual?: LessonVisual;
};

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  objective: string;
  slides: LessonSlide[];
};

export type CourseModule = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  hidden?: boolean;
};

export function findLesson(lessonId: string): { module: CourseModule; lesson: Lesson } | null {
  for (const mod of curriculum) {
    for (const lesson of mod.lessons) {
      if (lesson.id === lessonId) return { module: mod, lesson };
    }
  }
  return null;
}

export const curriculum: CourseModule[] = [
  {
    id: "module-1",
    title: "Module 1",
    description: "Bootcamp Preparation 2.1",
    lessons: [
      {
        id: "lesson-1",
        title: "Bài 1: Học cách học",
        duration: "45-60 phút",
        objective:
          "Học viên xây được thói quen học bền vững: biết sắp xếp việc học, giữ tập trung, đặt câu hỏi đúng, thao tác máy tính cơ bản và tìm thông tin để tự học tốt hơn.",
        slides: [
          {
            id: "start",
            title: "Học tốt bắt đầu từ cách học",
            displayNumber: "01",
            eyebrow: "Bootcamp Preparation 2.1 / Bài 1",
            icon: "fa-graduation-cap",
            tone: "intro",
            body: [
              "Buổi học này không nhằm làm bạn nhớ nhiều hơn, mà giúp bạn học có nhịp điệu và ít bị quá tải hơn.",
              "Khi biết sắp xếp việc học, đặt câu hỏi đúng và tìm thông tin hiệu quả, bạn sẽ tự tin hơn ở những bài lập trình tiếp theo.",
            ],
            callout: {
              label: "Thông điệp chính",
              text: "Nền tảng học tốt giúp mọi bài sau đó nhẹ hơn, rõ hơn và dễ theo hơn.",
            },
          },
          {
            id: "plan",
            title: "Sắp xếp công việc hợp lý",
            displayNumber: "02",
            eyebrow: "Thói quen học tập",
            icon: "fa-list-check",
            tone: "concept",
            body: [
              "Viết việc cần làm ra giấy hoặc ghi chú trên máy tính để đầu óc không phải nhớ quá nhiều thứ cùng lúc.",
              "Chia việc học thành các mục nhỏ: cần đọc gì, cần thực hành gì, khi nào nộp bài và ai có thể hỗ trợ nếu bạn bị kẹt.",
            ],
            checklist: [
              "Ghi việc cần làm ngay sau buổi học",
              "Đánh dấu 1 việc quan trọng nhất của ngày",
              "Kết thúc buổi học bằng 5 phút tổng kết",
            ],
            visual: {
              src: "/lesson-assets/organize-notes.png",
              alt: "Minh họa màn hình laptop với các ghi chú công việc học tập.",
            },
          },
          {
            id: "focus",
            title: "Tập trung trong lớp",
            displayNumber: "02.1",
            isSubSlide: true,
            eyebrow: "Môi trường học",
            icon: "fa-bullseye",
            tone: "concept",
            body: [
              "Tập trung không chỉ là cố gắng hơn, mà là giảm tối đa những thứ kéo bạn ra khỏi bài học.",
              "Trong lớp, ưu tiên nghe ý chính trước, ghi lại từ khóa sau. Nếu mất mạch, hãy đánh dấu lại để hỏi đúng lúc thay vì bỏ qua.",
            ],
            checklist: [
              "Tắt thông báo không cần thiết",
              "Chỉ mở tài liệu đang dùng",
              "Ghi câu hỏi khi chưa kịp hỏi ngay",
            ],
            visual: {
              src: "/lesson-assets/focus-learning.png",
              alt: "Minh họa học viên tập trung học với laptop và bảng ghi chú phía sau.",
            },
          },
          {
            id: "motivation",
            title: "Tự tạo động lực học",
            displayNumber: "02.2",
            isSubSlide: true,
            eyebrow: "Năng lượng học tập",
            icon: "fa-fire-flame-curved",
            tone: "practice",
            body: [
              "Động lực không tự đến; nó được tạo ra khi bạn nhìn thấy mình đang tiến lên từng chút một.",
              "Khi thấy nản, đừng chờ cảm hứng. Hãy bắt đầu bằng một việc rất nhỏ: mở bài, sửa một lỗi, ghi lại điều chưa hiểu.",
            ],
            checklist: [
              "Mục tiêu gần: hôm nay hiểu 1 ý, làm xong 1 phần",
              "Theo dõi tiến bộ bằng checklist hoặc ghi chú ngắn",
              "Nhắc lại lý do mình bắt đầu học lập trình",
            ],
            callout: {
              label: "Câu nhắc khi bị kẹt",
              text: "Mình không cần giỏi ngay. Mình chỉ cần đi thêm một bước rõ ràng.",
            },
            visual: {
              src: "/lesson-assets/self-motivation.png",
              alt: "Minh họa chuyển từ cảm giác bế tắc sang mục tiêu học tập rõ ràng.",
            },
          },
          {
            id: "review",
            title: "Ôn tập và thực hành",
            displayNumber: "02.3",
            isSubSlide: true,
            eyebrow: "Biến kiến thức thành kỹ năng",
            icon: "fa-rotate-right",
            tone: "practice",
            body: [
              "Ôn tập giúp bạn giữ được kiến thức, còn thực hành giúp bạn nhìn thấy lỗi thật và cách xử lý thật.",
              "Sau mỗi buổi, hãy làm lại một ví dụ nhỏ, ghi lại lỗi gặp phải và cách đã sửa để lần sau không lặp lại.",
            ],
            callout: {
              label: "Công thức gợi ý",
              text: "10 phút đọc lại ghi chú, 20 phút thực hành, 5 phút viết lại điều mình đã hiểu rõ hơn.",
            },
          },
          {
            id: "question",
            title: "Đặt câu hỏi để tự học",
            displayNumber: "03",
            eyebrow: "Tư duy",
            icon: "fa-circle-question",
            tone: "practice",
            body: [
              "Đặt câu hỏi là cách nhanh nhất để biến một chỗ mơ hồ thành một việc có thể làm được.",
              "Hãy bắt đầu bằng What, Where, When, How: mình đang học cái gì, nó nằm ở đâu, khi nào dùng và làm bằng cách nào.",
            ],
            callout: {
              label: "Trước khi hỏi",
              text: "Thử tự trả lời bằng ghi chú, tài liệu và ví dụ. Nếu vẫn chưa rõ, hãy hỏi bằng một câu hỏi cụ thể.",
            },
            visual: {
              src: "/lesson-assets/ask-questions.png",
              alt: "Minh họa học viên suy nghĩ với bóng đèn và các dấu hỏi.",
            },
          },
          {
            id: "team",
            title: "Học cùng người khác",
            displayNumber: "03.1",
            isSubSlide: true,
            eyebrow: "Làm việc nhóm",
            icon: "fa-user-group",
            tone: "concept",
            body: [
              "Trao đổi với bạn học giúp bạn phát hiện cách hiểu khác và nối lại những phần kiến thức bị đứt quãng.",
              "Khi làm việc nhóm, đừng chỉ đưa kết quả. Hãy nói cách mình nghĩ để người khác thấy được cách bạn giải quyết vấn đề.",
            ],
            checklist: [
              "Giải thích lại bằng lời của mình",
              "Hỏi rõ phần mình chưa hiểu",
              "Chia sẻ ghi chú hoặc ví dụ hữu ích",
            ],
          },
          {
            id: "computer",
            title: "Thao tác máy tính cần nắm",
            displayNumber: "04",
            eyebrow: "Máy tính cơ bản",
            icon: "fa-computer",
            tone: "concept",
            body: [
              "Người mới học lập trình cần thoải mái với các thao tác nền tảng: bật tắt máy, dùng chuột, bàn phím, quản lý file, tìm kiếm web và tắt máy an toàn.",
              "Nếu gõ phím còn chậm, hãy luyện đều đặn. Tốc độ sẽ tăng tự nhiên khi tay quen vị trí phím và bạn bớt phải nhìn bàn phím.",
            ],
            checklist: [
              "Tạo, đổi tên, di chuyển file và thư mục",
              "Tìm file trong máy",
              "Mở trình duyệt và lưu trang cần đọc",
            ],
          },
          {
            id: "shortcuts",
            title: "Phím tắt nên dùng hằng ngày",
            displayNumber: "04.1",
            isSubSlide: true,
            eyebrow: "Windows",
            icon: "fa-keyboard",
            tone: "practice",
            body: [
              "Phím tắt giúp thao tác nhanh hơn và giữ dòng suy nghĩ không bị ngắt quãng.",
              "Bắt đầu với một nhóm nhỏ, dùng lặp lại mỗi ngày cho đến khi thành phản xạ.",
            ],
            checklist: [
              "Ctrl + C: sao chép",
              "Ctrl + X: cắt",
              "Ctrl + Z: quay lại bước trước",
              "Ctrl + A: chọn tất cả",
              "Alt + Tab: chuyển cửa sổ",
              "Windows + D: về màn hình chính",
              "Ctrl + F: tìm trong trang",
              "Enter: xác nhận",
            ],
          },
          {
            id: "search",
            title: "Tìm kiếm hiệu quả",
            displayNumber: "05",
            eyebrow: "Kỹ năng tự học",
            icon: "fa-magnifying-glass",
            tone: "concept",
            body: [
              "Điểm mấu chốt của tìm kiếm là xác định từ khóa. Từ khóa càng cụ thể thì kết quả càng gần với điều bạn cần.",
              "Nếu câu hỏi còn mơ hồ, hãy tìm từ rộng trước, đọc lướt kết quả, rồi bổ sung từ khóa để tiến gần câu trả lời hơn.",
            ],
            callout: {
              label: "Quy trình",
              text: "Từ khóa -> mở kết quả -> Ctrl + F -> đọc lướt -> ghi lại câu trả lời cho What, Where, When, How.",
            },
            visual: {
              src: "/lesson-assets/effective-search.png",
              alt: "Minh họa laptop với thanh tìm kiếm, từ khóa và checklist chọn lọc kết quả.",
            },
          },
          {
            id: "search-keywords",
            title: "Giải thích bộ câu hỏi 4W1H",
            displayNumber: "05.1",
            isSubSlide: true,
            eyebrow: "Từ khóa tìm kiếm",
            icon: "fa-filter",
            tone: "practice",
            body: [
              "Biến vấn đề thành câu hỏi nhỏ để chọn từ khóa rõ hơn và đọc kết quả có mục tiêu.",
              "Bấm từng thẻ để xem cách chọn từ khóa và ví dụ tìm kiếm cụ thể.",
            ],
            keywordCards: [
              {
                term: "Who?",
                title: "Ai liên quan?",
                description: "Người dùng, người học, tác giả, giảng viên hoặc nhóm cần tìm.",
                icon: "fa-user",
                detail: "Tài liệu cho người mới khác tài liệu chuyên sâu — đọc sai đối tượng sẽ không hiểu gì.",
                example: "\"JavaScript tutorial for beginners\" thay vi \"JavaScript tutorial\"",
              },
              {
                term: "What?",
                title: "Đang tìm cái gì?",
                description: "Khái niệm, lỗi, công cụ, cú pháp hoặc kết quả mong muốn.",
                icon: "fa-lightbulb",
                detail: "Dùng tên cụ thể: tên lỗi đầy đủ, tên hàm, tên công cụ. Càng cụ thể, kết quả càng sát.",
                example: "\"how to fix TypeError: Cannot read properties of undefined\" thay vi \"lỗi JavaScript\"",
              },
              {
                term: "When?",
                title: "Khi nào dùng?",
                description: "Thời điểm, phiên bản, bối cảnh hoặc điều kiện áp dụng.",
                icon: "fa-calendar-days",
                detail: "Câu trả lời từ 2018 có thể đã lỗi thời — thêm năm hoặc phiên bản để lọc nội dung cập nhật.",
                example: "\"React hooks tutorial 2024\" hoặc \"Python 3.12 new features\"",
              },
              {
                term: "Where?",
                title: "Tìm ở đâu?",
                description: "Trang tài liệu, file, trình duyệt, diễn đàn hoặc vị trí trong code.",
                icon: "fa-location-dot",
                detail: "MDN Web Docs cho HTML/CSS/JS, Stack Overflow cho lỗi, GitHub Issues cho thư viện.",
                example: "\"site:developer.mozilla.org CSS flexbox\" — tìm thẳng trong MDN",
              },
              {
                term: "How?",
                title: "Làm bằng cách nào?",
                description: "Các bước thực hiện, ví dụ mẫu, lệnh cần chạy hoặc cách kiểm tra.",
                icon: "fa-gear",
                detail: "Thêm \"how to\" hoặc \"step by step\" để lọc hướng dẫn thực tế, làm theo được ngay.",
                example: "\"how to center a div CSS flexbox step by step\" thay vi \"CSS flexbox center\"",
              },
            ],
            callout: {
              label: "Ghi nhớ",
              text: "Từ khóa càng cụ thể, kết quả càng gần với điều bạn cần.",
            },
          },
          {
            id: "finish",
            title: "Tổng kết bài học",
            displayNumber: "06",
            eyebrow: "Cần nhớ",
            icon: "fa-flag-checkered",
            tone: "summary",
            body: [
              "Học lập trình là một hành trình dài. Cách học tốt sẽ giúp bạn đi bền hơn cách học chỉ dựa vào cảm hứng nhất thời.",
              "Sau bài này, hãy chọn 3 thói quen để áp dụng ngay trong tuần đầu tiên để việc học đi vào nhịp.",
            ],
            checklist: [
              "Ghi chú và sắp xếp việc học",
              "Tập trung, đặt câu hỏi, hỏi đúng lúc",
              "Tự tạo động lực bằng mục tiêu nhỏ và tiến bộ rõ ràng",
              "Luyện thao tác máy tính và phím tắt",
              "Tìm kiếm bằng từ khóa cụ thể",
            ],
          },
        ],
      },
      {
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
            eyebrow: "Bootcamp Preparation 2.1 / Bài 2",
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
              "Way: \"Hãy giải thích dễ hiểu và cho ví dụ thực tế\""
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
      },
    ],
  },
  {
    id: "module-2",
    hidden: true,
    title: "Module 2",
    description: "Lập trình căn bản: tư duy, biến, kiểu dữ liệu và điều kiện.",
    lessons: [
      {
        id: "lesson-2-1",
        title: "Bài 1: Tư duy lập trình",
        duration: "45-60 phút",
        objective:
          "Học viên hiểu lập trình là gì, máy tính xử lý lệnh ra sao, và biết phân tích một bài toán thành các bước nhỏ có thể thực thi.",
        slides: [
          {
            id: "m2-start",
            title: "Lập trình là nói chuyện với máy tính",
            displayNumber: "01",
            eyebrow: "Module 2 / Bài 1",
            icon: "fa-microchip",
            tone: "intro",
            body: [
              "Máy tính không tự nghĩ: nó chỉ làm đúng những gì bạn ra lệnh, theo thứ tự bạn viết.",
              "Lập trình là kỹ năng dịch vấn đề từ ngôn ngữ con người sang ngôn ngữ mà máy tính hiểu và thực thi được.",
            ],
            callout: {
              label: "Ý tưởng cốt lõi",
              text: "Máy tính không đoán ý bạn. Lệnh viết rõ thì kết quả mới đúng.",
            },
          },
          {
            id: "m2-algorithm",
            title: "Thuật toán là gì?",
            displayNumber: "02",
            eyebrow: "Tư duy",
            icon: "fa-list-ol",
            tone: "concept",
            body: [
              "Thuật toán là một dãy các bước rõ ràng, có thứ tự, giải quyết một vấn đề cụ thể.",
              "Trước khi viết code, hãy viết thuật toán bằng tiếng Việt. Nếu bạn chưa giải thích được cho người khác hiểu, máy tính cũng sẽ chưa thể hiểu đúng.",
            ],
            checklist: [
              "Xác định đầu vào và đầu ra",
              "Liệt kê từng bước theo thứ tự",
              "Kiểm tra lại bằng ví dụ cụ thể",
            ],
            visual: {
              src: "/lesson-assets/algorithm-steps.png",
              alt: "Minh họa sơ đồ các bước của một thuật toán đơn giản.",
            },
          },
          {
            id: "m2-decompose",
            title: "Chia nhỏ bài toán",
            displayNumber: "02.1",
            isSubSlide: true,
            eyebrow: "Kỹ thuật phân tích",
            icon: "fa-scissors",
            tone: "practice",
            body: [
              "Bài toán lớn luôn có thể chia thành các phần nhỏ hơn. Đây là kỹ năng quan trọng nhất khi mới bắt đầu học lập trình.",
              "Bắt đầu bằng câu hỏi: \"Bước đầu tiên cần làm là gì?\" rồi tiếp tục cho từng phần nhỏ để không bị ngợp.",
            ],
            callout: {
              label: "Ví dụ",
              text: "Tính điểm trung bình → (1) cộng tất cả điểm, (2) đếm số môn, (3) chia kết quả.",
            },
          },
          {
            id: "m2-variable",
            title: "Biến — hộp chứa dữ liệu",
            displayNumber: "03",
            eyebrow: "Khái niệm cơ bản",
            icon: "fa-box",
            tone: "concept",
            body: [
              "Biến là một ô nhớ được đặt tên, dùng để lưu trữ giá trị có thể thay đổi trong quá trình chạy chương trình.",
              "Khi đặt tên biến, hãy chọn tên mô tả đúng nội dung: `diemTrungBinh` rõ hơn `x`, `a` hay `temp`.",
            ],
            checklist: [
              "Tên biến không chứa dấu cách hoặc ký tự đặc biệt",
              "Đặt tên theo vai trò, không theo kiểu dữ liệu",
              "Một biến chỉ nên lưu một loại thông tin",
            ],
            visual: {
              src: "/lesson-assets/variable-box.png",
              alt: "Minh họa biến như các hộp có nhãn chứa giá trị khác nhau.",
            },
          },
          {
            id: "m2-datatypes",
            title: "Các kiểu dữ liệu thường gặp",
            displayNumber: "03.1",
            isSubSlide: true,
            eyebrow: "Kiểu dữ liệu",
            icon: "fa-tags",
            tone: "concept",
            body: [
              "Mỗi giá trị trong lập trình đều có kiểu — kiểu xác định những phép tính nào được phép thực hiện và cách dùng dữ liệu đó.",
              "Bấm từng thẻ để xem ví dụ cụ thể và lý do kiểu đó được dùng trong bài toán nào.",
            ],
            keywordCards: [
              {
                term: "int",
                title: "Số nguyên",
                description: "Lưu số không có phần thập phân: tuổi, số lượng, thứ hạng.",
                icon: "fa-hashtag",
                detail: "Phép tính số học (+, -, *, /) hoạt động trực tiếp. Chia hai số nguyên sẽ cho kết quả nguyên.",
                example: "int tuoi = 20; → tuoi + 5 = 25",
              },
              {
                term: "float",
                title: "Số thực",
                description: "Lưu số có phần thập phân: điểm số, chiều cao, tiền tệ.",
                icon: "fa-percent",
                detail: "Dùng khi cần độ chính xác sau dấu phẩy. So sánh hai số float cần thận trọng do sai số làm tròn.",
                example: "float diem = 8.5; → diem * 2 = 17.0",
              },
              {
                term: "string",
                title: "Chuỗi ký tự",
                description: "Lưu văn bản: tên, địa chỉ, tin nhắn, mã số.",
                icon: "fa-quote-left",
                detail: "String không phải số — không cộng trừ được. Nối chuỗi dùng toán tử + nhưng \"1\" + \"2\" = \"12\", không phải 3.",
                example: "String ten = \"Minh\"; → \"Chào \" + ten = \"Chào Minh\"",
              },
              {
                term: "boolean",
                title: "Đúng / Sai",
                description: "Chỉ có hai giá trị: true hoặc false. Dùng cho các điều kiện.",
                icon: "fa-toggle-on",
                detail: "Là nền tảng của mọi câu lệnh if, vòng lặp và logic. Kết hợp bằng && (và), || (hoặc), ! (phủ định).",
                example: "boolean daDangNhap = true; → if (daDangNhap) { ... }",
              },
            ],
          },
          {
            id: "m2-condition",
            title: "Câu lệnh điều kiện if / else",
            displayNumber: "04",
            eyebrow: "Điều hướng luồng",
            icon: "fa-code-branch",
            tone: "practice",
            body: [
              "Điều kiện cho phép chương trình chọn hành động khác nhau tùy vào dữ liệu thực tế.",
              "Cấu trúc cơ bản: nếu điều kiện đúng thì làm khối A, ngược lại thì làm khối B.",
            ],
            callout: {
              label: "Cú pháp",
              text: "if (diem >= 5) { System.out.println(\"Đậu\"); } else { System.out.println(\"Rớt\"); }",
            },
            visual: {
              src: "/lesson-assets/if-else-flow.png",
              alt: "Sơ đồ luồng minh họa cấu trúc if-else với hai nhánh Đúng và Sai.",
            },
          },
          {
            id: "m2-condition-practice",
            title: "Luyện tập viết điều kiện",
            displayNumber: "04.1",
            isSubSlide: true,
            eyebrow: "Thực hành",
            icon: "fa-pencil",
            tone: "practice",
            body: [
              "Đọc yêu cầu → xác định điều kiện → xác định hai nhánh → viết code.",
              "Với điều kiện phức tạp, hãy viết ra giấy trước để nhìn rõ logic rồi mới gõ vào máy.",
            ],
            checklist: [
              "Bài 1: In \"Chẵn\" hoặc \"Lẻ\" dựa theo số nhập vào",
              "Bài 2: Phân loại học lực theo điểm trung bình",
              "Bài 3: Kiểm tra năm nhuận",
            ],
          },
          {
            id: "m2-finish",
            title: "Tổng kết bài học",
            displayNumber: "05",
            eyebrow: "Cần nhớ",
            icon: "fa-flag-checkered",
            tone: "summary",
            body: [
              "Lập trình không phải là ghi nhớ cú pháp — mà là tư duy chia nhỏ vấn đề và diễn đạt chính xác từng bước.",
              "Ba nền tảng của bài này sẽ xuất hiện trong mọi chương trình bạn viết sau này, từ bài nhỏ đến bài lớn.",
            ],
            checklist: [
              "Thuật toán: dãy bước rõ ràng, có thứ tự",
              "Biến: đặt tên mô tả, lưu đúng kiểu dữ liệu",
              "Điều kiện: rẽ nhánh dựa trên giá trị thực tế",
            ],
          },
        ],
      },
      {
        id: "lesson-2-2",
        title: "Bài 2: Vòng lặp và hàm",
        duration: "60-75 phút",
        objective:
          "Học viên biết dùng vòng lặp để tránh lặp code thủ công, viết hàm để tái sử dụng logic và hiểu khi nào nên tách code thành các phần nhỏ.",
        slides: [
          {
            id: "m2l2-start",
            title: "Đừng viết lại những gì đã viết",
            displayNumber: "01",
            eyebrow: "Module 2 / Bài 2",
            icon: "fa-rotate",
            tone: "intro",
            body: [
              "Lập trình hiệu quả nghĩa là viết ít hơn nhưng làm được nhiều hơn.",
              "Vòng lặp và hàm giúp bạn không phải copy-paste code, đồng thời giữ chương trình dễ sửa khi cần thay đổi.",
            ],
            callout: {
              label: "Nguyên tắc DRY",
              text: "Don't Repeat Yourself — mỗi logic chỉ nên tồn tại một lần trong code.",
            },
          },
          {
            id: "m2l2-loop",
            title: "Vòng lặp for — lặp có đếm",
            displayNumber: "02",
            eyebrow: "Vòng lặp",
            icon: "fa-arrows-rotate",
            tone: "concept",
            body: [
              "Dùng vòng lặp `for` khi bạn biết trước số lần cần lặp hoặc cần duyệt qua từng phần tử của danh sách.",
              "Ba phần của `for`: khởi tạo biến đếm → điều kiện tiếp tục → cập nhật biến đếm.",
            ],
            callout: {
              label: "Cú pháp",
              text: "for (int i = 0; i < 5; i++) { System.out.println(i); }",
            },
            visual: {
              src: "/lesson-assets/for-loop.png",
              alt: "Sơ đồ minh họa chu trình vòng lặp for với ba thành phần.",
            },
          },
          {
            id: "m2l2-while",
            title: "Vòng lặp while — lặp có điều kiện",
            displayNumber: "02.1",
            isSubSlide: true,
            eyebrow: "Vòng lặp",
            icon: "fa-clock-rotate-left",
            tone: "concept",
            body: [
              "Dùng `while` khi không biết trước số lần lặp, chỉ biết điều kiện để dừng.",
              "Cẩn thận với vòng lặp vô tận: phải đảm bảo điều kiện sẽ trở thành false tại một thời điểm.",
            ],
            checklist: [
              "Kiểm tra điều kiện trước mỗi lần lặp",
              "Luôn có lệnh thay đổi biến điều kiện bên trong vòng lặp",
              "Test với giá trị biên: 0, 1, số âm",
            ],
          },
          {
            id: "m2l2-function",
            title: "Hàm — đóng gói logic để tái sử dụng",
            displayNumber: "03",
            eyebrow: "Hàm",
            icon: "fa-cube",
            tone: "concept",
            body: [
              "Hàm là một khối code được đặt tên, nhận đầu vào (tham số) và trả về kết quả hoặc không.",
              "Khi một đoạn code xuất hiện nhiều lần, hoặc có thể đặt tên rõ ràng, hãy tách thành hàm.",
            ],
            callout: {
              label: "Cấu trúc",
              text: "int tinhTong(int a, int b) { return a + b; }",
            },
            visual: {
              src: "/lesson-assets/function-box.png",
              alt: "Minh họa hàm như hộp đen nhận đầu vào và trả đầu ra.",
            },
          },
          {
            id: "m2l2-scope",
            title: "Phạm vi biến trong hàm",
            displayNumber: "03.1",
            isSubSlide: true,
            eyebrow: "Scope",
            icon: "fa-circle-dot",
            tone: "practice",
            body: [
              "Biến khai báo bên trong hàm chỉ tồn tại trong hàm đó, không dùng được bên ngoài.",
              "Đây là thiết kế có chủ ý để các hàm độc lập với nhau và dễ kiểm tra riêng lẻ hơn.",
            ],
            checklist: [
              "Biến local: chỉ sống trong hàm khai báo nó",
              "Tham số là biến local của hàm",
              "Tránh dùng biến toàn cục khi không cần thiết",
            ],
          },
          {
            id: "m2l2-finish",
            title: "Tổng kết bài học",
            displayNumber: "04",
            eyebrow: "Cần nhớ",
            icon: "fa-flag-checkered",
            tone: "summary",
            body: [
              "Vòng lặp và hàm là hai cách để code không phải lặp lại chính nó, đồng thời giúp chương trình dễ mở rộng hơn.",
              "Thực hành tốt nhất: viết hàm nhỏ, đặt tên rõ và kiểm tra từng phần trước khi ghép lại.",
            ],
            checklist: [
              "for: lặp khi biết số lần hoặc duyệt danh sách",
              "while: lặp khi chỉ biết điều kiện dừng",
              "Hàm: đặt tên rõ, mỗi hàm làm đúng một việc",
            ],
          },
        ],
      },
    ],
  },
];

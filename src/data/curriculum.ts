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
};

export const curriculum: CourseModule[] = [
  {
    id: "module-1",
    title: "Module 1",
    description: "Nền tảng học tập, máy tính cơ bản và tư duy tìm kiếm.",
    lessons: [
      {
        id: "lesson-1",
        title: "Bài 1: Học cách học",
        duration: "45-60 phút",
        objective:
          "Học viên biết cách sắp xếp việc học, tập trung trong lớp, đặt câu hỏi, tự tạo động lực, thao tác máy tính cơ bản và tìm kiếm thông tin hiệu quả.",
        slides: [
          {
            id: "start",
            title: "Học tốt bắt đầu từ cách học",
            displayNumber: "01",
            eyebrow: "Module 1 / Bài 1",
            icon: "fa-graduation-cap",
            tone: "intro",
            body: [
              "Buổi học này không yêu cầu học thuộc. Mục tiêu là tạo ra một cách học có thể lặp lại mỗi ngày.",
              "Khi biết sắp xếp việc học, đặt câu hỏi đúng và tìm kiếm hiệu quả, bạn sẽ tự tin hơn trong các bài lập trình tiếp theo.",
            ],
            callout: {
              label: "Thông điệp chính",
              text: "Không phải là KHÔNG hiểu, chỉ là CHƯA hiểu.",
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
              "Viết việc cần làm ra giấy hoặc ghi chú trên máy tính. Hạn chế dùng điện thoại vì rất dễ bị cuốn sang việc khác.",
              "Chia việc học thành các mục nhỏ: cần đọc gì, cần thực hành gì, khi nào nộp bài và cần hỏi ai nếu bị kẹt.",
            ],
            checklist: [
              "Ghi việc cần làm ngay sau buổi học",
              "Đánh dấu mục ưu tiên",
              "Kết thúc ngày bằng 5 phút tổng kết",
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
              "Tập trung không chỉ là cố gắng hơn. Hãy chủ động giảm những thứ làm mình phân tâm: thông báo, mạng xã hội, tab trình duyệt không liên quan.",
              "Trong lớp, ưu tiên nghe ý tưởng chính trước, ghi lại từ khóa sau. Nếu mất mạch, đánh dấu lại để hỏi vào đúng thời điểm.",
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
              "Động lực không tự đến — bạn cần tạo nó bằng mục tiêu nhỏ và tiến bộ nhìn thấy được.",
              "Khi thấy nản, đừng chờ. Bắt đầu bằng một việc rất nhỏ: mở bài, sửa một lỗi, ghi điều chưa hiểu.",
            ],
            checklist: [
              "Mục tiêu gần: hôm nay hiểu một ý, làm xong một phần",
              "Theo dõi tiến bộ bằng checklist hoặc ghi chú ngắn",
              "Nhắc lại lý do mình bắt đầu học lập trình",
            ],
            callout: {
              label: "Câu nhắc khi bị kẹt",
              text: "Mình không cần giỏi ngay. Mình chỉ cần tiếp tục thêm một bước.",
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
              "Ôn tập giúp bạn không phải học lại từ đầu. Thực hành giúp bạn nhìn thấy lỗi thật, không chỉ hiểu trên lý thuyết.",
              "Sau mỗi buổi, hãy làm lại một ví dụ nhỏ, ghi lại lỗi gặp phải và cách đã sửa.",
            ],
            callout: {
              label: "Công thức gợi ý",
              text: "10 phút đọc lại ghi chú, 20 phút thực hành, 5 phút viết điều mình đã học.",
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
              "Đặt câu hỏi là cách nhanh nhất để biến một nội dung mơ hồ thành việc có thể làm được.",
              "Hãy bắt đầu bằng What, Where, When, How: mình đang học cái gì, nó nằm ở đâu, khi nào dùng, và làm bằng cách nào.",
            ],
            callout: {
              label: "Trước khi hỏi",
              text: "Thử tự trả lời bằng ghi chú, tài liệu và ví dụ. Nếu vẫn chưa rõ, hãy hỏi bạn học hoặc giảng viên bằng một câu hỏi cụ thể.",
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
              "Khi làm việc nhóm, đừng chỉ đưa kết quả. Hãy nói cách mình nghĩ để người khác nhìn thấy quá trình giải quyết vấn đề.",
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
              "Nếu gõ phím còn chậm, hãy luyện gõ 10 ngón đều đặn. Tốc độ sẽ tăng tự nhiên khi tay quen vị trí phím.",
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
              "Nếu câu hỏi còn mơ hồ, hãy tìm từ rộng trước, đọc lướt kết quả, sau đó bổ sung từ khóa để tiến gần câu trả lời.",
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
              "Click từng thẻ để xem giải thích và ví dụ tìm kiếm cụ thể.",
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
              "Sau bài này, hãy chọn 3 thói quen để áp dụng ngay trong tuần đầu tiên.",
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
    ],
  },
];

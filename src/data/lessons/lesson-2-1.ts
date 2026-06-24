import type { Lesson } from "../types";

export const lesson2_1: Lesson = {
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
};

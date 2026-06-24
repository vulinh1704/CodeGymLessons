import type { Lesson } from "../types";

export const lesson2_2: Lesson = {
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
};

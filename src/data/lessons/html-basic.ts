import type { Lesson } from "../types";

export const htmlBasicLesson: Lesson = {
  id: "html-basic",
  title: "Bài 3: HTML Cơ Bản",
  duration: "2 giờ",
  objective:
    "Học viên nắm được cấu trúc HTML, sử dụng các thẻ cơ bản, xem kết quả trực tiếp trên trình duyệt và làm việc hiệu quả trong IntelliJ IDEA.",
  slides: [
    {
      id: "html-intro",
      title: "HTML Cơ Bản — Xây dựng trang web đầu tiên",
      displayNumber: "01",
      eyebrow: "Module 1 / Bài 3",
      icon: "fa-code",
      tone: "intro",
      body: [
        "Trong bài này, bạn sẽ học cách xây dựng trang web đầu tiên từ đầu — không cần kinh nghiệm lập trình trước.",
        "Kết thúc bài học, bạn có thể tạo trang web thực sự, mở được bằng trình duyệt và hiểu rõ mọi dòng code mình đã viết.",
      ],
      checklist: [
        "Hiểu HTML là gì và hoạt động như thế nào",
        "Cài IntelliJ IDEA và tạo file HTML đầu tiên",
        "Sử dụng các thẻ cơ bản: tiêu đề, văn bản, hình ảnh, liên kết, bố cục, input",
        "Dùng phím tắt để code nhanh hơn trong IntelliJ IDEA",
        "Làm quen với thẻ form và bảng table",
      ],
      callout: {
        label: "Ghi nhớ",
        text: "HTML không phải ngôn ngữ lập trình — không cần lo lắng. Bạn chỉ cần học cách gắn nhãn nội dung để trình duyệt hiểu và hiển thị đúng.",
      },
      visual: {
        src: "/lesson-assets/html.png",
        alt: "Logo HTML5",
      },
    },
    {
      id: "html-concept",
      title: "HTML là gì?",
      displayNumber: "02",
      eyebrow: "Khái niệm & Lịch sử",
      icon: "fa-globe",
      tone: "concept",
      body: [
        "HTML là viết tắt của HyperText Markup Language — ngôn ngữ đánh dấu siêu văn bản. Nó là nền tảng của mọi trang web trên internet.",
        "Khác với lập trình, HTML không ra lệnh cho máy tính tính toán — mà mô tả cấu trúc nội dung: đây là tiêu đề, đây là đoạn văn, đây là hình ảnh. Trình duyệt đọc và hiển thị theo đúng cấu trúc đó.",
      ],
      timeline: [
        {
          term: "1991",
          title: "Ngày ra đời",
          description: "Tim Berners-Lee phát minh HTML để chia sẻ tài liệu nghiên cứu qua mạng tại CERN, Thụy Sĩ.",
          icon: "fa-calendar",
          detail:
            "HTML ban đầu chỉ có 18 thẻ đơn giản, chủ yếu để tạo liên kết giữa các tài liệu khoa học. Tim Berners-Lee cũng đồng thời tạo ra HTTP và URL — ba thứ này cùng nhau tạo nên World Wide Web.",
        },
        {
          term: "HTML 4",
          title: "Chuẩn hóa (1997)",
          description: "W3C chuẩn hóa HTML 4, mang lại sự thống nhất cho các trình duyệt và giới thiệu CSS.",
          icon: "fa-file-code",
          detail:
            "HTML 4 tách biệt nội dung (HTML) và giao diện (CSS) — một bước đột phá quan trọng. Trước đó, màu sắc và font chữ phải viết trực tiếp vào thẻ HTML, rất khó bảo trì.",
        },
        {
          term: "HTML5",
          title: "Phiên bản hiện đại (2014)",
          description: "HTML5 thêm hỗ trợ video, audio, canvas và nhiều thẻ ngữ nghĩa mới — không cần Flash.",
          icon: "fa-star",
          detail:
            "HTML5 là tiêu chuẩn đang dùng hiện nay. Nó loại bỏ hoàn toàn nhu cầu dùng Flash Player, mang lại trải nghiệm web phong phú hơn và hỗ trợ tốt hơn trên thiết bị di động.",
        },
        {
          term: "Hiện nay",
          title: "Web hiện đại",
          description: "HTML5 kết hợp CSS3 và JavaScript tạo nên mọi trang web bạn đang dùng hằng ngày.",
          icon: "fa-laptop-code",
          detail:
            "HTML là nền móng, CSS trang trí giao diện, JavaScript thêm tính tương tác. Ba thứ này cùng nhau tạo nên mọi website — từ trang tin tức đến ứng dụng ngân hàng.",
        },
      ],
      callout: {
        label: "Dễ nhớ",
        text: "HTML = bộ xương trang web  |  CSS = quần áo  |  JavaScript = hành động",
      },
    },
    {
      id: "html-vscode",
      title: "Cài IntelliJ IDEA",
      displayNumber: "03",
      eyebrow: "Công cụ viết code",
      icon: "fa-download",
      tone: "concept",
      body: [
        "IntelliJ IDEA là môi trường lập trình chuyên nghiệp của JetBrains — hỗ trợ HTML, CSS, JavaScript và nhiều ngôn ngữ khác.",
      ],
      titleImage: "/lesson-assets/intellij.png",
      link: {
        label: "Tải IntelliJ IDEA",
        url: "https://www.jetbrains.com/idea/download/?section=windows",
      },
      keywordCards: [
        {
          term: "Autocomplete",
          title: "Gợi ý code tự động",
          description: "Gõ ký tự đầu, danh sách gợi ý thẻ và thuộc tính xuất hiện ngay. Dùng mũi tên chọn, Enter để chèn — không cần nhớ từng tên thẻ.",
          icon: "fa-wand-magic-sparkles",
        },
        {
          term: "Emmet",
          title: "Gõ nhanh HTML",
          description: "Gõ tên thẻ rồi nhấn Tab — IntelliJ tự tạo thẻ mở và thẻ đóng. Ví dụ: div + Tab → <div></div>, img + Tab → <img src=\"\" alt=\"\">.",
          icon: "fa-bolt",
        },
        {
          term: "Preview",
          title: "Xem kết quả trên trình duyệt",
          description: "Mở file .html trong IntelliJ, hover vào editor — nhấn icon Chrome/Firefox góc trên bên phải để xem trang web ngay lập tức.",
          icon: "fa-globe",
        },
      ],
    },
    {
      id: "html-structure",
      title: "Cấu trúc một file HTML",
      displayNumber: "04",
      eyebrow: "Cấu trúc cơ bản",
      icon: "fa-sitemap",
      tone: "concept",
      body: [
        "Mọi file HTML đều có cùng một khung sườn cơ bản. Hiểu khung này giúp bạn biết mỗi dòng code đặt ở đâu và tại sao.",
        "Nhấn vào các thẻ được gạch chân trong code để xem công dụng của từng phần.",
      ],
      annotatedCode: {
        language: "HTML",
        code: `<!DOCTYPE html>
<html lang="vi">

  <head>
    <meta charset="UTF-8">
    <title>Trang web đầu tiên</title>
  </head>

  <body>
    <h1>Xin chào thế giới!</h1>
    <p>Đây là trang web đầu tiên của tôi.</p>
  </body>

</html>`,
        annotations: [
          {
            token: "<!DOCTYPE html>",
            title: "Khai báo HTML5",
            description:
              "Dòng đầu tiên của mọi file HTML, luôn bắt buộc. Nó cho trình duyệt biết dùng chế độ HTML5 để hiển thị trang đúng chuẩn. Không có dòng này, trang có thể bị lỗi giao diện trên một số trình duyệt.",
          },
          {
            token: `<html lang="vi">`,
            title: "Thẻ gốc — bao bọc toàn bộ trang",
            description:
              'Mọi thẻ HTML khác đều nằm bên trong <html>...</html>. Thuộc tính lang="vi" giúp công cụ tìm kiếm và trình đọc màn hình hiểu đúng ngôn ngữ tiếng Việt của trang.',
          },
          {
            token: "<head>",
            title: "Phần đầu trang — cấu hình, không hiển thị",
            description:
              "Bên trong <head> chứa thông tin cấu hình như tiêu đề tab (<title>), bảng mã ký tự (<meta charset>), và liên kết đến file CSS. Người dùng không nhìn thấy <head>, nhưng trình duyệt cần nó để hiển thị đúng.",
          },
          {
            token: `<meta charset="UTF-8">`,
            title: "Bảng mã ký tự UTF-8",
            description:
              "Đảm bảo tiếng Việt có dấu và các ký tự đặc biệt hiển thị đúng. UTF-8 hỗ trợ hầu hết ký tự trên thế giới. Thiếu dòng này, chữ tiếng Việt sẽ bị hiển thị thành ký tự lạ (ví dụ: □□□ hoặc ???).",
          },
          {
            token: "<body>",
            title: "Phần thân — mọi thứ hiển thị cho người dùng",
            description:
              "Đây là phần bạn sẽ viết nhiều nhất. Mọi thẻ h1, p, img, a, div, form, table... đều đặt bên trong <body>. Tất cả nội dung trong <body> đều hiển thị ra màn hình trình duyệt.",
          },
        ],
      },
    },
    {
      id: "html-heading",
      title: "Thẻ tiêu đề — h1 đến h6",
      displayNumber: "05",
      eyebrow: "Thẻ cơ bản",
      icon: "fa-heading",
      tone: "practice",
      body: [
        "HTML có 6 cấp tiêu đề từ h1 (quan trọng nhất, to nhất) đến h6 (nhỏ nhất). Nhấn 'Xem kết quả' để thấy sự khác biệt trực tiếp.",
      ],
      htmlDemos: [
        {
          label: "Ví dụ thẻ tiêu đề h1 → h6",
          previewHeight: 280,
          code: `<h1>Tiêu đề cấp 1 — Lớn nhất (tiêu đề chính)</h1>
<h2>Tiêu đề cấp 2 (tên mục)</h2>
<h3>Tiêu đề cấp 3 (mục con)</h3>
<h4>Tiêu đề cấp 4</h4>
<h5>Tiêu đề cấp 5</h5>
<h6>Tiêu đề cấp 6 — Nhỏ nhất</h6>`,
        },
      ],
      checklist: [
        "Mỗi trang chỉ nên có một thẻ h1 — dùng cho tiêu đề chính của trang",
        "Dùng h2 cho các mục, h3 cho mục con — không bỏ cấp (không nhảy từ h1 sang h3)",
        "Không dùng tiêu đề chỉ để làm chữ to — hãy dùng CSS cho việc đó",
      ],
      callout: {
        label: "Mẹo Emmet",
        text: "Gõ 'h1' rồi nhấn Tab trong VS Code — tự động ra <h1></h1>. Tương tự với h2, h3...",
      },
    },
    {
      id: "html-text",
      title: "Thẻ văn bản",
      displayNumber: "05.1",
      isSubSlide: true,
      eyebrow: "Thẻ cơ bản",
      icon: "fa-paragraph",
      tone: "practice",
      body: [
        "Thẻ <p> tạo đoạn văn — tự động thêm khoảng cách trên dưới. Thẻ <strong> làm chữ đậm, <em> làm chữ nghiêng.",
      ],
      htmlDemos: [
        {
          label: "Ví dụ thẻ văn bản",
          previewHeight: 220,
          code: `<p>Đây là một đoạn văn bình thường. Trình duyệt tự thêm khoảng cách trên dưới.</p>

<p>Đây là đoạn có chữ <strong>in đậm</strong> và chữ <em>in nghiêng</em>.</p>

<p>Có thể kết hợp: <strong><em>vừa đậm vừa nghiêng</em></strong> cùng lúc.</p>

<p>Xuống dòng trong cùng đoạn:<br>Dùng thẻ br — không tạo đoạn mới.</p>`,
        },
      ],
      checklist: [
        "<p> — Đoạn văn: tự thêm khoảng cách trên và dưới",
        "<strong> — Chữ đậm: dùng cho nội dung quan trọng",
        "<em> — Chữ nghiêng: dùng để nhấn mạnh",
        "<br> — Xuống dòng trong cùng đoạn (không tạo đoạn mới)",
      ],
    },
    {
      id: "html-image",
      title: "Thẻ hình ảnh — <img>",
      displayNumber: "05.2",
      isSubSlide: true,
      eyebrow: "Thẻ cơ bản",
      icon: "fa-image",
      tone: "practice",
      body: [
        "Thẻ <img> hiển thị hình ảnh và là thẻ tự đóng — không có thẻ đóng riêng. Hai thuộc tính quan trọng nhất là src (địa chỉ ảnh) và alt (mô tả ảnh).",
      ],
      htmlDemos: [
        {
          label: "Ví dụ thẻ img",
          previewHeight: 320,
          code: `<!-- Ảnh từ internet (thay URL bằng địa chỉ ảnh thực của bạn) -->
<img src="https://picsum.photos/300/180" alt="Ảnh phong cảnh ngẫu nhiên">

<p>Ảnh nhỏ có thể đặt trong dòng văn bản:
<img src="https://picsum.photos/40/40" alt="Ảnh icon nhỏ">
như thế này.</p>

<!-- Ảnh với kích thước cố định -->
<img src="https://picsum.photos/200/80" alt="Ảnh nằm ngang" width="200" height="80">`,
        },
      ],
      checklist: [
        "src — Đường dẫn ảnh: URL internet hoặc tên file ảnh trên máy",
        "alt — Mô tả ảnh: hiện khi ảnh không tải được, hỗ trợ người khiếm thị",
        "width / height — Kích thước ảnh tính bằng pixel (không bắt buộc)",
        "Thẻ img KHÔNG có thẻ đóng: viết <img src=\"...\" alt=\"...\"> là xong",
      ],
      callout: {
        label: "Quan trọng",
        text: "Luôn thêm thuộc tính alt — giúp người khiếm thị, cải thiện SEO và hiển thị khi ảnh không tải được.",
      },
    },
    {
      id: "html-link",
      title: "Thẻ đường dẫn — <a>",
      displayNumber: "05.3",
      isSubSlide: true,
      eyebrow: "Thẻ cơ bản",
      icon: "fa-link",
      tone: "practice",
      body: [
        "Thẻ <a> (anchor) tạo liên kết — bấm vào sẽ chuyển đến trang khác, file khác hoặc vị trí khác trên cùng trang. Thuộc tính href xác định điểm đến.",
      ],
      htmlDemos: [
        {
          label: "Ví dụ các loại đường dẫn",
          previewHeight: 200,
          code: `<!-- Mở trong cùng tab -->
<a href="https://codegym.vn">Đến trang CodeGym</a>

<br><br>

<!-- Mở trong tab mới -->
<a href="https://google.com" target="_blank">Tìm kiếm trên Google (tab mới)</a>

<br><br>

<!-- Liên kết gửi email -->
<a href="mailto:hello@example.com">Gửi email cho tôi</a>

<br><br>

<!-- Liên kết gọi điện -->
<a href="tel:+84901234567">Gọi ngay: 090 123 4567</a>`,
        },
      ],
      checklist: [
        "href — Địa chỉ đích: URL trang web, đường dẫn file, mailto:, tel:",
        "target=\"_blank\" — Mở liên kết trong tab mới (thêm rel=\"noopener\" khi dùng _blank)",
        "Nội dung giữa <a> và </a> là phần người dùng nhìn thấy và bấm vào",
        "Có thể bọc thẻ <img> trong thẻ <a> để ảnh trở thành liên kết",
      ],
    },
    {
      id: "html-layout",
      title: "Thẻ chia bố cục — div và span",
      displayNumber: "05.4",
      isSubSlide: true,
      eyebrow: "Thẻ cơ bản",
      icon: "fa-table-columns",
      tone: "practice",
      body: [
        "<div> và <span> là hai thẻ container không có ý nghĩa nội dung — chỉ dùng để gom nhóm và chia bố cục, kết hợp với CSS để tạo giao diện.",
      ],
      htmlDemos: [
        {
          label: "Ví dụ div và span",
          previewHeight: 260,
          code: `<div style="background: #e3f2fd; padding: 16px; margin-bottom: 8px; border-radius: 8px;">
  <h3 style="margin-top: 0;">Khối div đầu tiên</h3>
  <p>div là block element — chiếm toàn bộ chiều rộng, xuống hàng mới.</p>
</div>

<div style="background: #f3e5f5; padding: 16px; border-radius: 8px;">
  <p>Khối div thứ hai nằm phía dưới. Chữ
  <span style="color: #e65100; font-weight: bold;">cam đậm</span> và
  <span style="background: #fff9c4; padding: 2px 4px;">nền vàng</span>
  dùng span — inline, nằm trong dòng văn bản.</p>
</div>`,
        },
      ],
      checklist: [
        "<div> — Block element: chiếm toàn bộ hàng, dùng để tạo khu vực, cột, hộp",
        "<span> — Inline element: nằm trong dòng văn bản, dùng để tô màu/định dạng một phần chữ",
        "Kết hợp class và CSS để tạo bố cục phức tạp hơn",
      ],
      callout: {
        label: "HTML5 có thêm",
        text: "<header>, <nav>, <main>, <section>, <article>, <footer> — giống div nhưng có ý nghĩa ngữ nghĩa rõ ràng hơn.",
      },
    },
    {
      id: "html-input",
      title: "Thẻ input — Ô nhập liệu",
      displayNumber: "05.5",
      isSubSlide: true,
      eyebrow: "Thẻ cơ bản",
      icon: "fa-keyboard",
      tone: "practice",
      body: [
        "Thẻ <input> tạo ô nhập liệu. Thuộc tính type quyết định loại ô: text, email, password, date, radio, checkbox... Mỗi loại có giao diện và hành vi riêng — trình duyệt xử lý tự động.",
      ],
      htmlDemos: [
        {
          label: "Các loại input phổ biến",
          previewHeight: 430,
          code: `<p><label>Họ tên (type="text"):</label><br>
<input type="text" placeholder="Nhập họ tên của bạn"></p>

<p><label>Email (type="email"):</label><br>
<input type="email" placeholder="example@email.com"></p>

<p><label>Mật khẩu (type="password"):</label><br>
<input type="password" placeholder="Ký tự bị ẩn khi gõ"></p>

<p><label>Ngày sinh (type="date"):</label><br>
<input type="date"></p>

<p><label>Giới tính (type="radio" — chỉ chọn 1):</label><br>
<input type="radio" name="gender" value="male"> Nam &nbsp;
<input type="radio" name="gender" value="female"> Nữ &nbsp;
<input type="radio" name="gender" value="other"> Khác</p>

<p><label>Sở thích (type="checkbox" — chọn nhiều):</label><br>
<input type="checkbox"> Đọc sách &nbsp;
<input type="checkbox"> Lập trình &nbsp;
<input type="checkbox"> Thể thao</p>

<p><input type="button" value="Nút thường"> &nbsp;
<input type="submit" value="Gửi đi"> &nbsp;
<input type="reset" value="Xóa hết"></p>`,
        },
      ],
      checklist: [
        "type=\"text\" — Ô nhập văn bản thông thường",
        "type=\"email\" — Trình duyệt tự kiểm tra định dạng email hợp lệ",
        "type=\"password\" — Ẩn ký tự khi gõ (hiện dấu chấm)",
        "type=\"radio\" — Chỉ chọn được 1 trong nhóm (cùng name)",
        "type=\"checkbox\" — Chọn được nhiều tùy ý",
        "placeholder — Văn bản gợi ý hiện khi ô còn trống",
      ],
    },
    {
      id: "html-shortcuts",
      title: "Phím tắt trong IntelliJ IDEA",
      displayNumber: "06",
      eyebrow: "Làm việc nhanh hơn",
      icon: "fa-keyboard",
      tone: "practice",
      body: [
        "Biết phím tắt giúp bạn code nhanh hơn, ít phải dùng chuột và giữ được luồng suy nghĩ không bị đứt quãng.",
        "Tập dùng mỗi phím tắt vài lần mỗi ngày — sau một tuần sẽ thành phản xạ tự nhiên.",
      ],
      checklist: [
        "Tên thẻ + Tab: gõ nhanh thẻ HTML (Emmet)",
        "Ctrl + /: bật/tắt comment dòng đang chọn",
        "Ctrl + D: nhân đôi dòng hiện tại xuống phía dưới",
        "Ctrl + Alt + L: tự động sắp xếp và căn chỉnh code",
        "Ctrl + S: lưu file (dùng liên tục khi code)",
        "Ctrl + Z: hoàn tác thao tác vừa làm",
      ],
    },
    {
      id: "html-form",
      title: "Thẻ form — Biểu mẫu nhập liệu",
      displayNumber: "07",
      eyebrow: "Thẻ nâng cao",
      icon: "fa-clipboard-list",
      tone: "practice",
      body: [
        "Thẻ <form> nhóm các ô nhập liệu thành một biểu mẫu hoàn chỉnh. Khi người dùng nhấn Submit, tất cả dữ liệu trong form được gửi đi cùng nhau.",
        "Form là thành phần thiết yếu của mọi trang đăng ký, đăng nhập, tìm kiếm và thanh toán trực tuyến.",
      ],
      htmlDemos: [
        {
          label: "Form đăng ký tài khoản",
          previewHeight: 560,
          code: `<form>
  <h2>Đăng ký tài khoản</h2>

  <p>
    <label for="fullname">Họ và tên: *</label><br>
    <input type="text" id="fullname" name="fullname"
           placeholder="Nhập họ tên đầy đủ" required>
  </p>

  <p>
    <label for="email">Email: *</label><br>
    <input type="email" id="email" name="email"
           placeholder="email@example.com" required>
  </p>

  <p>
    <label for="password">Mật khẩu: *</label><br>
    <input type="password" id="password" name="password"
           placeholder="Tối thiểu 8 ký tự" minlength="8">
  </p>

  <p>
    <label for="role">Bạn là:</label><br>
    <select id="role" name="role">
      <option value="">-- Chọn vai trò --</option>
      <option value="student">Học viên</option>
      <option value="teacher">Giảng viên</option>
      <option value="other">Khác</option>
    </select>
  </p>

  <p>
    <label for="note">Ghi chú thêm:</label><br>
    <textarea id="note" name="note" rows="3"
              placeholder="Nhập ghi chú (nếu có)"></textarea>
  </p>

  <p>
    <input type="checkbox" id="agree" name="agree" required>
    <label for="agree">Tôi đồng ý với điều khoản sử dụng *</label>
  </p>

  <p>
    <button type="submit">Đăng ký ngay</button>
    <button type="reset">Xóa hết</button>
  </p>
</form>`,
        },
      ],
      checklist: [
        "<form> — Bao bọc toàn bộ các trường nhập liệu",
        "<label for=\"id\"> — Nhãn liên kết với input qua thuộc tính id (nhấn nhãn = focus ô nhập)",
        "<select> và <option> — Danh sách thả xuống",
        "<textarea> — Ô nhập nhiều dòng văn bản (rows xác định chiều cao)",
        "required — Bắt buộc nhập trước khi submit",
        "<button type=\"submit\"> — Nút gửi form  |  <button type=\"reset\"> — Nút xóa",
      ],
    },
    {
      id: "html-table",
      title: "Thẻ table — Bảng dữ liệu",
      displayNumber: "07.1",
      isSubSlide: true,
      eyebrow: "Thẻ nâng cao",
      icon: "fa-table",
      tone: "practice",
      body: [
        "Thẻ <table> dùng để hiển thị dữ liệu dạng bảng — điểm học sinh, lịch học, báo giá. Bảng HTML có cấu trúc lồng nhau: table → thead/tbody → tr (hàng) → th/td (ô).",
      ],
      htmlDemos: [
        {
          label: "Bảng điểm học viên",
          previewHeight: 240,
          code: `<table border="1" cellpadding="10" cellspacing="0"
       style="border-collapse: collapse; width: 100%;">
  <thead style="background: #1f2e73; color: white;">
    <tr>
      <th>STT</th>
      <th>Họ và tên</th>
      <th>Điểm HTML</th>
      <th>Điểm CSS</th>
      <th>Kết quả</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Nguyễn Văn An</td>
      <td>8.5</td>
      <td>9.0</td>
      <td style="color: green; font-weight: bold;">✓ Đạt</td>
    </tr>
    <tr style="background: #f8f9fa;">
      <td>2</td>
      <td>Trần Thị Bình</td>
      <td>7.0</td>
      <td>8.5</td>
      <td style="color: green; font-weight: bold;">✓ Đạt</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Lê Văn Cường</td>
      <td>4.5</td>
      <td>5.0</td>
      <td style="color: red; font-weight: bold;">✗ Chưa đạt</td>
    </tr>
  </tbody>
</table>`,
        },
      ],
      checklist: [
        "<table> — Thẻ cha bao bọc toàn bộ bảng",
        "<thead> — Phần đầu bảng (hàng tiêu đề cột)",
        "<tbody> — Phần thân bảng (các hàng dữ liệu)",
        "<tr> — Table Row: một hàng ngang trong bảng",
        "<th> — Table Header: ô tiêu đề (tự động in đậm, căn giữa)",
        "<td> — Table Data: ô dữ liệu thông thường",
      ],
      callout: {
        label: "Lưu ý quan trọng",
        text: "Không dùng table để tạo bố cục trang web — chỉ dùng cho dữ liệu thực sự là bảng.",
      },
    },
    {
      id: "html-summary",
      title: "Tổng kết — Bạn đã học được gì?",
      displayNumber: "08",
      eyebrow: "Tổng kết",
      icon: "fa-flag-checkered",
      tone: "summary",
      body: [
        "Bạn vừa hoàn thành nền tảng HTML! Đây là những viên gạch đầu tiên để xây dựng bất kỳ trang web nào.",
        "Bước tiếp theo: thực hành tạo một trang giới thiệu bản thân hoàn chỉnh với tất cả thẻ đã học.",
      ],
      checklist: [
        "Cấu trúc HTML: DOCTYPE → html → head → body",
        "Thẻ tiêu đề: h1 → h6 (chỉ một h1 mỗi trang)",
        "Thẻ văn bản: p, strong, em, br",
        "Thẻ hình ảnh: img với src và alt (bắt buộc có alt)",
        "Thẻ liên kết: a với href và target",
        "Thẻ bố cục: div (block) và span (inline)",
        "Thẻ input: text, email, password, radio, checkbox, button",
        "Thẻ form: form, label, select, textarea, button",
        "Thẻ bảng: table, thead, tbody, tr, th, td",
        "Phím tắt IntelliJ: Emmet (Tab), Ctrl+/, Ctrl+D (nhân đôi), Ctrl+Alt+L (format)",
      ],
      callout: {
        label: "Bài tập về nhà",
        text: "Tạo trang giới thiệu bản thân gồm: ảnh đại diện, tên, thông tin cá nhân, sở thích (danh sách) và form liên hệ.",
      },
    },
  ],
};

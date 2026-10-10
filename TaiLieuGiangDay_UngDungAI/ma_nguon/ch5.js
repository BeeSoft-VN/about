const B = require("./base.js");
const { Paragraph,AlignmentType,BorderStyle,ShadingType,TextRun,CW,FONT,SZ_H1,C,
  T,sp,PB,body,note,keypt,H1,H2,H3,codeBlock,bull,twoColTable,threeColTable,exTable } = B;

module.exports = [
H1("V","RÚT RA TRI THỨC VÀ KIỂM CHỨNG"),
body("Đây là yêu cầu số 4 của đề bài, và là chương quan trọng nhất của tài liệu. Ba mục đầu dạy cách rút ra kết luận có giá trị; mục 5.3 kể lại ba cái bẫy có thật mà người biên soạn đã sa vào trong quá trình làm việc."),

H2("5.1","Tri thức khác gì với mô tả số liệu"),
body("Nhiều bài làm chỉ dừng ở mô tả: “58,5% sinh viên có dấu hiệu trầm cảm, 63% là nam”. Đó là số liệu, chưa phải tri thức. Tri thức (insight) phải trả lời được câu hỏi “vậy thì sao?”."),
threeColTable([
  ["Mô tả số liệu","Nêu lại điều có trong bảng","“Tỷ lệ trầm cảm ở mức áp lực 5 là 86,1%.”"],
  ["So sánh","Đặt hai con số cạnh nhau","“Mức áp lực 5 cao hơn mức 1 tới 67 điểm phần trăm.”"],
  ["Tri thức","Nêu điều bất ngờ hoặc có thể hành động","“Áp lực học tập liên quan mạnh hơn hẳn tiền sử gia đình — nghĩa là phần lớn nguy cơ nằm trong tầm can thiệp của nhà trường.”"],
], [1800,2400,CW-4200], ["Mức độ","Đặc điểm","Ví dụ"]),
body("Ba câu hỏi giúp bạn kiểm tra một phát hiện có xứng đáng gọi là tri thức hay không:"),
bull("Điều này có đi ngược lại điều người ta thường nghĩ không?"),
bull("Nếu biết điều này, ai đó sẽ làm khác đi điều gì?"),
bull("Điều này có đúng khi tôi chia nhỏ dữ liệu ra xem không?"),
note("Một phát hiện đáng giá trong ca thực tế: điểm trung bình học tập gần như KHÔNG liên quan đến trầm cảm (hệ số 0,022). Nó đáng giá vì đi ngược trực giác “học giỏi thì ổn”, và vì nó thay đổi cách nhà trường sàng lọc sinh viên có nguy cơ."),

H2("5.2","Tương quan không phải nhân quả"),
body("Đây là lỗi lập luận phổ biến nhất, và là lỗi mà AI mắc nhiều nhất khi được yêu cầu “giải thích kết quả”."),
body("Nếu dữ liệu cho thấy nhóm ăn uống kém có tỷ lệ trầm cảm cao hơn, có ít nhất bốn cách giải thích, và dữ liệu cắt ngang không phân biệt được cách nào đúng:"),
threeColTable([
  ["A gây ra B","Ăn uống kém dẫn tới trầm cảm","Có thể, nhưng chưa chứng minh được."],
  ["B gây ra A","Trầm cảm làm mất cảm giác ngon miệng nên ăn uống kém","Cũng hợp lý không kém."],
  ["C gây ra cả A và B","Nghèo khó dẫn tới cả ăn uống kém lẫn trầm cảm","Biến gây nhiễu ẩn."],
  ["Ngẫu nhiên","Mẫu nhỏ nên xuất hiện liên hệ giả","Kiểm tra bằng cỡ mẫu và p-value."],
], [1900,2900,CW-4800], ["Khả năng","Diễn giải","Nhận xét"]),
keypt("Quy tắc an toàn khi viết báo cáo: dùng từ “liên quan đến”, “đi cùng với”, “gắn với”. Tránh từ “gây ra”, “dẫn đến”, “làm cho” — trừ khi bạn có dữ liệu thực nghiệm hoặc theo dõi theo thời gian."),

H2("5.3","Ba cái bẫy có thật"),
body("Ba mục nhỏ sau không phải tình huống giả định. Đó là ba lỗi đã xảy ra thật trong quá trình chuẩn bị các ca phân tích cho tài liệu này."),

H3("5.3.1","Bẫy 1 — AI đọc sai con số"),
body("Trong ca Student Depression, AI báo tỷ lệ trầm cảm là 58,6%. Con số này được đưa vào tiêu đề slide, vào biểu đồ, vào phần ghi chú — tổng cộng năm chỗ."),
body("Khi chạy lại bằng Python để đối chiếu, kết quả thật là:"),
...codeBlock([
  ">>> 16336 / 27901 * 100",
  "58.549872764417046",
  "",
  ">>> f\"{16336/27901*100:.1f}\"",
  "'58.5'",
]),
body("Giá trị đúng là 58,5%, không phải 58,6%. Sai số chỉ 0,1 điểm phần trăm — nhỏ, nhưng nếu giảng viên tự kiểm tra thì toàn bộ độ tin cậy của bài sụp đổ. Lỗi phát sinh vì AI làm tròn hai lần: 58,549 làm tròn thành 58,55 rồi lại làm tròn thành 58,6."),
keypt("Cách phòng: viết một đoạn mã kiểm chứng in ra MỌI con số bạn định trích dẫn, rồi đối chiếu từng con số với bài viết trước khi nộp."),

H3("5.3.2","Bẫy 2 — Rò rỉ nhãn"),
body("Trong ca phân tích dữ liệu trẻ tự kỷ, mục tiêu là dự báo trẻ có dấu hiệu tự kỷ hay không, dựa trên 10 mục sàng lọc A1–A10. Mô hình đạt độ chính xác gần như tuyệt đối — một kết quả đáng ngờ."),
body("Lập bảng chéo giữa tổng điểm sàng lọc và nhãn cho thấy nguyên nhân:"),
threeColTable([
  ["0 – 3 điểm","484 trẻ","TOÀN BỘ đều mang nhãn “không có dấu hiệu”"],
  ["4 – 10 điểm","724 trẻ","TOÀN BỘ đều mang nhãn “có dấu hiệu” — không một ngoại lệ"],
], [2200,1800,CW-4000], ["Tổng điểm AQ","Số trẻ","Nhãn được gán"]),
body("Nhãn không phải chẩn đoán độc lập của bác sĩ. Nó chính là đầu ra của công thức chấm điểm: ai đạt từ 4 điểm trở lên thì bị gán nhãn “có dấu hiệu”. Dùng A1–A10 để dự báo nhãn chẳng khác nào lấy đáp án đi dự đoán đáp án."),
body("Hiện tượng này gọi là rò rỉ nhãn (label leakage). Dấu hiệu nhận biết: mô hình chính xác bất thường, trên 95%, trong một bài toán vốn khó."),
keypt("Cách phòng: khi mô hình cho kết quả đẹp bất ngờ, đừng mừng — hãy nghi ngờ. Lập bảng chéo giữa biến dự báo và nhãn để xem có quan hệ xác định hay không."),

H3("5.3.3","Bẫy 3 — Biến nhân bản"),
body("Vẫn trong ca dữ liệu tự kỷ, bảy cột ghi nhận bảy bệnh đi kèm khác nhau: chậm nói, khó học, chậm phát triển trí tuệ, vấn đề hành vi, lo âu, trầm cảm, rối loạn gen. Nhìn qua đây là mỏ vàng để phân tích bệnh đi kèm."),
body("Nhưng tính tương quan giữa chúng cho kết quả:"),
twoColTable([
  ["Tương quan giữa các cặp","0,88 đến 1,00"],
  ["Tỷ lệ trùng khớp từng cặp","95,6% đến 99,9%"],
  ["Trẻ có cả bảy, hoặc không có cái nào","95,3% số mẫu"],
], 3400, CW-3400),
body("Bảy chẩn đoán lâm sàng độc lập không bao giờ trùng nhau tới 99,9%. Chậm nói và rối loạn gen là hai thứ hoàn toàn khác nhau, tỷ lệ mắc khác nhau. Kết luận: bảy cột này thực chất là một biến được sao chép bảy lần, có thêm chút nhiễu."),
body("Mọi kết luận kiểu “85,8% trẻ tự kỷ có chậm phát triển trí tuệ” rút ra từ dữ liệu này đều vô giá trị."),
keypt("Cách phòng: trước khi phân tích, luôn in ma trận tương quan giữa các biến. Cặp nào có hệ số trên 0,95 thì phải kiểm tra xem có phải là bản sao không."),

H2("5.4","Danh sách kiểm tra trước khi tin AI"),
body("Dùng danh sách này cho mọi kết quả AI đưa ra, trước khi đưa vào báo cáo:"),
threeColTable([
  ["1","Con số đã được chạy lại chưa?","Mọi số trong bài phải do mã của bạn tạo ra, không phải do AI đọc hộ."],
  ["2","Kết quả có đẹp bất thường không?","Độ chính xác trên 95% trong bài toán khó là dấu hiệu rò rỉ nhãn."],
  ["3","Các biến có bị trùng nhau không?","In ma trận tương quan, soi cặp có hệ số trên 0,95."],
  ["4","Có dùng từ chỉ nhân quả không?","Đổi “gây ra” thành “liên quan đến”."],
  ["5","Cỡ mẫu từng nhóm có đủ lớn không?","Nhóm dưới 30 quan sát thì kết luận rất yếu."],
  ["6","Tỷ lệ nền có hợp lý không?","Đối chiếu với hiểu biết thực tế. Vàng da sơ sinh 92% là bất thường."],
  ["7","AI có bỏ sót cách giải thích khác không?","Chủ động hỏi: “Có cách giải thích nào khác cho kết quả này?”"],
], [760,3000,CW-3760], ["#","Câu hỏi kiểm tra","Vì sao cần hỏi"]),

H2("5.5","Bài tập Chương V"),
exTable([
  {num:"V-1",title:"Phân biệt ba mức",level:"Dễ",desc:"Lấy 5 phát biểu từ báo cáo của bạn, xếp mỗi phát biểu vào một trong ba mức ở mục 5.1: mô tả, so sánh, hay tri thức. Nâng cấp ít nhất 2 phát biểu lên mức tri thức."},
  {num:"V-2",title:"Sửa câu nhân quả",level:"Dễ",desc:"Tìm trong bài của bạn (hoặc trong câu trả lời của AI) 5 câu dùng từ chỉ nhân quả không có cơ sở. Viết lại cho đúng mức độ chắc chắn mà dữ liệu cho phép."},
  {num:"V-3",title:"Săn rò rỉ nhãn",level:"TB",desc:"Với bộ dữ liệu của bạn, lập bảng chéo giữa biến mục tiêu và từng biến dự báo mạnh nhất. Kiểm tra xem có quan hệ xác định nào không. Báo cáo kết quả kể cả khi không tìm thấy gì."},
  {num:"V-4",title:"Soi ma trận tương quan",level:"TB",desc:"In ma trận tương quan giữa mọi cặp biến số trong dữ liệu của bạn. Liệt kê mọi cặp có hệ số tuyệt đối trên 0,9 và giải thích: đó là bản sao, là quan hệ thật, hay là một biến được tính ra từ biến kia."},
  {num:"V-5",title:"Phản biện chính mình",level:"Khó",desc:"Chọn phát hiện mà bạn tâm đắc nhất. Viết một trang đóng vai người phản biện khó tính: nêu mọi lý do khiến phát hiện đó có thể sai (mẫu lệch, biến gây nhiễu, rò rỉ, trùng lặp, nhầm chiều nhân quả). Sau đó kiểm tra từng lý do bằng dữ liệu và kết luận phát hiện còn đứng vững hay không."},
]),
PB(),
];

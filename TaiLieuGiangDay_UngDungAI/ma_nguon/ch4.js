const B = require("./base.js");
const { Paragraph,AlignmentType,BorderStyle,ShadingType,TextRun,CW,FONT,SZ_H1,C,
  T,sp,PB,body,note,keypt,H1,H2,H3,codeBlock,bull,twoColTable,threeColTable,exTable } = B;

module.exports = [
H1("IV","TRỰC QUAN HÓA DỮ LIỆU"),
body("Đây là yêu cầu số 3 của đề bài. Một biểu đồ tốt cho thấy ngay điều mà bảng số phải đọc rất lâu mới nhận ra. Một biểu đồ tồi thì ngược lại — nó che giấu hoặc bóp méo sự thật."),

H2("4.1","Chọn loại biểu đồ theo câu hỏi"),
body("Đừng chọn biểu đồ theo sở thích. Hãy xuất phát từ câu hỏi bạn muốn trả lời, rồi tra bảng dưới đây:"),
threeColTable([
  ["Biến này phân bố thế nào?","Histogram (biểu đồ tần suất)","Tuổi của sinh viên tập trung ở khoảng nào?"],
  ["So sánh giữa các nhóm","Biểu đồ cột","Tỷ lệ trầm cảm ở mỗi mức áp lực học tập."],
  ["Xếp hạng nhiều mục","Biểu đồ cột ngang","Yếu tố nào liên quan mạnh nhất đến trầm cảm?"],
  ["Hai biến số có liên hệ không?","Biểu đồ phân tán (scatter)","Điểm trung bình và số giờ học có đi cùng nhau không?"],
  ["Thay đổi theo thời gian","Biểu đồ đường","Tỷ lệ mắc qua các năm."],
  ["Giao của hai biến phân loại","Biểu đồ nhiệt (heatmap)","Áp lực học tập × ý định tự tử."],
  ["Một con số quan trọng","Không cần biểu đồ — in số to","58,5% sinh viên có dấu hiệu trầm cảm."],
], [2500,2400,CW-4900], ["Câu hỏi của bạn","Loại biểu đồ","Ví dụ"]),
note("Tránh biểu đồ tròn khi có quá ba phần, và tuyệt đối tránh biểu đồ tròn 3D — mắt người rất kém trong việc so sánh diện tích hình quạt."),

H2("4.2","Sáu nguyên tắc của một biểu đồ tốt"),
bull("Tiêu đề nói kết luận, không nói loại biểu đồ. Viết “Áp lực học tập tăng thì tỷ lệ trầm cảm tăng”, đừng viết “Biểu đồ cột áp lực học tập”."),
bull("Trục tung của biểu đồ cột phải bắt đầu từ 0. Cắt trục làm phóng đại chênh lệch, đây là cách bóp méo phổ biến nhất."),
bull("Ghi nhãn giá trị trực tiếp lên cột thay vì bắt người đọc dóng sang trục."),
bull("Màu phải mang ý nghĩa, không trang trí. Nếu dùng màu đỏ cho “xấu” thì phải nhất quán ở mọi biểu đồ."),
bull("Màu không được mâu thuẫn với số liệu. Nếu quan hệ không tăng đều mà bạn tô màu theo kiểu tăng dần, người đọc sẽ hiểu sai."),
bull("Ghi rõ cỡ mẫu. Một cột dựa trên 6 người và một cột dựa trên 600 người không có cùng độ tin cậy."),
note("Nguyên tắc 5 không phải lý thuyết suông. Khi vẽ biểu đồ thời lượng ngủ trong ca thực tế, quan hệ hóa ra không tuyến tính: nhóm ngủ 7–8 giờ lại có tỷ lệ cao hơn nhóm ngủ 5–6 giờ. Nếu tô màu từ đỏ sang xanh theo số giờ ngủ, màu sẽ nói một đằng còn cột nói một nẻo."),

H2("4.3","Nhờ AI sinh mã vẽ biểu đồ"),
body("AI viết mã vẽ biểu đồ rất tốt. Nhưng mã mặc định nó sinh ra thường xấu và thiếu nhãn. Hãy yêu cầu cụ thể ngay từ đầu:"),
...codeBlock([
  "Viết mã Python dùng matplotlib vẽ biểu đồ cột thể hiện",
  "tỷ lệ [biến mục tiêu] theo từng mức của [biến nhóm].",
  "",
  "Yêu cầu bắt buộc:",
  "- Tiêu đề nêu kết luận, không nêu tên loại biểu đồ",
  "- Ghi nhãn phần trăm trực tiếp trên đầu mỗi cột",
  "- Trục tung bắt đầu từ 0",
  "- Bỏ đường viền trên và phải, lưới ngang mờ",
  "- Ghi cỡ mẫu n của từng nhóm",
  "- Font hỗ trợ tiếng Việt có dấu",
  "- Số thập phân dùng dấu phẩy theo chuẩn Việt Nam",
  "",
  "Giải thích ngắn từng dòng để tôi hiểu và tự sửa được.",
]),
H3("4.3.1","Ba lỗi hay gặp khi chạy mã AI sinh ra"),
threeColTable([
  ["Chữ tiếng Việt thành ô vuông","Font mặc định không có dấu tiếng Việt","Thêm dòng chỉ định font DejaVu Sans hoặc Arial."],
  ["Nhãn chữ chồng lên nhau","Nhãn dài, khung hình hẹp","Xoay nhãn 35–45 độ, hoặc đổi sang biểu đồ cột ngang."],
  ["Cột bị cắt mất đầu","Giới hạn trục tung đặt quá thấp","Nới giới hạn trên của trục tung thêm 10–15%."],
], [2500,2400,CW-4900], ["Hiện tượng","Nguyên nhân","Cách sửa"]),
keypt("Luôn mở ảnh biểu đồ ra xem bằng mắt sau khi chạy mã. Mã chạy không báo lỗi không có nghĩa là biểu đồ đẹp và đúng."),

H2("4.4","Bài tập Chương IV"),
exTable([
  {num:"IV-1",title:"Tra bảng chọn biểu đồ",level:"Dễ",desc:"Viết 6 câu hỏi nghiên cứu về bộ dữ liệu của bạn. Với mỗi câu, chọn loại biểu đồ phù hợp theo bảng mục 4.1 và giải thích lý do."},
  {num:"IV-2",title:"Vẽ biểu đồ đầu tiên",level:"Dễ",desc:"Dùng mẫu câu lệnh ở mục 4.3 để nhờ AI sinh mã, chạy và xuất ra một tệp ảnh. Đính kèm cả mã lẫn ảnh vào báo cáo."},
  {num:"IV-3",title:"Chữa biểu đồ tồi",level:"TB",desc:"Tìm trên báo hoặc mạng xã hội một biểu đồ vi phạm ít nhất hai trong sáu nguyên tắc ở mục 4.2. Chỉ ra lỗi, rồi vẽ lại phiên bản đã sửa."},
  {num:"IV-4",title:"Kiểm tra màu có nói dối không",level:"TB",desc:"Vẽ một biểu đồ cột cho biến thứ bậc trong dữ liệu của bạn. Kiểm tra xem quan hệ có tăng/giảm đều không. Nếu không đều, hãy giải thích bạn chọn cách tô màu nào và vì sao."},
  {num:"IV-5",title:"Bộ biểu đồ đồng bộ",level:"Khó",desc:"Vẽ 4 biểu đồ cho cùng một bộ dữ liệu sao cho chúng trông như một hệ thống: cùng bảng màu, cùng cỡ chữ, cùng cách ghi nhãn, cùng cách định dạng số. Viết một đoạn giải thích quy ước thiết kế bạn đã đặt ra và tuân thủ."},
]),
PB(),
];

const B = require("./base.js");
const { Paragraph,AlignmentType,BorderStyle,ShadingType,TextRun,CW,FONT,SZ_H1,C,
  T,sp,PB,body,note,keypt,H1,H2,H3,codeBlock,bull,twoColTable,threeColTable,exTable } = B;

module.exports = [
H1("II","LÀM QUEN VỚI DỮ LIỆU"),
body("Trước khi phân tích bất cứ điều gì, bạn phải biết trong tay mình đang có gì. Bước này gọi là phân tích khám phá dữ liệu — tiếng Anh là Exploratory Data Analysis, viết tắt EDA. Đây chính là yêu cầu số 1 trong đề bài của môn học."),

H2("2.1","Dữ liệu dạng bảng"),
body("Hầu hết dữ liệu bạn gặp trong môn học này ở dạng bảng, giống bảng tính Excel. Ba khái niệm cần nhớ:"),
threeColTable([
  ["Dòng (row)","Một đối tượng được khảo sát","Một sinh viên, một bệnh nhân, một quốc gia. Bộ dữ liệu 27.901 dòng nghĩa là 27.901 sinh viên."],
  ["Cột (column)","Một thông tin được ghi nhận","Tuổi, giới tính, điểm số. Còn gọi là biến (variable)."],
  ["Ô (cell)","Giao của một dòng và một cột","Giá trị cụ thể: sinh viên thứ 5 có tuổi là 21."],
], [1900,2600,CW-4500], ["Khái niệm","Ý nghĩa","Ví dụ"]),
body("Tệp dữ liệu thường có đuôi .csv. Đây chỉ là tệp văn bản thuần, mỗi dòng là một bản ghi, các giá trị cách nhau bởi dấu phẩy. Bạn mở được bằng Excel, Google Sheets, hoặc Notepad."),
note("Khi mở tệp .csv tiếng Việt bằng Excel mà thấy chữ bị lỗi font, hãy dùng Data → From Text/CSV và chọn mã hóa UTF-8, đừng nhấp đúp mở trực tiếp."),

H2("2.2","Bốn loại biến thường gặp"),
body("Biết biến thuộc loại nào quyết định bạn vẽ biểu đồ gì và dùng phép kiểm định nào. Đây là kiến thức nền quan trọng nhất của chương."),
threeColTable([
  ["Biến số liên tục","Đo được, có thể lấy giá trị lẻ","Tuổi (21,5), điểm trung bình (7,85), chiều cao. Vẽ: biểu đồ phân bố (histogram)."],
  ["Biến phân loại","Tên gọi, không có thứ tự","Giới tính, thành phố, ngành học. Vẽ: biểu đồ cột."],
  ["Biến thứ bậc","Có thứ tự nhưng khoảng cách không đều","Mức áp lực 1–5, trình độ (sơ cấp/trung cấp/cao cấp). Vẽ: biểu đồ cột theo đúng thứ tự."],
  ["Biến nhị phân","Chỉ hai giá trị","Có/Không, Nam/Nữ, Mắc/Không mắc. Thường mã hóa thành 1/0."],
], [2200,2500,CW-4700], ["Loại biến","Đặc điểm","Ví dụ và cách vẽ"]),
note("Một biến ghi bằng chữ số chưa chắc là biến số. Mã vùng 024, 028 là con số nhưng thực chất là biến phân loại — lấy trung bình mã vùng là vô nghĩa."),

H2("2.3","Đưa dữ liệu cho AI và hỏi gì"),
body("Hầu hết trợ lý AI cho phép tải tệp lên trực tiếp. Sau khi tải lên, đừng hỏi chung chung kiểu “phân tích giúp tôi” — câu trả lời sẽ lan man. Hãy hỏi theo thứ tự cụ thể."),
H3("2.3.1","Mẫu câu lệnh cho bước khám phá"),
body("Dưới đây là mẫu câu lệnh bạn có thể chép và dùng ngay. Phần trong dấu ngoặc vuông là chỗ bạn thay bằng thông tin của mình:"),
...codeBlock([
  "Tôi đính kèm tệp [tên tệp].csv. Hãy giúp tôi khám phá dữ liệu này.",
  "",
  "Trả lời lần lượt các mục sau, mỗi mục một đoạn ngắn:",
  "1. Bộ dữ liệu có bao nhiêu dòng, bao nhiêu cột?",
  "2. Liệt kê từng cột: tên cột, kiểu dữ liệu, ý nghĩa bạn đoán.",
  "3. Cột nào có giá trị khuyết? Bao nhiêu ô, chiếm bao nhiêu phần trăm?",
  "4. Có dòng nào trùng lặp hoàn toàn không?",
  "5. Cột nào có giá trị bất thường hoặc ngoài thang đo hợp lý?",
  "6. Biến nào có thể dùng làm biến mục tiêu để phân tích?",
  "",
  "Quan trọng: hãy viết kèm mã Python (pandas) cho từng mục,",
  "để tôi tự chạy lại và đối chiếu con số.",
]),
body("Câu cuối cùng là câu quan trọng nhất. Nó buộc AI đưa cho bạn công cụ kiểm chứng thay vì chỉ đưa kết luận."),

H3("2.3.2","Ba câu hỏi nên hỏi tiếp"),
bull("“Liệt kê toàn bộ giá trị duy nhất của cột [tên cột], kèm số lần xuất hiện” — câu này phát hiện lỗi nhập liệu rất hiệu quả."),
bull("“Cột nào có một giá trị chiếm trên 95% số dòng?” — tìm các cột gần như hằng số, thường nên bỏ."),
bull("“Có cặp cột nào gần như trùng nhau không?” — tìm biến nhân bản, xem Chương V mục 5.3."),

H2("2.4","Ca thực tế: bộ dữ liệu trầm cảm sinh viên"),
body("Để tài liệu không chỉ là lý thuyết, mục này kể lại một ca có thật. Bộ dữ liệu Student Depression khảo sát 27.901 sinh viên với 18 biến. Khi chạy bước khám phá, kết quả thu được như sau:"),
twoColTable([
  ["Quy mô","27.901 dòng × 18 cột"],
  ["Giá trị khuyết","Chỉ 3 ô, đều ở cột Áp lực tài chính — rất sạch"],
  ["Trùng lặp","0 dòng trùng"],
  ["Biến mục tiêu","Cột Depression, nhị phân, 58,5% có dấu hiệu trầm cảm"],
  ["Mất cân bằng","Tỷ lệ 1,41:1 — nhẹ, không cần kỹ thuật xử lý đặc biệt"],
], 2700, CW-2700),
body("Nhìn qua, bộ dữ liệu này có vẻ rất sạch: gần như không khuyết, không trùng. Nhiều người sẽ phân tích luôn. Nhưng khi hỏi AI câu “liệt kê toàn bộ giá trị duy nhất của cột City”, kết quả lộ ra vấn đề nghiêm trọng — chi tiết ở Chương III mục 3.4."),
keypt("Bài học: một bộ dữ liệu “không khuyết, không trùng” chưa chắc là sạch. Phải soi từng cột."),

H2("2.5","Bài tập Chương II"),
exTable([
  {num:"II-1",title:"Phân loại biến",level:"Dễ",desc:"Cho bảng 10 cột bất kỳ (có thể lấy từ bộ dữ liệu môn học). Xếp mỗi cột vào một trong bốn loại biến ở mục 2.2 và nêu loại biểu đồ phù hợp."},
  {num:"II-2",title:"Chạy mẫu câu lệnh EDA",level:"Dễ",desc:"Tải một bộ dữ liệu bất kỳ lên trợ lý AI, dùng đúng mẫu câu lệnh ở mục 2.3.1. Chép lại toàn bộ câu trả lời vào báo cáo."},
  {num:"II-3",title:"Kiểm chứng số liệu AI đưa ra",level:"TB",desc:"Lấy mã Python mà AI đã viết, chạy lại trên máy của bạn (hoặc Google Colab). Lập bảng ba cột: con số AI nói — con số bạn chạy ra — khớp hay lệch."},
  {num:"II-4",title:"Săn lỗi nhập liệu",level:"TB",desc:"Với mỗi cột phân loại trong bộ dữ liệu của bạn, liệt kê các giá trị xuất hiện dưới 5 lần. Nhận xét: giá trị nào là lỗi nhập liệu, giá trị nào là hợp lệ nhưng hiếm."},
  {num:"II-5",title:"Viết báo cáo khám phá",level:"Khó",desc:"Viết báo cáo khám phá dài 2 trang cho một bộ dữ liệu tự chọn, gồm: mô tả quy mô, bảng mô tả từng biến, phát hiện về chất lượng dữ liệu, và ba câu hỏi nghiên cứu mà bộ dữ liệu này có thể trả lời. Mọi con số phải kèm đoạn mã tạo ra nó."},
]),
PB(),
];

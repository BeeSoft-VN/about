const B=require("./base.js");
const {Paragraph,AlignmentType,ShadingType,TextRun,CW,FONT,SZ_H1,C,T,sp,PB,body,note,keypt,
 H1,H2,H3,codeBlock,bull,twoColTable,threeColTable,img}=B;
const path=require("path"); const IMG=n=>path.join(__dirname,"img",n+".png");
module.exports=[

/* ══ CHƯƠNG I ══ */
H1("I","GIỚI THIỆU NHÓM VÀ ĐỀ TÀI"),
H2("1.1","Thành viên nhóm và phân công"),
threeColTable([
 ["1","……………………………………","Nhóm trưởng · tổng hợp báo cáo, trình bày"],
 ["2","……………………………………","Khám phá dữ liệu (EDA), viết Chương III"],
 ["3","……………………………………","Tiền xử lý dữ liệu, viết Chương IV"],
 ["4","……………………………………","Trực quan hóa, vẽ toàn bộ biểu đồ"],
 ["5","……………………………………","Phân tích kết quả, kiểm chứng số liệu"],
],[760,3200,CW-3960],["STT","Họ và tên","Nhiệm vụ phụ trách"]),
note("Nhóm điền tên thành viên vào bảng trên trước khi nộp."),
twoColTable([
 ["Lớp","……………………………………"],
 ["Giảng viên hướng dẫn","……………………………………"],
 ["Thời gian thực hiện","……………………………………"],
],3200,CW-3200),

H2("1.2","Lý do chọn đề tài"),
body("Trong tám bộ dữ liệu đề bài đưa ra, nhóm chọn Student Depression Dataset vì ba lý do."),
body("Thứ nhất, đề tài gần với chính đối tượng của nhóm. Các biến trong bộ dữ liệu — áp lực học tập, áp lực tài chính, số giờ học mỗi ngày, thời lượng ngủ — là những điều mà bản thân nhóm trải qua hằng ngày, nên nhóm có hiểu biết nền để đánh giá kết quả phân tích có hợp lý hay không."),
body("Thứ hai, quy mô đủ lớn. Với 27.901 bản ghi, các kiểm định thống kê có hiệu lực cao và kết quả không bị chi phối bởi vài trường hợp cá biệt."),
body("Thứ ba, và đây là lý do nhóm đánh giá cao nhất sau khi hoàn thành: bộ dữ liệu này nhìn qua rất sạch nhưng thực tế có bốn nhóm lỗi tinh vi. Nhờ vậy nhóm được thực hành khâu tiền xử lý một cách có ý nghĩa, thay vì chỉ tải dữ liệu lên rồi vẽ biểu đồ."),

H2("1.3","Câu hỏi nghiên cứu"),
body("Báo cáo trả lời ba câu hỏi, sắp xếp theo mức độ khó tăng dần:"),
bull("Câu hỏi 1 — Trong các yếu tố học tập, tài chính và lối sống, yếu tố nào liên quan mạnh nhất đến trầm cảm ở sinh viên?"),
bull("Câu hỏi 2 — Các yếu tố nguy cơ khi xuất hiện đồng thời có cộng hưởng với nhau không, hay chỉ cộng dồn?"),
bull("Câu hỏi 3 — Từ kết quả đó, nhà trường có thể làm gì một cách cụ thể?"),

H2("1.4","Cấu trúc báo cáo"),
threeColTable([
 ["Chương I","Giới thiệu nhóm và đề tài","Thành viên, lý do chọn, câu hỏi nghiên cứu"],
 ["Chương II","Công cụ AI đã sử dụng","Công cụ nào, dùng ở bước nào, kiểm chứng ra sao"],
 ["Chương III","Giới thiệu bộ dữ liệu","Nguồn, quy mô, 18 biến, kết quả khám phá"],
 ["Chương IV","Quá trình xử lý dữ liệu","Bốn vấn đề phát hiện, sáu bước xử lý, nhật ký"],
 ["Chương V","Kết quả phân tích","Sáu biểu đồ và mô hình kiểm chứng"],
 ["Chương VI","Nhận định và kết luận","Sáu nhận định, đề xuất ứng dụng, hạn chế"],
],[1500,2900,CW-4400],["Chương","Tên chương","Nội dung chính"]),
PB(),

/* ══ CHƯƠNG II ══ */
H1("II","CÔNG CỤ AI ĐÃ SỬ DỤNG"),
body("Đề bài yêu cầu sử dụng công cụ AI để phân tích khám phá dữ liệu. Chương này nêu rõ nhóm đã dùng công cụ nào, ở bước nào, và quan trọng hơn — kiểm chứng kết quả của AI bằng cách nào."),

H2("2.1","Danh mục công cụ"),
threeColTable([
 ["Trợ lý AI hội thoại","ChatGPT · Gemini · Claude","Khám phá dữ liệu ban đầu, gợi ý hướng phân tích, sinh mã Python, giải thích khái niệm thống kê"],
 ["Python 3 + pandas","Thư viện xử lý dữ liệu","Làm sạch, mã hóa và kiểm chứng toàn bộ số liệu"],
 ["matplotlib","Thư viện vẽ biểu đồ","Vẽ toàn bộ biểu đồ trong báo cáo"],
 ["scipy.stats","Thư viện thống kê","Kiểm định chi-square, t-test, tương quan point-biserial"],
 ["scikit-learn","Thư viện học máy","Hồi quy Logistic và Random Forest ở Chương V"],
],[2300,2100,CW-4400],["Công cụ","Phiên bản / loại","Dùng để làm gì"]),

H2("2.2","Quy trình năm bước có AI hỗ trợ"),
threeColTable([
 ["1","Khám phá ban đầu","Tải bộ dữ liệu lên trợ lý AI, yêu cầu mô tả cấu trúc, thống kê mô tả và phát hiện bất thường."],
 ["2","Chẩn đoán chất lượng","Nhờ AI rà soát từng cột: giá trị khuyết, trùng lặp, ngoài thang đo, nhãn rác, cột gần như hằng số."],
 ["3","Sinh mã xử lý","AI viết mã Python cho các bước làm sạch; nhóm đọc hiểu, chỉnh sửa và chạy lại."],
 ["4","Trực quan hóa","AI đề xuất loại biểu đồ phù hợp với từng câu hỏi; nhóm quyết định bảng màu và cách ghi nhãn."],
 ["5","Diễn giải và phản biện","Yêu cầu AI nêu cách giải thích thay thế và các hạn chế, tránh kết luận nhân quả vội vàng."],
],[600,2300,CW-2900],["Bước","Tên bước","Cách nhóm sử dụng AI"]),

H2("2.3","Câu lệnh mẫu đã dùng"),
body("Dưới đây là câu lệnh nhóm dùng ở bước khám phá. Câu cuối cùng là câu quan trọng nhất:"),
...codeBlock([
 "Tôi đính kèm tệp student_depression.csv.",
 "Trả lời lần lượt các mục sau, mỗi mục một đoạn ngắn:",
 "1. Bộ dữ liệu có bao nhiêu dòng, bao nhiêu cột?",
 "2. Liệt kê từng cột: tên, kiểu dữ liệu, ý nghĩa.",
 "3. Cột nào có giá trị khuyết? Bao nhiêu phần trăm?",
 "4. Có dòng nào trùng lặp hoàn toàn không?",
 "5. Cột nào có giá trị ngoài thang đo hợp lý?",
 "6. Liệt kê mọi giá trị xuất hiện dưới 10 lần ở từng",
 "   cột phân loại.",
 "",
 "Quan trọng: hãy viết kèm mã Python (pandas) cho từng",
 "mục, để tôi tự chạy lại và đối chiếu con số.",
]),
body("Yêu cầu AI viết kèm mã nguồn buộc nó đưa cho nhóm công cụ kiểm chứng, thay vì chỉ đưa ra kết luận mà nhóm phải tin."),

H2("2.4","Cách nhóm kiểm chứng kết quả của AI"),
keypt("Nguyên tắc xuyên suốt: mọi con số xuất hiện trong báo cáo này đều do nhóm chạy mã Python tạo ra, không lấy trực tiếp từ câu trả lời của trợ lý AI."),
body("Nhóm viết một tệp mã riêng có tên verify.py, in ra toàn bộ con số được trích dẫn trong báo cáo, rồi đối chiếu từng con số với bản thảo trước khi nộp."),
H3("2.4.1","Một lỗi thật đã bắt được"),
body("Trong quá trình làm bài, trợ lý AI báo tỷ lệ trầm cảm là 58,6%. Con số này đã được đưa vào năm chỗ khác nhau: tiêu đề slide, biểu đồ, phần ghi chú. Khi chạy lại bằng Python:"),
...codeBlock([
 ">>> 16336 / 27901 * 100",
 "58.549872764417046",
 "",
 ">>> f\"{16336/27901*100:.1f}\"",
 "'58.5'",
]),
body("Giá trị đúng là 58,5%. AI đã làm tròn hai lần: 58,549 thành 58,55, rồi 58,55 thành 58,6. Sai số chỉ 0,1 điểm phần trăm, nhưng nếu người chấm tự bấm máy kiểm tra thì toàn bộ độ tin cậy của báo cáo sẽ bị đặt dấu hỏi."),
H3("2.4.2","Một lỗi kỹ thuật dễ bỏ sót"),
body("Khi tính hệ số tương quan của biến Áp lực tài chính, hàm trả về giá trị NaN mà không báo lỗi. Nguyên nhân: cột này còn 3 ô khuyết, và hàm tính tương quan không tự bỏ qua chúng. Phải loại ô khuyết trước khi tính:"),
...codeBlock([
 "s = df[['Depression','Financial Stress']].dropna()",
 "r, p = stats.pointbiserialr(s['Depression'],",
 "                            s['Financial Stress'])",
 "# n = 27.898  ->  r = +0,364",
]),
note("Chương trình không báo lỗi, chỉ lặng lẽ trả về NaN. Đây là loại lỗi rất dễ lọt vào báo cáo nếu không đọc kỹ kết quả."),
PB(),
];

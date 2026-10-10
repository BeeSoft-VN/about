const B=require("./base.js");
const {Paragraph,AlignmentType,ShadingType,TextRun,CW,FONT,SZ_H1,C,T,sp,PB,body,note,keypt,
 H1,H2,H3,codeBlock,bull,twoColTable,threeColTable,img}=B;
const path=require("path"); const IMG=n=>path.join(__dirname,"img",n+".png");
module.exports=[

/* ══ CHƯƠNG III ══ */
H1("III","GIỚI THIỆU BỘ DỮ LIỆU"),
H2("3.1","Nguồn gốc và quy mô"),
twoColTable([
 ["Tên bộ dữ liệu","Student Depression Dataset"],
 ["Nguồn","Kaggle — tác giả hopesb"],
 ["Bối cảnh khảo sát","Sinh viên tại Ấn Độ"],
 ["Số bản ghi","27.901 sinh viên"],
 ["Số biến","18 cột"],
 ["Tổng số ô dữ liệu","502.218"],
 ["Dung lượng","13,89 MB"],
 ["Biến mục tiêu","Depression — nhị phân 0/1"],
],3400,CW-3400),

H2("3.2","Cấu trúc 18 biến"),
body("Nhóm phân 18 biến thành bốn nhóm theo bản chất thông tin:"),
threeColTable([
 ["Nhân khẩu học","4 biến","Giới tính · Tuổi · Thành phố · Nghề nghiệp"],
 ["Học tập","4 biến","Áp lực học tập · Điểm CGPA · Mức hài lòng việc học · Bằng cấp"],
 ["Lối sống","3 biến","Thời lượng ngủ · Chế độ ăn · Số giờ học/làm mỗi ngày"],
 ["Tâm lý – xã hội","5 biến","Áp lực tài chính · Tiền sử gia đình · Ý định tự tử · Áp lực công việc · Hài lòng công việc"],
 ["Khác","2 biến","id (định danh) · Depression (biến mục tiêu)"],
],[2200,1100,CW-3300],["Nhóm biến","Số lượng","Các biến thành phần"]),

H2("3.3","Kết quả khám phá dữ liệu"),
H3("3.3.1","Phân bố biến mục tiêu"),
...img(IMG("c1_target"),5.3,3.1,"Hình 1. Phân bố biến mục tiêu Depression"),
twoColTable([
 ["Có dấu hiệu trầm cảm","16.336 sinh viên — 58,5%"],
 ["Không có dấu hiệu","11.565 sinh viên — 41,5%"],
 ["Tỷ số","1,41 : 1 — mất cân bằng nhẹ"],
 ["Kết luận","Ngưỡng cần xử lý mất cân bằng thường là từ 4:1, nên bộ dữ liệu này không cần kỹ thuật lấy mẫu lại."],
],3400,CW-3400),
H3("3.3.2","Phân bố các biến số"),
...img(IMG("e1_phanbo"),6.5,3.9,"Hình 2. Phân bố của Tuổi, Điểm CGPA, Số giờ học/làm và Áp lực học tập"),
body("Ba quan sát. Tuổi tập trung trong khoảng 18–34, phân vị 99% là 34 tuổi, phần đuôi tới 59 tuổi chỉ gồm 12 sinh viên. Điểm CGPA tập trung trong khoảng 5–10 và hoàn toàn trống ở khoảng 0,01–5, ngoại trừ 9 giá trị bằng đúng 0 — đây là dấu hiệu rõ ràng rằng các số 0 đó là giá trị thiếu bị mã hóa nhầm. Số giờ học lệch về phía cao, nhóm đông nhất là 10 giờ mỗi ngày với 4.234 sinh viên."),
H3("3.3.3","Phát hiện ngoại lai"),
...img(IMG("e2_ngoailai"),6.5,2.25,"Hình 3. Biểu đồ hộp phát hiện ngoại lai theo quy tắc 1,5×IQR"),
threeColTable([
 ["Age","12","Sinh viên 44–59 tuổi — hợp lệ về thực tế, giữ nguyên"],
 ["CGPA","9","Giá trị bằng 0 — lỗi thật, cần xử lý"],
 ["Bốn biến thang 1–5","0","Không có ngoại lai do bị giới hạn trong khoảng hẹp"],
],[2200,1100,CW-3300],["Biến","Số ngoại lai","Đánh giá"]),
keypt("Bài học phương pháp: ngoại lai thống kê không đồng nghĩa với lỗi dữ liệu. 12 sinh viên lớn tuổi là ngoại lai nhưng hợp lệ; 9 giá trị CGPA bằng 0 không phải ngoại lai theo cảm quan nhưng lại là lỗi thật."),
H3("3.3.4","Tương quan giữa các biến độc lập"),
...img(IMG("e4_tuongquan"),5.7,4.6,"Hình 4. Ma trận tương quan giữa các biến số chính"),
body("Kiểm tra đa cộng tuyến là bước bắt buộc trước khi xây mô hình. Trong số các biến độc lập có ý nghĩa, không cặp nào đạt |r| lớn hơn 0,3. Kết luận: bộ dữ liệu không có vấn đề đa cộng tuyến, có thể đưa đồng thời các biến vào mô hình mà không lo hệ số bị méo."),
PB(),

/* ══ CHƯƠNG IV ══ */
H1("IV","QUÁ TRÌNH XỬ LÝ DỮ LIỆU"),
body("Đề bài yêu cầu xác định bộ dữ liệu có cần tiền xử lý hay không và giải thích các bước. Câu trả lời của nhóm: CÓ cần, nhưng ở mức nhẹ."),

H2("4.1","Hai chỉ số cơ bản: rất sạch"),
twoColTable([
 ["Ô khuyết","3 ô trên 502.218 — chiếm 0,0006%, đều ở cột Áp lực tài chính"],
 ["Bản ghi trùng hoàn toàn","0 — sau khi đã loại cột id khỏi phép so sánh"],
],3800,CW-3800),
note("Khi kiểm tra trùng lặp bắt buộc phải loại cột định danh trước. Nếu giữ cột id, mỗi dòng đều có mã riêng nên kết quả luôn bằng 0 và ta sẽ bỏ sót trùng lặp thật."),

H2("4.2","Bốn vấn đề phát hiện được"),
H3("4.2.1","Vấn đề 1 — Ba cột gần như hằng số"),
threeColTable([
 ["Profession","99,89% là “Student”","Chỉ 31 bản ghi không phải sinh viên"],
 ["Work Pressure","99,99% bằng 0","Chỉ 3 bản ghi khác 0"],
 ["Job Satisfaction","99,97% bằng 0","Chỉ 8 bản ghi khác 0"],
],[2300,2200,CW-4500],["Cột","Mức độ tập trung","Chi tiết"]),
body("Nguyên nhân rõ ràng: gần như toàn bộ người trả lời là sinh viên nên hai biến về công việc không áp dụng được. Ba cột này không phân biệt được gì giữa các bản ghi, giữ lại chỉ làm nhiễu mô hình."),
H3("4.2.2","Vấn đề 2 — Giá trị ngoài thang đo"),
threeColTable([
 ["Academic Pressure","1 – 5","9 ô có giá trị 0"],
 ["Study Satisfaction","1 – 5","10 ô có giá trị 0"],
 ["CGPA","0,01 – 10","9 sinh viên có CGPA đúng bằng 0"],
],[2300,1800,CW-4100],["Cột","Thang đo hợp lệ","Vi phạm"]),
body("Tổng cộng 28 ô. Chín sinh viên có CGPA bằng 0 thuộc các bằng cấp Class 12 (7 người), BBA (1) và M.Ed (1) — không có lý do hợp lý để một sinh viên đang theo học có điểm tích lũy đúng bằng 0."),
H3("4.2.3","Vấn đề 3 — Nhãn rác dạng “Others”"),
twoColTable([["Sleep Duration","18 ô"],["Dietary Habits","12 ô"],["Degree","35 ô"],["Tổng cộng","65 ô"]],3400,CW-3400),
H3("4.2.4","Vấn đề 4 — Dữ liệu lạc chỗ trong cột Thành phố"),
body("Cột City có 52 giá trị nhưng chỉ 30 giá trị xuất hiện từ 10 bản ghi trở lên. 22 nhãn còn lại (tổng 26 dòng) không phải tên thành phố:"),
...codeBlock([
 "Saanvi, Bhavna, Harsha, Gaurav, Harsh, Reyansh, Rashi,",
 "Mira, Vaanya, Mihir, Nalini, Nandini, Kibara, Nalyan,",
 "M.Tech, M.Com, ME, City, 3.0, Khaziabad,",
 "Less Delhi, Less than 5 Kalyan",
]),
threeColTable([
 ["Tên người","12 nhãn","Saanvi, Bhavna, Gaurav, Reyansh… — tên riêng"],
 ["Mã bằng cấp","3 nhãn","M.Tech, M.Com, ME — thuộc cột Degree"],
 ["Chuỗi lỗi ghép","2 nhãn","“Less Delhi”, “Less than 5 Kalyan”"],
 ["Khác","5 nhãn","“City” (tên cột lọt vào dữ liệu), “3.0”, tên viết sai"],
],[1900,1300,CW-3200],["Nhóm","Số nhãn","Mô tả"]),
keypt("Hai chuỗi “Less Delhi” và “Less than 5 Kalyan” là bằng chứng quan trọng nhất: chúng cho thấy quy trình nhập liệu bị LỆCH CỘT — giá trị của cột Thời lượng ngủ dính vào tên thành phố. Đây là lỗi hệ thống, không phải gõ nhầm ngẫu nhiên."),

H2("4.3","Sáu bước tiền xử lý"),
threeColTable([
 ["1","Loại bỏ 4 cột","id, Profession, Work Pressure, Job Satisfaction — gần như hằng số hoặc chỉ là định danh"],
 ["2","Làm sạch cột Thành phố","Giữ 30 thành phố có từ 10 bản ghi trở lên; 26 giá trị rác chuyển thành khuyết"],
 ["3","Chuẩn hóa thang đo","28 giá trị ngoài thang 1–5 và CGPA bằng 0 chuyển thành khuyết"],
 ["4","Xử lý nhãn rác","65 nhãn “Others” ở 3 biến phân loại chuyển thành khuyết"],
 ["5","Điền khuyết","122 ô: trung vị cho biến số, giá trị phổ biến nhất cho biến phân loại"],
 ["6","Mã hóa biến","Thời lượng ngủ → số giờ; Chế độ ăn → thang 1–3; Có/Không → 1/0"],
],[600,2400,CW-3000],["Bước","Thao tác","Chi tiết"]),

H2("4.4","Kết quả sau xử lý"),
threeColTable([
 ["Số bản ghi","27.901","27.901 — giữ 100%"],
 ["Số cột","18","19 (14 cột gốc + 5 biến mã hóa)"],
 ["Ô khuyết","3","0"],
 ["Giá trị cột City","52","30"],
 ["Academic Pressure nhỏ nhất","0","1"],
 ["CGPA nhỏ nhất","0","5,03"],
 ["Nhãn Sleep Duration","5 (có “Others”)","4"],
],[2600,1700,CW-4300],["Chỉ số","Trước xử lý","Sau xử lý"]),
H3("4.4.1","Năm biến mã hóa mới"),
threeColTable([
 ["Sleep_Hours","4,5 · 5,5 · 7,5 · 9,0","Từ Sleep Duration — chuyển nhãn chữ sang số giờ"],
 ["Diet_Score","1 · 2 · 3","Từ Dietary Habits — Lành mạnh 1, Trung bình 2, Kém 3"],
 ["Suicidal","0 · 1","Từ câu hỏi về ý định tự tử"],
 ["FamHistory","0 · 1","Từ Family History of Mental Illness"],
 ["Gender_M","0 · 1","Từ Gender — nam bằng 1"],
],[2000,1900,CW-3900],["Biến mới","Giá trị","Nguồn và cách mã hóa"]),
keypt("Nguyên tắc xử lý của nhóm: không xóa bản ghi nào. Vì tỷ lệ ô lỗi chỉ khoảng 0,02% tổng số ô, nhóm chọn sửa giá trị sai thành khuyết rồi điền lại, thay vì loại bỏ cả dòng. Nhờ vậy giữ được toàn bộ 27.901 bản ghi."),
note("Phân biệt loại thang đo khi mã hóa: Diet_Score là thang thứ bậc (1 < 2 < 3 có ý nghĩa), còn Gender_M chỉ là nhãn (0 và 1 không có nghĩa lớn bé). Nhầm lẫn hai loại này sẽ dẫn tới diễn giải sai."),
PB(),
];

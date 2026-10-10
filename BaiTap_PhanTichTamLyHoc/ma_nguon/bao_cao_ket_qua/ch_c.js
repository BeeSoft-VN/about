const B=require("./base.js");
const {Paragraph,AlignmentType,ShadingType,TextRun,CW,FONT,SZ_H1,C,T,sp,PB,body,note,keypt,
 H1,H2,H3,codeBlock,bull,twoColTable,threeColTable,img}=B;
const path=require("path"); const IMG=n=>path.join(__dirname,"img",n+".png");
module.exports=[

/* ══ CHƯƠNG V ══ */
H1("V","KẾT QUẢ PHÂN TÍCH"),
body("Chương này trình bày sáu biểu đồ trả lời hai câu hỏi nghiên cứu đầu tiên, kèm một mô hình dự báo dùng để kiểm chứng tính nhất quán của các mối liên hệ tìm được."),

H2("5.1","Áp lực học tập và áp lực tài chính"),
...img(IMG("c2_pressure"),6.5,2.25,"Hình 5. Hai yếu tố áp lực: quan hệ đơn điệu tăng rõ rệt"),
threeColTable([
 ["Mức 1","19,4%","31,9%"],["Mức 2","37,5%","43,0%"],["Mức 3","60,1%","58,9%"],
 ["Mức 4","76,1%","69,1%"],["Mức 5","86,1%","81,3%"],
],[1800,2500,CW-4300],["Mức độ","Tỷ lệ trầm cảm — Áp lực học tập","Tỷ lệ trầm cảm — Áp lực tài chính"]),
body("Áp lực học tập từ mức 1 lên mức 5 làm tỷ lệ trầm cảm tăng 67 điểm phần trăm; áp lực tài chính tăng 49 điểm. Một chi tiết đáng chú ý: ngay cả nhóm áp lực tài chính thấp nhất vẫn có gần 32% có dấu hiệu trầm cảm, cho thấy còn nhiều yếu tố khác cùng tác động."),

H2("5.2","Xếp hạng toàn bộ yếu tố"),
...img(IMG("c3_corr"),6.1,3.5,"Hình 6. Hệ số tương quan point-biserial của từng yếu tố với biến mục tiêu"),
threeColTable([
 ["Ý định tự tử","+0,546","< 0,001"],["Áp lực học tập","+0,475","< 0,001"],
 ["Áp lực tài chính","+0,364","< 0,001"],["Tuổi","−0,226","< 0,001"],
 ["Giờ học/làm mỗi ngày","+0,209","< 0,001"],["Chế độ ăn kém lành mạnh","+0,207","< 0,001"],
 ["Hài lòng việc học","−0,168","< 0,001"],["Số giờ ngủ","−0,082","< 0,001"],
 ["Tiền sử gia đình","+0,053","< 0,001"],["Điểm CGPA","+0,022","< 0,001"],
 ["Giới tính (nam)","+0,002","0,764"],
],[3000,2100,CW-5100],["Yếu tố","Hệ số r","p-value"]),
keypt("Hai kết quả đi ngược trực giác. Thứ nhất, điểm CGPA gần như không liên quan (r = 0,022) — học giỏi không đồng nghĩa với khỏe mạnh tâm lý. Thứ hai, giới tính hoàn toàn không tạo khác biệt (p = 0,764), nam 58,6% so với nữ 58,5%."),
keypt("Kết quả thứ ba đáng bình luận: tiền sử gia đình chỉ đạt 0,053, yếu hơn nhiều so với áp lực học tập (0,475) và tài chính (0,364). Trong bộ dữ liệu này, hoàn cảnh quan trọng hơn di truyền."),
H3("5.2.1","Kiểm chứng trực quan bằng biểu đồ phân tán"),
...img(IMG("e5_scatter_cgpa"),6.5,3.6,"Hình 7. Biểu đồ phân tán CGPA × Tuổi, tô màu theo tình trạng trầm cảm"),
body("Hệ số 0,022 là con số trừu tượng; biểu đồ phân tán cho thấy điều đó nghĩa là gì. Nếu CGPA phân biệt được hai nhóm, màu đỏ sẽ dồn về một phía trục hoành. Thực tế hai màu trộn đều từ trái sang phải. Ngược lại, theo trục tung có thể thấy dải 18–25 tuổi đậm màu đỏ hơn rõ rệt — phù hợp với hệ số −0,226 của biến Tuổi."),

H2("5.3","Lối sống: giấc ngủ và dinh dưỡng"),
...img(IMG("c4_lifestyle"),6.5,2.25,"Hình 8. Hai biến lối sống có thể can thiệp được"),
threeColTable([
 ["Chế độ ăn","Lành mạnh 45,4% → Kém lành mạnh 70,7%","Tăng đều, chênh 25,3 điểm %"],
 ["Thời lượng ngủ","Dưới 5h 64,5% · 5–6h 56,9% · 7–8h 59,5% · Trên 8h 50,9%","KHÔNG tuyến tính"],
],[1900,3000,CW-4900],["Biến","Tỷ lệ theo nhóm","Dạng quan hệ"]),
note("Vì quan hệ của thời lượng ngủ không đơn điệu, nhóm dùng màu trung tính cho các cột giữa và chỉ làm nổi bật hai cực. Nếu tô màu chuyển dần theo số giờ ngủ, màu sắc sẽ mâu thuẫn với chiều cao cột và người đọc hiểu sai."),

H2("5.4","Tuổi và cường độ học tập"),
...img(IMG("c5_age_hours"),6.5,2.25,"Hình 9. Tuổi là yếu tố bảo vệ, cường độ học tập là yếu tố nguy cơ"),
body("Nhóm 18–20 tuổi có tỷ lệ 72,3%, giảm dần còn 40,9% ở nhóm từ 31 tuổi — chênh 31,5 điểm phần trăm. Về cường độ học, nhóm học 10–12 giờ mỗi ngày có tỷ lệ 69,0% so với 41,6% ở nhóm học dưới 3 giờ. Đây là phát hiện có giá trị ứng dụng trực tiếp: sinh viên năm đầu cần được ưu tiên hỗ trợ."),

H2("5.5","Tương tác giữa hai yếu tố"),
...img(IMG("c8_heat"),5.6,3.7,"Hình 10. Áp lực học tập × Ý định tự tử — giá trị trong ô là tỷ lệ trầm cảm"),
twoColTable([
 ["Ô thấp nhất","5,5% — áp lực mức 1, không có ý định tự tử"],
 ["Ô cao nhất","94,5% — áp lực mức 5, có ý định tự tử"],
 ["Chênh lệch","17,1 lần"],
 ["Mức tăng ở áp lực 1","+33,8 điểm phần trăm khi có ý định tự tử"],
 ["Mức tăng ở áp lực 5","+36,5 điểm phần trăm khi có ý định tự tử"],
],3600,CW-3600),
note("Diễn giải thận trọng: mức tăng tuyệt đối ở hai đầu gần bằng nhau, nhưng điều đó không có nghĩa là không có cộng hưởng. Ở mức áp lực 5, tỷ lệ nền đã 58% nên không còn nhiều dư địa để tăng — hiện tượng này gọi là chạm trần."),

H2("5.6","Hiệu ứng cộng dồn — phát hiện trung tâm"),
...img(IMG("c6_dose"),6.3,3.4,"Hình 11. Tỷ lệ trầm cảm theo số yếu tố nguy cơ đồng thời"),
body("Nhóm đếm số yếu tố nguy cơ mà mỗi sinh viên cùng lúc mắc phải, gồm năm yếu tố: áp lực học tập cao, áp lực tài chính cao, ngủ dưới 5 giờ, ăn uống kém lành mạnh, và từng có ý định tự tử."),
threeColTable([
 ["0 yếu tố","4,5%","2.736"],["1 yếu tố","26,2%","6.157"],["2 yếu tố","59,6%","7.775"],
 ["3 yếu tố","84,7%","7.082"],["4 yếu tố","94,8%","3.454"],["5 yếu tố","98,6%","697"],
],[2200,2400,CW-4600],["Số yếu tố nguy cơ","Tỷ lệ trầm cảm","Cỡ mẫu"]),
keypt("Đây là phát hiện trung tâm của báo cáo. Đường liều – đáp ứng đi từ 4,5% lên 98,6%, chênh 21,7 lần. Ý nghĩa thực tiễn rất lớn: nhà trường không cần công cụ phức tạp, chỉ cần đếm số yếu tố nguy cơ là đã phân tầng được sinh viên."),

H2("5.7","Kiểm chứng bằng mô hình dự báo"),
body("Nhóm huấn luyện hai mô hình trên 75% dữ liệu và kiểm tra trên 25% còn lại. Mục đích KHÔNG phải xây công cụ chẩn đoán, mà để kiểm chứng xem các mối liên hệ tìm được có nhất quán hay chỉ là ngẫu nhiên."),
...img(IMG("c7_importance"),6.0,3.4,"Hình 12. Độ quan trọng của từng biến trong mô hình Random Forest"),
threeColTable([
 ["Hồi quy Logistic","0,921","84,6%"],
 ["Kiểm định chéo 5-fold","0,921","—"],
 ["Random Forest","0,918","84,5%"],
],[2600,1900,CW-4500],["Mô hình","AUC","Độ chính xác"]),
body("Kiểm định chéo 5-fold cho kết quả gần như y hệt lần chạy đơn (0,921), nghĩa là mô hình ổn định và không bị quá khớp. Random Forest cho thứ hạng biến tương tự hồi quy Logistic, xác nhận các yếu tố tìm được là nhất quán giữa hai phương pháp khác nhau về bản chất."),
keypt("Hai biến đầu — ý định tự tử và áp lực học tập — giải thích 56,3% sức mạnh dự báo của mô hình."),
PB(),
];

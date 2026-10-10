const B=require("./base.js");
const {Paragraph,AlignmentType,ShadingType,TextRun,CW,FONT,SZ_H1,C,T,sp,PB,body,note,keypt,
  H2,H3,codeBlock,bull,twoColTable,threeColTable}=B;
const A=(id,ten)=>new Paragraph({children:[T(`Bài ${id} — ${ten}`,{size:28,bold:true,color:C.white})],
  shading:{fill:"1F4E79",type:ShadingType.CLEAR},spacing:{before:200,after:110},outlineLevel:1});
module.exports=[
new Paragraph({children:[T("PHỤ LỤC — ĐÁP ÁN THAM KHẢO",{size:SZ_H1,bold:true,color:C.white})],
  shading:{fill:"5B2C6F",type:ShadingType.CLEAR},spacing:{before:0,after:160},outlineLevel:0}),
note("Phần này dành cho giảng viên. Nếu phát tài liệu cho người học tự làm, hãy xóa phụ lục này trước khi in."),
body("Mọi con số dưới đây được tính lại bằng Python trên chính hai tệp dữ liệu kèm theo, không lấy từ trí nhớ hay từ câu trả lời của trợ lý AI. Riêng các bài thuộc cấp Thử thách không có đáp án cố định nên chỉ nêu tiêu chí đánh giá."),

A("1","Mô tả bộ dữ liệu"),
twoColTable([["Kích thước","27.901 dòng × 18 cột"],["Cột kiểu số","10 cột"],["Cột kiểu chữ","8 cột"],
 ["Biến mục tiêu","Depression (nhị phân 0/1)"]],3000,CW-3000),

A("2","Giá trị khuyết và bản ghi trùng"),
threeColTable([
 ["Số dòng","27.901","1.985"],
 ["Ô khuyết","3 (đều ở cột Financial Stress)","63"],
 ["Dòng trùng hoàn toàn","0","656"],
 ["Tỷ lệ trùng","0%","33,0%"],
],[2600,3100,CW-5700],["Chỉ số","student_depression_GOC","asd_treEm_GOC"]),
keypt("Điểm cần nhấn: phải bỏ cột định danh (id hoặc CASE_NO_PATIENT'S) trước khi kiểm tra trùng, nếu không kết quả luôn bằng 0."),

A("3","Tỷ lệ biến mục tiêu"),
twoColTable([["Có dấu hiệu trầm cảm","16.336 sinh viên — 58,5%"],
 ["Không có dấu hiệu","11.565 sinh viên — 41,5%"],["Tỷ số","1,41 : 1"],
 ["Kết luận","Mất cân bằng nhẹ. Ngưỡng thường dùng là từ 4:1 trở lên mới cần kỹ thuật lấy mẫu lại, nên bộ này không cần."]],3000,CW-3000),
note("Bẫy làm tròn: giá trị đúng là 58,549…%. Làm tròn một lần ra 58,5%. Nếu làm tròn hai lần (58,549 → 58,55 → 58,6) sẽ ra 58,6% — sai. Đây chính là lỗi AI đã mắc, nêu trong Chương V của giáo trình."),

A("4","Tỷ lệ trầm cảm theo Áp lực học tập"),
threeColTable([
 ["Mức 1","19,4%","4.801"],["Mức 2","37,5%","4.178"],["Mức 3","60,1%","7.471"],
 ["Mức 4","76,1%","5.155"],["Mức 5","86,1%","6.296"],
],[2200,2600,CW-4800],["Mức áp lực","Tỷ lệ trầm cảm","Cỡ mẫu"]),
body("Chênh lệch giữa mức 1 và mức 5 là 66,7 điểm phần trăm, làm tròn 67. Quan hệ đơn điệu tăng."),
note("Nếu người học dùng tệp GỐC thay vì tệp đã làm sạch, mức 3 sẽ ra 60,2% với cỡ mẫu 7.462, và có thêm một nhóm “mức 0” gồm 9 sinh viên — đó là 9 giá trị 0 ngoài thang đo. Cả hai kết quả đều chấp nhận được nếu người học ghi rõ đã dùng tệp nào."),

A("5","Bắt lỗi AI đọc sai số"),
body("Không có đáp án cố định vì mỗi phiên chat cho kết quả khác nhau. Chấm theo chất lượng mã kiểm chứng và độ trung thực khi ghi lại câu trả lời của AI. Con số tham chiếu quan trọng nhất: tỷ lệ trầm cảm đúng là 58,5%."),

A("6","Săn giá trị lạc chỗ"),
body("Cột chứa giá trị lạc chỗ là City. Có 30 thành phố hợp lệ (từ 10 bản ghi trở lên) và 26 ô rác thuộc 22 nhãn khác nhau:"),
...codeBlock([
 "Saanvi, Bhavna, Harsha, Gaurav, Harsh, Reyansh, Rashi,",
 "Mira, Vaanya, Mihir, Nalini, Nandini, Kibara, Nalyan,",
 "M.Tech, M.Com, ME, City, 3.0, Khaziabad,",
 "Less Delhi, Less than 5 Kalyan",
]),
threeColTable([
 ["Tên người","Saanvi, Bhavna, Harsha, Gaurav, Reyansh, Rashi, Mira, Vaanya, Mihir, Nalini, Nandini, Harsh","Tên riêng lọt vào cột thành phố"],
 ["Mã bằng cấp","M.Tech, M.Com, ME","Thuộc cột Degree, bị lạc sang"],
 ["Chuỗi lỗi ghép","Less Delhi, Less than 5 Kalyan","Giá trị cột Sleep Duration dính vào tên thành phố"],
 ["Khác","City, 3.0, Khaziabad, Kibara, Nalyan","Tên cột lọt vào dữ liệu, số, và tên viết sai"],
],[2000,3900,CW-5900],["Nhóm","Giá trị","Giải thích"]),
keypt("Suy luận cần có: hai chuỗi “Less Delhi” và “Less than 5 Kalyan” chứng tỏ quy trình nhập liệu bị lệch cột, không phải lỗi gõ nhầm ngẫu nhiên."),
PB(),

A("7","Quy trình tiền xử lý hoàn chỉnh"),
threeColTable([
 ["Cột gần như hằng số","Profession 99,9% là “Student”; Work Pressure 99,99% bằng 0; Job Satisfaction 99,97% bằng 0","Nên bỏ cả ba, cùng cột id"],
 ["Giá trị 0 ngoài thang 1–5","Academic Pressure: 9 ô · Study Satisfaction: 10 ô","Chuyển thành khuyết"],
 ["Giá trị bất khả thi","CGPA bằng 0: 9 sinh viên","Chuyển thành khuyết"],
 ["Nhãn rác “Others”","Sleep Duration 18 · Dietary Habits 12 · Degree 35","Tổng 65 ô, chuyển thành khuyết"],
 ["Giá trị rác cột City","26 ô","Chuyển thành khuyết"],
 ["Ô khuyết sẵn có","Financial Stress: 3 ô","Điền bằng trung vị"],
],[2500,3600,CW-6100],["Vấn đề","Chi tiết","Cách xử lý"]),
twoColTable([["Tổng số ô cần sửa","122 ô (khoảng 0,02% tổng số ô)"],
 ["Kích thước trước → sau","27.901 × 18 → 27.901 × 14 cột gốc, cộng 5 biến mã hóa"],
 ["Số dòng giữ lại","100% — không xóa dòng nào"]],3400,CW-3400),

A("8","So sánh nhóm và kiểm định"),
threeColTable([
 ["Lành mạnh","45,4%","7.651"],["Trung bình","56,0%","9.921"],["Kém lành mạnh","70,7%","10.329"],
],[2400,2400,CW-4800],["Chế độ ăn","Tỷ lệ trầm cảm","Cỡ mẫu"]),
twoColTable([["Chi-square (chế độ ăn)","1.202,6 · bậc tự do 2 · p < 0,001"],
 ["Cramér's V","0,208 — liên hệ mức trung bình yếu"],
 ["Chi-square (giới tính)","0,1 · p = 0,774 — KHÔNG có ý nghĩa thống kê"],
 ["Cramér's V (giới tính)","0,002 — gần như không liên hệ"]],3400,CW-3400),
keypt("Điểm cần nhấn: với cỡ mẫu gần 28.000, p nhỏ là chuyện bình thường. Phải xem Cramér's V mới biết liên hệ mạnh hay yếu. Giới tính là ví dụ ngược lại: p lớn, kết luận là không có khác biệt."),

A("9","Bộ biểu đồ đồng bộ"),
body("Không có đáp án cố định. Điểm mấu chốt cần chấm là người học có phát hiện vấn đề màu sắc ở biến Thời lượng ngủ hay không. Tỷ lệ trầm cảm theo thời lượng ngủ:"),
threeColTable([
 ["Dưới 5 giờ","64,5%","cao nhất"],["5–6 giờ","56,9%","thấp hơn nhóm 7–8 giờ"],
 ["7–8 giờ","59,5%","cao hơn nhóm 5–6 giờ"],["Trên 8 giờ","50,9%","thấp nhất"],
],[2200,2200,CW-4400],["Thời lượng ngủ","Tỷ lệ trầm cảm","Ghi chú"]),
body("Quan hệ KHÔNG đơn điệu. Nếu tô màu chuyển dần theo số giờ ngủ, màu sắc sẽ mâu thuẫn với chiều cao cột. Cách xử lý đúng: dùng một màu trung tính cho tất cả, chỉ làm nổi bật hai cực."),
PB(),

A("10","Xếp hạng toàn bộ yếu tố"),
threeColTable([
 ["Ý định tự tử","+0,546","< 0,001"],["Áp lực học tập","+0,475","< 0,001"],
 ["Áp lực tài chính","+0,364","< 0,001"],["Tuổi","−0,226","< 0,001"],
 ["Giờ học/làm mỗi ngày","+0,209","< 0,001"],["Chế độ ăn kém lành mạnh","+0,207","< 0,001"],
 ["Hài lòng việc học","−0,168","< 0,001"],["Số giờ ngủ","−0,082","< 0,001"],
 ["Tiền sử gia đình","+0,053","< 0,001"],["Điểm CGPA","+0,022","< 0,001"],
 ["Giới tính (nam)","+0,002","0,764"],
],[3100,2200,CW-5300],["Biến","Hệ số r","p-value"]),
keypt("Hai kết quả đi ngược trực giác mà người học cần chỉ ra: (1) Điểm CGPA gần như không liên quan — học giỏi không đồng nghĩa khỏe mạnh tâm lý; (2) Giới tính không tạo khác biệt, p = 0,764."),
keypt("Kết quả thứ ba đáng bình luận: tiền sử gia đình (0,053) yếu hơn nhiều so với áp lực học tập (0,475) và tài chính (0,364) — hoàn cảnh quan trọng hơn di truyền trong bộ dữ liệu này."),

A("11","Phát hiện biến nhân bản"),
twoColTable([["Tương quan giữa các cặp","Thấp nhất 0,878 — cao nhất 0,998"],
 ["Tỷ lệ trùng khớp từng cặp","Thấp nhất 95,6% — cao nhất 99,9%"],
 ["Trẻ có cả bảy rối loạn","1.005 trẻ — 75,6%"],
 ["Trẻ không có rối loạn nào","261 trẻ — 19,6%"],
 ["Tổng hai cực","95,3% số mẫu"]],3800,CW-3800),
body("Kết luận đúng: bảy cột này thực chất là một biến được sao chép bảy lần, có thêm nhiễu nhỏ. Lập luận y học: chậm nói và rối loạn gen là hai tình trạng có cơ chế và tỷ lệ mắc hoàn toàn khác nhau, không thể đồng xuất hiện ở mức 99,9%. Mọi kết luận về bệnh đi kèm rút ra từ bảy cột này đều vô giá trị."),

A("12","Phát hiện rò rỉ nhãn"),
threeColTable([
 ["0 – 3 điểm","484","0 trẻ"],["4 – 10 điểm","724","724 trẻ — toàn bộ"],
],[2200,2300,CW-4500],["Tổng điểm AQ","Số trẻ","Số trẻ mang nhãn “có ASD”"]),
twoColTable([["Trẻ KHÔNG mang nhãn ASD có AQ ≥ 4","0 — không một ngoại lệ"],
 ["Trẻ mang nhãn ASD có AQ ≤ 3","121 trẻ"],
 ["Quy tắc gán nhãn suy ra","AQ ≥ 4 ⟹ nhãn “có dấu hiệu ASD”, không ngoại lệ"]],4200,CW-4200),
body("Giải thích lập luận vòng tròn: nhãn không phải chẩn đoán độc lập của bác sĩ mà chính là đầu ra của công thức chấm điểm A1–A10. Dùng A1–A10 dự báo nhãn tương đương lấy đáp án đi dự đoán đáp án; độ chính xác gần 100% nhưng không mang thông tin gì."),
body("Câu hỏi VẪN hợp lệ (gợi ý chấm — người học nêu được ít nhất ba ý tương tự là đạt):"),
bull("Tuổi khi được sàng lọc phân bố ra sao? Bao nhiêu phần trăm trẻ được sàng lọc trong cửa sổ can thiệp sớm?"),
bull("Ai là người thực hiện sàng lọc? Trường học tham gia ở mức nào?"),
bull("Có khác biệt về tuổi phát hiện giữa bé trai và bé gái không?"),
bull("Mục nào trong mười mục sàng lọc phân biệt kém nhất?"),
PB(),

A("13","Phân tích tương tác"),
threeColTable([
 ["Mức 1","5,5%","39,3%"],["Mức 2","12,4%","61,1%"],["Mức 3","21,8%","80,3%"],
 ["Mức 4","41,6%","88,5%"],["Mức 5","58,0%","94,5%"],
],[2100,2800,CW-4900],["Áp lực học tập","Không có ý định tự tử","Từng có ý định tự tử"]),
twoColTable([["Ô thấp nhất","5,5% (áp lực mức 1, không có ý định tự tử)"],
 ["Ô cao nhất","94,5% (áp lực mức 5, có ý định tự tử)"],
 ["Tỷ số hai cực","17,1 lần"],
 ["Mức tăng ở áp lực 1","+33,8 điểm phần trăm"],
 ["Mức tăng ở áp lực 5","+36,5 điểm phần trăm"]],3400,CW-3400),
keypt("Diễn giải đúng: mức tăng tuyệt đối ở hai đầu gần bằng nhau, nhưng điều đó KHÔNG có nghĩa là không có cộng hưởng — ở mức áp lực 5, tỷ lệ nền đã 58% nên không còn nhiều dư địa để tăng. Đây là hiện tượng chạm trần. Người học nêu được điểm này là đạt điểm tối đa."),

A("14","Chỉ số tổng hợp và đường liều – đáp ứng"),
threeColTable([
 ["0 yếu tố","4,5%","2.736"],["1 yếu tố","26,2%","6.157"],["2 yếu tố","59,6%","7.775"],
 ["3 yếu tố","84,7%","7.082"],["4 yếu tố","94,8%","3.454"],["5 yếu tố","98,6%","697"],
],[2200,2400,CW-4600],["Số yếu tố nguy cơ","Tỷ lệ trầm cảm","Cỡ mẫu"]),
twoColTable([["Tỷ số cao nhất / thấp nhất","21,7 lần"],
 ["So sánh sức mạnh dự báo","Chỉ số tổng hợp mạnh hơn mọi yếu tố đơn lẻ, kể cả yếu tố mạnh nhất là ý định tự tử (r = 0,546)"],
 ["Ngưỡng phân tầng gợi ý","0–1 yếu tố: theo dõi thường kỳ · 2–3: mời tham vấn · từ 4 trở lên: can thiệp ưu tiên"]],3600,CW-3600),

A("15","Độ ổn định của phát hiện"),
body("Lấy quan hệ giữa Áp lực học tập và Trầm cảm (hệ số toàn mẫu +0,475) làm ví dụ:"),
threeColTable([
 ["Nam","+0,473","15.547"],["Nữ","+0,478","12.354"],
 ["18–23 tuổi","+0,480","9.915"],["24–30 tuổi","+0,466","11.887"],["Từ 31 tuổi","+0,477","6.099"],
],[2400,2200,CW-4600],["Nhóm con","Hệ số r","Cỡ mẫu"]),
keypt("Kết luận: phát hiện RẤT ổn định — mọi nhóm con đều cho hệ số trong khoảng 0,466 đến 0,480, dao động dưới 0,02. Người học cần nêu được rằng cỡ mẫu từng nhóm con đều lớn (trên 6.000) nên kết quả đáng tin."),

A("16 – 18","Các bài cấp Thử thách"),
body("Ba bài cuối không có đáp án cố định. Gợi ý chấm:"),
threeColTable([
 ["Bài 16","Phản biện một bài phân tích","Chấm theo chất lượng bằng chứng. Nhận xét “bài này chưa chặt” không có điểm; “con số X ở trang 3 chạy lại ra Y, lệch Z” mới có điểm."],
 ["Bài 17","Dự án hoàn chỉnh","Trọng số cao nhất ở phần tri thức rút ra và phần hạn chế. Một bài vẽ đẹp mà không rút được tri thức nào đi ngược trực giác chỉ đạt mức trung bình."],
 ["Bài 18","Đề xuất can thiệp","Đề xuất phải cụ thể đến mức thực hiện được tuần sau. Mọi đề xuất dạng khẩu hiệu đều không tính điểm."],
],[1300,3000,CW-4300],["Bài","Tên","Gợi ý chấm"]),
];

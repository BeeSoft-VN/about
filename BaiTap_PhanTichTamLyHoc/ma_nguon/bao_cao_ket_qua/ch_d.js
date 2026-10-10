const B=require("./base.js");
const {Paragraph,AlignmentType,ShadingType,TextRun,CW,FONT,SZ_H1,C,T,sp,PB,body,note,keypt,
 H1,H2,H3,codeBlock,bull,twoColTable,threeColTable,img}=B;
const path=require("path"); const IMG=n=>path.join(__dirname,"img",n+".png");
module.exports=[

/* ══ CHƯƠNG VI ══ */
H1("VI","CÁC NHẬN ĐỊNH VÀ KẾT LUẬN"),

H2("6.1","Sáu nhận định chính"),
threeColTable([
 ["1","Hoàn cảnh quan trọng hơn di truyền","Áp lực học tập (0,475) và tài chính (0,364) mạnh hơn hẳn tiền sử gia đình (0,053). Phần lớn nguy cơ đến từ môi trường — tức là có thể can thiệp được."],
 ["2","Học giỏi không bảo vệ sức khỏe tâm lý","CGPA có hệ số 0,022, gần như bằng 0. Không thể dùng kết quả học tập để sàng lọc sinh viên có nguy cơ."],
 ["3","Không có khác biệt giới tính","Nam 58,6% — Nữ 58,5%, p = 0,764. Chương trình hỗ trợ không nên mặc định ưu tiên một giới."],
 ["4","Nguy cơ tăng theo liều","Từ 4,5% khi không có yếu tố nguy cơ nào lên 98,6% khi đủ năm yếu tố — chênh 21,7 lần."],
 ["5","Sinh viên năm đầu dễ tổn thương nhất","Nhóm 18–20 tuổi có tỷ lệ 72,3%, cao hơn 31,5 điểm phần trăm so với nhóm từ 31 tuổi."],
 ["6","Ý định tự tử là chỉ báo sớm","63,3% mẫu từng có ý định tự tử. Đây là tín hiệu cần quy trình ứng phó riêng, không chỉ là một biến thống kê."],
],[600,2600,CW-3200],["#","Nhận định","Căn cứ số liệu"]),

H2("6.2","Đề xuất ứng dụng thực tế"),
threeColTable([
 ["1","Bộ sàng lọc 5 câu hỏi","Xây phiếu khảo sát ngắn theo đúng 5 yếu tố nguy cơ. Đếm số yếu tố để phân tầng: 0–1 theo dõi thường kỳ, 2–3 mời tham vấn, từ 4 trở lên can thiệp ưu tiên."],
 ["2","Ưu tiên sinh viên năm nhất","Lồng ghép sàng lọc vào tuần sinh hoạt công dân đầu khóa."],
 ["3","Rà soát khối lượng học tập","Nhóm học 10–12 giờ/ngày có tỷ lệ 69%. Khoa có thể rà lịch thi, hạn nộp bài dồn và số tín chỉ tối đa mỗi học kỳ."],
 ["4","Gắn hỗ trợ tài chính với tham vấn","Hồ sơ xin học bổng, vay vốn nên kèm lời mời tham vấn tâm lý."],
 ["5","Quy trình ứng phó cho dấu hiệu nguy cấp","Khi phát hiện ý định tự tử phải chuyển ngay tới chuyên viên tâm lý, không xử lý như một mục khảo sát thông thường."],
 ["6","Can thiệp lối sống chi phí thấp","Ngủ đủ và ăn uống lành mạnh liên quan tới chênh lệch 13,6 và 25,3 điểm phần trăm. Nhóm giải pháp này rẻ và dễ triển khai ở ký túc xá, căng tin."],
],[600,2600,CW-3200],["#","Đề xuất","Nội dung và căn cứ"]),

H2("6.3","Hạn chế của nghiên cứu"),
threeColTable([
 ["Tương quan không phải nhân quả","Dữ liệu cắt ngang tại một thời điểm","Không thể biết ăn uống kém gây trầm cảm hay trầm cảm dẫn tới ăn uống kém."],
 ["Biến mục tiêu là sàng lọc","Nhãn Depression đến từ tự báo cáo","Không phải chẩn đoán lâm sàng. Tỷ lệ 58,5% không phải tỷ lệ mắc bệnh."],
 ["Mẫu không đại diện","Không rõ phương pháp lấy mẫu","Tỷ lệ 63,3% từng có ý định tự tử cho thấy mẫu có thể lệch về nhóm đang gặp vấn đề."],
 ["Giới hạn bối cảnh","Khảo sát tại Ấn Độ","Không suy rộng trực tiếp cho sinh viên Việt Nam nếu chưa khảo sát lại."],
 ["Cỡ mẫu lớn làm p-value mất ý nghĩa","n gần 28.000","Gần như mọi khác biệt đều đạt ý nghĩa thống kê. Phải đọc độ lớn hiệu ứng, không chỉ p-value."],
],[2400,1900,CW-4300],["Hạn chế","Nguyên nhân","Hệ quả khi diễn giải"]),

H2("6.4","Đạo đức nghiên cứu"),
bull("Không coi kết quả sàng lọc là chẩn đoán. Công cụ sàng lọc chỉ gợi ý nên đi khám, không kết luận có bệnh."),
bull("Không dán nhãn cá nhân. Phân tích ở cấp nhóm không áp dụng được cho một sinh viên cụ thể."),
bull("Báo cáo số liệu về ý định tự tử một cách điềm tĩnh, không giật gân."),
bull("Khi trình bày trước lớp, nên nói trước một câu lưu ý nội dung vì trong khán phòng có thể có người đang gặp vấn đề tương tự."),

H2("6.5","Kết luận"),
body("Trầm cảm ở sinh viên trong bộ dữ liệu này gắn chặt với hoàn cảnh học tập và tài chính hơn là với đặc điểm cá nhân hay di truyền. Áp lực học tập và áp lực tài chính có hệ số tương quan lần lượt 0,475 và 0,364, trong khi tiền sử gia đình chỉ 0,053 và điểm học tập gần như bằng 0."),
body("Phát hiện có giá trị ứng dụng cao nhất là hiệu ứng cộng dồn: chỉ cần đếm số yếu tố nguy cơ mà một sinh viên cùng lúc mắc phải, ta đã phân tầng được từ 4,5% tới 98,6%. Điều này có nghĩa một bộ sàng lọc năm câu hỏi đơn giản cũng đủ để nhà trường xác định nhóm cần ưu tiên."),
keypt("Hàm ý quan trọng nhất: vì phần lớn nguy cơ nằm ở yếu tố hoàn cảnh chứ không phải di truyền, nó nằm trong phạm vi nhà trường có thể tác động — qua điều tiết khối lượng học tập, hỗ trợ tài chính và tổ chức tham vấn tâm lý."),

H2("6.6","Hướng phát triển"),
bull("Khảo sát lại trên sinh viên Việt Nam để kiểm tra kết quả có lặp lại trong bối cảnh khác không."),
bull("Theo dõi theo thời gian (nghiên cứu dọc) để xác định chiều nhân quả, điều mà dữ liệu cắt ngang không làm được."),
bull("Thử nghiệm bộ sàng lọc năm câu hỏi trên một khoa, đo hiệu quả bằng tỷ lệ sinh viên được chuyển tham vấn kịp thời."),
bull("Mở rộng sang các biến chưa có trong bộ dữ liệu: chất lượng quan hệ bạn bè, mức độ gắn kết với gia đình, thời gian sử dụng mạng xã hội."),
sp(200),
new Paragraph({children:[T("HẾT BÁO CÁO",{size:SZ_H1,bold:true,color:C.white})],
 alignment:AlignmentType.CENTER,shading:{fill:C.headBg,type:ShadingType.CLEAR},
 spacing:{before:200,after:200}}),
];

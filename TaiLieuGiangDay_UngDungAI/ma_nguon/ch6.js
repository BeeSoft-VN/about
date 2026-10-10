const B = require("./base.js");
const { Paragraph,AlignmentType,BorderStyle,ShadingType,TextRun,CW,FONT,SZ_H1,C,
  T,sp,PB,body,note,keypt,H1,H2,H3,codeBlock,bull,twoColTable,threeColTable,exTable } = B;

module.exports = [
H1("VI","TRÌNH BÀY KẾT QUẢ VÀ ĐẠO ĐỨC"),
body("Đây là yêu cầu số 5 của đề bài. Một phân tích xuất sắc mà trình bày kém thì người nghe không nhận được gì. Chương này cũng bàn về trách nhiệm khi làm việc với dữ liệu con người."),

H2("6.1","Cấu trúc một bài báo cáo"),
body("Cấu trúc dưới đây phù hợp với bài thuyết trình 10–15 phút và cũng dùng được cho báo cáo viết:"),
threeColTable([
  ["Mở đầu","1 slide","Câu hỏi nghiên cứu. Nêu thẳng điều bạn muốn trả lời, không vòng vo."],
  ["Giới thiệu dữ liệu","1–2 slide","Nguồn, quy mô, cấu trúc biến, biến mục tiêu."],
  ["Công cụ và quy trình","1 slide","Dùng AI nào, ở bước nào, kiểm chứng ra sao."],
  ["Tiền xử lý","2 slide","Vấn đề phát hiện được và cách xử lý. Đừng bỏ qua phần này."],
  ["Kết quả","4–6 slide","Mỗi slide một biểu đồ, một thông điệp."],
  ["Nhận định","1–2 slide","Tri thức rút ra, ưu tiên điều đi ngược trực giác."],
  ["Hạn chế","1 slide","Điều dữ liệu KHÔNG cho phép kết luận."],
  ["Kết luận","1 slide","Tóm lại trong một câu và đề xuất ứng dụng."],
], [1900,1200,CW-3100], ["Phần","Thời lượng","Nội dung"]),
note("Canh thời gian theo công thức 1 slide ≈ 45–60 giây. Bài 15 phút nên có khoảng 15–20 slide, kể cả slide phân cách."),

H2("6.2","Một slide — một thông điệp"),
body("Lỗi phổ biến nhất của sinh viên là nhồi bốn biểu đồ vào một slide. Người nghe không biết nhìn vào đâu."),
bull("Tiêu đề slide nêu kết luận, không nêu chủ đề. Viết “Sinh viên năm đầu là nhóm dễ tổn thương nhất”, đừng viết “Phân tích theo độ tuổi”."),
bull("Mỗi slide chỉ một biểu đồ, trừ khi hai biểu đồ cùng kể một câu chuyện."),
bull("Chữ trên slide tối đa khoảng 30 từ. Phần còn lại nói bằng miệng."),
bull("Dùng ghi chú người nói (speaker notes) để ghi lời dẫn, đừng chép lời dẫn lên slide."),
bull("Con số quan trọng thì in to, đừng để lẫn trong đoạn văn."),

H2("6.3","Nêu hạn chế: phần quan trọng nhất"),
body("Nhiều người bỏ qua phần hạn chế vì sợ làm bài yếu đi. Thực tế ngược lại: nêu đúng hạn chế cho thấy bạn hiểu dữ liệu sâu hơn người chỉ đưa ra kết luận."),
body("Bốn hạn chế gần như luôn phải nêu với dữ liệu khảo sát:"),
threeColTable([
  ["Thiết kế cắt ngang","Dữ liệu thu tại một thời điểm","Không kết luận được chiều nhân quả."],
  ["Dữ liệu tự báo cáo","Người trả lời tự đánh giá","Có thể lệch do nhớ sai hoặc ngại nói thật. Không phải chẩn đoán lâm sàng."],
  ["Mẫu không đại diện","Mẫu đến khám, mẫu tình nguyện","Tỷ lệ trong mẫu không phải tỷ lệ trong dân số."],
  ["Giới hạn bối cảnh","Khảo sát ở nước khác, thời điểm khác","Không suy rộng trực tiếp cho bối cảnh Việt Nam."],
], [2100,2200,CW-4300], ["Hạn chế","Nghĩa là gì","Hệ quả khi diễn giải"]),
keypt("Mẹo: nếu giảng viên hỏi được một câu khiến bạn lúng túng, rất có thể đó là hạn chế lẽ ra bạn nên tự nêu trước."),

H2("6.4","Đạo đức với dữ liệu tâm lý"),
body("Dữ liệu tâm lý không giống dữ liệu doanh số. Đằng sau mỗi dòng là một con người đang gặp khó khăn thật."),
bull("Không bao giờ coi kết quả sàng lọc là chẩn đoán. Công cụ sàng lọc chỉ gợi ý nên đi khám, không kết luận có bệnh."),
bull("Không nêu danh tính. Kể cả khi dữ liệu đã ẩn danh, việc ghép nhiều biến lại vẫn có thể truy ra cá nhân trong nhóm nhỏ."),
bull("Cẩn trọng với biến nhạy cảm. Khi báo cáo về ý định tự tử hay tự hại, nêu số liệu một cách điềm tĩnh, không giật gân."),
bull("Không dùng kết quả để dán nhãn cá nhân. Phân tích nhóm không áp dụng được cho một người cụ thể."),
bull("Nếu phát hiện trường hợp nguy cấp trong quá trình thu thập dữ liệu thật, phải chuyển ngay cho chuyên gia tâm lý, không tự xử lý."),
note("Khi trình bày trước lớp về chủ đề trầm cảm hay tự tử, nên nói trước một câu lưu ý nội dung, vì trong khán phòng có thể có người đang gặp vấn đề tương tự."),

H2("6.5","Liêm chính học thuật khi dùng AI"),
body("Dùng AI trong môn học này là được khuyến khích. Nhưng phải trung thực về cách dùng."),
threeColTable([
  ["Được khuyến khích","Dùng AI khám phá dữ liệu, sinh mã, gợi ý hướng phân tích, soát lỗi diễn đạt","Nêu rõ trong báo cáo: đã dùng công cụ nào, ở bước nào."],
  ["Phải thận trọng","Để AI viết đoạn diễn giải kết quả","Phải đọc kỹ, kiểm chứng và viết lại bằng lời của mình. AI hay suy diễn nhân quả."],
  ["Không chấp nhận","Chép nguyên bài AI viết và nộp như của mình","Vi phạm liêm chính học thuật, và bạn sẽ không trả lời được câu hỏi của giảng viên."],
  ["Không chấp nhận","Trích số liệu AI đưa mà chưa chạy lại","Như Bẫy 1 ở Chương V — rủi ro sai số rất cao."],
], [2000,2700,CW-4700], ["Mức độ","Hành vi","Ghi chú"]),
keypt("Phép thử đơn giản: nếu giảng viên chỉ vào một dòng bất kỳ trong bài và hỏi “em lấy con số này ở đâu, giải thích đi” mà bạn trả lời được, thì bạn đã dùng AI đúng cách."),

H2("6.6","Bài tập Chương VI"),
exTable([
  {num:"VI-1",title:"Viết lại tiêu đề slide",level:"Dễ",desc:"Lấy 6 tiêu đề slide dạng chủ đề (“Phân tích theo giới tính”) và viết lại thành tiêu đề nêu kết luận."},
  {num:"VI-2",title:"Liệt kê hạn chế",level:"Dễ",desc:"Viết phần Hạn chế cho bài của bạn, nêu ít nhất 4 hạn chế theo bảng mục 6.3, mỗi hạn chế kèm hệ quả cụ thể khi diễn giải."},
  {num:"VI-3",title:"Dàn ý bài thuyết trình",level:"TB",desc:"Lập dàn ý slide cho bài 12 phút theo cấu trúc mục 6.1. Ghi rõ từng slide: tiêu đề nêu kết luận, nội dung chính, thời lượng dự kiến."},
  {num:"VI-4",title:"Khai báo sử dụng AI",level:"TB",desc:"Viết một mục “Công cụ AI đã sử dụng” cho báo cáo của bạn: công cụ nào, dùng ở bước nào, kiểm chứng bằng cách nào, phần nào hoàn toàn do bạn tự làm."},
  {num:"VI-5",title:"Thuyết trình thử và phản biện",level:"Khó",desc:"Trình bày bài của bạn trước nhóm trong 12 phút. Các thành viên khác đóng vai giảng viên, mỗi người đặt ít nhất 2 câu hỏi phản biện tập trung vào tính tin cậy của số liệu và cách diễn giải. Ghi lại câu hỏi nào bạn không trả lời được và bổ sung vào phần Hạn chế."},
]),
PB(),
];

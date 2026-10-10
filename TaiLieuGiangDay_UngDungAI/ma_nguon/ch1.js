const B = require("./base.js");
const { Paragraph,AlignmentType,BorderStyle,ShadingType,TextRun,CW,FONT,SZ_H1,C,
  T,sp,PB,body,note,keypt,H1,H2,H3,codeBlock,bull,twoColTable,threeColTable,exTable } = B;

module.exports = [
/* ═══════════════ CHƯƠNG I ═══════════════ */
H1("I","AI LÀM ĐƯỢC GÌ TRONG PHÂN TÍCH DỮ LIỆU"),
body("Chương này trả lời câu hỏi nền tảng nhất: trợ lý AI thực sự giúp được gì cho công việc phân tích dữ liệu, và quan trọng hơn — nó KHÔNG giúp được gì. Người học không cần biết lập trình hay thống kê để đọc chương này."),

H2("1.1","Trợ lý AI tạo sinh là gì"),
body("ChatGPT, Gemini và Claude là các trợ lý AI tạo sinh (generative AI). Chúng được huấn luyện trên lượng văn bản khổng lồ để làm một việc: đoán đoạn văn bản tiếp theo hợp lý nhất với những gì bạn vừa nhập vào."),
body("Hãy hình dung thế này: AI giống một người cộng sự đọc rất nhiều, nhớ rất nhiều mẫu câu và mẫu lập luận, luôn trả lời trôi chảy và tự tin — nhưng không có cách nào tự kiểm tra xem điều mình nói có đúng không. Người cộng sự đó rất hữu ích nếu bạn biết cách dùng, và rất nguy hiểm nếu bạn tin tuyệt đối."),
keypt("AI không \"hiểu\" dữ liệu của bạn theo cách con người hiểu. Nó nhận ra mẫu hình trong văn bản và tạo ra câu trả lời nghe hợp lý."),

H2("1.2","AI làm được gì và không làm được gì"),
threeColTable([
  ["Mô tả cấu trúc dữ liệu","Làm tốt","Liệt kê các cột, kiểu dữ liệu, số dòng, giá trị khuyết — đây là việc cơ học, AI ít sai."],
  ["Gợi ý hướng phân tích","Làm tốt","Đề xuất câu hỏi nghiên cứu, loại biểu đồ, phép kiểm định phù hợp."],
  ["Viết mã Python/R","Làm tốt","Sinh mã pandas, matplotlib theo yêu cầu. Mã thường chạy được ngay."],
  ["Giải thích khái niệm","Làm tốt","Giải thích \"tương quan là gì\", \"p-value nghĩa là gì\" bằng ngôn ngữ dễ hiểu."],
  ["Tính toán số liệu chính xác","KHÔNG đáng tin","AI thường đọc lướt hoặc ước lượng. Số nó đưa ra có thể sai ở chữ số thập phân."],
  ["Đọc hết tệp dữ liệu lớn","KHÔNG đáng tin","Với hàng chục nghìn dòng, AI chỉ xem được một phần rồi suy đoán phần còn lại."],
  ["Phán đoán nhân quả","KHÔNG đáng tin","AI dễ nói \"A gây ra B\" trong khi dữ liệu chỉ cho thấy A và B đi cùng nhau."],
  ["Chịu trách nhiệm","KHÔNG bao giờ","Người nộp bài là bạn. Sai sót là của bạn, không phải của AI."],
], [2600,1500,CW-4100], ["Công việc","Mức độ tin cậy","Giải thích"]),
note("Bảng trên không phải lý thuyết. Trong quá trình biên soạn tài liệu này, AI đã đọc sai một tỷ lệ từ 58,5% thành 58,6% — chi tiết ở Chương V, mục 5.3."),

H2("1.3","Nguyên tắc vàng: AI gợi ý — người kiểm chứng"),
body("Toàn bộ tài liệu này xoay quanh một nguyên tắc duy nhất. Hãy chia công việc thành hai vai:"),
bull("Vai của AI — khám phá nhanh, gợi ý hướng đi, viết mã, giải thích khái niệm, soạn bản nháp."),
bull("Vai của bạn — chạy lại mã để kiểm chứng số liệu, quyết định hướng nào hợp lý, đọc hiểu mã trước khi dùng, chịu trách nhiệm về kết quả cuối cùng."),
body("Quy tắc thực hành cụ thể: mọi con số xuất hiện trong báo cáo của bạn phải do bạn chạy mã tạo ra, không phải do AI đọc hộ rồi đọc cho bạn chép. AI viết mã — bạn chạy mã — con số ra từ máy tính của bạn."),
keypt("Nếu một con số trong bài của bạn chỉ có nguồn gốc là \"AI nói thế\", con số đó chưa đủ tin cậy để nộp."),

H2("1.4","Quy trình năm bước"),
body("Năm bước dưới đây là xương sống của tài liệu, mỗi bước ứng với một chương:"),
threeColTable([
  ["Bước 1","Khám phá (EDA)","Hiểu bộ dữ liệu có gì: bao nhiêu dòng, bao nhiêu cột, mỗi cột nghĩa là gì. → Chương II"],
  ["Bước 2","Tiền xử lý","Phát hiện và sửa lỗi dữ liệu: khuyết, trùng, sai thang đo, nhãn rác. → Chương III"],
  ["Bước 3","Trực quan hóa","Vẽ biểu đồ để thấy được quy luật mà bảng số không cho thấy. → Chương IV"],
  ["Bước 4","Rút tri thức","Chuyển từ con số sang kết luận có ý nghĩa, và kiểm chứng kết luận đó. → Chương V"],
  ["Bước 5","Trình bày","Kể lại câu chuyện cho người khác hiểu, kèm hạn chế. → Chương VI"],
], [1100,2200,CW-3300], ["Bước","Tên gọi","Nội dung"]),

H2("1.5","Bài tập Chương I"),
exTable([
  {num:"I-1",title:"Phân loại công việc",level:"Dễ",desc:"Cho 10 công việc phân tích dữ liệu bất kỳ, xếp mỗi việc vào nhóm \"AI làm tốt\" hay \"phải tự kiểm chứng\". Giải thích ngắn gọn lý do cho từng việc."},
  {num:"I-2",title:"Làm quen trợ lý AI",level:"Dễ",desc:"Mở ChatGPT hoặc Gemini, hỏi \"phân tích dữ liệu khám phá là gì, giải thích cho người chưa biết gì\". Chép lại câu trả lời và đánh dấu những chỗ bạn chưa hiểu."},
  {num:"I-3",title:"Bắt AI nói sai",level:"TB",desc:"Hỏi AI một câu hỏi về số liệu mà bạn đã biết chắc đáp án (ví dụ dân số một tỉnh). So sánh câu trả lời với nguồn chính thức. Ghi lại mức sai lệch."},
  {num:"I-4",title:"Viết lại nguyên tắc vàng",level:"TB",desc:"Diễn đạt lại nguyên tắc \"AI gợi ý — người kiểm chứng\" bằng lời của bạn trong tối đa 5 câu, kèm một ví dụ từ chính việc học của bạn."},
  {num:"I-5",title:"Thiết kế quy trình làm việc nhóm",level:"Khó",desc:"Nhóm 4–5 người làm một bài phân tích dữ liệu. Hãy thiết kế bảng phân công nêu rõ: ai dùng AI ở bước nào, ai kiểm chứng kết quả của ai, và cơ chế nào bảo đảm không có con số nào lọt vào báo cáo mà chưa được kiểm tra."},
]),
PB()
];

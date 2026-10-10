const B=require("./base.js");
const {Document,Packer,Paragraph,AlignmentType,BorderStyle,ShadingType,LevelFormat,TextRun,
 PW,PH,ML,MR,MT,MB,CW,FONT,SZ,SZ_H1,C,T,sp,PB,body,note,keypt,H2,tocEntry,
 twoColTable,threeColTable,makeHeader,makeFooter}=B;
const fs=require("fs");
const TITLE="BÀI TẬP ỨNG DỤNG", TOPIC="ỨNG DỤNG AI TRONG PHÂN TÍCH DỮ LIỆU";
const doc=new Document({
 numbering:{config:[
  {reference:"b1",levels:[{level:0,format:LevelFormat.BULLET,text:"•",alignment:AlignmentType.LEFT,
   style:{paragraph:{indent:{left:720,hanging:360}}}}]},
  {reference:"n1",levels:[{level:0,format:LevelFormat.DECIMAL,text:"%1.",alignment:AlignmentType.LEFT,
   style:{paragraph:{indent:{left:700,hanging:340}}}}]}]},
 styles:{default:{document:{run:{font:FONT,size:SZ}}},
  paragraphStyles:[
   {id:"Heading1",name:"Heading 1",basedOn:"Normal",next:"Normal",quickFormat:true,
    run:{size:SZ_H1,bold:true,font:FONT,color:C.white},paragraph:{spacing:{before:240,after:200},outlineLevel:0}},
   {id:"Heading2",name:"Heading 2",basedOn:"Normal",next:"Normal",quickFormat:true,
    run:{size:28,bold:true,font:FONT,color:C.accent},paragraph:{spacing:{before:200,after:120},outlineLevel:1}}]},
 sections:[{
  properties:{page:{size:{width:PW,height:PH},margin:{top:MT,right:MR,bottom:MB,left:ML}}},
  headers:{default:makeHeader(`${TITLE} — ${TOPIC}`)},
  footers:{default:makeFooter("Bài tập ứng dụng — Ứng dụng AI trong phân tích dữ liệu")},
  children:[
/* BÌA */
sp(620),
new Paragraph({children:[T("MÔN TRÍ TUỆ NHÂN TẠO ỨNG DỤNG",{size:24,bold:true,color:C.gray})],
 alignment:AlignmentType.CENTER,spacing:{after:60}}),
new Paragraph({children:[T(TITLE,{size:44,bold:true,color:C.navy})],
 alignment:AlignmentType.CENTER,spacing:{after:60}}),
new Paragraph({children:[T("TỪ CƠ BẢN ĐẾN NÂNG CAO",{size:48,bold:true,color:C.accent})],
 alignment:AlignmentType.CENTER,shading:{fill:C.exBg,type:ShadingType.CLEAR},spacing:{before:80,after:80}}),
new Paragraph({children:[T("18 bài tập · 4 cấp độ · làm trên dữ liệu thật",{size:26,color:C.gray,italics:true})],
 alignment:AlignmentType.CENTER,spacing:{after:280}}),
twoColTable([
 ["Số bài tập","18 bài, chia 4 cấp độ"],
 ["Dữ liệu sử dụng","Hai bộ dữ liệu thật kèm theo tài liệu"],
 ["Tài liệu đi kèm","Giáo trình Ứng dụng AI trong phân tích dữ liệu"],
 ["Đối tượng","Người mới bắt đầu → trình độ nâng cao"],
 ["Đáp án","Có phụ lục đáp án đã kiểm chứng ở cuối tài liệu"],
 ["Đơn vị biên soạn","……………………………………"],
 ["Giảng viên phụ trách","……………………………………"],
],3200,CW-3200),
sp(220),
body("Tóm tắt: Tập bài tập này đi kèm giáo trình Ứng dụng AI trong phân tích dữ liệu. Toàn bộ 18 bài đều làm trên hai bộ dữ liệu thật kèm theo, nên mọi kết quả đều kiểm chứng được. Phụ lục cuối tài liệu cung cấp đáp án với các con số đã được tính lại bằng Python, giúp người học tự đối chiếu và giúp giảng viên chấm nhanh."),
PB(),

/* MỤC LỤC */
new Paragraph({children:[new TextRun({text:"MỤC LỤC",font:FONT,size:36,bold:true,color:C.black})],
 alignment:AlignmentType.CENTER,
 border:{bottom:{style:BorderStyle.SINGLE,size:6,color:C.border,space:8}},spacing:{before:0,after:340}}),
tocEntry("HƯỚNG DẪN SỬ DỤNG",3,0),
tocEntry("CẤP 1 — CƠ BẢN",5,0),
tocEntry("Bài 1  Mô tả bộ dữ liệu",5,1),
tocEntry("Bài 2  Đếm giá trị khuyết và bản ghi trùng",6,1),
tocEntry("Bài 3  Tính tỷ lệ biến mục tiêu",7,1),
tocEntry("Bài 4  Biểu đồ đầu tiên",8,1),
tocEntry("Bài 5  Bắt lỗi AI đọc sai số",9,1),
tocEntry("CẤP 2 — TRUNG BÌNH",10,0),
tocEntry("Bài 6  Săn giá trị lạc chỗ",10,1),
tocEntry("Bài 7  Xây quy trình tiền xử lý hoàn chỉnh",11,1),
tocEntry("Bài 8  So sánh giữa các nhóm và kiểm định",12,1),
tocEntry("Bài 9  Bộ biểu đồ đồng bộ",13,1),
tocEntry("Bài 10  Xếp hạng toàn bộ yếu tố",14,1),
tocEntry("CẤP 3 — NÂNG CAO",15,0),
tocEntry("Bài 11  Phát hiện biến nhân bản",15,1),
tocEntry("Bài 12  Phát hiện rò rỉ nhãn",17,1),
tocEntry("Bài 13  Phân tích tương tác giữa hai yếu tố",18,1),
tocEntry("Bài 14  Xây chỉ số tổng hợp và đường liều – đáp ứng",20,1),
tocEntry("Bài 15  Kiểm tra độ ổn định của phát hiện",22,1),
tocEntry("CẤP 4 — THỬ THÁCH",23,0),
tocEntry("Bài 16  Phản biện một bài phân tích",23,1),
tocEntry("Bài 17  Dự án phân tích hoàn chỉnh",25,1),
tocEntry("Bài 18  Từ dữ liệu đến đề xuất can thiệp",27,1),
tocEntry("PHỤ LỤC — ĐÁP ÁN THAM KHẢO",29,0),
PB(),

/* HƯỚNG DẪN */
new Paragraph({children:[T("HƯỚNG DẪN SỬ DỤNG",{size:SZ_H1,bold:true,color:C.white})],
 shading:{fill:C.headBg,type:ShadingType.CLEAR},spacing:{before:0,after:160},outlineLevel:0}),
H2("1","Dữ liệu ở đâu"),
body("Hai bộ dữ liệu dùng xuyên suốt tập bài tập này nằm trong kho tài liệu của môn học:"),
threeColTable([
 ["student_depression_GOC.csv","27.901 × 18","Bản gốc chưa xử lý — dùng cho các bài về làm sạch dữ liệu"],
 ["student_depression_CLEANED.csv","27.901 × 19","Bản đã làm sạch — dùng cho các bài phân tích"],
 ["asd_treEm_GOC.csv","1.985 × 28","Bản gốc, rất nhiều lỗi — dùng cho bài về trùng lặp"],
 ["asd_treEm_CLEANED.csv","1.329 × 40","Bản đã làm sạch — dùng cho các bài tư duy phản biện"],
],[3400,1700,CW-5100],["Tên tệp","Kích thước","Dùng cho"]),
note("Mỗi bài tập đều ghi rõ dùng tệp nào ở dòng đầu. Dùng sai tệp sẽ ra con số khác và bị trừ điểm, vì vậy hãy kiểm tra trước khi bắt đầu."),
H2("2","Bốn cấp độ"),
threeColTable([
 ["Cấp 1 — Cơ bản","Bài 1–5","Không cần kiến thức thống kê. Mục tiêu: mở được dữ liệu, hỏi AI đúng câu, hình thành thói quen kiểm chứng."],
 ["Cấp 2 — Trung bình","Bài 6–10","Cần biết pandas cơ bản. Mục tiêu: làm sạch dữ liệu, so sánh nhóm, xếp hạng yếu tố."],
 ["Cấp 3 — Nâng cao","Bài 11–15","Cần tư duy phản biện. Mục tiêu: phát hiện lỗi mà cả AI lẫn mắt thường bỏ qua."],
 ["Cấp 4 — Thử thách","Bài 16–18","Không có đáp án duy nhất. Mục tiêu: làm trọn một dự án và bảo vệ kết quả."],
],[2300,1300,CW-3600],["Cấp độ","Bài","Mục tiêu"]),
H2("3","Cách nộp bài"),
body("Mỗi bài nộp một thư mục gồm ba phần: tệp mã nguồn chạy được, kết quả (ảnh biểu đồ hoặc tệp dữ liệu xuất ra), và báo cáo ngắn trả lời đúng các mục trong phần Yêu cầu."),
keypt("Quy tắc bắt buộc với mọi bài: mọi con số trong báo cáo phải do mã của bạn tạo ra. Con số chỉ có nguồn gốc là “AI nói thế” sẽ không được tính điểm."),
H2("4","Thang điểm"),
body("Mỗi bài chấm trên thang 10 theo bảng tiêu chí in ngay cuối đề bài. Tổng điểm tập bài tập là trung bình cộng của các bài đã nộp, trong đó ba bài cấp Thử thách có hệ số 2."),
PB(),

...require("./ex12.js"),
...require("./ex34.js"),
...require("./dapan_phuluc.js"),

sp(200),
new Paragraph({children:[T("HẾT TẬP BÀI TẬP",{size:SZ_H1,bold:true,color:C.white})],
 alignment:AlignmentType.CENTER,shading:{fill:C.headBg,type:ShadingType.CLEAR},
 spacing:{before:200,after:200}}),
]}]});
const OUT=process.argv[2]||"/tmp/bt.docx";
Packer.toBuffer(doc).then(b=>{fs.writeFileSync(OUT,b);console.log("Done →",OUT);});

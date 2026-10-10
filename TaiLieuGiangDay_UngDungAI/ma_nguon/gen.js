const B = require("./base.js");
const { Document,Packer,Paragraph,AlignmentType,BorderStyle,ShadingType,LevelFormat,TextRun,
  PW,PH,ML,MR,MT,MB,CW,FONT,SZ,SZ_H1,C,T,sp,PB,body,note,keypt,H1,H2,H3,tocEntry,
  codeBlock,bull,twoColTable,threeColTable,exTable,makeHeader,makeFooter ,hutechHeader} = B;
const fs = require("fs");
const { hutechCover, hutechCoverPageProps } = require("./hutech_cover.js");
const _COVER = {
  logoPath: require("path").join(__dirname,"img","hutech_ngang.png"),
  loaiTaiLieu: "TÀI LIỆU GIẢNG DẠY.",
  tenDeTai: "ỨNG DỤNG AI TRONG PHÂN TÍCH DỮ LIỆU.",
  nganh: "Trí tuệ nhân tạo ứng dụng.",
  gvhd: "……………………………………",
  sinhVien: [
    ["……………………………………","……………………","……………………"],
    ["……………………………………","……………………","……………………"],
    ["……………………………………","……………………","……………………"]
  ],
  nam: "2026",
};


const ORG   = "MÔN TRÍ TUỆ NHÂN TẠO ỨNG DỤNG";
const TITLE = "TÀI LIỆU GIẢNG DẠY";
const TOPIC = "ỨNG DỤNG AI TRONG PHÂN TÍCH DỮ LIỆU";
const SUB   = "Dành cho người mới bắt đầu  |  Không yêu cầu kiến thức nền";
const VER   = "1.0", STD = "IEEE Std 1063-2001", YEAR = "2026";

const doc = new Document({
  numbering: { config: [
    { reference:"b1", levels:[{level:0,format:LevelFormat.BULLET,text:"•",alignment:AlignmentType.LEFT,
      style:{paragraph:{indent:{left:720,hanging:360}}}}] },
    { reference:"n1", levels:[{level:0,format:LevelFormat.DECIMAL,text:"%1.",alignment:AlignmentType.LEFT,
      style:{paragraph:{indent:{left:720,hanging:360}}}}] } ] },
  styles: {
    default:{ document:{ run:{ font:FONT, size:SZ } } },
    paragraphStyles:[
      {id:"Heading1",name:"Heading 1",basedOn:"Normal",next:"Normal",quickFormat:true,
       run:{size:SZ_H1,bold:true,font:FONT,color:C.white},paragraph:{spacing:{before:240,after:200},outlineLevel:0}},
      {id:"Heading2",name:"Heading 2",basedOn:"Normal",next:"Normal",quickFormat:true,
       run:{size:28,bold:true,font:FONT,color:C.accent},paragraph:{spacing:{before:200,after:120},outlineLevel:1}},
      {id:"Heading3",name:"Heading 3",basedOn:"Normal",next:"Normal",quickFormat:true,
       run:{size:28,bold:true,font:FONT,color:C.navy},paragraph:{spacing:{before:160,after:80},outlineLevel:2}} ] },
  sections:[
 { properties: hutechCoverPageProps(), children: hutechCover(_COVER) },
 {
  properties:{page:{size:{width:PW,height:PH},margin:{top:MT,right:MR,bottom:MB,left:ML}}},
  headers:{default:makeHeader(`${TOPIC}  |  ${STD}`)},
  footers:{default:makeFooter("Tài liệu giảng dạy — Ứng dụng AI trong phân tích dữ liệu")},
  children:[


/* ═══════════════ MỤC LỤC ═══════════════ */
new Paragraph({children:[new TextRun({text:"MỤC LỤC",font:FONT,size:36,bold:true,color:C.black})],
  alignment:AlignmentType.CENTER,
  border:{bottom:{style:BorderStyle.SINGLE,size:6,color:C.border,space:8}},spacing:{before:0,after:360}}),
tocEntry("PHỤ LỤC – TÀI LIỆU THAM KHẢO",4,0),
tocEntry("CHƯƠNG I: AI LÀM ĐƯỢC GÌ TRONG PHÂN TÍCH DỮ LIỆU",5,0),
tocEntry("1.1  Trợ lý AI tạo sinh là gì",5,1),
tocEntry("1.2  AI làm được gì và không làm được gì",5,1),
tocEntry("1.3  Nguyên tắc vàng: AI gợi ý — người kiểm chứng",6,1),
tocEntry("1.4  Quy trình năm bước",6,1),
tocEntry("1.5  Bài tập Chương I",6,1),
tocEntry("CHƯƠNG II: LÀM QUEN VỚI DỮ LIỆU",8,0),
tocEntry("2.1  Dữ liệu dạng bảng",8,1),
tocEntry("2.2  Bốn loại biến thường gặp",8,1),
tocEntry("2.3  Đưa dữ liệu cho AI và hỏi gì",9,1),
tocEntry("2.4  Ca thực tế: bộ dữ liệu trầm cảm sinh viên",10,1),
tocEntry("2.5  Bài tập Chương II",10,1),
tocEntry("CHƯƠNG III: TIỀN XỬ LÝ – LÀM SẠCH DỮ LIỆU",11,0),
tocEntry("3.1  Vì sao phải làm sạch",11,1),
tocEntry("3.2  Bảy lỗi dữ liệu thường gặp",11,1),
tocEntry("3.3  Xóa, sửa hay giữ nguyên",12,1),
tocEntry("3.4  Ca thực tế: cột Thành phố chứa tên người",12,1),
tocEntry("3.5  Bài tập Chương III",13,1),
tocEntry("CHƯƠNG IV: TRỰC QUAN HÓA DỮ LIỆU",14,0),
tocEntry("4.1  Chọn loại biểu đồ theo câu hỏi",14,1),
tocEntry("4.2  Sáu nguyên tắc của một biểu đồ tốt",14,1),
tocEntry("4.3  Nhờ AI sinh mã vẽ biểu đồ",15,1),
tocEntry("4.4  Bài tập Chương IV",15,1),
tocEntry("CHƯƠNG V: RÚT RA TRI THỨC VÀ KIỂM CHỨNG",17,0),
tocEntry("5.1  Tri thức khác gì với mô tả số liệu",17,1),
tocEntry("5.2  Tương quan không phải nhân quả",17,1),
tocEntry("5.3  Ba cái bẫy có thật",18,1),
tocEntry("5.4  Danh sách kiểm tra trước khi tin AI",19,1),
tocEntry("5.5  Bài tập Chương V",20,1),
tocEntry("CHƯƠNG VI: TRÌNH BÀY KẾT QUẢ VÀ ĐẠO ĐỨC",21,0),
tocEntry("6.1  Cấu trúc một bài báo cáo",21,1),
tocEntry("6.2  Một slide — một thông điệp",21,1),
tocEntry("6.3  Nêu hạn chế: phần quan trọng nhất",22,1),
tocEntry("6.4  Đạo đức với dữ liệu tâm lý",22,1),
tocEntry("6.5  Liêm chính học thuật khi dùng AI",23,1),
tocEntry("6.6  Bài tập Chương VI",23,1),
PB(),

/* ═══════════════ PHỤ LỤC ═══════════════ */
new Paragraph({children:[T("PHỤ LỤC – TÀI LIỆU THAM KHẢO",{size:SZ_H1,bold:true,color:C.white})],
  shading:{fill:C.headBg,type:ShadingType.CLEAR},spacing:{before:0,after:200}}),
twoColTable([
  ["[1]","IEEE Std 1063-2001, \"IEEE Standard for Software User Documentation,\" IEEE, 2001."],
  ["[2]","J. W. Tukey, \"Exploratory Data Analysis,\" Addison-Wesley, 1977."],
  ["[3]","H. Wickham, \"Tidy Data,\" Journal of Statistical Software, vol. 59, no. 10, 2014."],
  ["[4]","E. R. Tufte, \"The Visual Display of Quantitative Information,\" 2nd ed., Graphics Press, 2001."],
  ["[5]","S. Kaufman et al., \"Leakage in Data Mining: Formulation, Detection, and Avoidance,\" ACM TKDD, vol. 6, no. 4, 2012."],
  ["[6]","American Psychological Association, \"Ethical Principles of Psychologists and Code of Conduct,\" APA, 2017."],
  ["[7]","Student Depression Dataset, Kaggle, 2024. (Bộ dữ liệu dùng làm ca thực tế trong tài liệu này.)"],
  ["[8]","Autism Screening Data for Children, Kaggle. (Bộ dữ liệu dùng làm ca thực tế Chương V.)"],
], 700, CW-700, ["Ref.","Nguồn tài liệu"]),
PB(),

...require('./ch1.js'),
...require('./ch2.js'),
...require('./ch3.js'),
...require('./ch4.js'),
...require('./ch5.js'),
...require('./ch6.js'),

sp(200),
new Paragraph({children:[T("HẾT TÀI LIỆU",{size:SZ_H1,bold:true,color:C.white})],
  alignment:AlignmentType.CENTER,shading:{fill:C.headBg,type:ShadingType.CLEAR},
  spacing:{before:200,after:200}}),
    ] }] });

const OUT = process.argv[2] || "/tmp/out.docx";
Packer.toBuffer(doc).then(buf => { fs.writeFileSync(OUT, buf); console.log("Done →", OUT); });

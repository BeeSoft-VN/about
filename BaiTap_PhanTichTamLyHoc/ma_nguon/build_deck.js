const pptxgen = require('pptxgenjs');
const path = require('path');
const SB = "/tmp/claude-0/-home-user-about/7f9787d4-c743-5828-973b-7494043f4138/scratchpad";
const CH = (n) => path.join(SB, 'charts', n + '.png');

const THEME = {
  name: "Tam ly hoc AI",
  headFontFace: "Cambria", bodyFontFace: "Calibri",
  colors: {
    dk1: "16213A", lt1: "FFFFFF", dk2: "21295C", lt2: "EEF3F7",
    accent1: "065A82", accent2: "1C7293", accent3: "D03B3B",
    accent4: "1BAF7A", accent5: "2A78D6", accent6: "EDA100",
    hlink: "1C7293", folHlink: "6D7A8C",
  },
};
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";            // 13.3 x 7.5
pres.theme  = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.author = "Nhom phan tich du lieu tam ly hoc";
pres.title  = "Phan tich du lieu tam ly hoc su dung AI";
pres.subject= "Student Depression Dataset";
const C = pres.SchemeColor;
const W = 13.33, H = 7.5, M = 0.62;
const NAVY="16213A", DEEP="065A82", TEAL="1C7293", RED="D03B3B", AQUA="1BAF7A",
      BLUE="2A78D6", AMBER="EDA100", WASH="EEF3F7", MUT="6D7A8C", WHITE="FFFFFF";

/* ============================ LAYOUTS ============================ */
pres.defineSlideMaster({
  title: "TITLE_DARK", background: { color: NAVY },
  objects: [
    { text: { text: "", options: { x:0, y:0, w:W, h:H, fill:{color:NAVY} } } },
    { placeholder: { options: { name:"eyebrow", type:"body", x:M+0.3, y:1.45, w:11.4, h:0.42,
        fontSize:15, color:"8FB8D4", bold:true, charSpacing:3, isTextBox:true }, text:" " } },
    { placeholder: { options: { name:"title", type:"title", x:M+0.3, y:1.95, w:11.4, h:1.95,
        fontSize:42, bold:true, color:WHITE, valign:"top", align:"left", isTextBox:true }, text:" " } },
    { placeholder: { options: { name:"body", type:"body", x:M+0.3, y:4.05, w:11.4, h:2.4,
        fontSize:15, color:"C9DAE8", valign:"top", isTextBox:true }, text:" " } },
  ],
});
pres.defineSlideMaster({
  title: "DIVIDER", background: { color: DEEP },
  objects: [
    { placeholder: { options: { name:"eyebrow", type:"body", x:M+0.3, y:2.75, w:11.4, h:0.45,
        fontSize:16, color:"9FD2E8", bold:true, charSpacing:3, isTextBox:true }, text:" " } },
    { placeholder: { options: { name:"title", type:"title", x:M+0.3, y:3.25, w:11.4, h:1.1,
        fontSize:38, bold:true, color:WHITE, align:"left", isTextBox:true }, text:" " } },
    { placeholder: { options: { name:"body", type:"body", x:M+0.3, y:4.4, w:11.4, h:0.9,
        fontSize:15, color:"C9E4F2", isTextBox:true }, text:" " } },
  ],
});
pres.defineSlideMaster({
  title: "CONTENT", background: { color: WHITE },
  objects: [
    { placeholder: { options: { name:"title", type:"title", x:M, y:0.42, w:12.1, h:0.72,
        fontSize:29, bold:true, color:NAVY, valign:"middle", align:"left", isTextBox:true }, text:" " } },
    { placeholder: { options: { name:"kicker", type:"body", x:M, y:1.14, w:12.1, h:0.42,
        fontSize:14, color:TEAL, bold:true, valign:"middle", isTextBox:true }, text:" " } },
    { text: { text:"Phân tích dữ liệu tâm lý học sử dụng AI · Student Depression Dataset",
        options:{ x:M, y:6.92, w:9.4, h:0.32, fontSize:10, color:MUT, isTextBox:true } } },
  ],
  slideNumber: { x:12.3, y:6.92, w:0.6, h:0.32, fontSize:10, color:MUT, align:"right" },
});
pres.defineSlideMaster({
  title: "CHART", background: { color: WHITE },
  objects: [
    { placeholder: { options: { name:"title", type:"title", x:M, y:0.42, w:12.1, h:0.72,
        fontSize:29, bold:true, color:NAVY, valign:"middle", align:"left", isTextBox:true }, text:" " } },
    { placeholder: { options: { name:"kicker", type:"body", x:M, y:1.14, w:12.1, h:0.42,
        fontSize:14, color:TEAL, bold:true, valign:"middle", isTextBox:true }, text:" " } },
    { text: { text:"Phân tích dữ liệu tâm lý học sử dụng AI · Student Depression Dataset",
        options:{ x:M, y:6.92, w:9.4, h:0.32, fontSize:10, color:MUT, isTextBox:true } } },
  ],
  slideNumber: { x:12.3, y:6.92, w:0.6, h:0.32, fontSize:10, color:MUT, align:"right" },
});

/* ============================ HELPERS ============================ */
let nCard = 0;
const card = (s, x, y, w, h, fill) => s.addShape(pres.ShapeType.roundRect, {
  x, y, w, h, fill:{ color: fill || WASH }, rectRadius:0.1, line:{ type:"none" },
  objectName:`card_${++nCard}` });
let nDot = 0;
const dot = (s, x, y, d, col, txt) => {
  s.addShape(pres.ShapeType.ellipse, { x, y, w:d, h:d, fill:{color:col}, line:{type:"none"},
    objectName:`dot_${++nDot}` });
  s.addText(txt, { x, y, w:d, h:d, fontSize:14, bold:true, color:WHITE,
    align:"center", valign:"middle", margin:0, isTextBox:true });
};
const stat = (s, x, y, w, big, lbl, col) => {
  s.addText(big, { x, y, w, h:0.78, fontSize:40, bold:true, color:col||DEEP,
    align:"center", valign:"middle", margin:0, isTextBox:true, fontFace:"Cambria" });
  s.addText(lbl, { x, y:y+0.74, w, h:0.58, fontSize:12.5, color:MUT,
    align:"center", valign:"top", margin:0, isTextBox:true });
};


/* ── Logo HUTECH tren slide tieu de ── */
const _lp = path.join(__dirname, "img", "hutech_ngang.png");
function hutechBadge(sl) {
  sl.addShape(pres.ShapeType.roundRect, { x:M+0.3, y:0.52, w:2.62, h:0.78,
    fill:{color:"FFFFFF"}, rectRadius:0.08, line:{type:"none"}, objectName:"hutech_card" });
  sl.addImage({ path:_lp, x:M+0.44, y:0.68, w:2.34, h:0.46 });
}

/* ========================= 1. TITLE ========================= */
pres.addSection({ title: "Mở đầu" });
let s = pres.addSlide({ masterName:"TITLE_DARK", sectionTitle:"Mở đầu" });
hutechBadge(s);
s.addText("PHÂN TÍCH DỮ LIỆU TÂM LÝ HỌC SỬ DỤNG AI", { placeholder:"eyebrow" });
s.addText("Điều gì thực sự dự báo trầm cảm ở sinh viên?", { placeholder:"title" });
s.addText([
  { text:"Student Depression Dataset — 27.901 sinh viên · 18 biến khảo sát", options:{ bold:true, fontSize:16, color:WHITE, breakLine:true } },
  { text:"Phân tích khám phá, tiền xử lý và mô hình hóa với sự hỗ trợ của AI", options:{ fontSize:14, breakLine:true } },
], { placeholder:"body" });
// member block
card(s, M+0.3, 5.25, 11.4, 1.35, "1E2B4D");
s.addText("NHÓM THỰC HIỆN", { x:M+0.6, y:5.45, w:3.0, h:0.3, fontSize:11, bold:true,
  color:"8FB8D4", charSpacing:2, margin:0, isTextBox:true });
s.addText([
  { text:"Nhóm …  ·  Lớp …  ·  Giảng viên hướng dẫn: …", options:{ breakLine:true, color:WHITE, bold:true } },
  { text:"Thành viên: Họ tên 1 · Họ tên 2 · Họ tên 3 · Họ tên 4 · Họ tên 5", options:{ color:"C9DAE8" } },
], { x:M+0.6, y:5.78, w:10.8, h:0.72, fontSize:13, margin:0, isTextBox:true, lineSpacing:19 });
s.addNotes("Chào thầy và các bạn. Nhóm em trình bày đề tài phân tích Student Depression Dataset — bộ dữ liệu khảo sát 27.901 sinh viên. Câu hỏi trung tâm: trong rất nhiều yếu tố học tập, tài chính và lối sống, yếu tố nào thực sự liên quan đến trầm cảm? Thời lượng trình bày khoảng 13 phút.");

/* ========================= 2. AGENDA ========================= */
s = pres.addSlide({ masterName:"CONTENT", sectionTitle:"Mở đầu" });
s.addText("Nội dung trình bày", { placeholder:"title" });
s.addText("5 phần · khoảng 13 phút", { placeholder:"kicker" });
const agenda = [
  ["1","Giới thiệu bộ dữ liệu","Nguồn, quy mô, cấu trúc 18 biến và biến mục tiêu", DEEP],
  ["2","Công cụ AI & quy trình","Cách nhóm dùng AI trong từng bước phân tích", TEAL],
  ["3","Tiền xử lý dữ liệu","7 vấn đề chất lượng phát hiện được và cách khắc phục", AMBER],
  ["4","Kết quả phân tích","6 biểu đồ trả lời câu hỏi: yếu tố nào quan trọng nhất", BLUE],
  ["5","Nhận định & đề xuất","Tri thức rút ra và ứng dụng cho công tác hỗ trợ sinh viên", AQUA],
];
agenda.forEach(([n,t,d,col], i) => {
  const y = 1.78 + i*1.02;
  card(s, M, y, 12.1, 0.86, WASH);
  dot(s, M+0.3, y+0.19, 0.48, col, n);
  s.addText(t, { x:M+0.98, y:y+0.1, w:4.3, h:0.34, fontSize:16, bold:true, color:NAVY,
    margin:0, valign:"middle", isTextBox:true });
  s.addText(d, { x:M+0.98, y:y+0.45, w:10.6, h:0.32, fontSize:12.5, color:MUT,
    margin:0, valign:"middle", isTextBox:true });
});
s.addNotes("Bài trình bày gồm 5 phần. Em sẽ dành nhiều thời gian nhất cho phần 3 và phần 4 — tiền xử lý và kết quả phân tích — vì đây là phần thể hiện rõ nhất quá trình làm việc của nhóm.");

/* ========================= 3. DATASET ========================= */
pres.addSection({ title: "Bộ dữ liệu" });
s = pres.addSlide({ masterName:"CONTENT", sectionTitle:"Bộ dữ liệu" });
s.addText("Giới thiệu bộ dữ liệu", { placeholder:"title" });
s.addText("Student Depression Dataset · Kaggle · khảo sát sinh viên tại Ấn Độ", { placeholder:"kicker" });
card(s, M, 1.72, 12.1, 1.5, WASH);
[["27.901","Sinh viên được khảo sát",DEEP],["18","Biến ban đầu",TEAL],
 ["58,5%","Có dấu hiệu trầm cảm",RED],["0","Bản ghi trùng lặp",AQUA],
 ["3","Ô khuyết / 502.218 ô",AMBER]].forEach(([b,l,c],i)=> stat(s, M+0.2+i*2.38, 1.9, 2.26, b, l, c));
s.addText("Cấu trúc 18 biến", { x:M, y:3.44, w:5.6, h:0.34, fontSize:15, bold:true, color:NAVY,
  margin:0, isTextBox:true });
const groups = [
  ["Nhân khẩu học", "Giới tính · Tuổi · Thành phố · Nghề nghiệp", DEEP],
  ["Học tập", "Áp lực học tập · Điểm CGPA · Mức hài lòng · Bằng cấp", TEAL],
  ["Lối sống", "Thời lượng ngủ · Chế độ ăn · Số giờ học/làm mỗi ngày", BLUE],
  ["Tâm lý – xã hội", "Áp lực tài chính · Tiền sử gia đình · Ý định tự tử", RED],
];
groups.forEach(([t,d,col], i) => {
  const y = 3.86 + i*0.74;
  s.addShape(pres.ShapeType.ellipse, { x:M+0.02, y:y+0.17, w:0.2, h:0.2, fill:{color:col},
    line:{type:"none"}, objectName:`gdot_${i}` });
  s.addText(t, { x:M+0.34, y:y, w:1.95, h:0.3, fontSize:13, bold:true, color:NAVY, margin:0, isTextBox:true });
  s.addText(d, { x:M+0.34, y:y+0.28, w:5.3, h:0.3, fontSize:11.5, color:MUT, margin:0, isTextBox:true });
});
s.addImage({ path: CH('c1_target'), x:6.6, y:3.3, w:6.1, h:3.45 });
s.addNotes("Bộ dữ liệu lấy từ Kaggle, khảo sát 27.901 sinh viên tại Ấn Độ với 18 biến, chia thành 4 nhóm: nhân khẩu học, học tập, lối sống và tâm lý xã hội. Biến mục tiêu Depression là nhị phân. Điểm thuận lợi: gần như không có ô khuyết và không có bản ghi trùng. Tỷ lệ 58,5% – 41,5% là mất cân bằng nhẹ, tỷ lệ 1,41:1, nên nhóm không cần kỹ thuật lấy mẫu lại.");

/* ========================= 4. AI TOOLS ========================= */
s = pres.addSlide({ masterName:"CONTENT", sectionTitle:"Bộ dữ liệu" });
s.addText("Công cụ AI và quy trình làm việc", { placeholder:"title" });
s.addText("AI dùng để khám phá và đề xuất — nhóm kiểm chứng lại bằng thống kê", { placeholder:"kicker" });
const steps = [
  ["1","Khám phá ban đầu (EDA)","Tải bộ dữ liệu lên trợ lý AI, yêu cầu mô tả cấu trúc, thống kê mô tả, phát hiện bất thường và gợi ý hướng phân tích.", DEEP],
  ["2","Chẩn đoán chất lượng","Nhờ AI rà soát từng cột: giá trị khuyết, trùng lặp, ngoài thang đo, nhãn rác và cột gần như hằng số.", TEAL],
  ["3","Sinh mã xử lý","AI viết mã Python (pandas) cho các bước làm sạch; nhóm đọc hiểu, chỉnh sửa và chạy lại để kiểm chứng kết quả.", AMBER],
  ["4","Trực quan hóa","AI đề xuất loại biểu đồ phù hợp với từng câu hỏi; nhóm quyết định bảng màu và cách ghi nhãn.", BLUE],
  ["5","Diễn giải & phản biện","Yêu cầu AI nêu cách giải thích thay thế và các hạn chế, tránh kết luận nhân quả vội vàng.", AQUA],
];
steps.forEach(([n,t,d,col], i) => {
  const y = 1.74 + i*1.0;
  card(s, M, y, 8.15, 0.88, WASH);
  dot(s, M+0.26, y+0.2, 0.48, col, n);
  s.addText(t, { x:M+0.94, y:y+0.06, w:7.0, h:0.3, fontSize:14, bold:true, color:NAVY, margin:0, isTextBox:true });
  s.addText(d, { x:M+0.94, y:y+0.35, w:7.05, h:0.48, fontSize:11, color:MUT, margin:0, isTextBox:true, lineSpacing:13 });
});
card(s, 9.1, 1.74, 3.6, 4.98, NAVY);
s.addText("CÔNG CỤ ĐÃ DÙNG", { x:9.38, y:1.98, w:3.1, h:0.3, fontSize:11, bold:true,
  color:"8FB8D4", charSpacing:2, margin:0, isTextBox:true });
const tools = [
  ["Trợ lý AI hội thoại","Claude · ChatGPT · Gemini — EDA, gợi ý hướng phân tích, sinh mã"],
  ["Python 3 + pandas","Làm sạch, mã hóa và kiểm chứng toàn bộ số liệu"],
  ["matplotlib","Vẽ 6 biểu đồ trình bày"],
  ["scipy + scikit-learn","Kiểm định thống kê và mô hình dự báo"],
];
tools.forEach(([t,d], i) => {
  const y = 2.42 + i*0.95;
  s.addText(t, { x:9.38, y:y, w:3.1, h:0.28, fontSize:12.5, bold:true, color:WHITE, margin:0, isTextBox:true });
  s.addText(d, { x:9.38, y:y+0.27, w:3.1, h:0.6, fontSize:10, color:"A8C2D8", margin:0,
    isTextBox:true, lineSpacing:12 });
});
s.addText("Mọi con số trong báo cáo đều được nhóm chạy lại bằng Python để đối chiếu.",
  { x:9.38, y:6.2, w:3.1, h:0.44, fontSize:9.5, italic:true, color:"8FB8D4", margin:0, isTextBox:true, lineSpacing:11.5 });
s.addNotes("Nhóm xác định rõ vai trò của AI: AI giúp khám phá nhanh và gợi ý, nhưng mọi con số đưa vào báo cáo đều được nhóm chạy lại bằng Python để đối chiếu. Điều này quan trọng vì trợ lý AI có thể đưa ra số liệu không chính xác khi đọc tệp lớn.");

/* ========================= 5. DIVIDER: PREPROCESSING ========================= */
pres.addSection({ title: "Tiền xử lý" });
s = pres.addSlide({ masterName:"DIVIDER", sectionTitle:"Tiền xử lý" });
s.addText("PHẦN 3", { placeholder:"eyebrow" });
s.addText("Tiền xử lý dữ liệu", { placeholder:"title" });
s.addText("Bộ dữ liệu trông sạch, nhưng rà soát từng cột cho thấy 7 vấn đề cần xử lý", { placeholder:"body" });
s.addNotes("Chuyển sang phần tiền xử lý. Đây là phần nhóm thấy thú vị nhất, vì nhìn qua thì bộ dữ liệu rất sạch.");

/* ========================= 6. DATA QUALITY ========================= */
s = pres.addSlide({ masterName:"CONTENT", sectionTitle:"Tiền xử lý" });
s.addText("Chẩn đoán: 7 vấn đề chất lượng dữ liệu", { placeholder:"title" });
s.addText("Câu trả lời cho yêu cầu 2 — bộ dữ liệu CÓ cần tiền xử lý", { placeholder:"kicker" });
const probs = [
  ["Ô khuyết","3 ô ở biến Áp lực tài chính (0,011%)","Rất nhẹ"],
  ["Trùng lặp","0 bản ghi trùng trên toàn bộ 27.901 dòng","Không có"],
  ["Cột gần như hằng số","Nghề nghiệp 99,9% là \"Student\"; Áp lực công việc và Hài lòng công việc trên 99,9% bằng 0","Nghiêm trọng"],
  ["Giá trị ngoài thang đo","9 ô Áp lực học tập và 10 ô Hài lòng việc học bằng 0, trong khi thang đo là 1–5","Trung bình"],
  ["Giá trị bất khả thi","9 sinh viên có điểm CGPA bằng 0","Trung bình"],
  ["Nhãn rác \"Others\"","18 ô Thời lượng ngủ, 12 ô Chế độ ăn, 35 ô Bằng cấp","Nhẹ"],
  ["Lỗi nhập liệu ở cột Thành phố","26 ô chứa tên người (Saanvi, Gaurav…), mã bằng cấp (M.Tech) hoặc chuỗi lỗi (\"Less Delhi\")","Nghiêm trọng"],
];
const sevCol = { "Nghiêm trọng":RED, "Trung bình":AMBER, "Nhẹ":TEAL, "Rất nhẹ":TEAL, "Không có":AQUA };
probs.forEach(([t,d,sev], i) => {
  const y = 1.74 + i*0.735;
  card(s, M, y, 12.1, 0.63, i%2 ? WHITE : WASH);
  s.addShape(pres.ShapeType.ellipse, { x:M+0.22, y:y+0.22, w:0.19, h:0.19,
    fill:{color:sevCol[sev]}, line:{type:"none"}, objectName:`sev_${i}` });
  s.addText(t, { x:M+0.56, y:y+0.05, w:3.5, h:0.53, fontSize:13, bold:true, color:NAVY,
    margin:0, valign:"middle", isTextBox:true });
  s.addText(d, { x:M+4.12, y:y+0.05, w:6.3, h:0.53, fontSize:11.5, color:MUT,
    margin:0, valign:"middle", isTextBox:true });
  s.addText(sev, { x:M+10.5, y:y+0.05, w:1.45, h:0.53, fontSize:11, bold:true,
    color:sevCol[sev], align:"right", margin:0, valign:"middle", isTextBox:true });
});
s.addNotes("Nhóm rà soát từng cột. Hai phát hiện quan trọng nhất: Thứ nhất, ba cột gần như hằng số — vì 99,9% người trả lời là sinh viên nên hai biến về công việc gần như toàn số 0, giữ lại chỉ làm nhiễu mô hình. Thứ hai, cột Thành phố chứa 26 giá trị là tên người và mã bằng cấp — dấu hiệu điển hình của lỗi lệch cột khi nhập liệu. Chi tiết này AI phát hiện giúp nhóm khi được yêu cầu liệt kê các giá trị hiếm.");

/* ========================= 7. PREPROCESSING PIPELINE ========================= */
s = pres.addSlide({ masterName:"CONTENT", sectionTitle:"Tiền xử lý" });
s.addText("Quy trình tiền xử lý 6 bước", { placeholder:"title" });
s.addText("Giữ nguyên 100% bản ghi — chỉ sửa giá trị sai, không xóa sinh viên nào", { placeholder:"kicker" });
const pipe = [
  ["1","Loại bỏ 4 cột","id (định danh), Nghề nghiệp, Áp lực công việc, Hài lòng công việc — gần như hằng số, không mang thông tin phân biệt", DEEP],
  ["2","Làm sạch cột Thành phố","Giữ 30 thành phố có từ 10 bản ghi trở lên; 26 giá trị rác chuyển thành khuyết", TEAL],
  ["3","Chuẩn hóa thang đo","Giá trị 0 ngoài thang 1–5 và CGPA bằng 0 chuyển thành khuyết (28 ô)", AMBER],
  ["4","Xử lý nhãn rác","65 nhãn \"Others\" ở 3 biến phân loại chuyển thành khuyết", BLUE],
  ["5","Điền khuyết","122 ô: trung vị cho biến số, giá trị phổ biến nhất cho biến phân loại", RED],
  ["6","Mã hóa biến","Thời lượng ngủ → số giờ; Chế độ ăn → thang 1–3; Có/Không → 1/0", AQUA],
];
pipe.forEach(([n,t,d,col], i) => {
  const x = M + (i%3)*4.07, y = 1.76 + Math.floor(i/3)*1.72;
  card(s, x, y, 3.85, 1.52, WASH);
  dot(s, x+0.24, y+0.22, 0.46, col, n);
  s.addText(t, { x:x+0.82, y:y+0.26, w:2.85, h:0.36, fontSize:13.5, bold:true, color:NAVY,
    margin:0, valign:"middle", isTextBox:true });
  s.addText(d, { x:x+0.24, y:y+0.78, w:3.4, h:0.62, fontSize:10.5, color:MUT, margin:0,
    isTextBox:true, lineSpacing:12.5 });
});
card(s, M, 5.34, 12.1, 1.22, NAVY);
[["27.901 → 27.901","Bản ghi (giữ 100%)","9FD2E8"],["18 → 14","Cột gốc giữ lại","9FD2E8"],
 ["+5","Biến mã hóa mới","9FD2E8"],["19","Tổng số cột","6EE7B7"]].forEach(([b,l,c],i)=>{
  const x = M+0.25+i*2.98;
  s.addText(b, { x, y:5.52, w:2.8, h:0.42, fontSize:21, bold:true, color:WHITE,
    align:"center", margin:0, isTextBox:true, fontFace:"Cambria" });
  s.addText(l, { x, y:5.96, w:2.8, h:0.32, fontSize:11, color:c, align:"center", margin:0, isTextBox:true });
});
s.addNotes("Nguyên tắc của nhóm: không xóa bản ghi nào. Vì tỷ lệ giá trị lỗi rất thấp, chỉ khoảng 0,02% tổng số ô, nên nhóm chọn sửa giá trị sai thành khuyết rồi điền lại bằng trung vị hoặc mốt, thay vì loại bỏ cả dòng. Kết quả: giữ nguyên 27.901 bản ghi, còn 14 cột gốc cộng 5 biến mã hóa mới, tổng 19 cột, không còn ô khuyết nào.");

/* ========================= 8. DIVIDER: RESULTS ========================= */
pres.addSection({ title: "Kết quả phân tích" });
s = pres.addSlide({ masterName:"DIVIDER", sectionTitle:"Kết quả phân tích" });
s.addText("PHẦN 4", { placeholder:"eyebrow" });
s.addText("Kết quả phân tích", { placeholder:"title" });
s.addText("6 biểu đồ trả lời câu hỏi: yếu tố nào thực sự liên quan đến trầm cảm?", { placeholder:"body" });
s.addNotes("Phần 4 là kết quả phân tích, trình bày qua 6 biểu đồ.");

/* ---------- chart slides ---------- */
const chartSlide = (title, kicker, img, iw, ih, note, bullets) => {
  const sl = pres.addSlide({ masterName:"CHART", sectionTitle:"Kết quả phân tích" });
  sl.addText(title, { placeholder:"title" });
  sl.addText(kicker, { placeholder:"kicker" });
  if (bullets) {
    sl.addImage({ path: CH(img), x:M, y:1.72, w:iw, h:ih });
    card(sl, M+iw+0.3, 1.72, 12.1-iw-0.3, ih, WASH);
    sl.addText(bullets.map((b,i) => ({ text:b, options:{ bullet:{ code:"25AA" },
      breakLine: i < bullets.length-1, paraSpaceAfter: 11 } })),
      { x:M+iw+0.56, y:1.9, w:12.1-iw-0.82, h:ih-0.36, fontSize:12.5, color:NAVY,
        margin:0, isTextBox:true, lineSpacing:16, valign:"top" });
  } else {
    sl.addImage({ path: CH(img), x:(W-iw)/2, y:1.72, w:iw, h:ih });
  }
  sl.addNotes(note);
  return sl;
};

chartSlide("Áp lực học tập và áp lực tài chính", "Quan hệ đơn điệu rõ rệt: mức áp lực càng cao, tỷ lệ trầm cảm càng cao",
  "c2_pressure", 12.1, 4.3,
  "Hai biểu đồ này cho thấy quan hệ đơn điệu rất rõ. Áp lực học tập: từ mức 1 lên mức 5, tỷ lệ trầm cảm tăng từ 19,4% lên 86,1% — chênh 67 điểm phần trăm. Áp lực tài chính cũng cùng xu hướng, từ 31,9% lên 81,3%. Đáng chú ý là ngay cả nhóm áp lực tài chính thấp nhất vẫn có gần 32% có dấu hiệu trầm cảm, cho thấy còn nhiều yếu tố khác cùng tác động.");

chartSlide("Xếp hạng toàn bộ yếu tố", "Tương quan point-biserial với biến mục tiêu · N = 27.901",
  "c3_corr", 8.6, 4.85, 
  "Đây là biểu đồ tổng hợp quan trọng nhất của phần phân tích. Ba yếu tố dẫn đầu là ý định tự tử, áp lực học tập và áp lực tài chính. Nhưng điều bất ngờ nằm ở cuối bảng: điểm CGPA gần như không liên quan, hệ số chỉ 0,022; và giới tính hoàn toàn không có khác biệt, p bằng 0,76. Hai phát hiện này đi ngược lại giả định thông thường.",
  ["Ý định tự tử là tín hiệu mạnh nhất (r = 0,546) — cần được xem như chỉ báo cảnh báo sớm, không phải hệ quả",
   "Áp lực học tập (0,475) vượt xa mọi yếu tố lối sống",
   "Điểm CGPA gần như KHÔNG liên quan (r = 0,022): học giỏi không đồng nghĩa với khỏe mạnh tâm lý",
   "Giới tính KHÔNG tạo khác biệt (p = 0,76) — nam 58,6% so với nữ 58,5%",
   "Tiền sử gia đình chỉ ở mức rất yếu (0,053), thấp hơn nhiều so với các yếu tố hoàn cảnh"]);

chartSlide("Lối sống: giấc ngủ và dinh dưỡng", "Hai biến lối sống có thể can thiệp được",
  "c4_lifestyle", 12.1, 4.3,
  "Về lối sống: chế độ ăn có quan hệ tăng đều, chênh lệch 25,3 điểm phần trăm giữa nhóm ăn lành mạnh và kém lành mạnh. Giấc ngủ thì khác — quan hệ không tuyến tính: nhóm ngủ dưới 5 giờ cao nhất với 64,5%, nhưng nhóm ngủ 7-8 giờ lại cao hơn nhóm ngủ 5-6 giờ. Nhóm lưu ý đây là dữ liệu tự báo cáo tại một thời điểm, nên không thể kết luận chiều nhân quả: ăn uống kém có thể là nguyên nhân, mà cũng có thể là biểu hiện của trầm cảm.");

chartSlide("Tuổi và cường độ học tập", "Sinh viên năm đầu là nhóm dễ tổn thương nhất",
  "c5_age_hours", 12.1, 4.3,
  "Tuổi là yếu tố bảo vệ: nhóm 18-20 tuổi có tỷ lệ 72,3%, giảm dần còn 40,9% ở nhóm từ 31 tuổi trở lên. Chênh lệch hơn 31 điểm phần trăm. Về cường độ học, nhóm học 10-12 giờ mỗi ngày có tỷ lệ 69%, so với 41,6% ở nhóm học dưới 3 giờ. Đây là phát hiện có giá trị ứng dụng trực tiếp: sinh viên năm nhất, năm hai cần được ưu tiên hỗ trợ.");

chartSlide("Khi hai yếu tố cùng xuất hiện", "Áp lực học tập × Ý định tự tử · giá trị trong ô là tỷ lệ trầm cảm",
  "c8_heat", 7.3, 4.8,
  "Biểu đồ nhiệt này cho thấy hai yếu tố không chỉ cộng lại mà cộng hưởng với nhau. Ở ô góc trên bên trái — áp lực thấp và không có ý định tự tử — tỷ lệ chỉ 5,5%. Ở ô góc dưới bên phải — áp lực cao nhất kèm ý định tự tử — lên tới 94,5%. Riêng ý định tự tử làm tăng tỷ lệ thêm khoảng 34 điểm ở mức áp lực 1, nhưng chỉ thêm 36 điểm ở mức áp lực 5 vì đã gần chạm trần.",
  ["Ô an toàn nhất: áp lực mức 1 + không có ý định tự tử → chỉ 5,5%",
   "Ô rủi ro nhất: áp lực mức 5 + có ý định tự tử → 94,5%",
   "Chênh lệch giữa hai ô: hơn 17 lần",
   "Ý nghĩa: sàng lọc cần xét ĐỒNG THỜI nhiều yếu tố, không đánh giá từng yếu tố riêng lẻ"]);

chartSlide("Phát hiện trung tâm của nhóm", "Số yếu tố nguy cơ đồng thời dự báo tốt hơn bất kỳ yếu tố đơn lẻ nào",
  "c6_dose", 11.0, 4.75,
  "Đây là phát hiện trung tâm của nhóm. Nhóm đếm số yếu tố nguy cơ mà mỗi sinh viên cùng lúc mắc phải, gồm năm yếu tố: áp lực học tập cao, áp lực tài chính cao, ngủ dưới 5 giờ, ăn uống kém và có ý định tự tử. Kết quả tạo thành một đường tăng theo liều rất đẹp: không có yếu tố nào thì chỉ 4,5%, đủ cả năm yếu tố thì 98,6% — gấp gần 22 lần. Ý nghĩa thực tiễn rất lớn: nhà trường không cần công cụ phức tạp, chỉ cần đếm số yếu tố nguy cơ là đã phân tầng được sinh viên.");

/* ========================= MODEL ========================= */
s = pres.addSlide({ masterName:"CHART", sectionTitle:"Kết quả phân tích" });
s.addText("Kiểm chứng bằng mô hình dự báo", { placeholder:"title" });
s.addText("Hồi quy Logistic và Random Forest · chia 75% huấn luyện – 25% kiểm tra", { placeholder:"kicker" });
s.addImage({ path: CH('c7_importance'), x:M, y:1.72, w:7.5, h:4.24 });
card(s, 8.4, 1.72, 4.3, 4.24, WASH);
s.addText("KẾT QUẢ MÔ HÌNH", { x:8.68, y:1.94, w:3.8, h:0.3, fontSize:11, bold:true,
  color:TEAL, charSpacing:2, margin:0, isTextBox:true });
const mstat = [["0,921","AUC — Hồi quy Logistic"],["84,6%","Độ chính xác tổng thể"],
               ["88,6%","Độ nhạy (bắt đúng ca trầm cảm)"],["0,921","AUC kiểm định chéo 5-fold"]];
mstat.forEach(([b,l], i) => {
  const y = 2.34 + i*0.78;
  s.addText(b, { x:8.68, y:y, w:1.45, h:0.46, fontSize:23, bold:true, color:DEEP,
    margin:0, valign:"middle", isTextBox:true, fontFace:"Cambria" });
  s.addText(l, { x:10.18, y:y, w:2.32, h:0.46, fontSize:10.5, color:MUT, margin:0,
    valign:"middle", isTextBox:true, lineSpacing:12 });
});
s.addText([
  { text:"Mô hình chỉ để KIỂM CHỨNG mức độ nhất quán của các mối liên hệ. ", options:{ bold:true, breakLine:true } },
  { text:"Random Forest cho kết quả tương đương (AUC 0,918), xác nhận các yếu tố tìm được là ổn định chứ không do ngẫu nhiên.", options:{} },
], { x:8.68, y:5.5, w:3.8, h:0.3, fontSize:10.5, color:NAVY, margin:0, isTextBox:true, lineSpacing:12.5, valign:"top" });
s.addNotes("Để kiểm chứng, nhóm huấn luyện hai mô hình. Hồi quy Logistic đạt AUC 0,921 và độ chính xác 84,6%, với kiểm định chéo 5-fold cho kết quả gần như y hệt, nghĩa là mô hình ổn định, không bị quá khớp. Random Forest cho thứ hạng biến tương tự. Nhóm nhấn mạnh: mục đích không phải xây công cụ chẩn đoán, mà để xác nhận các mối liên hệ tìm được là nhất quán.");

/* ========================= 16. DIVIDER: INSIGHTS ========================= */
pres.addSection({ title: "Nhận định & Đề xuất" });
s = pres.addSlide({ masterName:"DIVIDER", sectionTitle:"Nhận định & Đề xuất" });
s.addText("PHẦN 5", { placeholder:"eyebrow" });
s.addText("Nhận định và đề xuất ứng dụng", { placeholder:"title" });
s.addText("Từ con số đến hành động cụ thể cho công tác hỗ trợ sinh viên", { placeholder:"body" });
s.addNotes("Phần cuối: nhóm rút ra nhận định và đề xuất ứng dụng.");

/* ========================= 17. INSIGHTS ========================= */
s = pres.addSlide({ masterName:"CONTENT", sectionTitle:"Nhận định & Đề xuất" });
s.addText("Sáu nhận định chính", { placeholder:"title" });
s.addText("Tri thức rút ra từ bộ dữ liệu", { placeholder:"kicker" });
const ins = [
  ["Hoàn cảnh quan trọng hơn di truyền","Áp lực học tập (r = 0,475) và tài chính (0,364) mạnh hơn hẳn tiền sử gia đình (0,053) — phần lớn nguy cơ đến từ môi trường, tức là có thể can thiệp được.", RED],
  ["Học giỏi không bảo vệ sức khỏe tâm lý","CGPA gần như không liên quan (r = 0,022). Không thể dùng kết quả học tập để sàng lọc sinh viên có nguy cơ.", DEEP],
  ["Không có khác biệt giới tính","Nam 58,6% — Nữ 58,5%, p = 0,76. Chương trình hỗ trợ không nên mặc định ưu tiên một giới.", TEAL],
  ["Nguy cơ tăng theo liều","Từ 4,5% (không có yếu tố nguy cơ) lên 98,6% (đủ 5 yếu tố) — gấp 21,7 lần.", AMBER],
  ["Sinh viên năm đầu dễ tổn thương nhất","Nhóm 18–20 tuổi: 72,3%, cao hơn 31 điểm % so với nhóm từ 31 tuổi.", BLUE],
  ["Ý định tự tử là chỉ báo sớm, không phải hệ quả","63,3% mẫu từng có ý định tự tử — đây là tín hiệu cần quy trình ứng phó riêng, không chỉ là một biến thống kê.", AQUA],
];
ins.forEach(([t,d,col], i) => {
  const x = M + (i%2)*6.12, y = 1.74 + Math.floor(i/2)*1.68;
  card(s, x, y, 5.86, 1.5, WASH);
  dot(s, x+0.24, y+0.24, 0.44, col, String(i+1));
  s.addText(t, { x:x+0.8, y:y+0.2, w:4.85, h:0.52, fontSize:13.5, bold:true, color:NAVY,
    margin:0, valign:"middle", isTextBox:true, lineSpacing:15 });
  s.addText(d, { x:x+0.24, y:y+0.78, w:5.4, h:0.62, fontSize:10.5, color:MUT, margin:0,
    isTextBox:true, lineSpacing:12.5 });
});
s.addNotes("Sáu nhận định chính. Em muốn nhấn mạnh ba điều đi ngược trực giác. Thứ nhất, hoàn cảnh quan trọng hơn di truyền — tiền sử gia đình chỉ có hệ số 0,053, yếu hơn rất nhiều so với áp lực học tập và tài chính. Thứ hai, học giỏi không bảo vệ sức khỏe tâm lý. Thứ ba, không có khác biệt giới tính trong bộ dữ liệu này.");

/* ========================= 18. APPLICATIONS ========================= */
s = pres.addSlide({ masterName:"CONTENT", sectionTitle:"Nhận định & Đề xuất" });
s.addText("Đề xuất ứng dụng thực tế", { placeholder:"title" });
s.addText("Liên hệ với công tác hỗ trợ sinh viên trong trường đại học", { placeholder:"kicker" });
const apps = [
  ["Bộ sàng lọc 5 câu hỏi","Xây phiếu khảo sát ngắn theo đúng 5 yếu tố nguy cơ đã xác định. Đếm số yếu tố để phân tầng: 0–1 theo dõi thường kỳ, 2–3 mời tham vấn, từ 4 trở lên can thiệp ưu tiên.", DEEP],
  ["Ưu tiên sinh viên năm nhất","Lồng ghép sàng lọc vào tuần sinh hoạt công dân đầu khóa — nhóm 18–20 tuổi có tỷ lệ cao nhất (72,3%).", TEAL],
  ["Rà soát khối lượng học tập","Nhóm học 10–12 giờ/ngày có tỷ lệ 69%. Khoa có thể rà soát lịch thi, hạn nộp bài dồn và số tín chỉ tối đa mỗi học kỳ.", BLUE],
  ["Hỗ trợ tài chính gắn với tâm lý","Áp lực tài chính xếp thứ ba (r = 0,364). Hồ sơ xin học bổng, vay vốn nên kèm lời mời tham vấn tâm lý.", AMBER],
  ["Quy trình ứng phó riêng cho dấu hiệu nguy cấp","Khi phát hiện ý định tự tử, cần chuyển ngay tới chuyên viên tâm lý — không xử lý như một mục khảo sát thông thường.", RED],
  ["Can thiệp lối sống chi phí thấp","Ngủ đủ và ăn uống lành mạnh liên quan tới chênh lệch 13,6 và 25,3 điểm %. Đây là nhóm giải pháp rẻ, dễ triển khai ở ký túc xá và căng tin.", AQUA],
];
apps.forEach(([t,d,col], i) => {
  const x = M + (i%3)*4.07, y = 1.74 + Math.floor(i/3)*2.4;
  card(s, x, y, 3.85, 2.2, WASH);
  s.addShape(pres.ShapeType.ellipse, { x:x+0.24, y:y+0.22, w:0.44, h:0.44, fill:{color:col},
    line:{type:"none"}, objectName:`app_${i}` });
  s.addText(String(i+1), { x:x+0.24, y:y+0.22, w:0.44, h:0.44, fontSize:14, bold:true,
    color:WHITE, align:"center", valign:"middle", margin:0, isTextBox:true });
  s.addText(t, { x:x+0.8, y:y+0.18, w:2.85, h:0.56, fontSize:13, bold:true, color:NAVY,
    margin:0, valign:"middle", isTextBox:true, lineSpacing:15 });
  s.addText(d, { x:x+0.24, y:y+0.82, w:3.4, h:1.2, fontSize:10.5, color:MUT, margin:0,
    isTextBox:true, lineSpacing:13 });
});
s.addNotes("Từ các phát hiện, nhóm đề xuất sáu ứng dụng. Đề xuất số 1 là quan trọng nhất và cũng dễ làm nhất: xây một bộ sàng lọc chỉ 5 câu hỏi, đếm số yếu tố nguy cơ để phân tầng sinh viên. Dựa trên dữ liệu, nhóm từ 4 yếu tố trở lên có tỷ lệ trên 94%, rõ ràng cần ưu tiên can thiệp.");

/* ========================= 19. LIMITATIONS ========================= */
s = pres.addSlide({ masterName:"CONTENT", sectionTitle:"Nhận định & Đề xuất" });
s.addText("Hạn chế và kết luận", { placeholder:"title" });
s.addText("Những điều bộ dữ liệu này KHÔNG cho phép kết luận", { placeholder:"kicker" });
const lims = [
  ["Tương quan không phải nhân quả","Dữ liệu cắt ngang tại một thời điểm. Không thể biết ăn uống kém gây trầm cảm hay trầm cảm dẫn tới ăn uống kém."],
  ["Biến mục tiêu là sàng lọc, không phải chẩn đoán","Nhãn \"Depression\" đến từ tự báo cáo, không phải kết luận lâm sàng của bác sĩ."],
  ["Giới hạn bối cảnh","Mẫu khảo sát tại Ấn Độ. Không thể suy rộng trực tiếp cho sinh viên Việt Nam nếu chưa khảo sát lại."],
  ["Tỷ lệ 58,5% cao bất thường","Có thể do cách lấy mẫu hoặc ngưỡng sàng lọc rộng — cần thận trọng khi trích dẫn con số này."],
];
lims.forEach(([t,d], i) => {
  const y = 1.74 + i*1.21;
  card(s, M, y, 7.4, 1.03, WASH);
  s.addShape(pres.ShapeType.ellipse, { x:M+0.24, y:y+0.42, w:0.2, h:0.2, fill:{color:AMBER},
    line:{type:"none"}, objectName:`lim_${i}` });
  s.addText(t, { x:M+0.6, y:y+0.14, w:6.6, h:0.3, fontSize:13, bold:true, color:NAVY, margin:0, isTextBox:true });
  s.addText(d, { x:M+0.6, y:y+0.45, w:6.6, h:0.46, fontSize:10.5, color:MUT, margin:0, isTextBox:true, lineSpacing:12.5 });
});
card(s, 8.32, 1.74, 4.38, 3.78, NAVY);
s.addText("KẾT LUẬN", { x:8.62, y:2.0, w:3.8, h:0.3, fontSize:11, bold:true, color:"8FB8D4",
  charSpacing:2, margin:0, isTextBox:true });
s.addText([
  { text:"Trầm cảm ở sinh viên trong bộ dữ liệu này gắn chặt với ", options:{ breakLine:false } },
  { text:"hoàn cảnh học tập và tài chính", options:{ bold:true, color:"9FD2E8", breakLine:false } },
  { text:" hơn là với đặc điểm cá nhân hay di truyền.", options:{ breakLine:true } },
  { text:" ", options:{ breakLine:true, fontSize:7 } },
  { text:"Vì vậy, phần lớn nguy cơ nằm trong phạm vi nhà trường có thể tác động — qua khối lượng học tập, hỗ trợ tài chính và tham vấn tâm lý.", options:{ breakLine:true } },
  { text:" ", options:{ breakLine:true, fontSize:7 } },
  { text:"Chỉ cần đếm số yếu tố nguy cơ đã phân tầng được sinh viên từ 4,5% tới 98,6%.", options:{ italic:true, color:"9FD2E8" } },
], { x:8.62, y:2.4, w:3.8, h:2.9, fontSize:12.5, color:WHITE, margin:0, isTextBox:true,
     lineSpacing:17, valign:"top" });
card(s, 8.32, 5.66, 4.38, 0.9, WASH);
s.addText("Hướng phát triển: khảo sát lại trên sinh viên Việt Nam và theo dõi theo thời gian để kiểm tra chiều nhân quả.",
  { x:8.56, y:5.8, w:3.9, h:0.62, fontSize:10.5, color:NAVY, margin:0, isTextBox:true, lineSpacing:12.5 });
s.addNotes("Nhóm cũng muốn nói rõ về hạn chế. Quan trọng nhất: đây là dữ liệu cắt ngang nên mọi mối quan hệ đều là tương quan, không phải nhân quả. Ngoài ra nhãn trầm cảm là tự báo cáo, không phải chẩn đoán lâm sàng, và mẫu khảo sát ở Ấn Độ nên chưa thể suy rộng cho sinh viên Việt Nam. Kết luận chung: trầm cảm ở đây gắn với hoàn cảnh nhiều hơn là đặc điểm cá nhân — nghĩa là nhà trường thực sự có thể tác động.");

/* ========================= 20. THANKS ========================= */
pres.addSection({ title: "Kết thúc" });
s = pres.addSlide({ masterName:"TITLE_DARK", sectionTitle:"Kết thúc" });
s.addText("CẢM ƠN THẦY VÀ CÁC BẠN", { placeholder:"eyebrow" });
s.addText("Nhóm xin lắng nghe câu hỏi", { placeholder:"title" });
s.addText([
  { text:"Sản phẩm nộp kèm", options:{ bold:true, fontSize:15, color:WHITE, breakLine:true } },
  { text:"• student_depression_CLEANED.csv — tệp dữ liệu đã xử lý (27.901 dòng × 19 cột)", options:{ breakLine:true } },
  { text:"• Mã Python tiền xử lý, phân tích và vẽ biểu đồ", options:{ breakLine:true } },
  { text:"• Tệp trình bày này (.pptx)", options:{ breakLine:true } },
  { text:" ", options:{ breakLine:true, fontSize:8 } },
  { text:"Nguồn dữ liệu: Student Depression Dataset — Kaggle (hopesb)", options:{ fontSize:12, color:"8FB8D4" } },
], { placeholder:"body" });
s.addNotes("Nhóm xin hết phần trình bày. Sản phẩm nộp kèm gồm tệp dữ liệu đã xử lý, mã Python và tệp trình bày này. Nhóm xin lắng nghe câu hỏi của thầy và các bạn.");

/* ============================ WRITE ============================ */
const OUT = path.join(SB, 'Nhom_PhanTichTamLyHoc_StudentDepression.pptx');
(async () => {
  await pres.writeFile({ fileName: OUT });
  const { applyTheme } = require("/root/.claude/skills/synced/000e5172-5bba-4c86-81dd-02ace41d9979_84777485-5f0a-493e-9edf-1fcc6ead30de/pptx/scripts/apply_theme.js");
  await applyTheme(OUT, THEME);
  console.log("WROTE", OUT);
})();

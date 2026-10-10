const pptxgen = require('pptxgenjs');
const path = require('path');
const OUTDIR = "/tmp/claude-0/-home-user-about/7f9787d4-c743-5828-973b-7494043f4138/scratchpad/slides";

const THEME = { name:"Bai giang AI", headFontFace:"Cambria", bodyFontFace:"Calibri",
  colors:{ dk1:"16213A", lt1:"FFFFFF", dk2:"21295C", lt2:"EEF3F7",
    accent1:"065A82", accent2:"1C7293", accent3:"D03B3B",
    accent4:"1BAF7A", accent5:"2A78D6", accent6:"EDA100", hlink:"1C7293", folHlink:"6D7A8C" } };
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.theme  = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title  = "Bai giang: Ung dung AI trong phan tich du lieu";
pres.author = "Tai lieu giang day";
const W=13.33, H=7.5, M=0.62;
const NAVY="16213A", DEEP="065A82", TEAL="1C7293", RED="D03B3B", AQUA="1BAF7A",
      BLUE="2A78D6", AMBER="EDA100", WASH="EEF3F7", MUT="6D7A8C", WHITE="FFFFFF";

pres.defineSlideMaster({ title:"TITLE_DARK", background:{color:NAVY}, objects:[
  { placeholder:{ options:{ name:"eyebrow",type:"body",x:M+0.3,y:1.9,w:11.4,h:0.42,
      fontSize:15,color:"8FB8D4",bold:true,charSpacing:3,align:"left",isTextBox:true }, text:" " } },
  { placeholder:{ options:{ name:"title",type:"title",x:M+0.3,y:2.4,w:11.4,h:1.9,
      fontSize:40,bold:true,color:WHITE,valign:"top",align:"left",isTextBox:true }, text:" " } },
  { placeholder:{ options:{ name:"body",type:"body",x:M+0.3,y:4.45,w:11.4,h:2.2,
      fontSize:15,color:"C9DAE8",valign:"top",align:"left",isTextBox:true }, text:" " } } ] });
pres.defineSlideMaster({ title:"DIVIDER", background:{color:DEEP}, objects:[
  { placeholder:{ options:{ name:"eyebrow",type:"body",x:M+0.3,y:2.8,w:11.4,h:0.45,
      fontSize:16,color:"9FD2E8",bold:true,charSpacing:3,align:"left",isTextBox:true }, text:" " } },
  { placeholder:{ options:{ name:"title",type:"title",x:M+0.3,y:3.3,w:11.4,h:1.1,
      fontSize:36,bold:true,color:WHITE,align:"left",isTextBox:true }, text:" " } },
  { placeholder:{ options:{ name:"body",type:"body",x:M+0.3,y:4.45,w:11.4,h:0.9,
      fontSize:15,color:"C9E4F2",align:"left",isTextBox:true }, text:" " } } ] });
pres.defineSlideMaster({ title:"CONTENT", background:{color:WHITE}, objects:[
  { placeholder:{ options:{ name:"title",type:"title",x:M,y:0.42,w:12.1,h:0.72,
      fontSize:28,bold:true,color:NAVY,valign:"middle",align:"left",isTextBox:true }, text:" " } },
  { placeholder:{ options:{ name:"kicker",type:"body",x:M,y:1.14,w:12.1,h:0.42,
      fontSize:14,color:TEAL,bold:true,valign:"middle",align:"left",isTextBox:true }, text:" " } },
  { text:{ text:"Ứng dụng AI trong phân tích dữ liệu · Tài liệu giảng dạy",
      options:{ x:M,y:6.92,w:9.4,h:0.32,fontSize:10,color:MUT,isTextBox:true } } } ],
  slideNumber:{ x:12.3,y:6.92,w:0.6,h:0.32,fontSize:10,color:MUT,align:"right" } });

let nc=0, nd=0;
const card=(s,x,y,w,h,f)=>s.addShape(pres.ShapeType.roundRect,{x,y,w,h,
  fill:{color:f||WASH},rectRadius:0.1,line:{type:"none"},objectName:`c${++nc}`});
const dot=(s,x,y,d,col,t)=>{ s.addShape(pres.ShapeType.ellipse,{x,y,w:d,h:d,
  fill:{color:col},line:{type:"none"},objectName:`d${++nd}`});
  s.addText(t,{x,y,w:d,h:d,fontSize:14,bold:true,color:WHITE,align:"center",
  valign:"middle",margin:0,isTextBox:true}); };
const stat=(s,x,y,w,big,lbl,col)=>{
  s.addText(big,{x,y,w,h:0.78,fontSize:38,bold:true,color:col||DEEP,align:"center",
    valign:"middle",margin:0,isTextBox:true,fontFace:"Cambria"});
  s.addText(lbl,{x,y:y+0.74,w,h:0.56,fontSize:12.5,color:MUT,align:"center",
    valign:"top",margin:0,isTextBox:true}); };
// slide dang "the" 2 cot x N hang
const cards=(s,items,cols,y0,ch,gap)=>{
  const cw=(12.1-(cols-1)*0.3)/cols;
  items.forEach(([t,d,col],i)=>{
    const x=M+(i%cols)*(cw+0.3), y=y0+Math.floor(i/cols)*(ch+gap);
    card(s,x,y,cw,ch,WASH); dot(s,x+0.24,y+0.22,0.46,col,String(i+1));
    s.addText(t,{x:x+0.82,y:y+0.2,w:cw-1.06,h:0.5,fontSize:13.5,bold:true,color:NAVY,
      margin:0,valign:"middle",isTextBox:true,lineSpacing:15});
    s.addText(d,{x:x+0.24,y:y+0.8,w:cw-0.48,h:ch-0.98,fontSize:10.5,color:MUT,
      margin:0,isTextBox:true,lineSpacing:12.5});
  }); };


/* ── Logo HUTECH tren slide tieu de ── */
const _lp = path.join(__dirname, "img", "hutech_ngang.png");
function hutechBadge(sl) {
  sl.addShape(pres.ShapeType.roundRect, { x:M+0.3, y:0.52, w:2.62, h:0.78,
    fill:{color:"FFFFFF"}, rectRadius:0.08, line:{type:"none"}, objectName:"hutech_card" });
  sl.addImage({ path:_lp, x:M+0.44, y:0.68, w:2.34, h:0.46 });
}

/* ───── 1. TITLE ───── */
pres.addSection({title:"Mở đầu"});
let s=pres.addSlide({masterName:"TITLE_DARK",sectionTitle:"Mở đầu"});
hutechBadge(s);
s.addText("MÔN TRÍ TUỆ NHÂN TẠO ỨNG DỤNG",{placeholder:"eyebrow"});
s.addText("Ứng dụng AI trong phân tích dữ liệu",{placeholder:"title"});
s.addText([{text:"Bài giảng dành cho người mới bắt đầu — không yêu cầu kiến thức nền",
  options:{bold:true,fontSize:16,color:WHITE,breakLine:true}},
  {text:"6 buổi × 90 phút  ·  Mọi ví dụ lấy từ hai ca phân tích có thật",options:{fontSize:14}}],
  {placeholder:"body"});
s.addNotes("Chào cả lớp. Khóa học này dạy cách dùng trợ lý AI để làm một bài phân tích dữ liệu hoàn chỉnh. Điểm đặc biệt: mọi ví dụ đều lấy từ hai ca có thật, kể cả những lỗi mà AI đã mắc. Vì các em cần biết AI sai ở đâu, chứ không chỉ biết AI làm được gì.");

/* ───── 2. MỤC TIÊU ───── */
s=pres.addSlide({masterName:"CONTENT",sectionTitle:"Mở đầu"});
s.addText("Sau khóa học, bạn sẽ làm được gì",{placeholder:"title"});
s.addText("Năm năng lực tương ứng năm bước của quy trình",{placeholder:"kicker"});
cards(s,[
 ["Khám phá một bộ dữ liệu lạ","Biết hỏi AI đúng câu để hiểu dữ liệu có gì, biến nào quan trọng.",DEEP],
 ["Phát hiện và sửa lỗi dữ liệu","Nhận ra bảy nhóm lỗi phổ biến và quyết định xóa, sửa hay giữ.",TEAL],
 ["Vẽ biểu đồ đúng và đẹp","Chọn loại biểu đồ theo câu hỏi, nhờ AI sinh mã rồi tự chỉnh.",BLUE],
 ["Rút ra tri thức có giá trị","Phân biệt mô tả số liệu với tri thức thật sự dùng được.",AMBER],
 ["Phát hiện khi AI sai","Ba cái bẫy có thật và danh sách kiểm tra trước khi tin AI.",RED],
 ["Trình bày và chịu trách nhiệm","Kể câu chuyện dữ liệu, nêu hạn chế, dùng AI một cách trung thực.",AQUA],
],3,1.78,2.3,0.34);
s.addNotes("Đây là sáu năng lực cả lớp sẽ có sau khóa học. Thầy nhấn mạnh năng lực thứ năm — phát hiện khi AI sai. Đây là phần nhiều khóa học bỏ qua, nhưng lại là phần quyết định bài của các em có đáng tin hay không.");

/* ───── 3. AI LÀ GÌ ───── */
s=pres.addSlide({masterName:"CONTENT",sectionTitle:"Mở đầu"});
s.addText("Trợ lý AI thực chất là gì",{placeholder:"title"});
s.addText("Hiểu đúng bản chất thì mới dùng đúng cách",{placeholder:"kicker"});
card(s,M,1.76,12.1,1.45,NAVY);
s.addText([{text:"AI tạo sinh làm một việc duy nhất: ",options:{color:"C9DAE8"}},
 {text:"đoán đoạn văn bản tiếp theo hợp lý nhất",options:{bold:true,color:WHITE}},
 {text:" với những gì bạn vừa nhập vào.",options:{color:"C9DAE8"}}],
 {x:M+0.4,y:1.98,w:11.3,h:0.5,fontSize:17,margin:0,isTextBox:true,valign:"middle"});
s.addText("Nó không “hiểu” dữ liệu của bạn theo cách con người hiểu — nó nhận ra mẫu hình và tạo ra câu trả lời nghe hợp lý.",
 {x:M+0.4,y:2.52,w:11.3,h:0.5,fontSize:13.5,color:"A8C2D8",italic:true,margin:0,isTextBox:true});
card(s,M,3.42,5.86,3.3,WASH);
s.addText("AI LÀM TỐT",{x:M+0.3,y:3.62,w:5.2,h:0.32,fontSize:12,bold:true,color:AQUA,charSpacing:2,margin:0,isTextBox:true});
s.addText([["Mô tả cấu trúc dữ liệu"],["Gợi ý hướng phân tích"],["Viết mã Python, R"],["Giải thích khái niệm"],["Soạn bản nháp báo cáo"]]
 .map((b,i,a)=>({text:b[0],options:{bullet:{code:"25AA"},breakLine:i<a.length-1,paraSpaceAfter:9}})),
 {x:M+0.3,y:4.02,w:5.3,h:2.5,fontSize:13,color:NAVY,margin:0,isTextBox:true,lineSpacing:16});
card(s,6.84,3.42,5.86,3.3,WASH);
s.addText("KHÔNG ĐÁNG TIN",{x:7.14,y:3.62,w:5.2,h:0.32,fontSize:12,bold:true,color:RED,charSpacing:2,margin:0,isTextBox:true});
s.addText([["Tính toán số liệu chính xác"],["Đọc hết tệp dữ liệu lớn"],["Phán đoán nhân quả"],["Chịu trách nhiệm về kết quả"],["Tự biết mình đang sai"]]
 .map((b,i,a)=>({text:b[0],options:{bullet:{code:"25AA"},breakLine:i<a.length-1,paraSpaceAfter:9}})),
 {x:7.14,y:4.02,w:5.3,h:2.5,fontSize:13,color:NAVY,margin:0,isTextBox:true,lineSpacing:16});
s.addNotes("Hãy hình dung AI như một người cộng sự đọc rất nhiều, nhớ rất nhiều mẫu, luôn trả lời trôi chảy và tự tin — nhưng không có cách nào tự kiểm tra xem mình nói có đúng không. Rất hữu ích nếu biết dùng, rất nguy hiểm nếu tin tuyệt đối. Cột bên phải là phần các em phải tự làm.");

/* ───── 4. NGUYÊN TẮC VÀNG ───── */
s=pres.addSlide({masterName:"CONTENT",sectionTitle:"Mở đầu"});
s.addText("Nguyên tắc vàng của cả khóa học",{placeholder:"title"});
s.addText("Nếu chỉ nhớ một điều từ khóa học này, hãy nhớ điều sau",{placeholder:"kicker"});
card(s,M,1.9,12.1,1.5,DEEP);
s.addText("AI gợi ý — Người kiểm chứng",{x:M,y:2.1,w:12.1,h:1.1,fontSize:40,bold:true,
  color:WHITE,align:"center",valign:"middle",margin:0,isTextBox:true,fontFace:"Cambria"});
card(s,M,3.66,5.86,2.9,WASH);
s.addText("VAI CỦA AI",{x:M+0.3,y:3.86,w:5.2,h:0.32,fontSize:12,bold:true,color:TEAL,charSpacing:2,margin:0,isTextBox:true});
s.addText([["Khám phá nhanh"],["Gợi ý hướng đi"],["Viết mã"],["Giải thích khái niệm"]]
 .map((b,i,a)=>({text:b[0],options:{bullet:{code:"25AA"},breakLine:i<a.length-1,paraSpaceAfter:10}})),
 {x:M+0.3,y:4.26,w:5.3,h:2.1,fontSize:14,color:NAVY,margin:0,isTextBox:true,lineSpacing:17});
card(s,6.84,3.66,5.86,2.9,WASH);
s.addText("VAI CỦA BẠN",{x:7.14,y:3.86,w:5.2,h:0.32,fontSize:12,bold:true,color:RED,charSpacing:2,margin:0,isTextBox:true});
s.addText([["Chạy lại mã để kiểm chứng số"],["Quyết định hướng nào hợp lý"],["Đọc hiểu mã trước khi dùng"],["Chịu trách nhiệm cuối cùng"]]
 .map((b,i,a)=>({text:b[0],options:{bullet:{code:"25AA"},breakLine:i<a.length-1,paraSpaceAfter:10}})),
 {x:7.14,y:4.26,w:5.3,h:2.1,fontSize:14,color:NAVY,margin:0,isTextBox:true,lineSpacing:17});
s.addText("Quy tắc thực hành: mọi con số trong báo cáo phải do bạn chạy mã tạo ra, không phải do AI đọc hộ rồi bạn chép.",
 {x:M,y:6.66,w:12.1,h:0.36,fontSize:13,bold:true,color:DEEP,align:"center",margin:0,isTextBox:true});
s.addNotes("Đây là slide quan trọng nhất của buổi đầu. Thầy chia công việc thành hai vai rất rõ. Quy tắc thực hành ở dưới cùng: nếu một con số trong bài của em chỉ có nguồn gốc là AI nói thế, thì con số đó chưa đủ tin cậy để nộp.");

/* ───── 5. QUY TRÌNH 5 BƯỚC ───── */
s=pres.addSlide({masterName:"CONTENT",sectionTitle:"Mở đầu"});
s.addText("Quy trình năm bước",{placeholder:"title"});
s.addText("Xương sống của khóa học — mỗi bước là một buổi",{placeholder:"kicker"});
const steps=[["Khám phá","Hiểu bộ dữ liệu có gì: bao nhiêu dòng, bao nhiêu cột, mỗi cột nghĩa là gì",DEEP],
 ["Tiền xử lý","Phát hiện và sửa lỗi: khuyết, trùng, sai thang đo, nhãn rác",TEAL],
 ["Trực quan hóa","Vẽ biểu đồ để thấy quy luật mà bảng số không cho thấy",BLUE],
 ["Rút tri thức","Chuyển từ con số sang kết luận có ý nghĩa, rồi kiểm chứng",AMBER],
 ["Trình bày","Kể lại câu chuyện cho người khác hiểu, kèm hạn chế",AQUA]];
steps.forEach(([t,d,col],i)=>{
  const y=1.82+i*1.0; card(s,M,y,12.1,0.88,WASH); dot(s,M+0.28,y+0.2,0.48,col,String(i+1));
  s.addText(t,{x:M+0.96,y:y+0.06,w:2.9,h:0.36,fontSize:15,bold:true,color:NAVY,margin:0,valign:"middle",isTextBox:true});
  s.addText(d,{x:M+3.95,y:y+0.06,w:7.9,h:0.76,fontSize:12.5,color:MUT,margin:0,valign:"middle",isTextBox:true,lineSpacing:14});
});
s.addNotes("Năm bước này là xương sống của khóa học, mỗi bước ứng với một chương trong giáo trình. Lưu ý bước 4 — rút tri thức — là bước các em hay làm hời hợt nhất, chỉ đọc lại số liệu thay vì rút ra điều gì đó dùng được.");

/* ───── DIVIDER: BƯỚC 1–2 ───── */
pres.addSection({title:"Khám phá & Làm sạch"});
s=pres.addSlide({masterName:"DIVIDER",sectionTitle:"Khám phá & Làm sạch"});
s.addText("BƯỚC 1 VÀ 2",{placeholder:"eyebrow"});
s.addText("Khám phá và làm sạch dữ liệu",{placeholder:"title"});
s.addText("Phần tốn 60–80% thời gian của người làm dữ liệu chuyên nghiệp",{placeholder:"body"});
s.addNotes("Hai bước đầu gộp vào một phần vì chúng gắn chặt với nhau. Trong thực tế đây là phần chiếm nhiều thời gian nhất.");

/* ───── 7. BỐN LOẠI BIẾN ───── */
s=pres.addSlide({masterName:"CONTENT",sectionTitle:"Khám phá & Làm sạch"});
s.addText("Bốn loại biến — kiến thức nền quan trọng nhất",{placeholder:"title"});
s.addText("Biết biến thuộc loại nào quyết định bạn vẽ biểu đồ gì",{placeholder:"kicker"});
cards(s,[
 ["Biến số liên tục","Đo được, có giá trị lẻ. Tuổi 21,5 · điểm 7,85 · chiều cao.\nVẽ: biểu đồ phân bố.",DEEP],
 ["Biến phân loại","Tên gọi, không có thứ tự. Giới tính · thành phố · ngành học.\nVẽ: biểu đồ cột.",TEAL],
 ["Biến thứ bậc","Có thứ tự, khoảng cách không đều. Mức áp lực 1–5.\nVẽ: cột theo đúng thứ tự.",BLUE],
 ["Biến nhị phân","Chỉ hai giá trị. Có/Không · Nam/Nữ.\nThường mã hóa thành 1/0.",AQUA],
],2,1.8,2.1,0.36);
card(s,M,6.14,12.1,0.68,"FDF3E0");
s.addText([{text:"Bẫy thường gặp:  ",options:{bold:true,color:"A86F00"}},
 {text:"một biến ghi bằng chữ số chưa chắc là biến số. Mã vùng 024, 028 là con số nhưng thực chất là biến phân loại — lấy trung bình mã vùng là vô nghĩa.",options:{color:NAVY}}],
 {x:M+0.3,y:6.26,w:11.5,h:0.44,fontSize:12.5,margin:0,valign:"middle",isTextBox:true});
s.addNotes("Đây là kiến thức nền quan trọng nhất của buổi hai. Loại biến quyết định cả biểu đồ lẫn phép kiểm định. Thầy lưu ý cái bẫy ở dưới: nhiều em thấy cột toàn chữ số là lấy trung bình ngay, trong khi đó là mã định danh.");

/* ───── 8. CÂU LỆNH EDA ───── */
s=pres.addSlide({masterName:"CONTENT",sectionTitle:"Khám phá & Làm sạch"});
s.addText("Mẫu câu lệnh cho bước khám phá",{placeholder:"title"});
s.addText("Chép và dùng ngay — phần trong ngoặc vuông là chỗ bạn thay",{placeholder:"kicker"});
card(s,M,1.78,7.5,4.4,NAVY);
s.addText([
 {text:"Tôi đính kèm tệp [tên tệp].csv. Hãy giúp tôi khám phá\ndữ liệu này.",options:{breakLine:true}},
 {text:" ",options:{breakLine:true,fontSize:7}},
 {text:"Trả lời lần lượt các mục sau, mỗi mục một đoạn ngắn:",options:{breakLine:true}},
 {text:"1. Bộ dữ liệu có bao nhiêu dòng, bao nhiêu cột?",options:{breakLine:true}},
 {text:"2. Liệt kê từng cột: tên, kiểu dữ liệu, ý nghĩa.",options:{breakLine:true}},
 {text:"3. Cột nào có giá trị khuyết? Bao nhiêu phần trăm?",options:{breakLine:true}},
 {text:"4. Có dòng nào trùng lặp hoàn toàn không?",options:{breakLine:true}},
 {text:"5. Cột nào có giá trị ngoài thang đo hợp lý?",options:{breakLine:true}},
 {text:"6. Biến nào có thể dùng làm biến mục tiêu?",options:{breakLine:true}},
 {text:" ",options:{breakLine:true,fontSize:7}},
 {text:"Quan trọng: hãy viết kèm mã Python (pandas) cho từng\nmục, để tôi tự chạy lại và đối chiếu con số.",options:{color:"9FD2E8",bold:true}},
],{x:M+0.3,y:2.06,w:6.9,h:4.0,fontSize:13.5,color:"D7E5F0",
   margin:0,isTextBox:true,lineSpacing:19,valign:"top"});
card(s,8.5,1.78,4.2,4.4,WASH);
s.addText("VÌ SAO CÂU CUỐI QUAN TRỌNG NHẤT",{x:8.8,y:1.98,w:3.7,h:0.56,fontSize:11.5,bold:true,
  color:RED,charSpacing:1.5,margin:0,isTextBox:true,lineSpacing:14});
s.addText("Nó buộc AI đưa cho bạn công cụ kiểm chứng, thay vì chỉ đưa kết luận. Không có mã, bạn chỉ có thể tin hoặc không tin.",
  {x:8.8,y:2.66,w:3.7,h:1.3,fontSize:13,color:NAVY,margin:0,isTextBox:true,lineSpacing:15});
s.addText("BA CÂU HỎI NÊN HỎI TIẾP",{x:8.8,y:4.16,w:3.7,h:0.3,fontSize:11.5,bold:true,
  color:TEAL,charSpacing:1.5,margin:0,isTextBox:true});
s.addText([["Liệt kê giá trị duy nhất của cột X kèm số lần xuất hiện"],
 ["Cột nào có một giá trị chiếm trên 95% số dòng?"],["Có cặp cột nào gần như trùng nhau không?"]]
 .map((b,i,a)=>({text:b[0],options:{bullet:{code:"25AA"},breakLine:i<a.length-1,paraSpaceAfter:8}})),
 {x:8.8,y:4.54,w:3.7,h:1.5,fontSize:11.5,color:MUT,margin:0,isTextBox:true,lineSpacing:13});
s.addNotes("Đây là mẫu câu lệnh các em chép về dùng ngay. Thầy nhấn mạnh câu cuối cùng — yêu cầu AI viết kèm mã Python. Đó là điểm khác biệt giữa một người dùng AI nghiêm túc và một người chỉ hỏi cho có.");

/* ───── 9. BẢY LỖI DỮ LIỆU ───── */
s=pres.addSlide({masterName:"CONTENT",sectionTitle:"Khám phá & Làm sạch"});
s.addText("Bảy lỗi dữ liệu thường gặp",{placeholder:"title"});
s.addText("Dùng như danh sách kiểm tra mỗi khi nhận bộ dữ liệu mới",{placeholder:"kicker"});
const errs=[["Giá trị khuyết","Ô trống, NaN. Dưới 5% thì điền bằng trung vị."],
 ["Bản ghi trùng","Hai dòng giống hệt. Trùng hoàn toàn thì xóa."],
 ["Cột gần như hằng số","Một giá trị chiếm trên 95%. Thường nên bỏ."],
 ["Giá trị ngoài thang đo","Thang 1–5 mà có số 0. Chuyển thành khuyết."],
 ["Giá trị bất khả thi","Tuổi 200, cân nặng âm. Đối chiếu thực tế."],
 ["Chữ hoa/thường lẫn lộn","“Asian” và “asian” bị coi là hai nhóm."],
 ["Lỗi nhập liệu, lạc chỗ","Tên người lọt vào cột Thành phố."]];
errs.forEach(([t,d],i)=>{
  const y=1.76+i*0.73; card(s,M,y,12.1,0.62,i%2?WHITE:WASH);
  s.addShape(pres.ShapeType.ellipse,{x:M+0.24,y:y+0.21,w:0.2,h:0.2,
    fill:{color:[DEEP,TEAL,AMBER,BLUE,AMBER,TEAL,RED][i]},line:{type:"none"},objectName:`e${i}`});
  s.addText(`${i+1}. ${t}`,{x:M+0.58,y:y+0.05,w:3.9,h:0.52,fontSize:13,bold:true,color:NAVY,margin:0,valign:"middle",isTextBox:true});
  s.addText(d,{x:M+4.6,y:y+0.05,w:7.2,h:0.52,fontSize:12,color:MUT,margin:0,valign:"middle",isTextBox:true});
});
s.addNotes("Bảy nhóm lỗi này bao phủ gần như toàn bộ vấn đề các em sẽ gặp. Thầy khuyên in bảng này ra, mỗi lần nhận bộ dữ liệu mới thì rà lần lượt từ 1 đến 7. Lỗi số 7 là lỗi khó phát hiện nhất, slide sau có ca thật.");

/* ───── 10. CA THẬT: CỘT THÀNH PHỐ ───── */
s=pres.addSlide({masterName:"CONTENT",sectionTitle:"Khám phá & Làm sạch"});
s.addText("Ca thật: bộ dữ liệu “sạch” hóa ra không sạch",{placeholder:"title"});
s.addText("Student Depression — 27.901 sinh viên · 0 ô trùng · chỉ 3 ô khuyết",{placeholder:"kicker"});
card(s,M,1.78,6.2,2.2,WASH);
s.addText("Nhìn qua rất sạch",{x:M+0.3,y:1.96,w:5.6,h:0.32,fontSize:13,bold:true,color:AQUA,margin:0,isTextBox:true});
s.addText("27.901 dòng × 18 cột · chỉ 3 ô khuyết (0,01%) · 0 dòng trùng lặp.\nNhiều người sẽ phân tích luôn ở bước này.",
 {x:M+0.3,y:2.32,w:5.6,h:1.3,fontSize:12.5,color:NAVY,margin:0,isTextBox:true,lineSpacing:15});
card(s,M,4.2,6.2,2.6,NAVY);
s.addText("Nhưng khi hỏi AI liệt kê giá trị hiếm của cột City:",
 {x:M+0.3,y:4.38,w:5.6,h:0.3,fontSize:11.5,color:"9FD2E8",bold:true,margin:0,isTextBox:true});
s.addText("{'Saanvi': 2, 'Bhavna': 2, 'Harsha': 2,\n 'M.Tech': 1, 'Less Delhi': 1, '3.0': 1,\n 'Less than 5 Kalyan': 1, 'Gaurav': 1,\n 'Reyansh': 1, 'ME': 1, 'M.Com': 1, ...}",
 {x:M+0.3,y:4.8,w:5.6,h:1.8,fontSize:11,color:"D7E5F0",fontFace:"Consolas",margin:0,isTextBox:true,lineSpacing:15});
card(s,7.12,1.78,5.58,5.02,WASH);
s.addText("BA LOẠI RÁC TRONG CÙNG MỘT CỘT",{x:7.42,y:1.98,w:5.0,h:0.3,fontSize:11.5,bold:true,color:RED,charSpacing:1.5,margin:0,isTextBox:true});
[["Tên người","Saanvi, Bhavna, Gaurav, Reyansh — tên riêng, không phải thành phố.",RED],
 ["Mã bằng cấp","M.Tech, M.Com, ME — thuộc cột Degree, bị lạc sang.",AMBER],
 ["Chuỗi lỗi ghép","“Less Delhi”, “Less than 5 Kalyan” — giá trị cột Sleep Duration dính vào tên thành phố.",TEAL]]
.forEach(([t,d,col],i)=>{
  const y=2.44+i*1.3;
  s.addShape(pres.ShapeType.ellipse,{x:7.42,y:y+0.05,w:0.2,h:0.2,fill:{color:col},line:{type:"none"},objectName:`r${i}`});
  s.addText(t,{x:7.74,y:y-0.02,w:4.6,h:0.3,fontSize:13,bold:true,color:NAVY,margin:0,isTextBox:true});
  s.addText(d,{x:7.74,y:y+0.3,w:4.7,h:0.86,fontSize:11.5,color:MUT,margin:0,isTextBox:true,lineSpacing:13.5});
});
s.addText("Chỉ 26 ô rác trên 27.901 dòng (0,09%) — nhưng tiết lộ quy trình thu thập có lỗi hệ thống.",
 {x:7.42,y:6.3,w:5.0,h:0.42,fontSize:11,italic:true,color:DEEP,margin:0,isTextBox:true,lineSpacing:13});
s.addNotes("Đây là ca thật. Bộ dữ liệu nhìn rất sạch nên rất dễ bỏ qua. Nhưng chỉ cần một câu hỏi — liệt kê giá trị hiếm của cột City — là lộ ra ba loại rác. Chuỗi Less Delhi và Less than 5 Kalyan là dấu hiệu điển hình của lỗi lệch cột khi nhập liệu. Bài học: một bộ dữ liệu không khuyết không trùng chưa chắc là sạch.");

/* ───── DIVIDER: BƯỚC 3–4 ───── */
pres.addSection({title:"Biểu đồ & Tri thức"});
s=pres.addSlide({masterName:"DIVIDER",sectionTitle:"Biểu đồ & Tri thức"});
s.addText("BƯỚC 3 VÀ 4",{placeholder:"eyebrow"});
s.addText("Trực quan hóa và rút ra tri thức",{placeholder:"title"});
s.addText("Từ bảng số khô khan đến kết luận mà người khác hành động được",{placeholder:"body"});
s.addNotes("Hai bước tiếp theo: vẽ biểu đồ và rút tri thức.");

/* ───── 12. CHỌN BIỂU ĐỒ ───── */
s=pres.addSlide({masterName:"CONTENT",sectionTitle:"Biểu đồ & Tri thức"});
s.addText("Chọn biểu đồ theo câu hỏi, không theo sở thích",{placeholder:"title"});
s.addText("Xuất phát từ điều bạn muốn trả lời, rồi tra bảng",{placeholder:"kicker"});
const chartmap=[["Biến này phân bố thế nào?","Histogram",DEEP],
 ["So sánh giữa các nhóm","Biểu đồ cột",TEAL],
 ["Xếp hạng nhiều mục","Cột ngang",BLUE],
 ["Hai biến số có liên hệ không?","Biểu đồ phân tán",AMBER],
 ["Thay đổi theo thời gian","Biểu đồ đường",AQUA],
 ["Giao của hai biến phân loại","Biểu đồ nhiệt",TEAL],
 ["Một con số quan trọng","Không cần biểu đồ — in số to",RED]];
chartmap.forEach(([q,c,col],i)=>{
  const y=1.78+i*0.72; card(s,M,y,12.1,0.6,i%2?WHITE:WASH);
  s.addShape(pres.ShapeType.ellipse,{x:M+0.24,y:y+0.2,w:0.2,h:0.2,fill:{color:col},line:{type:"none"},objectName:`q${i}`});
  s.addText(q,{x:M+0.58,y:y+0.04,w:6.6,h:0.52,fontSize:13,color:NAVY,margin:0,valign:"middle",isTextBox:true});
  s.addText("→  "+c,{x:M+7.3,y:y+0.04,w:4.5,h:0.52,fontSize:13,bold:true,color:col,margin:0,valign:"middle",isTextBox:true});
});
s.addText("Tránh biểu đồ tròn khi có quá ba phần — mắt người rất kém trong việc so sánh diện tích hình quạt.",
 {x:M,y:6.9,w:12.1,h:0.3,fontSize:11.5,italic:true,color:MUT,margin:0,isTextBox:true});
s.addNotes("Bảng tra này giải quyết câu hỏi các em hay vướng nhất: nên vẽ biểu đồ gì. Nguyên tắc là đi từ câu hỏi, không đi từ sở thích. Dòng cuối cùng rất hay bị quên: đôi khi câu trả lời tốt nhất không phải biểu đồ mà là in con số thật to.");

/* ───── 13. SÁU NGUYÊN TẮC ───── */
s=pres.addSlide({masterName:"CONTENT",sectionTitle:"Biểu đồ & Tri thức"});
s.addText("Sáu nguyên tắc của một biểu đồ tốt",{placeholder:"title"});
s.addText("Một biểu đồ tồi che giấu hoặc bóp méo sự thật",{placeholder:"kicker"});
cards(s,[
 ["Tiêu đề nói kết luận","Viết “Áp lực tăng thì tỷ lệ trầm cảm tăng”, đừng viết “Biểu đồ cột áp lực”.",DEEP],
 ["Trục tung bắt đầu từ 0","Cắt trục làm phóng đại chênh lệch — cách bóp méo phổ biến nhất.",RED],
 ["Ghi nhãn trực tiếp lên cột","Đừng bắt người đọc dóng mắt sang trục để đoán giá trị.",TEAL],
 ["Màu mang ý nghĩa","Nếu đỏ nghĩa là “xấu” thì phải nhất quán ở mọi biểu đồ.",BLUE],
 ["Màu không mâu thuẫn số liệu","Quan hệ không tăng đều mà tô màu tăng dần thì người đọc hiểu sai.",AMBER],
 ["Ghi rõ cỡ mẫu","Cột dựa trên 6 người và cột dựa trên 600 người không cùng độ tin cậy.",AQUA],
],3,1.8,2.25,0.34);
card(s,M,6.5,12.1,0.68,"FDF3E0");
s.addText([{text:"Ca thật cho nguyên tắc 5:  ",options:{bold:true,color:"A86F00"}},
 {text:"thời lượng ngủ có quan hệ KHÔNG tuyến tính — nhóm ngủ 7–8 giờ lại có tỷ lệ cao hơn nhóm ngủ 5–6 giờ. Tô màu đỏ→xanh theo số giờ thì màu nói một đằng, cột nói một nẻo.",options:{color:NAVY}}],
 {x:M+0.3,y:6.6,w:11.5,h:0.48,fontSize:12,margin:0,valign:"middle",isTextBox:true,lineSpacing:14});
s.addNotes("Sáu nguyên tắc này đủ để biểu đồ của các em trông chuyên nghiệp. Nguyên tắc 2 là nguyên tắc hay bị vi phạm nhất, kể cả trên báo chí. Nguyên tắc 5 thì rất tinh tế — thầy gặp đúng tình huống này khi vẽ biểu đồ giấc ngủ, phải đổi cách tô màu.");

/* ───── 14. TRI THỨC LÀ GÌ ───── */
s=pres.addSlide({masterName:"CONTENT",sectionTitle:"Biểu đồ & Tri thức"});
s.addText("Tri thức khác gì với mô tả số liệu",{placeholder:"title"});
s.addText("Nhiều bài chỉ dừng ở mô tả — đó chưa phải tri thức",{placeholder:"kicker"});
[["Mô tả số liệu","Nêu lại điều đã có trong bảng","“Tỷ lệ trầm cảm ở mức áp lực 5 là 86,1%.”",MUT],
 ["So sánh","Đặt hai con số cạnh nhau","“Mức áp lực 5 cao hơn mức 1 tới 67 điểm phần trăm.”",TEAL],
 ["Tri thức","Nêu điều bất ngờ hoặc hành động được","“Áp lực học tập liên quan mạnh hơn hẳn tiền sử gia đình — phần lớn nguy cơ nằm trong tầm can thiệp của nhà trường.”",AQUA]]
.forEach(([t,d,ex,col],i)=>{
  const y=1.8+i*1.45; card(s,M,y,12.1,1.3,WASH);
  s.addShape(pres.ShapeType.ellipse,{x:M+0.26,y:y+0.24,w:0.46,h:0.46,fill:{color:col},line:{type:"none"},objectName:`k${i}`});
  s.addText(String(i+1),{x:M+0.26,y:y+0.24,w:0.46,h:0.46,fontSize:14,bold:true,color:WHITE,align:"center",valign:"middle",margin:0,isTextBox:true});
  s.addText(t,{x:M+0.88,y:y+0.16,w:2.4,h:0.34,fontSize:14.5,bold:true,color:NAVY,margin:0,isTextBox:true});
  s.addText(d,{x:M+0.88,y:y+0.52,w:2.6,h:0.6,fontSize:11,color:MUT,margin:0,isTextBox:true,lineSpacing:13});
  s.addText(ex,{x:M+3.7,y:y+0.2,w:8.1,h:0.94,fontSize:12.5,italic:true,color:NAVY,margin:0,valign:"middle",isTextBox:true,lineSpacing:15});
});
card(s,M,6.2,12.1,0.76,NAVY);
s.addText("Ba câu hỏi kiểm tra:   Điều này có đi ngược điều người ta thường nghĩ không?   ·   Ai sẽ làm khác đi điều gì?   ·   Có đúng khi chia nhỏ dữ liệu không?",
 {x:M+0.3,y:6.32,w:11.5,h:0.52,fontSize:12.5,color:"C9DAE8",margin:0,valign:"middle",isTextBox:true,lineSpacing:14});
s.addNotes("Đây là thang ba mức. Rất nhiều bài chỉ dừng ở mức 1, đọc lại con số trong bảng. Mức 3 mới là thứ giảng viên muốn thấy. Ví dụ ở mức 3 là một phát hiện thật: điểm học tập gần như không liên quan đến trầm cảm, hệ số chỉ 0,022 — đi ngược hẳn trực giác học giỏi thì ổn.");

/* ───── DIVIDER: KHI AI SAI ───── */
pres.addSection({title:"Khi AI sai"});
s=pres.addSlide({masterName:"DIVIDER",sectionTitle:"Khi AI sai"});
s.addText("PHẦN QUAN TRỌNG NHẤT",{placeholder:"eyebrow"});
s.addText("Ba cái bẫy có thật",{placeholder:"title"});
s.addText("Không phải tình huống giả định — đây là ba lỗi đã xảy ra thật khi chuẩn bị tài liệu này",{placeholder:"body"});
s.addNotes("Phần này là lý do khóa học tồn tại. Ba lỗi sau đây thầy đã mắc thật trong quá trình chuẩn bị các ca phân tích.");

/* ───── 16. BẪY 1 ───── */
s=pres.addSlide({masterName:"CONTENT",sectionTitle:"Khi AI sai"});
s.addText("Bẫy 1 — AI đọc sai con số",{placeholder:"title"});
s.addText("Sai 0,1 điểm phần trăm, nhưng đủ để sập toàn bộ độ tin cậy của bài",{placeholder:"kicker"});
card(s,M,1.8,5.9,2.1,WASH);
s.addText("AI BÁO CÁO",{x:M+0.3,y:2.0,w:5.3,h:0.3,fontSize:11.5,bold:true,color:RED,charSpacing:2,margin:0,isTextBox:true});
s.addText("58,6%",{x:M+0.3,y:2.34,w:5.3,h:0.9,fontSize:54,bold:true,color:RED,margin:0,isTextBox:true,fontFace:"Cambria"});
s.addText("Con số này đã được đưa vào 5 chỗ: tiêu đề slide, biểu đồ, phần ghi chú…",
 {x:M+0.3,y:3.24,w:5.3,h:0.56,fontSize:12,color:MUT,margin:0,isTextBox:true,lineSpacing:14});
card(s,6.82,1.8,5.88,2.1,WASH);
s.addText("CHẠY LẠI BẰNG PYTHON",{x:7.12,y:2.0,w:5.3,h:0.3,fontSize:11.5,bold:true,color:AQUA,charSpacing:2,margin:0,isTextBox:true});
s.addText("58,5%",{x:7.12,y:2.34,w:5.3,h:0.9,fontSize:54,bold:true,color:AQUA,margin:0,isTextBox:true,fontFace:"Cambria"});
s.addText("Giá trị đúng. AI đã làm tròn hai lần: 58,549 → 58,55 → 58,6.",
 {x:7.12,y:3.24,w:5.3,h:0.56,fontSize:12,color:MUT,margin:0,isTextBox:true,lineSpacing:14});
card(s,M,4.12,12.1,1.52,NAVY);
s.addText(">>> 16336 / 27901 * 100\n58.549872764417046\n\n>>> f\"{16336/27901*100:.1f}\"\n'58.5'",
 {x:M+0.4,y:4.3,w:11.3,h:1.2,fontSize:12.5,color:"D7E5F0",fontFace:"Consolas",margin:0,isTextBox:true,lineSpacing:16});
card(s,M,5.88,12.1,0.86,"EAF7F0");
s.addText([{text:"Cách phòng:  ",options:{bold:true,color:"0E7A52"}},
 {text:"viết một đoạn mã kiểm chứng in ra MỌI con số bạn định trích dẫn, rồi đối chiếu từng con số với bài viết trước khi nộp. Mất 10 phút, cứu cả bài.",options:{color:NAVY}}],
 {x:M+0.3,y:6.02,w:11.5,h:0.6,fontSize:13,margin:0,valign:"middle",isTextBox:true,lineSpacing:15});
s.addNotes("Đây là lỗi thật. AI báo 58,6%, con số đó lan ra năm chỗ trong bài. Khi chạy lại bằng Python thì giá trị đúng là 58,5%. Nguyên nhân: AI làm tròn hai lần. Sai số chỉ 0,1 điểm, nhưng nếu giảng viên tự bấm máy kiểm tra thì toàn bộ bài mất uy tín. Cách phòng ở dưới cùng — các em nhớ viết đoạn mã kiểm chứng.");

/* ───── 17. BẪY 2 ───── */
s=pres.addSlide({masterName:"CONTENT",sectionTitle:"Khi AI sai"});
s.addText("Bẫy 2 — Rò rỉ nhãn",{placeholder:"title"});
s.addText("Mô hình chính xác gần như tuyệt đối. Đáng mừng hay đáng ngờ?",{placeholder:"kicker"});
card(s,M,1.78,6.5,3.1,WASH);
s.addText("BẢNG CHÉO: ĐIỂM SÀNG LỌC × NHÃN",{x:M+0.3,y:1.96,w:5.9,h:0.3,fontSize:11.5,bold:true,color:DEEP,charSpacing:1.5,margin:0,isTextBox:true});
[["0 – 3 điểm","484 trẻ","TOÀN BỘ mang nhãn “không có dấu hiệu”",AQUA],
 ["4 – 10 điểm","724 trẻ","TOÀN BỘ mang nhãn “có dấu hiệu”",RED]].forEach(([a,b,c,col],i)=>{
  const y=2.36+i*1.14; card(s,M+0.3,y,5.9,1.0,WHITE);
  s.addText(a,{x:M+0.52,y:y+0.1,w:1.9,h:0.34,fontSize:14,bold:true,color:col,margin:0,isTextBox:true});
  s.addText(b,{x:M+2.5,y:y+0.1,w:1.4,h:0.34,fontSize:13,color:MUT,margin:0,isTextBox:true});
  s.addText(c,{x:M+0.52,y:y+0.46,w:5.5,h:0.44,fontSize:12,color:NAVY,margin:0,isTextBox:true,lineSpacing:14});
});
s.addText("Không một ngoại lệ nào.",{x:M+0.3,y:4.58,w:5.9,h:0.28,fontSize:12.5,bold:true,italic:true,color:RED,margin:0,isTextBox:true});
card(s,7.42,1.78,5.28,3.1,NAVY);
s.addText("NGUYÊN NHÂN",{x:7.72,y:1.98,w:4.7,h:0.3,fontSize:11.5,bold:true,color:"9FD2E8",charSpacing:2,margin:0,isTextBox:true});
s.addText("Nhãn không phải chẩn đoán độc lập của bác sĩ. Nó chính là đầu ra của công thức chấm điểm: ai đạt từ 4 điểm trở lên thì bị gán nhãn “có dấu hiệu”.",
 {x:7.72,y:2.36,w:4.7,h:1.4,fontSize:13,color:"D7E5F0",margin:0,isTextBox:true,lineSpacing:16});
s.addText("Dùng A1–A10 để dự báo nhãn chẳng khác nào lấy đáp án đi dự đoán đáp án.",
 {x:7.72,y:3.86,w:4.7,h:0.84,fontSize:13,bold:true,italic:true,color:WHITE,margin:0,isTextBox:true,lineSpacing:16});
card(s,M,5.1,12.1,0.8,"FDF3E0");
s.addText([{text:"Dấu hiệu nhận biết:  ",options:{bold:true,color:"A86F00"}},
 {text:"mô hình chính xác bất thường — trên 95% — trong một bài toán vốn khó.",options:{color:NAVY}}],
 {x:M+0.3,y:5.24,w:11.5,h:0.52,fontSize:13,margin:0,valign:"middle",isTextBox:true});
card(s,M,6.06,12.1,0.8,"EAF7F0");
s.addText([{text:"Cách phòng:  ",options:{bold:true,color:"0E7A52"}},
 {text:"khi mô hình cho kết quả đẹp bất ngờ, đừng mừng — hãy nghi ngờ. Lập bảng chéo giữa biến dự báo và nhãn để xem có quan hệ xác định hay không.",options:{color:NAVY}}],
 {x:M+0.3,y:6.2,w:11.5,h:0.52,fontSize:13,margin:0,valign:"middle",isTextBox:true});
s.addNotes("Bẫy thứ hai tinh vi hơn. Mô hình đạt độ chính xác gần tuyệt đối — nghe thì mừng, nhưng trong bài toán dự báo tự kỷ thì đó là điều bất thường. Lập bảng chéo ra mới thấy nhãn chính là đầu ra của công thức chấm điểm. Đây gọi là rò rỉ nhãn, tiếng Anh là label leakage.");

/* ───── 18. BẪY 3 ───── */
s=pres.addSlide({masterName:"CONTENT",sectionTitle:"Khi AI sai"});
s.addText("Bẫy 3 — Biến nhân bản",{placeholder:"title"});
s.addText("Bảy cột bệnh đi kèm trông như mỏ vàng để phân tích",{placeholder:"kicker"});
card(s,M,1.78,5.6,2.3,WASH);
s.addText("BẢY CỘT TRONG DỮ LIỆU",{x:M+0.3,y:1.96,w:5.0,h:0.3,fontSize:11.5,bold:true,color:DEEP,charSpacing:1.5,margin:0,isTextBox:true});
s.addText("Chậm nói · Khó học · Chậm phát triển trí tuệ · Vấn đề hành vi · Lo âu · Trầm cảm · Rối loạn gen",
 {x:M+0.3,y:2.34,w:5.0,h:1.5,fontSize:13.5,color:NAVY,margin:0,isTextBox:true,lineSpacing:17});
card(s,6.52,1.78,6.18,2.3,NAVY);
s.addText("NHƯNG TÍNH TƯƠNG QUAN RA",{x:6.82,y:1.96,w:5.6,h:0.3,fontSize:11.5,bold:true,color:"9FD2E8",charSpacing:1.5,margin:0,isTextBox:true});
[["0,88 – 1,00","tương quan giữa các cặp"],["95,6 – 99,9%","trùng khớp từng cặp"],
 ["95,3%","trẻ có cả bảy hoặc không có cái nào"]].forEach(([a,b],i)=>{
  const y=2.36+i*0.55;
  s.addText(a,{x:6.82,y,w:1.9,h:0.42,fontSize:17,bold:true,color:WHITE,margin:0,valign:"middle",isTextBox:true,fontFace:"Cambria"});
  s.addText(b,{x:8.82,y,w:3.7,h:0.42,fontSize:12,color:"A8C2D8",margin:0,valign:"middle",isTextBox:true});
});
card(s,M,4.3,12.1,1.5,WASH);
s.addText("Bảy chẩn đoán lâm sàng độc lập không bao giờ trùng nhau tới 99,9%",
 {x:M+0.3,y:4.46,w:11.5,h:0.42,fontSize:17,bold:true,color:NAVY,margin:0,isTextBox:true});
s.addText("Chậm nói và rối loạn gen là hai thứ hoàn toàn khác nhau, tỷ lệ mắc khác nhau. Kết luận: bảy cột này thực chất là MỘT biến được sao chép bảy lần, có thêm chút nhiễu. Mọi kết luận kiểu “85,8% trẻ tự kỷ có chậm phát triển trí tuệ” rút ra từ đây đều vô giá trị.",
 {x:M+0.3,y:4.92,w:11.5,h:0.78,fontSize:12.5,color:MUT,margin:0,isTextBox:true,lineSpacing:15});
card(s,M,6.02,12.1,0.8,"EAF7F0");
s.addText([{text:"Cách phòng:  ",options:{bold:true,color:"0E7A52"}},
 {text:"trước khi phân tích, luôn in ma trận tương quan giữa các biến. Cặp nào có hệ số trên 0,95 thì phải kiểm tra xem có phải bản sao không.",options:{color:NAVY}}],
 {x:M+0.3,y:6.16,w:11.5,h:0.52,fontSize:13,margin:0,valign:"middle",isTextBox:true});
s.addNotes("Bẫy thứ ba. Bảy cột bệnh đi kèm nhìn như mỏ vàng — có thể viết cả một chương về bệnh đi kèm ở trẻ tự kỷ. Nhưng tương quan giữa chúng lên tới 0,998, trùng khớp 99,9%. Về lâm sàng là bất khả thi. Đây là một biến được sao chép bảy lần.");

/* ───── 19. CHECKLIST ───── */
s=pres.addSlide({masterName:"CONTENT",sectionTitle:"Khi AI sai"});
s.addText("Danh sách kiểm tra trước khi tin AI",{placeholder:"title"});
s.addText("Dùng cho mọi kết quả AI đưa ra, trước khi đưa vào báo cáo",{placeholder:"kicker"});
const chk=[["Con số đã được chạy lại chưa?","Mọi số trong bài phải do mã của bạn tạo ra."],
 ["Kết quả có đẹp bất thường không?","Trên 95% trong bài toán khó = nghi rò rỉ nhãn."],
 ["Các biến có bị trùng nhau không?","In ma trận tương quan, soi cặp trên 0,95."],
 ["Có dùng từ chỉ nhân quả không?","Đổi “gây ra” thành “liên quan đến”."],
 ["Cỡ mẫu từng nhóm có đủ lớn không?","Nhóm dưới 30 quan sát thì kết luận rất yếu."],
 ["Tỷ lệ nền có hợp lý không?","Vàng da sơ sinh 92% là bất thường."],
 ["AI có bỏ sót cách giải thích khác?","Hỏi thẳng: “Có cách giải thích nào khác không?”"]];
chk.forEach(([q,w],i)=>{
  const y=1.76+i*0.73; card(s,M,y,12.1,0.62,i%2?WHITE:WASH);
  dot(s,M+0.22,y+0.1,0.42,[DEEP,RED,TEAL,AMBER,BLUE,AQUA,TEAL][i],String(i+1));
  s.addText(q,{x:M+0.8,y:y+0.04,w:5.5,h:0.54,fontSize:13,bold:true,color:NAVY,margin:0,valign:"middle",isTextBox:true});
  s.addText(w,{x:M+6.4,y:y+0.04,w:5.4,h:0.54,fontSize:11.5,color:MUT,margin:0,valign:"middle",isTextBox:true});
});
s.addNotes("Bảy câu hỏi này là công cụ hằng ngày. Thầy khuyên in ra dán cạnh máy tính. Trước khi đưa bất cứ kết quả nào của AI vào báo cáo, chạy qua bảy câu này.");

/* ───── DIVIDER: TRÌNH BÀY ───── */
pres.addSection({title:"Trình bày & Đạo đức"});
s=pres.addSlide({masterName:"DIVIDER",sectionTitle:"Trình bày & Đạo đức"});
s.addText("BƯỚC 5",{placeholder:"eyebrow"});
s.addText("Trình bày kết quả và đạo đức",{placeholder:"title"});
s.addText("Phân tích xuất sắc mà trình bày kém thì người nghe không nhận được gì",{placeholder:"body"});
s.addNotes("Bước cuối: trình bày, và phần trách nhiệm khi làm việc với dữ liệu con người.");

/* ───── 21. NÊU HẠN CHẾ ───── */
s=pres.addSlide({masterName:"CONTENT",sectionTitle:"Trình bày & Đạo đức"});
s.addText("Nêu hạn chế là phần làm bài mạnh lên, không yếu đi",{placeholder:"title"});
s.addText("Bốn hạn chế gần như luôn phải nêu với dữ liệu khảo sát",{placeholder:"kicker"});
cards(s,[
 ["Thiết kế cắt ngang","Dữ liệu thu tại một thời điểm → không kết luận được chiều nhân quả.",DEEP],
 ["Dữ liệu tự báo cáo","Người trả lời tự đánh giá → có thể lệch. Không phải chẩn đoán lâm sàng.",TEAL],
 ["Mẫu không đại diện","Mẫu đến khám, mẫu tình nguyện → tỷ lệ trong mẫu không phải tỷ lệ dân số.",AMBER],
 ["Giới hạn bối cảnh","Khảo sát ở nước khác, thời điểm khác → không suy rộng cho Việt Nam.",RED],
],2,1.8,1.85,0.34);
card(s,M,5.76,12.1,1.0,NAVY);
s.addText([{text:"Mẹo:  ",options:{bold:true,color:"9FD2E8"}},
 {text:"nếu giảng viên hỏi được một câu khiến bạn lúng túng, rất có thể đó chính là hạn chế lẽ ra bạn nên tự nêu trước. Nêu trước thì đó là sự cẩn trọng; để người khác chỉ ra thì đó là lỗ hổng.",options:{color:"D7E5F0"}}],
 {x:M+0.4,y:5.94,w:11.3,h:0.68,fontSize:13.5,margin:0,valign:"middle",isTextBox:true,lineSpacing:17});
s.addNotes("Nhiều em bỏ qua phần hạn chế vì sợ làm bài yếu đi. Thực tế ngược lại. Nêu đúng hạn chế cho thấy em hiểu dữ liệu sâu hơn người chỉ đưa kết luận. Và nó chặn trước câu hỏi khó của giảng viên.");

/* ───── 22. ĐẠO ĐỨC + LIÊM CHÍNH ───── */
s=pres.addSlide({masterName:"CONTENT",sectionTitle:"Trình bày & Đạo đức"});
s.addText("Đạo đức và liêm chính học thuật",{placeholder:"title"});
s.addText("Đằng sau mỗi dòng dữ liệu là một con người",{placeholder:"kicker"});
card(s,M,1.78,5.9,4.6,WASH);
s.addText("VỚI DỮ LIỆU TÂM LÝ",{x:M+0.3,y:1.98,w:5.3,h:0.3,fontSize:11.5,bold:true,color:RED,charSpacing:2,margin:0,isTextBox:true});
s.addText([["Không bao giờ coi kết quả sàng lọc là chẩn đoán"],
 ["Không nêu danh tính — ghép nhiều biến vẫn có thể truy ra cá nhân"],
 ["Báo cáo về ý định tự tử một cách điềm tĩnh, không giật gân"],
 ["Phân tích nhóm không áp dụng được cho một người cụ thể"],
 ["Gặp trường hợp nguy cấp thì chuyển ngay cho chuyên gia"]]
 .map((b,i,a)=>({text:b[0],options:{bullet:{code:"25AA"},breakLine:i<a.length-1,paraSpaceAfter:11}})),
 {x:M+0.3,y:2.4,w:5.3,h:3.8,fontSize:12.5,color:NAVY,margin:0,isTextBox:true,lineSpacing:15});
card(s,6.82,1.78,5.88,4.6,WASH);
s.addText("KHI DÙNG AI",{x:7.12,y:1.98,w:5.3,h:0.3,fontSize:11.5,bold:true,color:TEAL,charSpacing:2,margin:0,isTextBox:true});
[["Được khuyến khích","Khám phá dữ liệu, sinh mã, gợi ý hướng, soát lỗi diễn đạt — nêu rõ trong báo cáo.",AQUA],
 ["Phải thận trọng","Để AI viết đoạn diễn giải — phải kiểm chứng và viết lại bằng lời của mình.",AMBER],
 ["Không chấp nhận","Chép nguyên bài AI viết; trích số liệu AI đưa mà chưa chạy lại.",RED]]
.forEach(([t,d,col],i)=>{
  const y=2.44+i*1.3;
  s.addShape(pres.ShapeType.ellipse,{x:7.12,y:y+0.05,w:0.2,h:0.2,fill:{color:col},line:{type:"none"},objectName:`z${i}`});
  s.addText(t,{x:7.44,y:y-0.02,w:4.9,h:0.3,fontSize:13,bold:true,color:NAVY,margin:0,isTextBox:true});
  s.addText(d,{x:7.44,y:y+0.3,w:5.0,h:0.84,fontSize:11.5,color:MUT,margin:0,isTextBox:true,lineSpacing:13.5});
});
card(s,M,6.56,12.1,0.62,"EAF7F0");
s.addText("Phép thử: giảng viên chỉ vào một dòng bất kỳ và hỏi “em lấy con số này ở đâu?” — trả lời được nghĩa là bạn đã dùng AI đúng cách.",
 {x:M+0.3,y:6.64,w:11.5,h:0.46,fontSize:12.5,bold:true,color:"0E7A52",margin:0,valign:"middle",isTextBox:true});
s.addNotes("Hai cột: trái là đạo đức với dữ liệu tâm lý, phải là liêm chính khi dùng AI. Dùng AI trong môn này được khuyến khích, nhưng phải trung thực về cách dùng. Phép thử ở dưới cùng rất đơn giản mà hiệu quả.");

/* ───── 23. TỔNG KẾT ───── */
pres.addSection({title:"Kết thúc"});
s=pres.addSlide({masterName:"TITLE_DARK",sectionTitle:"Kết thúc"});
s.addText("TỔNG KẾT KHÓA HỌC",{placeholder:"eyebrow"});
s.addText("AI gợi ý — bạn kiểm chứng",{placeholder:"title"});
s.addText([{text:"Ba điều mang về",options:{bold:true,fontSize:16,color:WHITE,breakLine:true}},
 {text:"• Mọi con số trong bài phải do bạn chạy mã tạo ra, không phải do AI đọc hộ",options:{breakLine:true}},
 {text:"• Kết quả đẹp bất ngờ là dấu hiệu đáng ngờ, không phải đáng mừng",options:{breakLine:true}},
 {text:"• Nêu hạn chế làm bài mạnh lên, không yếu đi",options:{breakLine:true}},
 {text:" ",options:{breakLine:true,fontSize:8}},
 {text:"Tài liệu đi kèm: giáo trình 28 trang, 6 chương, 30 bài tập phân cấp Dễ / TB / Khó",options:{fontSize:13,color:"8FB8D4"}}],
 {placeholder:"body"});
s.addNotes("Tổng kết. Nếu cả lớp chỉ nhớ ba điều từ khóa học này thì hãy nhớ ba điều trên slide. Giáo trình đi kèm có 30 bài tập, các em làm dần theo từng chương. Cảm ơn cả lớp.");

/* ───── WRITE ───── */
const OUT = path.join(OUTDIR, "BaiGiang_UngDungAI_PhanTichDuLieu.pptx");
(async()=>{ await pres.writeFile({fileName:OUT});
  const {applyTheme}=require("/root/.claude/skills/synced/000e5172-5bba-4c86-81dd-02ace41d9979_84777485-5f0a-493e-9edf-1fcc6ead30de/pptx/scripts/apply_theme.js");
  await applyTheme(OUT,THEME); console.log("WROTE",OUT); })();

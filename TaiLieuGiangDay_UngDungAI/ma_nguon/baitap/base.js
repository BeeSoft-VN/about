const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  VerticalAlign, LevelFormat, Header, Footer, PageBreak,
  TabStopType, LeaderType,
} = require("docx");

const PW = 11906, PH = 16838;
const ML = 1800, MR = 1260, MT = 1440, MB = 1440;
const CW = PW - ML - MR;
const FONT = "Times New Roman";
const SZ = 28, SZ_H1 = 32, SZ_H2 = 28, SZ_CODE = 22;
const C = {
  black:"000000", navy:"1B2A4A", accent:"2563EB", gray:"595959", grayBg:"F2F2F2",
  white:"FFFFFF", codeBg:"1E293B", codeText:"E2E8F0", border:"BFBFBF",
  headBg:"1F4E79", exBg:"EBF5FB", green:"375623", orange:"843C0C", red:"922B21",
};
const T = (text,o={}) => new TextRun({ text:String(text), font:FONT, size:SZ, ...o });
const MONO = (text) => new TextRun({ text:String(text), font:"Courier New", size:SZ_CODE, color:C.codeText });
const sp = (n=120) => new Paragraph({ children:[], spacing:{after:n} });
const PB = () => new Paragraph({ children:[new PageBreak()], spacing:{after:0} });

const body = (text, after=120) => new Paragraph({
  children:[T(text,{color:C.black})], alignment:AlignmentType.JUSTIFIED,
  spacing:{after, line:360, lineRule:"auto"} });

const note = (text) => new Paragraph({
  children:[T("⚠ Lưu ý: ",{bold:true,color:C.orange}), T(text,{italics:true})],
  spacing:{before:80,after:120}, indent:{left:360},
  alignment:AlignmentType.JUSTIFIED });

const keypt = (text) => new Paragraph({
  children:[T("✔ ",{bold:true,color:C.green}), T(text,{bold:true,color:C.navy})],
  spacing:{before:80,after:120}, indent:{left:360},
  alignment:AlignmentType.JUSTIFIED });

const H1 = (r,t) => new Paragraph({ heading:HeadingLevel.HEADING_1,
  children:[T(`CHƯƠNG ${r}: ${t}`,{size:SZ_H1,bold:true,color:C.white})],
  shading:{fill:C.headBg,type:ShadingType.CLEAR}, spacing:{before:240,after:200} });
const H2 = (n,t) => new Paragraph({ heading:HeadingLevel.HEADING_2,
  children:[T(`${n}  ${t}`,{size:SZ_H2,bold:true,color:C.accent})],
  border:{bottom:{style:BorderStyle.SINGLE,size:3,color:C.accent,space:4}},
  spacing:{before:200,after:120} });
const H3 = (n,t) => new Paragraph({ heading:HeadingLevel.HEADING_3,
  children:[T(`${n}  ${t}`,{size:SZ_H2,bold:true,color:C.navy})],
  spacing:{before:160,after:80}, indent:{left:360} });

const tocEntry = (text,page,level=0) => {
  const indent=[0,480,960][level], bold=level===0, italic=level===2, sz=[28,26,24][level];
  return new Paragraph({
    children:[ new TextRun({text,font:FONT,size:sz,bold,italics:italic,color:C.black}),
               new TextRun({text:"\t"+String(page),font:FONT,size:sz,bold,italics:italic,color:C.black}) ],
    tabStops:[{type:TabStopType.RIGHT,leader:LeaderType.DOT,position:CW-200}],
    spacing:{after:level===0?140:70,line:320,lineRule:"auto"}, indent:{left:indent} });
};

const codeBlock = (lines) => lines.map(line => new Paragraph({
  children:[MONO(line)], shading:{fill:C.codeBg,type:ShadingType.CLEAR},
  spacing:{after:0,line:280,lineRule:"auto"}, indent:{left:200,right:200} }));

const bull = (text,ref="b1") => new Paragraph({
  numbering:{reference:ref,level:0}, children:[T(text)],
  spacing:{after:80,line:320,lineRule:"auto"}, alignment:AlignmentType.JUSTIFIED });

const bdr = () => ({style:BorderStyle.SINGLE,size:4,color:C.border});
const allBrd = {top:bdr(),bottom:bdr(),left:bdr(),right:bdr()};
const mkCell = (texts,w,fill=C.white,bold=false,color=C.black,sz=24) => new TableCell({
  borders:allBrd, width:{size:w,type:WidthType.DXA},
  shading:{fill,type:ShadingType.CLEAR}, margins:{top:80,bottom:80,left:140,right:140},
  verticalAlign:VerticalAlign.CENTER,
  children:(Array.isArray(texts)?texts:[texts]).map(t =>
    new Paragraph({children:[new TextRun({text:String(t),font:FONT,size:sz,bold,color})],spacing:{after:40}})) });

const twoColTable = (rows,w1,w2,header=null) => {
  const hd = header ? new TableRow({tableHeader:true,children:[
    mkCell(header[0],w1,C.headBg,true,C.white,24), mkCell(header[1],w2,C.headBg,true,C.white,24)]}) : null;
  const dr = rows.map(([a,b]) => new TableRow({cantSplit:true,children:[
    mkCell(a,w1,C.grayBg,true,C.accent,24),
    mkCell(Array.isArray(b)?b:[b],w2,C.white,false,C.black,24)]}));
  return new Table({width:{size:CW,type:WidthType.DXA},columnWidths:[w1,w2],rows:hd?[hd,...dr]:dr});
};

const threeColTable = (rows,ws,header) => {
  const hd = new TableRow({tableHeader:true,cantSplit:true,children:header.map((h,i)=>mkCell(h,ws[i],C.headBg,true,C.white,22))});
  const dr = rows.map(r => new TableRow({cantSplit:true,children:r.map((c,i)=>
    mkCell(Array.isArray(c)?c:[c], ws[i], i===0?C.grayBg:C.white, i===0, i===0?C.accent:C.black, 22))}));
  return new Table({width:{size:CW,type:WidthType.DXA},columnWidths:ws,rows:[hd,...dr]});
};

const exTable = (items) => {
  const lc = {"Dễ":C.green,"TB":C.orange,"Khó":C.red};
  const cw = [780,2250,1000,CW-4030];
  return new Table({ width:{size:CW,type:WidthType.DXA}, columnWidths:cw, rows:[
    new TableRow({tableHeader:true,cantSplit:true,children:["#","Tên bài","Độ khó","Mô tả & Yêu cầu"].map((h,i)=>mkCell(h,cw[i],C.headBg,true,C.white,22))}),
    ...items.map(({num,title,level,desc}) => new TableRow({cantSplit:true,children:[
      mkCell(num,cw[0],C.grayBg,true,C.accent,22),
      mkCell(title,cw[1],C.white,true,C.black,22),
      mkCell(level,cw[2],C.grayBg,true,lc[level]||C.gray,22),
      mkCell(Array.isArray(desc)?desc:[desc],cw[3],C.white,false,C.black,22)]}))]});
};

const makeHeader = (title) => new Header({children:[new Paragraph({
  children:[new TextRun({text:title,font:FONT,size:22,color:"595959",italics:true})],
  alignment:AlignmentType.RIGHT,
  border:{bottom:{style:BorderStyle.SINGLE,size:3,color:C.border,space:3}}, spacing:{after:0}})]});
const makeFooter = (txt) => new Footer({children:[new Paragraph({
  children:[new TextRun({text:txt,font:FONT,size:22,color:"595959",italics:true})],
  alignment:AlignmentType.CENTER,
  border:{top:{style:BorderStyle.SINGLE,size:3,color:C.border,space:3}}, spacing:{before:60}})]});

module.exports = { Document,Packer,Paragraph,TextRun,AlignmentType,HeadingLevel,BorderStyle,
  ShadingType,LevelFormat,PageBreak, PW,PH,ML,MR,MT,MB,CW,FONT,SZ,SZ_H1,SZ_H2,C,
  T,MONO,sp,PB,body,note,keypt,H1,H2,H3,tocEntry,codeBlock,bull,twoColTable,threeColTable,exTable,
  makeHeader,makeFooter };

/* ── Khoi bai tap ── */
const { Paragraph:_P, TextRun:_TR } = require("docx");
let _exInstance = 0;
const LVL = { "Cơ bản":"375623", "Trung bình":"843C0C", "Nâng cao":"922B21", "Thử thách":"5B2C6F" };

function baiTap(o) {
  const out = [];
  out.push(new _P({
    children:[ T(`Bài ${o.id} — ${o.ten}`,{size:28,bold:true,color:C.white}) ],
    shading:{fill:C.headBg,type:ShadingType.CLEAR},
    spacing:{before:220,after:0}, outlineLevel:1,
  }));
  out.push(new _P({
    children:[ T(`Mức độ: ${o.cap}`,{size:22,bold:true,color:LVL[o.cap]||C.gray}),
               T(`   ·   Dữ liệu: ${o.duLieu}`,{size:22,color:C.gray,italics:true}),
               T(`   ·   Thời gian: ${o.thoiGian}`,{size:22,color:C.gray,italics:true}) ],
    shading:{fill:C.grayBg,type:ShadingType.CLEAR},
    spacing:{before:0,after:120},
  }));
  out.push(new _P({ children:[T("Bối cảnh. ",{bold:true,color:C.navy}),T(o.boiCanh)],
    alignment:AlignmentType.JUSTIFIED, spacing:{after:110,line:340,lineRule:"auto"} }));
  out.push(new _P({ children:[T("Yêu cầu",{bold:true,color:C.accent})], spacing:{before:60,after:70} }));
  _exInstance += 1;
  o.yeuCau.forEach(y => out.push(new _P({
    numbering:{reference:"n1", level:0, instance:_exInstance}, children:[T(y)],
    alignment:AlignmentType.JUSTIFIED, spacing:{after:60,line:330,lineRule:"auto"} })));
  out.push(new _P({ children:[T("Sản phẩm nộp. ",{bold:true,color:C.navy}),T(o.sanPham)],
    alignment:AlignmentType.JUSTIFIED, spacing:{before:90,after:90,line:340,lineRule:"auto"} }));
  if (o.goiY) out.push(new _P({
    children:[T("→ Gợi ý: ",{bold:true,color:C.accent}),T(o.goiY,{italics:true})],
    alignment:AlignmentType.JUSTIFIED, indent:{left:300},
    spacing:{after:110,line:330,lineRule:"auto"} }));
  out.push(diemTable(o.diem));
  return out;
}

function diemTable(rows) {
  const w1 = CW - 1300, w2 = 1300;
  const hd = new TableRow({ tableHeader:true, cantSplit:true, children:[
    mkCell("Tiêu chí chấm", w1, C.navy, true, C.white, 22),
    mkCell("Điểm",          w2, C.navy, true, C.white, 22) ]});
  const dr = rows.map(([a,b]) => new TableRow({ cantSplit:true, children:[
    mkCell(a, w1, C.white,  false, C.black, 22),
    mkCell(b, w2, C.grayBg, true,  C.accent, 22) ]}));
  const tot = rows.reduce((s,[,b]) => s + Number(String(b).replace(',','.')), 0);
  dr.push(new TableRow({ cantSplit:true, children:[
    mkCell("Tổng", w1, C.exBg, true, C.navy, 22),
    mkCell(String(tot).replace('.',','), w2, C.exBg, true, C.navy, 22) ]}));
  return new Table({ width:{size:CW,type:WidthType.DXA}, columnWidths:[w1,w2], rows:[hd,...dr] });
}

function capHeading(num, ten, mota, mau) {
  return [
    new _P({ children:[T(`CẤP ${num} — ${ten}`,{size:SZ_H1,bold:true,color:C.white})],
      shading:{fill:mau,type:ShadingType.CLEAR}, spacing:{before:0,after:140}, outlineLevel:0 }),
    new _P({ children:[T(mota,{italics:true,color:C.gray})],
      alignment:AlignmentType.JUSTIFIED, spacing:{after:200,line:340,lineRule:"auto"} }),
  ];
}
module.exports.baiTap = baiTap;
module.exports.capHeading = capHeading;
module.exports.diemTable = diemTable;
module.exports.Table = Table; module.exports.TableRow = TableRow;
module.exports.WidthType = WidthType; module.exports.mkCell = mkCell;

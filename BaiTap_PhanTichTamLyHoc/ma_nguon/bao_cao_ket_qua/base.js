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
  black:"000000", navy:"000000", accent:"000000", gray:"595959", grayBg:"F2F2F2",
  white:"FFFFFF", codeBg:"262626", codeText:"F2F2F2", border:"BFBFBF",
  headBg:"000000", exBg:"F2F2F2", green:"000000", orange:"000000", red:"000000",
};
const T = (text,o={}) => new TextRun({ text:String(text), font:FONT, size:SZ, ...o });
const MONO = (text) => new TextRun({ text:String(text), font:"Courier New", size:SZ_CODE, color:C.codeText });
const sp = (n=120) => new Paragraph({ children:[], spacing:{after:n} });
const PB = () => new Paragraph({ children:[new PageBreak()], spacing:{after:0} });

const body = (text, after=120) => new Paragraph({
  children:[T(text,{color:C.black})], alignment:AlignmentType.JUSTIFIED,
  spacing:{after, line:360, lineRule:"auto"} });

/* Luu y: chu nghieng, co vien trai de phan biet ma khong can mau */
const note = (text) => new Paragraph({
  children:[T("Lưu ý: ",{bold:true}), T(text,{italics:true})],
  spacing:{before:90,after:130}, indent:{left:300},
  border:{left:{style:BorderStyle.SINGLE,size:12,color:"595959",space:10}},
  alignment:AlignmentType.JUSTIFIED });

/* Diem chinh: chu dam tren nen xam nhat */
const keypt = (text) => new Paragraph({
  children:[T(text,{bold:true})],
  shading:{fill:"F2F2F2",type:ShadingType.CLEAR},
  spacing:{before:100,after:130}, indent:{left:200,right:200},
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

const { ImageRun } = require("docx");
const _fs = require("fs");
function img(path, wIn, hIn, caption) {
  const out = [ new Paragraph({
    children:[ new ImageRun({ type:"png", data:_fs.readFileSync(path),
      transformation:{ width: Math.round(wIn*96), height: Math.round(hIn*96) } }) ],
    alignment: AlignmentType.CENTER, spacing:{ before:140, after:60 } }) ];
  if (caption) out.push(new Paragraph({
    children:[ T(caption,{ size:22, italics:true, color:C.gray }) ],
    alignment: AlignmentType.CENTER, spacing:{ after:180 } }));
  return out;
}
module.exports.img = img;
module.exports = Object.assign(module.exports, { Document,Packer,Paragraph,TextRun,AlignmentType,HeadingLevel,BorderStyle,
  ShadingType,LevelFormat,PageBreak, PW,PH,ML,MR,MT,MB,CW,FONT,SZ,SZ_H1,SZ_H2,C,
  T,MONO,sp,PB,body,note,keypt,H1,H2,H3,tocEntry,codeBlock,bull,twoColTable,threeColTable,exTable,
  makeHeader,makeFooter, img });

/* ── Logo HUTECH tren trang bia ── */
const { ImageRun: _IR } = require("docx");
const _fs2 = require("fs"), _path2 = require("path");
function hutechHeader(khoa) {
  const p = _path2.join(__dirname, "img", "hutech.png");
  return [
    new Paragraph({
      children:[ new _IR({ type:"png", data:_fs2.readFileSync(p),
        transformation:{ width: 96, height: 111 } }) ],
      alignment: AlignmentType.CENTER, spacing:{ before:0, after:90 } }),
    new Paragraph({
      children:[ T("TRƯỜNG ĐẠI HỌC CÔNG NGHỆ TP. HỒ CHÍ MINH",
        { size:26, bold:true, color:"000000" }) ],
      alignment: AlignmentType.CENTER, spacing:{ after:40 } }),
    new Paragraph({
      children:[ T(khoa, { size:23, color:"595959" }) ],
      alignment: AlignmentType.CENTER, spacing:{ after:240 } }),
  ];
}
module.exports.hutechHeader = hutechHeader;

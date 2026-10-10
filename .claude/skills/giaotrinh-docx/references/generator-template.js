/**
 * GENERATOR TEMPLATE – Gems Software Giáo Trình Docx Skill
 * Sao chép file này, điền nội dung vào phần CONTENT, chạy: node gen.js
 */
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  VerticalAlign, LevelFormat, Header, Footer, PageBreak,
  TabStopType, LeaderType,
} = require("docx");
const fs = require("fs");

// ─── Page: A4 ─────────────────────────────────────────────────
const PW = 11906, PH = 16838;
const ML = 1800, MR = 1260, MT = 1440, MB = 1440;
const CW = PW - ML - MR; // 8846 DXA

// ─── Font & Size ──────────────────────────────────────────────
const FONT = "Times New Roman";
const SZ   = 28; // 14pt body
const SZ_H1 = 32; // 16pt
const SZ_H2 = 28; // 14pt
const SZ_CODE = 22; // 11pt Courier New

// ─── Colors ───────────────────────────────────────────────────
const C = {
  black:   "000000", navy:   "1B2A4A", accent: "2563EB",
  gray:    "595959", grayBg: "F2F2F2", white:  "FFFFFF",
  codeBg:  "1E293B", codeText:"E2E8F0", border: "BFBFBF",
  headBg:  "1F4E79", exBg:   "EBF5FB",
  green:   "375623", orange: "843C0C", red:    "922B21",
};

// ─── Helpers ──────────────────────────────────────────────────
const T = (text, o = {}) => new TextRun({ text: String(text), font: FONT, size: SZ, ...o });
const MONO = (text) => new TextRun({ text: String(text), font: "Courier New", size: SZ_CODE, color: C.codeText });
const sp   = (n = 120) => new Paragraph({ children: [], spacing: { after: n } });
const PB   = () => new Paragraph({ children: [new PageBreak()], spacing: { after: 0 } });

function body(text, after = 120) {
  return new Paragraph({
    children: [T(text, { color: C.black })],
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after, line: 360, lineRule: "auto" },
  });
}

function note(text) {
  return new Paragraph({
    children: [T("\u26A0 Lưu ý: ", { bold: true, color: C.orange }), T(text, { italics: true })],
    spacing: { before: 80, after: 120 },
    indent: { left: 360 },
  });
}

// ─── Headings ─────────────────────────────────────────────────
function H1(romanNum, text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [T(`CHƯƠNG ${romanNum}: ${text}`, { size: SZ_H1, bold: true, color: C.white })],
    shading: { fill: C.headBg, type: ShadingType.CLEAR },
    spacing: { before: 240, after: 200 },
  });
}
function H2(num, text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [T(`${num}  ${text}`, { size: SZ_H2, bold: true, color: C.accent })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: C.accent, space: 4 } },
    spacing: { before: 200, after: 120 },
  });
}
function H3(num, text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    children: [T(`${num}  ${text}`, { size: SZ_H2, bold: true, color: C.navy })],
    spacing: { before: 160, after: 80 },
    indent: { left: 360 },
  });
}

// ─── TOC entry ────────────────────────────────────────────────
// level 0=Chương (bold), 1=Mục (normal), 2=Mục con (italic)
function tocEntry(text, page, level = 0) {
  const indent = [0, 480, 960][level];
  const bold   = level === 0;
  const italic = level === 2;
  const sz     = [28, 26, 24][level];
  return new Paragraph({
    children: [
      new TextRun({ text, font: FONT, size: sz, bold, italics: italic, color: C.black }),
      new TextRun({ text: "\t" + String(page), font: FONT, size: sz, bold, italics: italic, color: C.black }),
    ],
    tabStops: [{ type: TabStopType.RIGHT, leader: LeaderType.DOT, position: CW - 200 }],
    spacing: { after: level === 0 ? 140 : 70, line: 320, lineRule: "auto" },
    indent: { left: indent },
  });
}

// ─── Code block ───────────────────────────────────────────────
function codeBlock(lines) {
  return lines.map((line) =>
    new Paragraph({
      children: [MONO(line)],
      shading: { fill: C.codeBg, type: ShadingType.CLEAR },
      spacing: { after: 0, line: 280, lineRule: "auto" },
      indent: { left: 200, right: 200 },
    })
  );
}

// ─── Bullet list ──────────────────────────────────────────────
function bull(text, ref = "b1") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    children: [T(text)],
    spacing: { after: 80, line: 320, lineRule: "auto" },
  });
}

// ─── Table helpers ────────────────────────────────────────────
const bdr = () => ({ style: BorderStyle.SINGLE, size: 4, color: C.border });
const allBrd = { top: bdr(), bottom: bdr(), left: bdr(), right: bdr() };

function mkCell(texts, w, fill = C.white, bold = false, color = C.black, sz = 24) {
  return new TableCell({
    borders: allBrd,
    width: { size: w, type: WidthType.DXA },
    shading: { fill, type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 140, right: 140 },
    verticalAlign: VerticalAlign.CENTER,
    children: (Array.isArray(texts) ? texts : [texts]).map((t) =>
      new Paragraph({ children: [new TextRun({ text: String(t), font: FONT, size: sz, bold, color })], spacing: { after: 40 } })
    ),
  });
}

function twoColTable(rows, w1, w2, header = null) {
  const hdRow = header
    ? new TableRow({ tableHeader: true, children: [mkCell(header[0], w1, C.headBg, true, C.white, 24), mkCell(header[1], w2, C.headBg, true, C.white, 24)] })
    : null;
  const dataRows = rows.map(([a, b]) =>
    new TableRow({ children: [mkCell(a, w1, C.grayBg, true, C.accent, 24), mkCell(Array.isArray(b) ? b : [b], w2, C.white, false, C.black, 24)] })
  );
  return new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: [w1, w2], rows: hdRow ? [hdRow, ...dataRows] : dataRows });
}

// ─── Exercise table ───────────────────────────────────────────
function exTable(items) {
  const lc = { "Dễ": C.green, "TB": C.orange, "Khó": C.red };
  const cw = [500, 2100, 600, CW - 3200];
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: cw,
    rows: [
      new TableRow({ tableHeader: true, children: ["#","Tên bài","Độ khó","Mô tả & Yêu cầu"].map((h, i) => mkCell(h, cw[i], C.headBg, true, C.white, 22)) }),
      ...items.map(({ num, title, level, desc }) =>
        new TableRow({ children: [
          mkCell(num,   cw[0], C.grayBg, true, C.accent, 22),
          mkCell(title, cw[1], C.white,  true, C.black,  22),
          mkCell(level, cw[2], C.grayBg, true, lc[level] || C.gray, 22),
          mkCell(Array.isArray(desc) ? desc : [desc], cw[3], C.white, false, C.black, 22),
        ]})
      ),
    ],
  });
}

// ─── Header & Footer ──────────────────────────────────────────
function makeHeader(title) {
  return new Header({
    children: [new Paragraph({
      children: [new TextRun({ text: title, font: FONT, size: 22, color: "595959", italics: true })],
      alignment: AlignmentType.RIGHT,
      border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: C.border, space: 3 } },
      spacing: { after: 0 },
    })],
  });
}
function makeFooter(orgName) {
  return new Footer({
    children: [new Paragraph({
      children: [new TextRun({ text: `${orgName}  \u2014  Tài liệu Nội bộ  \u2014  Không phổ biến ra ngoài`, font: FONT, size: 22, color: "595959", italics: true })],
      alignment: AlignmentType.CENTER,
      border: { top: { style: BorderStyle.SINGLE, size: 3, color: C.border, space: 3 } },
      spacing: { before: 60 },
    })],
  });
}

// ══════════════════════════════════════════════════════════════
// DOCUMENT – điền nội dung vào đây
// ══════════════════════════════════════════════════════════════

const ORG_NAME   = "Gems Software";          // ← THAY tên tổ chức
const DOC_TITLE  = "GIÁO TRÌNH KỸ THUẬT";    // ← THAY tiêu đề
const TOPIC      = "VUE.JS";                 // ← THAY chủ đề
const SUBTITLE   = "Dành cho Thực tập sinh | Beginner → Intermediate";
const VERSION    = "1.0";
const STANDARD   = "IEEE Std 1063-2001";
const YEAR       = "2025";

const doc = new Document({
  numbering: {
    config: [
      { reference: "b1", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "n1", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ],
  },
  styles: {
    default: { document: { run: { font: FONT, size: SZ } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: SZ_H1, bold: true, font: FONT, color: C.white }, paragraph: { spacing: { before: 240, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: SZ_H2, bold: true, font: FONT, color: C.accent }, paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: SZ_H2, bold: true, font: FONT, color: C.navy }, paragraph: { spacing: { before: 160, after: 80 }, outlineLevel: 2 } },
    ],
  },
  sections: [{
    properties: {
      page: { size: { width: PW, height: PH }, margin: { top: MT, right: MR, bottom: MB, left: ML } },
    },
    headers: { default: makeHeader(`GIÁO TRÌNH ${TOPIC} – ${ORG_NAME}  |  ${STANDARD}`) },
    footers: { default: makeFooter(ORG_NAME) },

    children: [
      // ── TRANG BÌA ──────────────────────────────────────────
      sp(600),
      new Paragraph({ children: [T(ORG_NAME.toUpperCase(), { size: 24, bold: true, color: C.gray })], alignment: AlignmentType.CENTER, spacing: { after: 60 } }),
      new Paragraph({ children: [T(DOC_TITLE, { size: 40, bold: true, color: C.navy })], alignment: AlignmentType.CENTER, spacing: { after: 60 } }),
      new Paragraph({ children: [T(TOPIC, { size: 80, bold: true, color: C.accent })], alignment: AlignmentType.CENTER, shading: { fill: C.exBg, type: ShadingType.CLEAR }, spacing: { before: 80, after: 80 } }),
      new Paragraph({ children: [T(SUBTITLE, { size: 26, color: C.gray, italics: true })], alignment: AlignmentType.CENTER, spacing: { after: 280 } }),
      twoColTable([
        ["Phiên bản",        VERSION],
        ["Chuẩn tài liệu",   STANDARD],
        ["Đơn vị biên soạn", `Dev Team – ${ORG_NAME}`],
        ["Năm xuất bản",     YEAR],
        ["Phân loại",        "NỘI BỘ – Không phổ biến ra ngoài"],
      ], 2800, CW - 2800),
      sp(240),
      body("Tóm tắt: [Điền mô tả ngắn về nội dung và mục tiêu của giáo trình này.]"),
      PB(),

      // ── MỤC LỤC ───────────────────────────────────────────
      new Paragraph({
        children: [new TextRun({ text: "TABLE OF CONTENTS", font: FONT, size: 36, bold: true, color: C.black })],
        alignment: AlignmentType.CENTER,
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.border, space: 8 } },
        spacing: { before: 0, after: 360 },
      }),

      // ── Điền mục lục vào đây ──
      tocEntry("PHỤ LỤC THAM KHẢO",             3, 0),
      tocEntry("CHƯƠNG I: [TÊN CHƯƠNG]",         4, 0),
      tocEntry("1.1  [Tên mục]",                 4, 1),
      tocEntry("CHƯƠNG II: [TÊN CHƯƠNG]",        5, 0),
      tocEntry("2.1  [Tên mục]",                 5, 1),
      // ... thêm các chương khác
      PB(),

      // ── PHỤ LỤC THAM KHẢO ─────────────────────────────────
      new Paragraph({ children: [T("PHỤ LỤC – TÀI LIỆU THAM KHẢO", { size: SZ_H1, bold: true, color: C.white })], shading: { fill: C.headBg, type: ShadingType.CLEAR }, spacing: { before: 0, after: 200 } }),
      twoColTable([
        ["[1]", "IEEE Std 1063-2001, \"IEEE Standard for Software User Documentation,\" IEEE, 2001."],
        // ... thêm tài liệu tham khảo
      ], 600, CW - 600, ["Ref.", "Nguồn tài liệu"]),
      PB(),

      // ── CHƯƠNG I ──────────────────────────────────────────
      H1("I", "[TÊN CHƯƠNG I]"),
      H2("1.1", "[Tên mục 1.1]"),
      body("[Nội dung mục 1.1]"),
      sp(80),
      H2("1.2", "Bài tập Chương I"),
      exTable([
        { num: "I-1", title: "[Tên bài]", level: "Dễ",  desc: "[Mô tả yêu cầu]" },
        { num: "I-2", title: "[Tên bài]", level: "Dễ",  desc: "[Mô tả yêu cầu]" },
        { num: "I-3", title: "[Tên bài]", level: "TB",  desc: "[Mô tả yêu cầu]" },
        { num: "I-4", title: "[Tên bài]", level: "TB",  desc: "[Mô tả yêu cầu]" },
        { num: "I-5", title: "[Tên bài]", level: "Khó", desc: "[Mô tả yêu cầu]" },
      ]),
      PB(),

      // ── CHƯƠNG II, III... (thêm tương tự) ─────────────────

      // ── KẾT THÚC ──────────────────────────────────────────
      sp(200),
      new Paragraph({
        children: [T("HẾT GIÁO TRÌNH", { size: SZ_H1, bold: true, color: C.white })],
        alignment: AlignmentType.CENTER,
        shading: { fill: C.headBg, type: ShadingType.CLEAR },
        spacing: { before: 200, after: 200 },
      }),
    ],
  }],
});

// ─── Output ───────────────────────────────────────────────────
const OUT = "/home/claude/output.docx";
Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUT, buf);
  console.log("Done →", OUT);
});

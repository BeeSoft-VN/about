/* ════════════════════════════════════════════════════════════════
   BÌA CHUẨN HUTECH — Trường Đại học Công nghệ TP.HCM
   Dùng cho đồ án / báo cáo / tiểu luận theo mẫu của trường.
   Phụ thuộc: docx (npm), tệp img/hutech_ngang.png
   ════════════════════════════════════════════════════════════════ */
const { Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
        AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign } = require("docx");
const fs = require("fs"), path = require("path");

const FONT = "Times New Roman";
const PW = 11906, PH = 16838;
const ML = 1700, MR = 1300, MT = 1300, MB = 1300;
const CW = PW - ML - MR;

/* Thuộc tính trang bìa: khung viền đôi màu đen bao quanh */
function hutechCoverPageProps() {
  const b = { style: BorderStyle.DOUBLE, size: 18, color: "000000", space: 22 };
  return { page: {
    size: { width: PW, height: PH },
    margin: { top: MT, right: MR, bottom: MB, left: ML },
    borders: { pageBorderTop: b, pageBorderRight: b, pageBorderBottom: b, pageBorderLeft: b },
  }};
}

const _t = (s, o = {}) => new TextRun({ text: String(s), font: FONT, size: 26, ...o });
const _p = (runs, o = {}) => new Paragraph({
  children: Array.isArray(runs) ? runs : [runs],
  alignment: AlignmentType.CENTER, spacing: { after: 120, line: 300, lineRule: "auto" }, ...o });
const _gap = (n) => new Paragraph({ children: [], spacing: { after: n } });

/* Bảng sinh viên: Họ và Tên | MSSV | Lớp */
function _svTable(rows) {
  const w = [Math.round(CW * 0.44), Math.round(CW * 0.28), CW - Math.round(CW * 0.44) - Math.round(CW * 0.28)];
  const bd = { style: BorderStyle.SINGLE, size: 8, color: "000000" };
  const brd = { top: bd, bottom: bd, left: bd, right: bd };
  const cell = (txt, i, bold) => new TableCell({
    borders: brd, width: { size: w[i], type: WidthType.DXA },
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      children: [new TextRun({ text: String(txt), font: FONT, size: 26, bold })],
      alignment: AlignmentType.CENTER, spacing: { after: 0 } })] });
  return new Table({
    width: { size: CW, type: WidthType.DXA }, columnWidths: w,
    rows: [
      new TableRow({ tableHeader: true, cantSplit: true,
        children: ["Họ và Tên", "MSSV", "Lớp"].map((h, i) => cell(h, i, true)) }),
      ...rows.map(r => new TableRow({ cantSplit: true,
        children: r.map((c, i) => cell(c, i, false)) })),
    ] });
}

/**
 * Nội dung trang bìa HUTECH.
 * @param {object} o
 *   logoPath   đường dẫn tệp logo ngang (png)
 *   loaiTaiLieu  "ĐỒ ÁN MARKETING TRUYỀN THÔNG." | "BÁO CÁO MÔN HỌC." ...
 *   tenDeTai     tên đề tài, in hoa
 *   nganh        "Marketing."
 *   gvhd         "Cô Nguyễn Ngọc Ánh."
 *   sinhVien     [[hoTen, mssv, lop], ...]
 *   nam          "2026"
 */
function hutechCover(o) {
  const out = [];
  const noBd = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  const nb = { top: noBd, bottom: noBd, left: noBd, right: noBd };
  const wL = Math.round(CW * 0.40), wR = CW - wL;

  /* Hàng đầu: logo bên trái, tên Bộ / Trường bên phải */
  out.push(new Table({
    width: { size: CW, type: WidthType.DXA }, columnWidths: [wL, wR],
    rows: [new TableRow({ children: [
      new TableCell({ borders: nb, width: { size: wL, type: WidthType.DXA },
        verticalAlign: VerticalAlign.CENTER, margins: { top: 0, bottom: 0, left: 0, right: 80 },
        children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 0 },
          children: [new ImageRun({ type: "png", data: fs.readFileSync(o.logoPath),
            transformation: { width: 214, height: 52 } })] })] }),
      new TableCell({ borders: nb, width: { size: wR, type: WidthType.DXA },
        verticalAlign: VerticalAlign.CENTER, margins: { top: 0, bottom: 0, left: 80, right: 0 },
        children: [
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
            children: [_t("BỘ GIÁO DỤC VÀ ĐÀO TẠO.", { bold: true, size: 25 })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0 },
            children: [_t("TRƯỜNG ĐẠI HỌC CÔNG NGHỆ TP.HCM.", { bold: true, size: 25 })] }),
        ] }),
    ] })] }));

  out.push(_gap(620));
  out.push(_p(_t(o.loaiTaiLieu, { bold: true, size: 32 })));
  out.push(_gap(520));
  String(o.tenDeTai).split("\n").forEach((ln, i, a) => out.push(
    _p(_t(ln, { bold: true, size: 36 }),
       { spacing: { after: i === a.length - 1 ? 120 : 40, line: 340, lineRule: "auto" } })));
  out.push(_gap(520));
  if (o.nganh) out.push(_p([_t("Ngành: "), _t(o.nganh, { bold: true })]));
  out.push(_gap(360));
  if (o.gvhd) out.push(_p([_t("GVHD: "), _t(o.gvhd, { bold: true })]));
  out.push(_gap(440));
  out.push(_p(_t("Sinh viên thực hiện:", { bold: true })));
  out.push(_svTable(o.sinhVien || [["……………………", "…………", "…………"]]));
  out.push(_gap(620));
  out.push(_p(_t(`Thành phố Hồ Chí Minh, ${o.nam}.`, { bold: true })));
  return out;
}

module.exports = { hutechCover, hutechCoverPageProps, CW_COVER: CW };

---
name: giaotrinh-docx
description: >
  Tạo giáo trình kỹ thuật nội bộ (.docx) chuẩn IEEE Std 1063-2001 dành cho thực tập sinh / nhân viên mới tại Gems Software, sử dụng font Times New Roman 14pt, mục lục dot-leader 3 cấp thụt lề, bài tập phân cấp độ khó, code block monospace, và header/footer chuẩn. Dùng skill này BẤT CỨ KHI NÀO người dùng yêu cầu: tạo giáo trình, làm tài liệu học tập, viết training document, hướng dẫn cho intern / thực tập sinh, tạo tài liệu kỹ thuật nội bộ chuẩn IEEE, hoặc khi cần output là file .docx có cấu trúc chương/mục/bài tập theo chuẩn học thuật Việt Nam. Skill này áp dụng cho mọi chủ đề kỹ thuật: Vue.js, React, .NET, Python, Git, CI/CD, Database, v.v.
---

# Giáo Trình Docx Skill

Tạo tài liệu giáo trình kỹ thuật chuyên nghiệp `.docx` theo chuẩn **IEEE Std 1063-2001**, font **Times New Roman 14pt**, mục lục dot-leader đúng mẫu học thuật Việt Nam.

---

## Quy trình thực hiện

### Bước 1 – Thu thập yêu cầu

Trước khi viết code, xác định rõ:

| Thông tin cần biết | Ghi chú |
|---|---|
| **Chủ đề** | Vue.js, React, Git, .NET, Python... |
| **Đối tượng** | Intern mới, mid-level, fresher... |
| **Số chương** | Mặc định 6 chương nếu không chỉ định |
| **Bài tập mỗi chương** | Tối thiểu 5 bài, từ Dễ → TB → Khó |
| **Số trang tối đa** | Mặc định ~20 trang A4 |
| **Nội dung đặc biệt** | Mục lục vị trí, phụ lục, watermark... |
| **Ảnh mẫu formatting** | Nếu user upload → áp dụng đúng mẫu |

Nếu user upload ảnh mẫu TOC hoặc trang định dạng → đọc kỹ và bắt chước chính xác.

---

### Bước 2 – Đọc docx SKILL.md

**BẮT BUỘC** đọc `/mnt/skills/public/docx/SKILL.md` trước khi viết bất kỳ dòng code nào.  
Chú ý đặc biệt:
- Dual width cho table (columnWidths + cell width)
- `ShadingType.CLEAR` không dùng `SOLID`
- `LevelFormat.BULLET` cho list, không dùng unicode bullet
- Validate sau khi generate

---

### Bước 3 – Viết generator script

Tạo file `/home/claude/gen.js` theo **chuẩn định dạng** dưới đây, sau đó:

```bash
node gen.js
python3 /mnt/skills/public/docx/scripts/office/validate.py output.docx
cp output.docx /mnt/user-data/outputs/
```

---

## Chuẩn định dạng bắt buộc (IEEE + Gems Software)

### Typography
```
Font:         Times New Roman (FONT = "Times New Roman")
Size body:    14pt → size: 28 (half-points)
Size H1:      16pt → size: 32
Size H2:      14pt → size: 28
Size H3:      14pt → size: 28
Size code:    11pt Courier New → size: 22
Size footer:  11pt → size: 22
Line spacing: 1.5 → line: 360, lineRule: "auto"
Alignment:    JUSTIFIED cho body paragraph
```

### Page layout (A4)
```javascript
PW = 11906, PH = 16838   // A4 dimensions in DXA
ML = 1800  // lề trái ~1.25"
MR = 1260  // lề phải ~0.875"
MT = 1440, MB = 1440     // trên/dưới 1"
CW = PW - ML - MR        // = 8846 DXA content width
```

> Đây là lề mặc định cho tài liệu nội bộ doanh nghiệp. **Tài liệu HUTECH dùng lề
> khác** — xem mục "Trang bìa chuẩn HUTECH" bên dưới.

### Màu sắc chuẩn Gems Software
```javascript
headBg:  "1F4E79"   // nền H1 (xanh navy đậm)
accent:  "2563EB"   // màu H2, dot leader page số
navy:    "1B2A4A"   // màu H3, label bảng
codeBg:  "1E293B"   // nền code block
codeText:"E2E8F0"   // chữ code
grayBg:  "F2F2F2"   // nền cell label bảng
border:  "BFBFBF"   // border bảng
```

> Bảng màu này dành cho tài liệu nội bộ doanh nghiệp. **Tài liệu HUTECH dùng đơn sắc** —
> xem mục "Bảng màu đơn sắc" bên dưới.

---

## Cấu trúc tài liệu chuẩn

```
Trang bìa
  → Tên đơn vị, tiêu đề, phiên bản, chuẩn tài liệu, năm
  → Bảng metadata (phiên bản, chuẩn, đơn vị, phân loại)
  → Tóm tắt 1 đoạn

TABLE OF CONTENTS  ← đúng theo mẫu (xem bên dưới)

PHỤ LỤC THAM KHẢO  ← đặt TRƯỚC các chương theo quy định IEEE
  → Format: [1] Tác giả, "Tên," Nguồn, Năm.

CHƯƠNG I: ...
  1.1  ...
  1.2  ...
  1.3  Bài tập Chương I (≥5 bài)

CHƯƠNG II–VI: ... (tương tự)

Kết thúc giáo trình
```

---

---

## Trang bìa chuẩn HUTECH (bắt buộc cho tài liệu của trường)

Khi tài liệu dành cho **Trường Đại học Công nghệ TP.HCM (HUTECH)** — đồ án, báo cáo
môn học, tiểu luận, khóa luận — **dùng mẫu bìa dưới đây thay cho trang bìa mặc định**.
Nhận biết: người dùng nhắc "HUTECH", "Đại học Công nghệ TP.HCM", hoặc đưa ảnh mẫu bìa
có khung viền + logo HUTECH.

### Bố cục bìa (đúng thứ tự từ trên xuống)

```
┌─ khung viền đôi, đen, bao quanh toàn trang ────────────┐
│                                                        │
│  [logo HUTECH ngang]   BỘ GIÁO DỤC VÀ ĐÀO TẠO.         │
│                        TRƯỜNG ĐẠI HỌC CÔNG NGHỆ TP.HCM.│
│                                                        │
│              <LOẠI TÀI LIỆU>.          ← 16pt đậm      │
│                                                        │
│              <TÊN ĐỀ TÀI IN HOA>.      ← 18pt đậm      │
│                                                        │
│              Ngành: <ngành>.                           │
│              GVHD: <họ tên giảng viên>.                │
│                                                        │
│              Sinh viên thực hiện:                      │
│         ┌──────────────┬────────┬────────┐             │
│         │ Họ và Tên    │ MSSV   │ Lớp    │             │
│         ├──────────────┼────────┼────────┤             │
│         │ …            │ …      │ …      │             │
│         └──────────────┴────────┴────────┘             │
│                                                        │
│          Thành phố Hồ Chí Minh, <năm>.                 │
└────────────────────────────────────────────────────────┘
```

### Quy tắc bắt buộc

| Yếu tố | Giá trị |
|---|---|
| Khung viền | `BorderStyle.DOUBLE`, `size: 18`, màu `000000`, `space: 22` — đặt ở **section properties** của trang bìa |
| Logo | `references/hutech_ngang.png` (250×61) — chèn rộng **214 × 52 px**. Bản crest dọc: `references/hutech_crest.png` (628×727) |
| Font | Times New Roman toàn bộ, **không dùng màu** — bìa chỉ đen trắng |
| Cỡ chữ | Tên Bộ/Trường 12,5pt đậm · Loại tài liệu 16pt đậm · Tên đề tài 18pt đậm · còn lại 13pt |
| Hàng logo + tên trường | Bảng 2 cột **không viền**, tỷ lệ 40% / 60%, căn giữa theo chiều dọc |
| Bảng sinh viên | 3 cột `Họ và Tên | MSSV | Lớp`, tỷ lệ 44% / 28% / 28%, viền đơn đen `size: 8`, chữ căn giữa |
| Dấu chấm cuối dòng | Mẫu HUTECH kết thúc mỗi dòng bìa bằng dấu chấm — giữ đúng |

### Hai section bắt buộc

Trang bìa có khung viền, phần thân **không có**. Vì vậy tài liệu phải chia **2 section**:

```javascript
const { hutechCover, hutechCoverPageProps } = require("./hutech-cover.js");

sections: [
  // Section 1 — trang bìa: có khung viền, KHÔNG header/footer
  { properties: hutechCoverPageProps(),
    children: hutechCover({
      logoPath: path.join(__dirname, "img", "hutech_ngang.png"),
      loaiTaiLieu: "BÁO CÁO KẾT QUẢ MÔN HỌC.",
      tenDeTai: "TÊN ĐỀ TÀI DÒNG 1\nTÊN ĐỀ TÀI DÒNG 2.",   // tách dòng bằng \n
      nganh: "Trí tuệ nhân tạo ứng dụng.",
      gvhd: "Thầy Nguyễn Văn A.",
      sinhVien: [["Nguyễn Văn B", "2011000001", "21DTHA1"]],
      nam: "2026",
    }) },

  // Section 2 — phần thân: mục lục, phụ lục, các chương
  { properties: { page: { size:{width:PW,height:PH},
                          margin:{top:MT,right:MR,bottom:MB,left:ML} } },
    headers: { default: makeHeader(...) },
    footers: { default: makeFooter(...) },
    children: [ /* MỤC LỤC, PHỤ LỤC, CHƯƠNG I… */ ] },
]
```

Mã dùng được ngay: **`references/hutech-cover.js`** — chép vào thư mục generator rồi
`require("./hutech-cover.js")`. Chép kèm `references/hutech_ngang.png` vào `img/`.

### Lỗi thường gặp

- **`\n` trong `tenDeTai` không xuống dòng** nếu tự viết Paragraph — docx-js bỏ qua ký tự
  xuống dòng. Hàm `hutechCover` đã tự tách `\n` thành nhiều Paragraph; nếu viết tay phải
  tách thủ công.
- **Tên trường bị wrap 2 dòng** khi ô bên phải quá hẹp. Giữ tỷ lệ cột 40/60 và cỡ chữ 12,5pt.
- **Chèn bìa làm lệch số trang mục lục.** Sau khi thêm bìa phải render lại PDF, dò số trang
  thật rồi cập nhật `tocEntry`.
- **Logo ngang chỉ có 250×61 px.** Không phóng quá ~2,3 inch, nếu không sẽ vỡ nét khi in.

### Lề trang chuẩn HUTECH

Thông số phổ biến nhất sinh viên HUTECH áp dụng:

| Lề | Centimet | DXA | Cách tính |
|---|---|---|---|
| Trên | 2,0 cm | **1134** | 2,0 ÷ 2,54 × 1440 = 1133,86 |
| Dưới | 2,0 cm | **1134** | — |
| Trái | 3,0 cm | **1701** | 3,0 ÷ 2,54 × 1440 = 1700,79 |
| Phải | 2,0 cm | **1134** | — |

Lề trái rộng hơn để chừa chỗ đóng gáy — đây là lý do con số 3,0 cm.

```javascript
const PW = 11906, PH = 16838;              // A4
const ML = 1701, MR = 1134, MT = 1134, MB = 1134;
const CW = PW - ML - MR;                   // = 9071 DXA
```

Áp dụng cho **cả hai section** (trang bìa và phần thân) để lề đồng nhất.

**Đổi lề làm đổi số trang.** Vùng nội dung rộng thêm 225 DXA so với lề mặc định,
đủ để một tài liệu 28 trang rút còn 24 trang. Sau khi đổi lề **bắt buộc dò lại
toàn bộ số trang trong mục lục** — xem mục "Lỗi thường gặp" ở trên.

### Bảng màu đơn sắc (tài liệu học thuật HUTECH)

Bìa HUTECH là đen trắng, nên **phần thân cũng dùng đơn sắc** cho đồng bộ — đây là
chuẩn trình bày của báo cáo học thuật Việt Nam và cũng tiết kiệm mực khi in.

```javascript
const C = {
  black:"000000", navy:"000000", accent:"000000", gray:"595959", grayBg:"F2F2F2",
  white:"FFFFFF", codeBg:"262626", codeText:"F2F2F2", border:"BFBFBF",
  headBg:"000000", exBg:"F2F2F2", green:"000000", orange:"000000", red:"000000",
};
```

Khi bỏ màu, phải thay bằng **tín hiệu cấu trúc** chứ không để các khối trông giống nhau:

| Thành phần | Trước (có màu) | Sau (đơn sắc) |
|---|---|---|
| H1 | nền navy `1F4E79`, chữ trắng | nền đen, chữ trắng |
| H2 | chữ xanh + viền dưới xanh | chữ đen đậm + viền dưới đen |
| H3 | chữ navy | chữ đen đậm, thụt lề |
| Ô nhãn bảng | nền xám, chữ xanh | nền xám, chữ đen đậm |
| Khối "Lưu ý" | icon ⚠ cam | **viền trái dày màu xám** + "Lưu ý:" đậm, nội dung nghiêng |
| Khối điểm nhấn | icon ✔ xanh lá | **nền xám nhạt `F2F2F2`** + chữ đen đậm |
| Cột độ khó bài tập | xanh / cam / đỏ | đen đậm — chữ "Dễ/TB/Khó" tự mang nghĩa |

**Không dùng emoji làm dấu hiệu** (⚠ ✔ ✅): Word render chúng theo bảng màu của font
emoji nên vẫn ra màu dù đã đặt `color`. Dùng viền, nền xám hoặc chữ đậm thay thế.

**Biểu đồ chèn vào tài liệu vẫn giữ màu** — biểu đồ đơn sắc làm mất khả năng phân biệt
nhóm dữ liệu. Chỉ chuyển biểu đồ sang xám khi tài liệu bắt buộc in trắng đen.

### Khi nào KHÔNG dùng bìa này

Tài liệu nội bộ doanh nghiệp, giáo trình không gắn với trường — dùng trang bìa mặc định
ở mục "Cấu trúc tài liệu chuẩn" phía trên.

---

## Mục lục (TABLE OF CONTENTS)

Đúng mẫu học thuật VN — 3 cấp, dot leader căn phải:

```javascript
// Cách tạo đúng theo ảnh mẫu:
function tocEntry(text, page, level = 0) {
  const indent = [0, 480, 960][level]         // 3 cấp thụt lề
  const bold   = level === 0
  const italic = level === 2
  const sz     = [28, 26, 24][level]          // giảm dần theo cấp

  return new Paragraph({
    children: [
      new TextRun({ text, font: "Times New Roman", size: sz, bold, italics: italic }),
      new TextRun({ text: "\t" + String(page), font: "Times New Roman", size: sz, bold, italics: italic }),
    ],
    tabStops: [{
      type: TabStopType.RIGHT,
      leader: LeaderType.DOT,                 // dùng LeaderType.DOT (không phải TabStopLeader)
      position: CW - 200,
    }],
    spacing: { after: level === 0 ? 140 : 70 },
    indent: { left: indent },
  })
}

// Cấp 0 = Chương (bold, không thụt)
tocEntry("CHƯƠNG I: TỔNG QUAN",  4, 0)
// Cấp 1 = Mục 1.x (normal, thụt 480)
tocEntry("1.1  Vue.js là gì?",   4, 1)
// Cấp 2 = Mục con (italic, thụt 960) — dùng khi cần
tocEntry("1.1.1  Cài đặt",       4, 2)
```

**Tiêu đề TOC:**
```javascript
new Paragraph({
  children: [new TextRun({ text: "TABLE OF CONTENTS", font: "Times New Roman",
    size: 36, bold: true })],
  alignment: AlignmentType.CENTER,
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "BFBFBF", space: 8 } },
  spacing: { before: 0, after: 360 },
})
```

---

## Headings

```javascript
// H1 – nền navy, chữ trắng
function H1(romanNum, text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [T(`CHƯƠNG ${romanNum}: ${text}`, { size: 32, bold: true, color: "FFFFFF" })],
    shading: { fill: "1F4E79", type: ShadingType.CLEAR },
    spacing: { before: 240, after: 200 },
  })
}

// H2 – chữ accent, có border dưới
function H2(num, text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [T(`${num}  ${text}`, { size: 28, bold: true, color: "2563EB" })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: "2563EB", space: 4 } },
    spacing: { before: 200, after: 120 },
  })
}

// H3 – chữ navy đậm, thụt lề
function H3(num, text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    children: [T(`${num}  ${text}`, { size: 28, bold: true, color: "1B2A4A" })],
    spacing: { before: 160, after: 80 },
    indent: { left: 360 },
  })
}
```

---

## Code Block

```javascript
function codeBlock(lines) {
  return lines.map((line, i) =>
    new Paragraph({
      children: [new TextRun({ text: line, font: "Courier New", size: 22, color: "E2E8F0" })],
      shading: { fill: "1E293B", type: ShadingType.CLEAR },
      spacing: { after: 0, line: 280, lineRule: "auto" },
      indent: { left: 200, right: 200 },
    })
  )
}
```

---

## Bảng bài tập (Exercise Table)

4 cột: `#` | `Tên bài` | `Độ khó` | `Mô tả`

```javascript
// Màu độ khó
const lvlColor = { "Dễ": "375623", "TB": "843C0C", "Khó": "922B21" }

// Mỗi bài tập:
{ num: "I-1", title: "Tên bài", level: "Dễ|TB|Khó", desc: "Mô tả chi tiết" }
```

Phân bố đề xuất: **2 Dễ + 2 TB + 1 Khó** mỗi chương. Điều chỉnh theo chủ đề.

---

## Lưu ý Import quan trọng

```javascript
// LeaderType.DOT – ĐÚNG  (không phải TabStopLeader)
const { ..., TabStopType, LeaderType } = require("docx")

// Không có PageNumber constructor trong docx-js
// Dùng text thay thế cho footer page number
```

---

## Template generator đầy đủ

Xem file `references/generator-template.js` để có boilerplate đầy đủ có thể copy và điền nội dung.

---

## Checklist trước khi deliver

- [ ] `node gen.js` chạy không có lỗi
- [ ] `validate.py` → "All validations PASSED"
- [ ] TOC có dot leader, đúng 3 cấp thụt lề
- [ ] Font Times New Roman 14pt toàn bộ body
- [ ] Code blocks font Courier New, nền tối
- [ ] Bài tập: đủ ≥5 bài mỗi chương, có cột độ khó màu
- [ ] Phụ lục IEEE đặt trước chương I
- [ ] Nếu là tài liệu HUTECH: bìa đúng mẫu (khung viền, logo, bảng MSSV), chia 2 section
- [ ] Tài liệu HUTECH: thân bài đơn sắc, không còn mã màu nào ngoài đen/trắng/xám
- [ ] Tài liệu HUTECH: lề 1701/1134/1134/1134 DXA (trái/phải/trên/dưới)
- [ ] Số trang mục lục đã dò lại từ bản PDF SAU khi thêm bìa
- [ ] Header/footer đúng, có border phân cách
- [ ] File output vào `/mnt/user-data/outputs/`

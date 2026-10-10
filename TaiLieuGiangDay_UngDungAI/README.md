# Tài liệu giảng dạy: Ứng dụng AI trong phân tích dữ liệu

Bộ tài liệu dạy cách dùng trợ lý AI (ChatGPT, Gemini, Claude) để thực hiện một quy trình
phân tích dữ liệu hoàn chỉnh. **Viết cho người mới hoàn toàn** — không yêu cầu kiến thức
nền về dữ liệu hay lập trình.

## Nội dung

| Tệp | Mô tả |
|---|---|
| `GiaoTrinh_UngDungAI_PhanTichDuLieu.docx` | **Giáo trình 28 trang** — 6 chương, chuẩn IEEE Std 1063-2001, Times New Roman 14pt, mục lục dot-leader, **30 bài tập** phân cấp Dễ/TB/Khó |
| `BaiGiang_UngDungAI_PhanTichDuLieu.pptx` | **Bài giảng 23 slide** — có ghi chú người nói đầy đủ cho cả 23 slide |
| `ma_nguon/` | Mã JavaScript sinh ra hai tệp trên (sửa nội dung rồi chạy lại) |

## Cấu trúc 6 chương

| Chương | Nội dung | Bài tập |
|---|---|---|
| I | AI làm được gì trong phân tích dữ liệu | 5 |
| II | Làm quen với dữ liệu (EDA) | 5 |
| III | Tiền xử lý – làm sạch dữ liệu | 5 |
| IV | Trực quan hóa dữ liệu | 5 |
| V | Rút ra tri thức và kiểm chứng | 5 |
| VI | Trình bày kết quả và đạo đức | 5 |

Sáu chương ứng với năm bước của quy trình, bám sát 5 yêu cầu trong đề bài môn học.

## Điểm khác biệt: ba cái bẫy có thật

Chương V không dùng tình huống giả định. Ba lỗi dưới đây đã xảy ra thật trong quá trình
phân tích hai bộ dữ liệu của môn học:

1. **AI đọc sai con số** — AI báo 58,6%, giá trị đúng là 58,5% (làm tròn hai lần).
   Con số sai đã lan ra 5 chỗ trước khi bị phát hiện.
2. **Rò rỉ nhãn** — nhãn ASD hóa ra chính là đầu ra của công thức chấm điểm; mọi trẻ có
   AQ ≥ 4 đều bị gán nhãn "có dấu hiệu", không một ngoại lệ. Dùng AQ dự báo ASD là lập
   luận vòng tròn.
3. **Biến nhân bản** — bảy cột "bệnh đi kèm" tương quan 0,88–1,00 với nhau, trùng khớp
   tới 99,9%. Thực chất là một biến sao chép bảy lần.

Người học cần biết AI sai ở đâu, không chỉ biết AI làm được gì.

## Việc cần làm trước khi dùng

Mở `GiaoTrinh_UngDungAI_PhanTichDuLieu.docx`, điền vào **bảng trang bìa**:
- Đơn vị biên soạn
- Giảng viên phụ trách

## Thời lượng gợi ý

6 buổi × 90 phút, hoặc tự học trong 3 tuần.
Bài giảng 23 slide canh cho khoảng 70–80 phút, còn lại dành cho thực hành bài tập.

## Chạy lại mã nguồn

```bash
cd ma_nguon
npm install docx pptxgenjs     # nếu chưa có
node gen.js ../GiaoTrinh_UngDungAI_PhanTichDuLieu.docx
node build_slides.js
```

Lưu ý: nếu sửa nội dung giáo trình làm số trang thay đổi, phải cập nhật lại số trang
trong mục lục (phần `tocEntry` ở đầu `gen.js`).

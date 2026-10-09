# Bài tập: Phân tích dữ liệu tâm lý học sử dụng AI

**Đề tài đã chọn:** Student Depression Dataset — khảo sát 27.901 sinh viên, 18 biến.

---

## 1. Nội dung thư mục

| Đường dẫn | Mô tả |
|---|---|
| `Nhom_PhanTichTamLyHoc_StudentDepression.pptx` | **Bài thuyết trình** — 20 slide, có ghi chú người nói (Speaker Notes) cho từng slide, thời lượng ~13 phút |
| `du_lieu/student_depression_GOC.csv` | Dữ liệu gốc tải từ Kaggle (27.901 × 18) |
| `du_lieu/student_depression_CLEANED.csv` | **Dữ liệu đã xử lý** (27.901 × 19) — nộp theo yêu cầu |
| `ma_nguon/*.py` | Mã Python tái lập toàn bộ kết quả |
| `bieu_do/*.png` | 8 biểu đồ dùng trong bài trình bày |

## 2. Việc cần làm trước khi nộp

Mở file `.pptx` và điền thông tin nhóm ở **slide 1**:
- `Nhóm …` · `Lớp …` · `Giảng viên hướng dẫn: …`
- `Thành viên: Họ tên 1 · Họ tên 2 · …`

## 3. Cách chạy lại mã nguồn

```bash
pip install pandas numpy matplotlib scipy scikit-learn
cd ma_nguon
python3 eda.py            # Yêu cầu 1 — khám phá dữ liệu (EDA)
python3 quality.py        # Yêu cầu 2 — chẩn đoán chất lượng dữ liệu
python3 clean_analyze.py  # Tiền xử lý + phân tích quan hệ → xuất file CLEANED
python3 model.py          # Mô hình dự báo (Logistic + Random Forest)
python3 charts.py         # Yêu cầu 3 — vẽ lại 8 biểu đồ
python3 verify.py         # Đối chiếu mọi con số trích dẫn trong slide
```

## 4. Đối chiếu với 5 yêu cầu của đề bài

| Yêu cầu | Đáp ứng ở đâu |
|---|---|
| 1. Dùng AI để phân tích khám phá (EDA) | Slide 4 (quy trình) · `ma_nguon/eda.py` |
| 2. Xác định và giải thích các bước tiền xử lý | Slide 6–7 · `ma_nguon/quality.py`, `clean_analyze.py` |
| 3. Vẽ biểu đồ thể hiện đặc điểm, quan hệ, phân bố | Slide 3, 9–15 · `bieu_do/` |
| 4. Rút ra tri thức (insight) và liên hệ thực tế | Slide 17–19 |
| 5. Trình bày 10–15 phút | File `.pptx`, 20 slide, ~13 phút |

## 5. Các kết quả chính

- **58,5%** mẫu có dấu hiệu trầm cảm; không có bản ghi trùng; chỉ 3 ô khuyết.
- Tiền xử lý: giữ **100% bản ghi**, sửa 122 ô lỗi/khuyết, bỏ 4 cột gần như hằng số.
- Yếu tố liên quan mạnh nhất: ý định tự tử (r = 0,546), áp lực học tập (0,475), áp lực tài chính (0,364).
- **Điểm CGPA gần như không liên quan** (r = 0,022); **giới tính không tạo khác biệt** (p = 0,76).
- Hiệu ứng cộng dồn: từ **4,5%** (không có yếu tố nguy cơ) lên **98,6%** (đủ 5 yếu tố) — gấp 21,7 lần.
- Mô hình kiểm chứng: AUC 0,921 (Logistic), 0,918 (Random Forest).

## 6. Lưu ý quan trọng

Dữ liệu **cắt ngang** nên mọi quan hệ nêu trên là **tương quan, không phải nhân quả**.
Biến `Depression` là kết quả **tự báo cáo/sàng lọc**, không phải chẩn đoán lâm sàng.
Mẫu khảo sát tại Ấn Độ, chưa thể suy rộng trực tiếp cho sinh viên Việt Nam.

**Nguồn dữ liệu:** Student Depression Dataset — Kaggle (tác giả: hopesb).

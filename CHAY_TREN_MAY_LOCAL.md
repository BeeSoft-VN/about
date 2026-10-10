# Chạy lại toàn bộ trên máy cá nhân

Mọi tài liệu trong kho này đều sinh ra từ mã nguồn. Bạn có thể sửa nội dung
rồi dựng lại y hệt trên máy mình.

## 1. Lấy mã về

```bash
git clone -b claude/psychology-analysis-presentation-cs0lul \
  https://github.com/BeeSoft-VN/about.git
cd about
```

Nếu đã clone rồi thì chỉ cần:

```bash
git pull origin claude/psychology-analysis-presentation-cs0lul
```

## 2. Cài công cụ

```bash
# Node — dùng để dựng file .docx và .pptx
npm install docx pptxgenjs

# Python — dùng để phân tích dữ liệu và vẽ biểu đồ
pip install pandas numpy matplotlib scipy scikit-learn
```

Node từ bản 18 trở lên, Python từ 3.9 trở lên.

## 3. Dựng lại từng tài liệu

| Tài liệu | Lệnh |
|---|---|
| Báo cáo kết quả | `cd BaiTap_PhanTichTamLyHoc/ma_nguon/bao_cao_ket_qua && node gen.js ../../BaoCao_KetQua_PhanTichTamLyHoc.docx` |
| Báo cáo EDA | `cd BaiTap_PhanTichTamLyHoc/ma_nguon/bao_cao_eda && node gen.js ../../BaoCao_EDA_StudentDepression.docx` |
| Slide thuyết trình | `cd BaiTap_PhanTichTamLyHoc/ma_nguon && node build_deck.js` |
| Giáo trình | `cd TaiLieuGiangDay_UngDungAI/ma_nguon && node gen.js ../GiaoTrinh_UngDungAI_PhanTichDuLieu.docx` |
| Tập bài tập | `cd TaiLieuGiangDay_UngDungAI/ma_nguon/baitap && node gen.js ../../BaiTapUngDung_CoBan_den_NangCao.docx` |
| Slide bài giảng | `cd TaiLieuGiangDay_UngDungAI/ma_nguon && node build_slides.js` |

Mỗi thư mục mã nguồn đã kèm sẵn thư mục `img/` chứa logo và biểu đồ, nên chạy
được ngay mà không cần tải thêm gì.

## 4. Chạy lại phân tích dữ liệu

```bash
cd BaiTap_PhanTichTamLyHoc/ma_nguon
python3 eda.py            # khám phá dữ liệu
python3 quality.py        # chẩn đoán chất lượng
python3 clean_analyze.py  # tiền xử lý, xuất file CLEANED
python3 model.py          # mô hình dự báo
python3 charts.py         # vẽ lại 8 biểu đồ
python3 verify.py         # đối chiếu mọi con số trong báo cáo
```

Phân tích dữ liệu tự kỷ nằm ở `PhanTich_TuKy_TreEm/ma_nguon/` với cách chạy tương tự.

## 5. Sửa nội dung ở đâu

| Muốn sửa | Mở tệp |
|---|---|
| Thông tin bìa (nhóm, GVHD, MSSV) | biến `_COVER` ở đầu `gen.js` |
| Nội dung từng chương | `ch_a.js` … `ch_d.js` (báo cáo) · `ch1.js` … `ch6.js` (giáo trình) |
| Đề bài tập | `ex12.js`, `ex34.js` · đáp án ở `dapan_phuluc.js` |
| Màu sắc, font, lề | bảng `C` và các hằng `ML/MR/MT/MB` trong `base.js` |
| Bố cục trang bìa | `hutech_cover.js` |

## 6. Lưu ý quan trọng khi sửa

**Sửa nội dung xong phải dò lại số trang mục lục.** Các mục `tocEntry("...", N, L)`
trong `gen.js` ghi số trang cố định — thêm bớt nội dung sẽ làm lệch.

Cách dò: dựng file, xuất PDF, rồi tìm trang thật của từng tiêu đề:

```bash
soffice --headless --convert-to pdf TenFile.docx
pdftotext -layout TenFile.pdf - | awk 'BEGIN{p=1}/\f/{p++}{print p"|"$0}' \
  | grep -E "CHƯƠNG|^[0-9]+\|[0-9]\.[0-9]" | grep -v "\.\.\."
```

**Kiểm tra file sau khi dựng** (nếu có bộ công cụ Office của Claude):

```bash
python3 <đường-dẫn-skill>/docx/scripts/office/validate.py TenFile.docx
```

## 7. Thông số định dạng đang dùng

| Thông số | Giá trị |
|---|---|
| Khổ giấy | A4 (11906 × 16838 DXA) |
| Lề | Trên 2,0cm · Dưới 2,0cm · Trái 3,0cm · Phải 2,0cm (chuẩn HUTECH) |
| Font | Times New Roman 14pt, giãn dòng 1,5 |
| Màu | Đơn sắc — chỉ đen, trắng, xám |
| Bìa | Khung viền đôi đen, logo HUTECH, bảng MSSV |

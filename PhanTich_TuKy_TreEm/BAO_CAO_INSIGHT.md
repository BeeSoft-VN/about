# Phân tích dữ liệu trẻ tự kỷ — phục vụ công tác giáo dục trẻ ASD

**Bộ dữ liệu:** Autism Screening Data for Children (Kaggle — `uppulurimadhuri/dataset`)
**Quy mô gốc:** 1.985 bản ghi × 28 biến · trẻ 1–18 tuổi
**Sau làm sạch:** 1.329 bản ghi × 40 biến (27 biến gốc + 13 biến mã hóa)

---

## PHẦN 1 — LÀM SẠCH DỮ LIỆU

### 1.1 Sáu bước đã thực hiện

| # | Bước | Chi tiết | Kết quả |
|---|---|---|---|
| 1 | Bỏ cột định danh | `CASE_NO_PATIENT'S` không mang thông tin phân tích | −1 cột |
| 2 | Chuẩn hóa chữ hoa/thường | `Ethnicity`: "Asian"/"asian", "Middle Eastern"/"middle eastern"… | 16 → 11 nhóm |
| 3 | Chuẩn hóa chữ hoa/thường | `Who_completed_the_test`: "Family Member"/"Family member" | 6 → 5 nhóm |
| 4 | **Loại bản ghi trùng** | 656 dòng trùng lặp hoàn toàn | **−33,0% dữ liệu** |
| 5 | Điền khuyết | 48 ô (SRS 9, Q-CHAT 24, Trầm cảm 1, Vấn đề hành vi 14) | trung vị / giá trị phổ biến |
| 6 | Mã hóa | Yes/No → 1/0; tạo `AQ_total` (0–10), `So_RL_GiaoDuc` (0–5) | +13 biến |

> **Lưu ý về bước 4:** 656/1.985 = 33% bản ghi là bản sao hoàn toàn. Khác với dữ liệu khảo sát
> thông thường, ở đây **bắt buộc phải loại bỏ** — nếu giữ lại, mọi tỷ lệ và kiểm định đều bị
> thổi phồng độ tin cậy một cách giả tạo.

### 1.2 Ba lỗi nghiêm trọng phát hiện được

Đây là kết quả quan trọng nhất của khâu làm sạch — và là lý do **không thể dùng bộ dữ liệu này
để kết luận về y học**.

**Lỗi 1 — Bảy biến "rối loạn đi kèm" chỉ là bản sao của nhau** *(biểu đồ `d1_copy.png`)*

Chậm nói, khó học, chậm phát triển trí tuệ, vấn đề hành vi, lo âu, trầm cảm, rối loạn gen —
bảy chẩn đoán lẽ ra phải độc lập — lại có tương quan **0,88 – 1,00** với nhau, trùng khớp
**95,6% – 99,9%** từng cặp. **95,3% trẻ hoặc có cả bảy, hoặc không có cái nào.**

→ Về mặt lâm sàng điều này bất khả thi. Bảy cột này thực chất là **một biến được sao chép**.
Không thể dùng để nói bất cứ điều gì về bệnh đi kèm ở trẻ tự kỷ.

**Lỗi 2 — Rò rỉ nhãn: ASD được suy ra từ chính điểm sàng lọc** *(biểu đồ `d2_leak.png`)*

| Tổng điểm AQ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Nhãn "Không ASD" | 155 | 145 | 88 | 96 | **0** | **0** | **0** | **0** | **0** | **0** | **0** |
| Nhãn "Có ASD" | 119 | 2 | 0 | 0 | 110 | 120 | 96 | 134 | 97 | 94 | 73 |

**Mọi trẻ có AQ ≥ 4 đều được gán nhãn "có ASD" — không một ngoại lệ.**

→ Nhãn `ASD_traits` không phải chẩn đoán lâm sàng độc lập, mà là **đầu ra của chính thuật toán
chấm điểm**. Mọi mô hình dự báo ASD từ A1–A10 đều là **lập luận vòng tròn**, độ chính xác ~100%
nhưng vô nghĩa. Nhóm đã **không xây mô hình dự báo** vì lý do này.

**Lỗi 3 — Tỷ lệ nền bất hợp lý**

Vàng da sơ sinh: **92,2%** số trẻ. Thực tế lâm sàng, tỷ lệ vàng da cần can thiệp chỉ khoảng
5–10%. Con số này không phản ánh quần thể thật.

---

## PHẦN 2 — INSIGHT PHỤC VỤ GIÁO DỤC TRẺ TỰ KỶ

Sau khi loại bỏ phần dữ liệu không đáng tin, bốn phát hiện dưới đây **vẫn dùng được**, vì chúng
mô tả **quy trình sàng lọc** (tuổi, kênh sàng lọc, giới tính) — những trường được ghi nhận độc
lập với nhãn bị rò rỉ.

### Insight 1 — Sàng lọc diễn ra quá muộn *(biểu đồ `d3_age.png`)*

| Nhóm tuổi khi sàng lọc | Tỷ lệ |
|---|---|
| 1–3 tuổi — cửa sổ can thiệp sớm | **10,4%** |
| 4–6 tuổi — trước tiểu học | 19,2% |
| 7–18 tuổi — sau tuổi vào lớp 1 | **70,4%** |

Tuổi trung vị khi sàng lọc: **8 tuổi**. Trong nhóm có dấu hiệu ASD, **71,2% được sàng lọc sau
tuổi vào lớp 1**.

> Đồng thuận lâm sàng quốc tế: can thiệp hành vi sớm đạt hiệu quả cao nhất khi bắt đầu trước
> 3–4 tuổi, lúc não bộ còn mềm dẻo. *(Đây là kiến thức nền, không rút ra từ bộ dữ liệu này.)*

**Ý nghĩa giáo dục:** phần lớn trẻ trong mẫu đã bỏ lỡ cửa sổ can thiệp hiệu quả nhất trước khi
hệ thống nhận ra. Giáo viên tiểu học vì vậy thường tiếp nhận trẻ ở giai đoạn can thiệp khó hơn
và tốn kém hơn nhiều.

### Insight 2 — Trường học gần như vắng mặt khỏi quy trình phát hiện *(biểu đồ `d4_pathway.png`)*

| Ai thực hiện sàng lọc | Số lần | Tỷ lệ |
|---|---|---|
| Nhân viên y tế | 738 | 55,5% |
| Người nhà | 573 | 43,1% |
| **Trường học / NGO** | **11** | **0,8%** |
| Tự làm / khác | 7 | 0,5% |

**Ý nghĩa giáo dục:** đây là khoảng trống lớn nhất và cũng dễ lấp nhất. Giáo viên mầm non là
nhóm người lớn **quan sát trẻ nhiều giờ mỗi ngày trong môi trường xã hội có cấu trúc** — đúng
bối cảnh mà dấu hiệu ASD bộc lộ rõ nhất. Nhưng họ hầu như không tham gia sàng lọc.

### Insight 3 — Bé gái được phát hiện muộn hơn 2 năm *(biểu đồ `d4_pathway.png`)*

- Tỷ số nam:nữ trong mẫu: **3,58 : 1**
- Tuổi trung vị khi phát hiện: bé trai **8 tuổi** — bé gái **10 tuổi**

**Ý nghĩa giáo dục:** phù hợp với hiện tượng "ngụy trang xã hội" (camouflaging) đã ghi nhận
trong y văn — bé gái tự kỷ thường bắt chước hành vi xã hội tốt hơn nên bị bỏ sót. Giáo viên cần
được huấn luyện nhận diện biểu hiện ở trẻ gái, vốn kín đáo hơn.

### Insight 4 — Một mục trong bộ công cụ sàng lọc bị hỏng *(biểu đồ `d5_items.png`)*

Chín mục A1–A9 phân biệt rất tốt giữa hai nhóm (chênh lệch trung bình **49,1 điểm %**).
Riêng mục **A10 chỉ chênh 13,1 điểm %** — gần như không phân biệt được.

Ba mục mạnh nhất: **A6 (54,9)**, **A7 (54,4)**, **A9 (54,4)**.

**Ý nghĩa giáo dục:** nếu xây phiếu quan sát rút gọn cho giáo viên, nên ưu tiên các mục A6, A7,
A9, A5 và cân nhắc bỏ A10.
*Lưu ý: bộ dữ liệu không kèm bản mô tả nội dung từng mục — cần đối chiếu với bộ công cụ gốc
(AQ-10 / Q-CHAT-10) trước khi áp dụng.*

---

## PHẦN 3 — ĐỀ XUẤT ỨNG DỤNG

| # | Đề xuất | Căn cứ |
|---|---|---|
| 1 | **Đưa sàng lọc vào trường mầm non** — tập huấn giáo viên dùng phiếu quan sát ngắn, sàng lọc định kỳ lúc trẻ 2–3 tuổi | Insight 1 + 2 |
| 2 | **Xây phiếu quan sát 4–5 mục cho giáo viên**, ưu tiên A6, A7, A9, A5 | Insight 4 |
| 3 | **Huấn luyện riêng về biểu hiện ở trẻ gái** | Insight 3 |
| 4 | **Thiết lập đường chuyển tuyến trường → y tế**: giáo viên nghi ngờ → chuyển chuyên gia, không tự kết luận | Lỗi 2 |
| 5 | **Không bao giờ coi kết quả sàng lọc là chẩn đoán** — phải do chuyên gia xác nhận | Lỗi 2 |

---

## PHẦN 4 — HẠN CHẾ (BẮT BUỘC ĐỌC)

1. **Không suy ra nhân quả.** Dữ liệu cắt ngang tại một thời điểm.
2. **Nhãn ASD là kết quả sàng lọc, không phải chẩn đoán lâm sàng** (xem Lỗi 2).
3. **Không dùng được cho câu hỏi về bệnh đi kèm** (xem Lỗi 1).
4. **Tỷ lệ 63,6% "có dấu hiệu ASD" không phải tỷ lệ mắc trong dân số.** Đây là mẫu đến khám,
   không phải mẫu đại diện. Tỷ lệ ASD thực tế trong dân số khoảng 1–2%.
5. **Không rõ nguồn gốc và bối cảnh quốc gia** của mẫu. Chưa thể suy rộng cho trẻ Việt Nam.
6. Bộ dữ liệu có dấu hiệu được **sinh tổng hợp một phần** (Lỗi 1 và 3) — phù hợp để **luyện tập
   kỹ năng xử lý dữ liệu**, không phù hợp làm căn cứ chính sách.

---

## Cách chạy lại

```bash
pip install pandas numpy matplotlib scipy
cd ma_nguon
python3 quality2.py   # chẩn đoán chất lượng dữ liệu gốc
python3 clean2.py     # làm sạch → xuất du_lieu/asd_treEm_CLEANED.csv
python3 suspect.py    # chứng minh Lỗi 1 (7 biến là bản sao)
python3 insight.py    # toàn bộ số liệu trong báo cáo này
python3 charts2.py    # vẽ lại 5 biểu đồ
```

const B = require("./base.js");
const { Paragraph,AlignmentType,BorderStyle,ShadingType,TextRun,CW,FONT,SZ_H1,C,
  T,sp,PB,body,note,keypt,H1,H2,H3,codeBlock,bull,twoColTable,threeColTable,exTable } = B;

module.exports = [
H1("III","TIỀN XỬ LÝ – LÀM SẠCH DỮ LIỆU"),
body("Đây là yêu cầu số 2 của đề bài, và cũng là bước tốn nhiều thời gian nhất trong thực tế. Người làm dữ liệu chuyên nghiệp thường dành 60–80% thời gian cho khâu này."),

H2("3.1","Vì sao phải làm sạch"),
body("Máy tính không biết phân biệt đúng sai. Nếu trong cột Tuổi có một giá trị 999 do người nhập gõ nhầm, máy vẫn tính trung bình bình thường và cho ra kết quả vô lý. Nếu cột Thành phố có cả “Hà Nội” và “hà nội”, máy coi đó là hai thành phố khác nhau."),
body("Nguyên tắc nền tảng của ngành: rác vào thì rác ra. Phân tích tinh vi đến đâu trên dữ liệu bẩn cũng cho kết luận sai."),

H2("3.2","Bảy lỗi dữ liệu thường gặp"),
body("Bảng dưới liệt kê bảy nhóm lỗi phổ biến nhất, kèm cách phát hiện và cách xử lý. Hãy dùng bảng này như danh sách kiểm tra mỗi khi nhận một bộ dữ liệu mới."),
threeColTable([
  ["1. Giá trị khuyết","Ô trống, hiển thị NaN hoặc null","Đếm số ô khuyết mỗi cột. Dưới 5%: điền bằng trung vị (biến số) hoặc giá trị phổ biến nhất (biến phân loại). Trên 30%: cân nhắc bỏ cả cột."],
  ["2. Bản ghi trùng","Hai dòng giống hệt nhau","Đếm bằng lệnh kiểm tra trùng. Trùng hoàn toàn thì xóa. Lưu ý bỏ cột mã định danh trước khi so sánh."],
  ["3. Cột gần như hằng số","Một giá trị chiếm trên 95% số dòng","Cột này không phân biệt được gì giữa các đối tượng. Thường nên bỏ."],
  ["4. Giá trị ngoài thang đo","Thang 1–5 nhưng xuất hiện số 0 hoặc 7","Kiểm tra giá trị nhỏ nhất và lớn nhất mỗi cột. Chuyển giá trị sai thành khuyết rồi điền lại."],
  ["5. Giá trị bất khả thi","Tuổi 200, điểm trung bình 0, cân nặng âm","Đối chiếu với hiểu biết thực tế. Xử lý như lỗi số 4."],
  ["6. Không nhất quán chữ viết","“Asian” và “asian” bị coi là hai nhóm","Chuẩn hóa chữ hoa/thường, cắt khoảng trắng thừa."],
  ["7. Lỗi nhập liệu / lệch cột","Tên người lọt vào cột Thành phố","Liệt kê các giá trị hiếm của từng cột phân loại. Xem ca thực tế ở mục 3.4."],
], [2400,2500,CW-4900], ["Loại lỗi","Dấu hiệu nhận biết","Cách xử lý"]),

H3("3.2.1","Câu lệnh nhờ AI rà soát bảy lỗi"),
...codeBlock([
  "Hãy rà soát tệp đính kèm theo đúng bảy nhóm lỗi sau,",
  "mỗi nhóm báo rõ: có hay không, ở cột nào, bao nhiêu ô:",
  "",
  "1. Giá trị khuyết       5. Giá trị bất khả thi",
  "2. Bản ghi trùng lặp    6. Chữ hoa/thường không nhất quán",
  "3. Cột gần như hằng số  7. Lỗi nhập liệu, giá trị lạc chỗ",
  "4. Giá trị ngoài thang đo",
  "",
  "Với nhóm 7, hãy liệt kê mọi giá trị xuất hiện dưới 10 lần",
  "ở từng cột phân loại.",
  "",
  "Kèm mã Python cho từng bước kiểm tra.",
]),

H2("3.3","Xóa, sửa hay giữ nguyên"),
body("Khi phát hiện lỗi, bạn có ba lựa chọn. Chọn sai sẽ làm méo kết quả, nên hãy cân nhắc theo bảng sau:"),
threeColTable([
  ["Giữ nguyên","Lỗi không ảnh hưởng tới câu hỏi đang nghiên cứu","Cột Thành phố bẩn nhưng bài của bạn không dùng tới địa lý."],
  ["Sửa giá trị","Lỗi ở mức ô, số lượng ít, còn suy ra được giá trị đúng","“asian” sửa thành “Asian”. Giá trị 0 ngoài thang 1–5 chuyển thành khuyết rồi điền trung vị."],
  ["Xóa dòng","Bản ghi trùng lặp, hoặc dòng hỏng quá nặng","656 dòng trùng hoàn toàn thì phải xóa, nếu giữ sẽ thổi phồng độ tin cậy thống kê."],
  ["Xóa cột","Cột gần như hằng số, hoặc khuyết trên 30%","Cột Nghề nghiệp mà 99,9% ghi “Student” thì không mang thông tin phân biệt."],
], [1900,2800,CW-4700], ["Lựa chọn","Khi nào dùng","Ví dụ thực tế"]),
note("Luôn ghi lại nhật ký tiền xử lý: bước nào, xử lý gì, ảnh hưởng bao nhiêu ô. Đây là phần giảng viên hay hỏi nhất khi chấm bài, và cũng là thứ giúp bạn tự kiểm tra lại khi kết quả có vẻ lạ."),

H2("3.4","Ca thực tế: cột Thành phố chứa tên người"),
body("Bộ dữ liệu Student Depression ở Chương II nhìn rất sạch. Nhưng khi liệt kê các giá trị hiếm của cột City, kết quả như sau:"),
...codeBlock([
  "{'Saanvi': 2, 'Bhavna': 2, 'City': 2, 'Harsha': 2,",
  " 'M.Tech': 1, 'Less Delhi': 1, '3.0': 1,",
  " 'Less than 5 Kalyan': 1, 'Mira': 1, 'Vaanya': 1,",
  " 'Gaurav': 1, 'Reyansh': 1, 'Rashi': 1, 'ME': 1,",
  " 'M.Com': 1, 'Nandini': 1, ...}",
]),
body("Phân tích kết quả này cho thấy ba loại rác khác nhau nằm trong cùng một cột:"),
bull("Tên người: Saanvi, Bhavna, Harsha, Gaurav, Reyansh, Nandini — đây là tên riêng, không phải thành phố."),
bull("Mã bằng cấp: M.Tech, M.Com, ME — thuộc về cột Degree, bị lạc sang."),
bull("Chuỗi lỗi ghép: “Less Delhi”, “Less than 5 Kalyan” — dấu hiệu điển hình của lỗi lệch cột khi nhập liệu, giá trị của cột Sleep Duration bị dính vào tên thành phố."),
body("Tổng cộng 26 ô rác trên 27.901 dòng — chỉ 0,09%, rất nhỏ. Nhưng nó tiết lộ rằng quy trình thu thập dữ liệu có lỗi hệ thống, và nhắc ta phải kiểm tra kỹ các cột còn lại."),
body("Cách xử lý đã dùng: giữ lại 30 thành phố có từ 10 bản ghi trở lên, chuyển 26 giá trị rác thành khuyết rồi điền bằng giá trị phổ biến nhất. Không xóa dòng nào, vì các cột khác của những dòng đó vẫn hợp lệ."),
keypt("Mẹo thực hành: câu lệnh “liệt kê giá trị xuất hiện dưới 10 lần” là công cụ phát hiện lỗi nhập liệu hiệu quả nhất mà bạn có."),

H2("3.5","Bài tập Chương III"),
exTable([
  {num:"III-1",title:"Đếm giá trị khuyết",level:"Dễ",desc:"Với bộ dữ liệu của bạn, lập bảng: tên cột — số ô khuyết — tỷ lệ phần trăm. Sắp xếp giảm dần theo tỷ lệ."},
  {num:"III-2",title:"Tìm cột hằng số",level:"Dễ",desc:"Tìm mọi cột có một giá trị chiếm trên 90% số dòng. Với mỗi cột tìm được, lập luận nên giữ hay nên bỏ."},
  {num:"III-3",title:"Săn giá trị lạc chỗ",level:"TB",desc:"Áp dụng kỹ thuật ở mục 3.4 cho toàn bộ cột phân loại trong dữ liệu của bạn. Báo cáo mọi giá trị đáng ngờ tìm được và phân loại chúng theo ba nhóm rác như trong ca thực tế."},
  {num:"III-4",title:"Viết nhật ký tiền xử lý",level:"TB",desc:"Thực hiện làm sạch dữ liệu và ghi nhật ký theo mẫu: số thứ tự bước — thao tác — lý do — số ô/dòng bị ảnh hưởng — kích thước dữ liệu trước và sau."},
  {num:"III-5",title:"Tranh luận về quyết định xử lý",level:"Khó",desc:"Chọn một quyết định tiền xử lý gây tranh cãi trong bài của bạn (ví dụ: điền khuyết bằng trung vị thay vì xóa dòng). Viết một trang trình bày cả lập luận ủng hộ lẫn lập luận phản đối, sau đó chạy phân tích theo CẢ HAI cách và so sánh kết quả có khác nhau không."},
]),
PB(),
];

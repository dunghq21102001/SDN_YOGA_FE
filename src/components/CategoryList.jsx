import '../css/CategoryList.css'
function CategoryList() {
  return (
    <div className="w-full hidden sm:flex flex-col justify-center items-center">
      <div className="parent">
        <span className='text-[50px] text-[#5e3ad4] font-bold'>Hatha yoga</span>
        <div className="child">
          <p>
          Hầu hết các loại yoga mà đa số người tập hiện nay đều được xếp vào hatha yoga. Đặc điểm chính của loại yoga này là tập trung vào sự liên kết vật lý và kỹ thuật hơi thở nhằm mang lại sự bình an cho tâm trí và cơ thể. Thực tế, ashtanga, vinyasa, iyengar và power yoga cũng được xem như hatha yoga nhưng tốc độ của hatha yoga truyền thống sẽ chậm hơn.

          Hatha yoga là loại yoga phù hợp với những người mới bắt đầu tập. Do phần lớn các tư thế trong hatha yoga đều thuộc loại nhẹ nhàng, chậm rãi, thư thái để bạn có thể tập trung hơn vào việc hít thở và thư giãn. Một nghiên cứu còn chỉ ra rằng phụ nữ tập hatha yoga 1 – 2 lần một tuần có thể giảm căng thẳng nhanh hơn những người không tập.
          </p>
          <button className='main-btn'>
          See Class List
          </button>
        </div>
      </div>

      <div className="parent">
        <span className='text-[50px] text-[#5e3ad4] font-bold'>Iyengar yoga</span>
        <div className="child">
          <p>
            Iyengar yoga là một loại hatha yoga được phát triển bởi BKS Iyengar, một giáo viên yoga hàng đầu trên thế giới. Đây là loại yoga tập trung vào độ chính xác, sự đồng nhất và chi tiết của từng chuyển động. Trong quá trình tập bạn sẽ giữ một tư thế trong một khoảng thời gian dài hoặc đôi khi kết hợp tập với các dụng cụ hỗ trợ như đai tập, gạch tập, gối tập.

            Iyengar yoga có tác dụng tăng sức mạnh, tính linh hoạt và sự ổn định của cơ thể. Ngoài ra, loại hình yoga này cũng có tác dụng điều trị một số bệnh nhất định. Iyengar yoga phù hợp với những người đang phục hồi sau chấn thương, không thể cử động linh hoạt hoặc những người đang gặp vấn đề về xương khớp cần các bài tập nhẹ nhưng cũng đầy thách thức.
          </p>
          <button className='main-btn'>
            See Class List
          </button>
        </div>
      </div>

    </div>
  )
}

export default CategoryList
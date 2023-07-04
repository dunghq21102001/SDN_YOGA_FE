import { useState } from 'react'
import '../../css/UserMnt.css'
import { useEffect } from 'react'
import API from '../../API'
import swal2 from '../../commonFunction/swal2'
import { BsSearch } from 'react-icons/bs'
import commonFunction from '../../commonFunction/func'
import func from '../../commonFunction/func'
function AdminClass() {
  const [list, setList] = useState([])
  const [cateList, setCateList] = useState([])
  const [isCreate, setIsCreate] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [cost, setCost] = useState('')
  const [numberSession, setNumberSession] = useState(10)
  const [note, setNote] = useState("")
  const [userIds, setUserIds] = useState([])
  const [ptIds, setPtIds] = useState([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [classcategories, setClasscategories] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchClass()
    fetchClassCategories()
  }, [])

  const handleParentClick = () => {
    cancelAll()
  }
  const handleChildClick = (event) => {
    event.stopPropagation() // Ngăn chặn sự kiện lan truyền lên phần tử cha
  }



  const cancelAll = () => {
    setIsCreate(false)
    setIsShow(false)
    setIsUpdate(false)
    setId("")
    setName("")
    setDescription("")
    setCost('')
    setNumberSession(10)
    setNote("")
    setUserIds([])
    setPtIds([])
    setStartDate("")
    setEndDate("")
    setClasscategories('')
  }

  const showCreate = () => {
    setIsShow(true)
    setIsCreate(true)
  }

  const fetchClass = () => {
    API.getListClass()
      .then(res => {
        setList(res.data)
      })
      .catch(err => swal2.error(err))
  }

  const fetchClassCategories = () => {
    API.getClassCategoriesList()
      .then(res => {
        setCateList(res.data)
      })
      .catch(err => swal2.error(err))
  }


  const deleteUser = (id) => {
    swal2.confirm(`Are you sure to cancel this class?`).then(result => {
      if (result.value) {
        API.deleteAClass(id)
          .then(res => {
            fetchClass()
            swal2.success('Delete class successful')
          })
          .catch(err => swal2.error(err))
      }
    })
  }

  const createUser = (e) => {
    e.preventDefault()
    if (validateForm()) {
      const aClass = {
        name, cost, description, numberSession, startedDate: startDate, endDate: endDate, note, userIds: [], ptIds: [], classcategories: classcategories
      }
      API.createClass(aClass)
        .then(res => {
          cancelAll()
          fetchClass()
          swal2.success('Create class successful')
        })
        .catch(err => swal2.error(err))
    }
  }

  const showEdit = (id) => {
    setIsUpdate(true)
    setIsShow(true)
    const selectedU = list.find(i => i._id == id)

    setId(selectedU._id)
    setName(selectedU.name)
    setDescription(selectedU.description)
    setCost(selectedU.cost)
    setNumberSession(selectedU.numberSession)
    setNote(selectedU.note)
    setUserIds([])
    setPtIds([])
    setStartDate(selectedU.startedDate)
    setEndDate(selectedU.endDate)
    setClasscategories(selectedU.classcategories._id)
  }
  const validateForm = () => {
    // Lấy các giá trị từ các trường input
    const name = document.getElementById('name').value
    const cost = document.getElementById('cost').value
    const description = document.getElementById('email').value
    const numberSession = document.getElementById('address').value
    const startDate = document.getElementById('start').value
    const endDate = document.getElementById('end').value
    const note = document.getElementById('note').value
    const classcategories = document.getElementById('role').value

    // Kiểm tra tính hợp lệ của các giá trị
    if (name.trim() === '') {
      swal2.error('Please enter a name.')
      return false
    }

    if (cost.trim() === '') {
      swal2.error('Please enter a cost.')
      return false
    }

    // Kiểm tra nếu cost không phải là số
    if (isNaN(cost)) {
      swal2.error('Cost must be a number.')
      return false
    }

    if (cost < 1 || cost > 10000000) {
      swal2.error('The cost you enter must be greater than 0 and less than 100 million VND')
      return false
    }

    if (description.trim() === '') {
      swal2.error('Please enter a description.')
      return false
    }

    if (numberSession.trim() === '') {
      swal2.error('Please enter the number of sessions.')
      return false
    }

    // Kiểm tra nếu numberSession không phải là số
    if (isNaN(numberSession)) {
      swal2.error('Number of sessions must be a number.')
      return false
    }

    if (startDate.trim() === '') {
      swal2.error('Please enter a start date.')
      return false
    }

    if (endDate.trim() === '') {
      swal2.error('Please enter an end date.')
      return false
    }

    if (note.trim() === '') {
      swal2.error('Please enter a note.')
      return false
    }

    if (classcategories.trim() === '') {
      swal2.error('Please select a type')
      return false
    }

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (startDateObj > endDateObj) {
      swal2.error('Start date cannot be later than end date.');
      return false;
    }

    return true
  }

  const updateClass = (e) => {
    if (validateForm()) {
      const aClass = {
        name, cost, description, numberSession, startedDate: startDate, endDate: endDate, note, classcategories: classcategories
      }
      e.preventDefault()
      API.updateClass(id, aClass)
        .then(res => {
          swal2.success('update class successful')
          fetchClass()
          cancelAll()
        })
        .catch(err => swal2.error(err))
    }
  }


  const handleSearch = (e) => {
    e.preventDefault()
    API.searchClass(search)
      .then(res => {
        setList(res.data)
        setSearch('')
      })
      .catch(err => swal2.error(err))
  }

  const handleChangeSort = (e) => {
    if (e.target.value == 1) {
      API.sortClass('asc')
        .then(res => {
          setList(res.data)
        })
        .catch(err => swal2.error(err))
    } else {
      API.sortClass('desc')
        .then(res => {
          setList(res.data)
        })
        .catch(err => swal2.error(err))
    }
  }

  const handleClasscategoriesChange = (e) => {
    setClasscategories(e.target.value)
  }
  return (
    <div className="w-full">
      <div className='flex my-5 justify-around'>
        <select onChange={handleChangeSort} className='w-[20%] bg-gray-200 px-3 py-2' name="" id="">
          <option value="1">A to Z by Name</option>
          <option value="2">Z to A by Name</option>
        </select>
        <form onSubmit={handleSearch} className='relative w-[30%]'>
          <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder='Search by name . . .' className='border-none outline-none px-3 py-2 bg-gray-200 rounded-lg w-full' />
          <BsSearch className='absolute top-[50%] translate-y-[-50%] right-3' />
        </form>
        <button onClick={showCreate} className='main-btn'>Create</button>
      </div>

    
      <div className={` w-[80%] mx-auto overflow-x-scroll`}>
        <table >
          <thead>
            <tr>
              <th><div className='w-[230px]'>Name</div></th>
              <th><div className='w-[160px]'>Cost</div></th>
              <th><div className='w-[300px]'>Description</div></th>
              <th><div className='w-[160px]'>Number Session</div></th>
              <th><div className='w-[160px]'>Start Date</div></th>
              <th><div className='w-[160px]'>End Date</div></th>
              <th><div className='w-[260px]'>PTs</div></th>
              <th><div className='w-[260px]'>Trainees</div></th>
              <th><div className='w-[300px]'>Note</div></th>
              <th><div className='w-[200px]'>Action</div></th>
            </tr>
          </thead>
          <tbody>
            {list.map(i => (
              <tr key={i._id}>
                <td><div className='ml-3'>{i.name}</div></td>
                <td><div className='ml-3'>{commonFunction.convertVND(i.cost)}</div></td>
                <td><div className='ml-3'>{i.description}</div></td>
                <td><div className='ml-3'>{i.numberSession}</div></td>
                <td><div className='ml-3'>{func.convertDate(i.startedDate)}</div></td>
                <td><div className='ml-3'>{func.convertDate(i.endDate)}</div></td>
                <td><div className='ml-3 flex justify-center'>
                  <select className='select-cus' name="" id="">
                    {i.ptIds.map(pt => (
                      <option key={pt._id}>{pt.fullName}</option>
                    ))}
                  </select>
                </div></td>
                <td><div className='ml-3 flex justify-center'>
                  <select className='select-cus' name="" id="">
                    {i.userIds.map(pt => (
                      <option key={pt._id}>{pt.fullName}</option>
                    ))}
                  </select>
                </div></td>
                <td><div className='ml-3'>{i.note}</div></td>
                <td>
                  <div className='flex items-center justify-around my-2'>
                    <button className='edit-btn' onClick={() => showEdit(i._id)}>Edit</button>
                    <button className='delete-btn' onClick={() => deleteUser(i._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isShow
        ? <div className='fog' onClick={handleParentClick}>
          <div onClick={handleChildClick} action="" className='w-[80%] lg:w-[40%] h-[90vh]'>
            <div className='flex flex-col mb-3'>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id='name'
                className='input-cus'
                value={name}  // Binding giá trị từ state name
                onChange={(e) => setName(e.target.value)}  // Cập nhật state name khi giá trị thay đổi
              />
            </div>
            <div className='flex flex-col mb-3'>
              <label htmlFor="cost">Cost</label>
              <input
                type="number"
                id='cost'
                className='input-cus'
                value={cost}  // Binding giá trị từ state cost
                onChange={(e) => setCost(e.target.value)}  // Cập nhật state cost khi giá trị thay đổi
              />
            </div>
            <div className='flex flex-col mb-3'>
              <label htmlFor="email">Description</label>
              <input
                type="text"
                id='email'
                className='input-cus'
                value={description}  // Binding giá trị từ state description
                onChange={(e) => setDescription(e.target.value)}  // Cập nhật state description khi giá trị thay đổi
              />
            </div>
            <div className='flex flex-col mb-3'>
              <label htmlFor="address">Number of Sessions</label>
              <input
                type="number"
                id='address'
                className='input-cus'
                value={numberSession}  // Binding giá trị từ state numberSession
                onChange={(e) => setNumberSession(e.target.value)}  // Cập nhật state numberSession khi giá trị thay đổi
              />
            </div>
            <div className='flex flex-col mb-3'>
              <label htmlFor="start">Start Date</label>
              <input
                type="date"
                id='start'
                className='input-cus'
                value={startDate}  // Binding giá trị từ state startDate
                onChange={(e) => setStartDate(e.target.value)}  // Cập nhật state startDate khi giá trị thay đổi
              />
            </div>
            <div className='flex flex-col mb-3'>
              <label htmlFor="end">End Date</label>
              <input
                type="date"
                id='end'
                className='input-cus'
                value={endDate}  // Binding giá trị từ state endDate
                onChange={(e) => setEndDate(e.target.value)}  // Cập nhật state endDate khi giá trị thay đổi
              />
            </div>
            <div className='flex flex-col mb-3'>
              <label htmlFor="note">Note</label>
              <input
                type="text"
                id='note'
                className='input-cus'
                value={note}  // Binding giá trị từ state note
                onChange={(e) => setNote(e.target.value)}  // Cập nhật state note khi giá trị thay đổi
              />
            </div>
            <div className='flex flex-col mb-3'>
              <label htmlFor="role">Type:</label>
              <select className='select-cus' id="role" value={classcategories} onChange={handleClasscategoriesChange}>
                <option disabled value="">Select a type</option>
                {cateList.map(ca => (
                  <option key={ca._id} value={ca._id}>{ca.name}</option>
                ))}
              </select>
            </div>
            <div className='flex justify-around my-3'>
              <button onClick={cancelAll}>Cancel</button>
              {isUpdate ? <button className='edit-btn' onClick={updateClass}>Update</button> : ''}
              {isCreate ? <button className='main-btn' onClick={createUser}>Create</button> : ''}
            </div>
          </div>

        </div>
        : ''}
    </div>
  )
}

export default AdminClass
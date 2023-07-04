import { useState } from 'react'
import '../../css/UserMnt.css'
import { useEffect } from 'react'
import API from '../../API'
import swal2 from '../../commonFunction/swal2'
import { BsSearch } from 'react-icons/bs'
import { useSelector } from 'react-redux'
function User() {
  const user = useSelector((state) => state.auth)
  const [list, setList] = useState([])
  const [isCreate, setIsCreate] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [id, setId] = useState('');
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState('https://i.stack.imgur.com/l60Hf.png');
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [classesTaught, setClassesTaught] = useState([]);
  const [cart, setCart] = useState(null);
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchUser()
  }, [])

  const handleParentClick = () => {
    cancelAll()
  };
  const handleChildClick = (event) => {
    event.stopPropagation(); // Ngăn chặn sự kiện lan truyền lên phần tử cha
  };

  const validate = () => {
    let isValid = true;

    if (fullName.trim() === '') {
      isValid = false;
      return swal2.error('Full Name is required.')
    }

    if (userName.trim() === '') {
      isValid = false;
      return swal2.error('User Name is required.')
    }

    if (email ? email.trim() == '' : '') {
      isValid = false;
      return swal2.error('Email is required.');
    } else if (!emailIsValid(email)) {
      isValid = false;
      return swal2.error('Email is invalid.');
    }

    if (address ? address.trim() === '' : '') {
      isValid = false;
      return swal2.error('Address is required.');
    }

    if (phone ? phone.trim() === '' : '') {
      isValid = false;
      return swal2.error('Phone is required.');
    } else if (!phoneIsValid(phone)) {
      isValid = false;
      return swal2.error('Phone is invalid.');
    }

    if (role.trim() === '') {
      isValid = false;
      return swal2.error('Role is required.');
    }
    return isValid;
  };

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const phoneIsValid = (phone) => {
    return /^[0-9]{10}$/.test(phone);
  };


  const cancelAll = () => {
    setIsCreate(false)
    setIsShow(false)
    setIsUpdate(false)
    setId('')
    setUserName('')
    setFullName('');
    setEmail('');
    setAddress('');
    setPhone('');
    setRole('');
    setImage('https://i.stack.imgur.com/l60Hf.png');
    setRegisteredCourses([]);
    setClassesTaught([]);
    setCart({});
  }

  const showCreate = () => {
    setIsShow(true)
    setIsCreate(true)
  }

  const handleRoleChange = (event) => {
    setRole(event.target.value)
  }

  const fetchUser = () => {
    API.getUserList()
      .then(res => {
        setList(res.data)
      })
      .catch(err => swal2.error(err))
  }

  const deleteUser = (id) => {
    if (user.auth._id == id) return swal2.error("You can't delete yourself")
    swal2.confirm(`Are you sure to delete this user?`).then(result => {
      if (result.value) {
        API.deleteUser(id)
          .then(res => {
            fetchUser()
            swal2.success('Delete user successful')
          })
          .catch(err => swal2.error(err))
      }
    })
  }

  const updateUser = (e) => {
    e.preventDefault()
    if (validate()) {
      const user = {
        userName, fullName, email, address, phone, role
      }
      API.updateUser(id, user)
        .then(res => {
          swal2.success('Update successful')
          fetchUser()
          cancelAll()
        })
        .catch(err => swal2.error(err))
    }
  }

  const createUser = (e) => {
    e.preventDefault()
    if (validate()) {
      const user = {
        userName, fullName, email, address, phone, role, image, registeredCourses, classesTaught, createdDate: new Date().toLocaleString(), cart: null, password: "1"
      }
      API.register(user)
        .then(res => {
          if (res.data?.error) {
            return swal2.error(res.data.error)
          } else {
            fetchUser()
            swal2.success('Create a user successful')
            cancelAll()
          }
        })
        .catch(err => swal2.error(err))
    }
  }

  const showEdit = (id) => {
    setIsUpdate(true)
    setIsShow(true)
    const selectedU = list.find(i => i._id == id)

    setId(selectedU._id)
    setUserName(selectedU.userName)
    setFullName(selectedU.fullName);
    setEmail(selectedU.email);
    setAddress(selectedU.address);
    setPhone(selectedU.phone);
    setRole(selectedU.role);
  }

  const handleSearch = (e) => {
    e.preventDefault()
    API.searchUser(search)
      .then(res => {
        setList(res.data)
        setSearch('')
      })
      .catch(err => swal2.error(err))
  }

  const handleChangeSort = (e) => {
    if (e.target.value == 1) {
      API.sortUsersASC()
        .then(res => {
          setList(res.data)
        })
        .catch(err => swal2.error(err))
    } else {
      API.sortUsersDESC()
        .then(res => {
          setList(res.data)
        })
        .catch(err => swal2.error(err))
    }
  }
  return (
    <div className="w-full">
      <div className='flex my-5 justify-around'>
        <select onChange={handleChangeSort} className='w-[20%] bg-gray-200 px-3 py-2' name="" id="">
          <option value="1">A to Z by Full Name</option>
          <option value="2">Z to A by Full Name</option>
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
              <th><div className='w-[200px]'>User Name</div></th>
              <th><div className='w-[200px]'>Role</div></th>
              <th><div className='w-[200px]'>Full Name</div></th>
              <th><div className='w-[200px]'>Email</div></th>
              <th><div className='w-[370px]'>Address</div></th>
              <th><div className='w-[160px]'>Phone</div></th>
              <th><div className='w-[200px]'>Action</div></th>
            </tr>
          </thead>
          <tbody>
            {list.map(i => (
              <tr key={i._id}>
                <td><div className='ml-3'>{i.userName}</div></td>
                <td><div className='ml-3'>{i.role}</div></td>
                <td><div className='ml-3'>{i.fullName}</div></td>
                <td><div className='ml-3'>{i.email}</div></td>
                <td><div className='ml-3'>{i.address}</div></td>
                <td><div className='text-center'>{i.phone}</div></td>
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
          <div onClick={handleChildClick} action="" className='w-[80%] lg:w-[40%]'>
            <h1 className='text-center'>{isCreate ? "Create User" : "Update User"}</h1>
            <div className='flex flex-col mb-3'>
              <label htmlFor="name">User Name</label>
              <input
                type="text"
                id='name'
                className='input-cus'
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>
            <div className='flex flex-col mb-3'>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id='name'
                className='input-cus'
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </div>
            <div className='flex flex-col mb-3'>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id='email'
                className='input-cus'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className='flex flex-col mb-3'>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id='address'
                className='input-cus'
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <div className='flex flex-col mb-3'>
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id='phone'
                className='input-cus'
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div className='flex flex-col mb-3'>
              <label htmlFor="role">Role:</label>
              <select className='select-cus' id="role" value={role} onChange={handleRoleChange}>
                <option disabled value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="pt">PT</option>
              </select>
            </div>
            <div className='flex justify-around my-3'>
              <button onClick={cancelAll}>Cancel</button>
              {isUpdate ? <button className='edit-btn' onClick={updateUser}>Update</button> : ''}
              {isCreate ? <button className='main-btn' onClick={createUser}>Create</button> : ''}
            </div>
          </div>
        </div>
        : ''}
    </div>
  )
}

export default User
import { useState } from 'react'
import API from '../../API'
import swal2 from '../../commonFunction/swal2'
import { useEffect } from 'react'
function AdminContact() {
  const [list, setList] = useState([])

  useEffect(() => {
    fetchList()
  }, [])

  const fetchList = () => {
    API.getListContact()
      .then(res => {
        setList(res.data)
      })
      .catch(err => swal2.error(err))
  }

  const handleDelete = (id) => {
    swal2.confirm("Are you sure to delete this contact?").then(result => {
      if (result.value) {
        API.deleteContact(id)
          .then(res => {
            fetchList()
            swal2.success('Delete contact successful')
          })
          .catch(err => swal2.error(err))
      }
    })
  }
  return (
    <div className='w-full'>
      <div className={` w-[80%] mx-auto overflow-x-scroll`}>
        <table >
          <thead>
            <tr>
              <th><div className='w-[160px]'>Full Name</div></th>
              <th><div className='w-[160px]'>Email</div></th>
              <th><div className='w-[160px]'>Phone</div></th>
              <th><div className='w-[400px]'>Message</div></th>
              <th><div className='w-[200px]'>Action</div></th>
            </tr>
          </thead>
          <tbody>
            {list.map(i => (
              <tr key={i._id}>
                <td><div className='ml-3'>{i.fullName}</div></td>
                <td><div className='ml-3'>{i.email}</div></td>
                <td><div className='ml-3'>{i.phone}</div></td>
                <td><div className='ml-3'>{i.message}</div></td>
                <td>
                  <div className='flex items-center justify-around my-2'>
                    <button className='delete-btn' onClick={() => handleDelete(i._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminContact
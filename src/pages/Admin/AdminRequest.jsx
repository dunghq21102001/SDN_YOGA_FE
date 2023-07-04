import { useEffect, useState } from "react"
import API from "../../API"
import swal2 from "../../commonFunction/swal2"
import func from "../../commonFunction/func"

function AdminRequest() {
    const [list, setList] = useState([])

    useEffect(() => {
        fetchList()
    }, [])

    const fetchList = () => {
        API.getListRequest()
            .then(res => {
                setList(res.data)
            })
            .catch(err => swal2.error(err))
    }

    const handleApprove = (classId, ptId, role, requestId) => {
        if (role == 'user') {
            API.addUserToClass(classId, ptId)
                .then(res => {
                    API.deleteRequest(requestId)
                        .then(res => {
                            fetchList()
                            swal2.success('Approve successful')
                        })
                        .catch(err => swal2.error(err))
                })
                .catch(err => swal2.error(err))
        }
        else {
            API.addPTToClass(classId, ptId)
                .then(res => {
                    API.deleteRequest(requestId)
                        .then(res => {
                            fetchList()
                            swal2.success('Approve successful')
                        })
                        .catch(err => swal2.error(err))
                })
                .catch(err => swal2.error(err))
        }
    }

    const handleDelete = (id) => {
        swal2.confirm("Are you sure to delete this request?").then(result => {
            if (result.value) {
                API.deleteRequest(id)
                    .then(res => {
                        fetchList()
                        swal2.success('Delete request successful')
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
                            <th><div className='w-[160px]'>Class</div></th>
                            <th><div className='w-[300px]'>Request detail</div></th>
                            <th><div className='w-[300px]'>Date of request</div></th>
                            <th><div className='w-[300px]'>Action</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map(i => (
                            <tr key={i._id}>
                                <td><div className='ml-3'>{i.user.fullName}</div></td>
                                <td><div className='ml-3'>{i.user.email}</div></td>
                                <td><div className='ml-3'>{i.class.name}</div></td>
                                <td><div className='ml-3'>{i.requestDetails}</div></td>
                                <td><div className='ml-3 text-center'>{func.convertDate(i.createdAt)}</div></td>
                                <td>
                                    <div className='flex items-center justify-around my-2'>
                                        <button className='main-btn' onClick={() => handleApprove(i.class?._id, i.user?._id, i.user?.role, i._id)}>Approve</button>
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

export default AdminRequest
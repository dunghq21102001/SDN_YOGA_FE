import Swal from 'sweetalert2'

class swal2 {
    static success(message, time = 1500) {
        Swal.fire({
            toast: true,
            showConfirmButton: false,
            position: 'top-end',
            timer: time,
            icon: 'success',
            timerProgressBar: true,
            title: message,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    }
    static error(message, time = 2000) {
        Swal.fire({
            toast: true,
            showConfirmButton: false,
            position: 'top-end',
            timer: time,
            icon: 'error',
            timerProgressBar: true,
            title: message,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    }
    static confirm(type, mess = '') {
        return Swal.fire({
            text: `${mess} ${type}`,
            icon: "warning",
            cancelButtonText: 'No',
            showCancelButton: true,
            confirmButtonColor: '#f38021',
            cancelButtonColor: '#b6d9ff',
            confirmButtonText: 'Yes'
        })
    }
}

export default swal2

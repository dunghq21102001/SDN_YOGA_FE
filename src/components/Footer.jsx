import '../css/Footer.css'
import API from '../API'
import swal2 from '../commonFunction/swal2'

function Footer() {
  const handleForm = (e) => {
    e.preventDefault()
  }

  return (
    <div className="w-full bg-[#5e3ad4] min-h-screen">
      <div className="w-[80%] mx-auto flex justify-around flex-col sm:flex-row">
        <div className="text-white w-full sm:w-2/5 mt-8">
          <h1 className="text-[30px]">Lets Get Moving</h1>
          <h5 className="text-[20px]">Sign Up For Updates</h5>
          <form onClick={handleForm} className="w-full relative" action="">
            <div className="input-container">
              <input placeholder="Full Name" className="input-field" type="text" />
              <label htmlFor="input-field" className="input-label">Full Name</label>
              <span className="input-highlight"></span>
            </div>
            <div className="input-container">
              <input placeholder="Email" className="input-field" type="text" />
              <label htmlFor="input-field" className="input-label">Email</label>
              <span className="input-highlight"></span>
            </div>
            <div className="input-container">
              <input placeholder="Password" className="input-field" type="text" />
              <label htmlFor="input-field" className="input-label">Password</label>
              <span className="input-highlight"></span>
            </div>
            <button className='absolute right-0 bottom-[-50px] hover:text-gray-400'>
              Submit
            </button>
          </form>
        </div>
        <div className='mt-24 w-full sm:w-2/5 sm:mt-8'>
          <h1 className='text-white text-[20px]'>
            500 Terry Francine Street
            San Francisco, CA 94158
            Email: info@mysite.com
          </h1>
          <div className='line'></div>
          <h5 className='text-white'>
            Tel: 123-456-7890   I    Fax: 123-456-7890
          </h5>
        </div>
      </div>
    </div>
  )
}

export default Footer
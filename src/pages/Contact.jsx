import { useState } from 'react'
import swal2 from '../commonFunction/swal2'
import API from '../API'
import '../css/Contact.css'
function Contact() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const submitForm = (e) => {
        e.preventDefault()
        if (validateForm()) {
            const data = {
                fullName, email, phone, message
            }
            API.createContact(data)
                .then(res => {
                    swal2.success('You have successfully sent us, please check your mail regularly to see our response', 3500)
                    setEmail("")
                    setFullName("")
                    setMessage("")
                    setPhone("")
                })
                .catch(err => swal2.error(err))


        }

    }
    const validateForm = () => {
        if (!fullName.trim() || !email.trim() || !phone.trim() || !message.trim()) {
            swal2.error('Please enter full fields!!')
            return false
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            swal2.error('Please enter valid email!!')
            return false
        }
        if (!/^\d{10}$/.test(phone)) {
            swal2.error('Please enter valid phone!!')
            return false
        }
        return true
    }
    return (
        <div className="w-full mt-24 min-h-[80vh]">
            <div className="w-[90%] mx-auto">
                <div className="w-[50%] mx-auto">
                    <form id="contact" onSubmit={submitForm}>
                        <h3>YOGA Center Contact Form</h3>
                        <h4>Contact us for custom quote</h4>
                        <fieldset>
                            <input
                                placeholder="Your Full Name"
                                type="text"
                                tabIndex="1"
                                autoFocus
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </fieldset>
                        <fieldset>
                            <input
                                placeholder="Your Email Address"
                                type="text"
                                tabIndex="2"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </fieldset>
                        <fieldset>
                            <input
                                placeholder="Phone"
                                type="text"
                                tabIndex="3"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </fieldset>
                        <fieldset>
                            <textarea
                                placeholder="Type your message here...."
                                tabIndex="4"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </fieldset>
                        <fieldset>
                            <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">
                                Submit
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact
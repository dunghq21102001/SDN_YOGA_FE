import '../css/About.css'
function About() {
    return (
        <div className="w-full">
            <div className="w-full h-screen relative">
                <div className="fixed-bg-about w-1/2 h-screen background-custom-about">
                </div>

                <div className="scroll-bg-about text-[20px] sm:text-[30px]">
                    <p className='font-bold'>At Yoga Center, we believe that yoga is an incredible way to create balance and connection between the body, mind, and spirit.</p>
                </div>
            </div>

            <div className="w-full h-screen relative">
                <div className="fixed-bg-about2 w-1/2 h-screen background-custom-about2">
                </div>

                <div className="scroll-bg-about2 text-[20px] sm:text-[30px]">
                    <p className='font-bold'>Our studio is designed to provide a calm and inviting atmosphere, where you can escape the stresses of daily life and focus on your practice.</p>
                </div>
            </div>
        </div>
    )
}

export default About
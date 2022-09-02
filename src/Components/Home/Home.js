import { useState } from 'react'
import Welcome from '../Welcome/Welcome'
import PopupMenu from '../PopupMenu/PopupMenu'

const Home = ({socket, password, setPassword}) => {
    const [popup, setPopup] = useState("")




    return(
        <>
            {popup ? <PopupMenu popup={popup} setPopup={setPopup} socket={socket} password={password} setPassword={setPassword} /> : <Welcome setPopup={setPopup} />}
        </>
    )
}

export default Home
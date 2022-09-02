import { useState } from "react"

const PopupMenu = ({popup, setPopup, socket, password, setPassword}) => {
    const [room, setRoom] = useState("")
    const [duration, setDuration] = useState("0")
    const [messageHistory, setMessageHistory] = useState(false)
    const [error, setError] = useState("")


    const joinRoom = () => {
        if (room) {
            if (popup === "create") {
                socket.emit("create room", {room, password, duration, messageHistory})
            } else if (popup === "join") {
                socket.emit("join room", {room, password})
            }
        } else {
            setError("Room name is required!")
        }
    }

    return(
            <div className="relative b--dashed pr4 pl4 bg-black">
                <div className="flex items-center">
                    <h3  className="mr6">{popup === 'create' ? "Create" : "Join"} Room</h3>
                    <p className="ml-auto pointer b--dashed pr2 pl2" onClick={() => setPopup(false)}>X</p>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td className="tl"><label htmlFor="room">Room Name</label></td>
                            <td>:</td>
                            <td><input className="bg-transparent input outline-0" type="text" name="room" id="room" placeholder="Enter Room Name" onInput={event => setRoom(event.target.value)} /></td>
                        </tr>
                        {popup === "create" && 
                        <tr>
                            <td className="tl"><label htmlFor="duration">Duration</label></td>
                            <td>:</td>
                            <td>
                                <select className="dib b--dashed input bg-transparent outline-0" name="duration" id="duration" defaultValue="0" onChange={event => setDuration(event.target.value)}>
                                    <option value="0">Don't Save</option>
                                    <option value="1h">1 Hour</option>
                                    <option value="1d">1 Day</option>
                                    <option value="7d">7 Days</option>
                                    <option value="1m">1 Month</option>
                                </select>
                            </td>
                        </tr>
                        }
                        {(duration !== "0" || popup === "join") && 
                        <tr>
                            <td className="tl"><label htmlFor="password">Password</label></td>
                            <td>:</td>
                            <td><input className="bg-transparent input outline-0" type="password" name="password" id="password" placeholder="Enter Password" onInput={event => setPassword(event.target.value)} /></td>
                        </tr>}
                    </tbody>
                </table>
                <table>
                    <tbody>
                        {popup === "create" && duration !== "0" &&
                            <tr>
                                <td className="tl flex items-center">
                                    <span className={"checkbox hover " + messageHistory} onClick={() => setMessageHistory(!messageHistory)}></span>
                                    <label className="pl4 pointer" htmlFor="message_history" onClick={() => setMessageHistory(!messageHistory)}>Message History</label>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
                <p className="red">{error}</p>
                <div className="ma4 center pa2 pointer b--dashed w-25 hover" onClick={joinRoom} >{popup === 'create' ? "Create" : "Join"}</div>
            </div>
    )
}

export default PopupMenu
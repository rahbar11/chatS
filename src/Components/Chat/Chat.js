import { useCallback, useEffect, useRef, useState } from "react"
import Crypto from "crypto-js";

const Chat = ({currentRoom, setCurrentRoom, socket, setError, password}) => {
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("");
    const [encKey, setEncKey] = useState("");
    const [decKey, setDecKey] = useState("");
    const input = useRef();
    const chatBottom = useRef();


    const decryptMessages = useCallback((messages, decKey) => {
        let decMsgs = []
        messages.forEach((message, index) => {
            try {
                const decMsg = Crypto.AES.decrypt(message, decKey).toString(Crypto.enc.Utf8)
                if (decMsg) {
                    decMsgs.push(<div className="bg-black w-100 f6" key={index}><p className="pa1 ma1 b--dashed">{decMsg}</p></div>)
                }
            } catch {
                return
            }
        })
        return decMsgs
    }, [])

    useEffect(() => {
        socket.on("history", ({msgs}) => {
            if (msgs) {
                setMessages(msgs)
            }
        })
        socket.on("msg", ({msg}) => {
            let newMsgs = [...messages];
            newMsgs.push(msg)
            setMessages(newMsgs)
        })
        socket.on("left", () => {setCurrentRoom("")})
        return () => {
            socket.off("history")
            socket.off("msg")
            socket.off("left")
        }
    }, [messages, socket, decKey, setCurrentRoom])

    useEffect(() => {
        socket.emit("history", {room: currentRoom, password});
    }, [currentRoom, password, socket])

    useEffect(() => {
        chatBottom.current.scrollIntoView()
    }, [messages, decKey])
    
    const sendMsg = () => {
        if (encKey) {
            const encMsg = Crypto.AES.encrypt(msg, encKey).toString()
            socket.emit("msg", {msg: encMsg, room: currentRoom, password})
            setMsg("")
            input.current.value = ""
        } else {
            setError("please enter encryption key first!")
            setTimeout(() => setError(""), 5000)
        }
    }

    return(
            <div>
                <div className="bg-black fixed top-0 left-0 w-100 flex justify-center mobile" style={{gap: "10px", zIndex: "10"}}>
                    <div>
                        <span className="tl"><label htmlFor="enc">Encryption Key</label></span>
                        <span>:</span>
                        <span><input className="bg-transparent input tc outline-0" type="password" name="enc" id="enc" placeholder="Enter Encryption Key" onInput={event => setEncKey(event.target.value)} /></span>
                    </div>
                    <div>
                        <span className="tl"><label htmlFor="dec">Decryption Key</label></span>
                        <span>:</span>
                        <span><input className="bg-transparent input tc outline-0" type="password" name="dec" id="dec" placeholder="Enter Decryption Key" onInput={event => setDecKey(event.target.value)} /></span>
                    </div>
                </div>
                <div className="fixed flex flex-column left-0 w-100 overflow-y-auto" style={{bottom: "19%", height: "72%", gap: "5px"}}>
                    {decryptMessages(messages, decKey)}
                    <div height="0px" ref={chatBottom}></div>
                </div>
                <div className="bg-black fixed bottom-0 left-0 w-100 flex" style={{height: "17%", zIndex: "10"}}>
                    <textarea className="bg-transparent input outline-0 ma2 w-75" ref={input} onInput={event => setMsg(event.target.value)}></textarea>
                    <div className="ma4 center pa2 pointer b--dashed hover" onClick={sendMsg} >Send</div>
                </div>
            </div>
    )
}

export default Chat
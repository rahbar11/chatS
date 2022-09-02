const Welcome = ({setPopup}) => {
    return(
        <>
            <h1 className="fw1">Welcome to chatS</h1>
            <div className="flex" style={{gap: "10px"}}>
                <div className="bg-black pointer hover shadow-5" onClick={() => setPopup("create")}>
                    <div className="bg-black pa2 ma1 b--dashed" >Create Room</div>
                </div>
                <div className="bg-black pointer hover shadow-5" onClick={() => setPopup("join")}>
                    <div className="bg-black pa2 ma1 b--dashed" >Join Room</div>
                </div>
            </div>
        </>
    )
}

export default Welcome
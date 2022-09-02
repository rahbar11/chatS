const Error = ({error}) => {
    return(
            <div className="bg-black shadow-5 absolute top-0 left-0 red z-999">
                <div className="bg-black pa2 ma1 b--dashed" >{error}</div>
            </div>
    )
}

export default Error
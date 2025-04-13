import "./StatusMessage.css";

function StatusMessage ( {statusState, type="error", content, className} ) {
    return(
        <>
            {statusState &&
                <div className={`status-message status-${type} ${className}`}>
                    <h3> {content} </h3>
                    {type === "loading" && <div className="loading-dots"></div>}
                </div> }
        </>
    )
}

export default StatusMessage
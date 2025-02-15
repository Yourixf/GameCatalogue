import "./StatusMessage.css";

function StatusMessage ( {statusState, type="error", content, className} ) {
    return(
        <>
            {statusState &&
                <h3 className={`status-message status-${type} ${className}`}>
                    {content}
                </h3> }
        </>

    )
}

export default StatusMessage
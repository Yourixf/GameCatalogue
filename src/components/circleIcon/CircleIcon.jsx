import "./CircleIcon.css";

function CircleIcon ({onClick, className="", iconPictureSource=""}) {
    return (
        <div onClick={onClick} className={"circle-icon-main " + className}>
            <img className="circle-icon-picture" src={iconPictureSource} alt={className}/>
        </div>
    
    )
}

export default CircleIcon;
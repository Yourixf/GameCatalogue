import "./CircleIcon.css";

function CircleIcon ({onClick, className="", iconPictureSource="", title="icon"}) {
    return (
        <div onClick={onClick} className={"circle-icon-main " + className} title={title}>
            <img className="circle-icon-picture" src={iconPictureSource} alt={className}/>
        </div>
    
    )
}

export default CircleIcon;
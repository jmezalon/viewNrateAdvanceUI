import "./Forbidden.css"

export default function Forbidden({ message= "You are not allowed to access that!"}) {
    return (
        <div className="forbidden">
            <h2>403 Forbidden</h2>
            <p>{message}</p>
        </div>
    )
}
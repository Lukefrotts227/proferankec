

export const ProfessorCard = ({ professor }) => {
    return (
        <div>
            <h2>{professor.name}</h2>
            <p>{professor.department}</p>
            <p>{professor.rating}</p>
        </div>
    )
}
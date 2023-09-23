const Course = ({ courses }) => {
    return (
        courses.map(course =>
            <div key={course.id}>
                <Header name={course.name} />
                <Content parts={course.parts} />
            </div>
        )
    )
}

const Header = ({ name }) => {
    return (
        <h1>{name}</h1>
    )
}

const Content = ({ parts }) => {
    const initialValue = 0
    const totalExercises = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, initialValue);

    return (
        <>
            {parts.map(part =>
                <Part key={part.id} part={part} />
            )}
            <b>total of {totalExercises} exercises</b>
        </>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

export default Course
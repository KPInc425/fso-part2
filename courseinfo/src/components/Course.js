const Header = (props) => {
    return (
        <div>
        <h1>{props.course.name}</h1> 
        </div>
    )
}
  
const Part = (props) => {
    return (
        <div>
        <p>
            {props.part.name} {props.part.exercises}
        </p>
        </div>
    )
}
const Content = ({ parts }) => {
    return (
        <div>
        { parts.map((part) => <Part key={ part.id } part={ part } />)}
        </div>
    )
}

const Total = ({ parts }) => {

    let total = parts.reduce((sum, part) => {
        return sum + part.exercises;
    }, 0)

    return (
        <div>
        <p><strong>Total number of exercises {total}</strong></p>
        </div>
    )
}

const Course = ({ course }) => {
    return (
    <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
    )
}

export default Course;
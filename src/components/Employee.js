function Employee(props)
{
    return (
        <>
            <h3 className="text-3xl font-bold underline">Employee {props.name}</h3>
            <p>{props.role ? props.role : 'No role'}</p>
            {props.role ? <p>{props.role}</p> : <p>No roll</p>}
        </>
    )
}
export default Employee;
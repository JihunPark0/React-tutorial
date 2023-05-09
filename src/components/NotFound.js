export default function NotFound(props) {
  return (
    <p>
      Page you're looking for{" "}
      {props.id ? <>with the customer id {props.id}</> : null} is not found
    </p>
  );
}

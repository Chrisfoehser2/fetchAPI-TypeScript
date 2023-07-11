import Select from "react-select";

export default function SearchFilters(props) {
  const options =
    props.data &&
    props.data?.map((data) => {
      return { value: data, label: data };
    });

  return (
    <div className="dropdown-container">
      <h4>{props.name}</h4>
      <Select options={options} isSearchable={true} {...props} />
    </div>
  );
}

import Select from "react-select";

interface SearchFiltersProps {
  name: string;
  // @ts-expect-error -- TODO: Cannot find name 'ICity'.
  data?: any[] | string[] | ICity[];
  value?:
    | { value: number; label: number }[]
    | { value: string; label: string }[]
    | any[];
  onChange:
    | React.Dispatch<React.SetStateAction<{ value: number; label: number }>>
    | React.Dispatch<React.SetStateAction<{ value: string; label: string }>>
    | ((data: any) => void);
  options?: { value: string; label: string }[];
  placeholder?: string;
  isMulti?: boolean;
  isClearable?: boolean;
}

export default function SearchFilters(props: SearchFiltersProps) {
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

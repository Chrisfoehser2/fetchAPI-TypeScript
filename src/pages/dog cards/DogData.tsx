interface DogDataProps {
  dog: {
    id: string;
    img: string;
    breed: string;
    name: string;
    age: number;
    zip_code: string;
  };
  isSelected?: any;
  onSelect?: (id: string) => void;
}

// dog: {} | any
import "./dogs.css";

export default function DogData({ dog, isSelected, onSelect }: DogDataProps) {
  const handleSelect = (id: string) => {
    if (onSelect) {
      onSelect(id);
    }
  };

  return (
    <div
      className={` card-container ${isSelected ? "dog-card-selected" : ""}`}
      onClick={() => handleSelect(dog.id)}
    >
      <img src={dog.img} />

      <div className="dog-info">
        {dog.breed}
        <br />
        Name: {dog.name}
        <br />
        Age: {dog.age}
        <br />
        Zipcode: {dog.zip_code}
      </div>
    </div>
  );
}

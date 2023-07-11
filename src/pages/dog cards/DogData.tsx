import "./dogs.css";

export default function DogData({ dog, isSelected, onSelect }) {
  const handleSelect = (id) => {
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

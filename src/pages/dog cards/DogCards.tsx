interface dogProps {
  dogs: any[];
  selectedDogCards: any[];
  // @ts-expect-error -- TODO: Cannot find name 'Dispatch'. Cannot find name 'SetStateAction'.
  setSelectedDogCards: Dispatch<React.SetStateAction<any[]>>;
}

import DogData from "./DogData";
import "./dogs.css";

export default function dog({
  dogs,
  selectedDogCards,
  setSelectedDogCards,
}: dogProps) {
  if (dogs.length === 0) {
    return (
      <div>
        <h4>Oops, No Dogs Found!</h4>
      </div>
    );
  }

  const handleCardSelect = (id: string) => {
    if (!selectedDogCards.includes(id)) {
      setSelectedDogCards([...selectedDogCards, id]);
    } else {
      setSelectedDogCards(selectedDogCards.filter((cardId) => cardId !== id));
    }
  };

  return (
    <div className="card-grid">
      {dogs.map((dog) => (
        <div key={dog.id} id={dog.id}>
          <DogData
            dog={dog}
            isSelected={selectedDogCards.includes(dog.id)}
            onSelect={handleCardSelect}
          />
        </div>
      ))}
    </div>
  );
}

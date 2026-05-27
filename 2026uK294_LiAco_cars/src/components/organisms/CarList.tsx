import type { Car } from "../../service/api";
import CarListItem from "../molecules/CarListItem";

type CarListProps = {
  cars: Car[];
  onDelete: (id?: number) => void;
};

export default function CarList({ cars, onDelete }: CarListProps) {
  return (
    <ul className="list">
      {cars.map((car) => (
        <CarListItem key={car.id} car={car} onDelete={onDelete} />
      ))}
    </ul>
  );
}
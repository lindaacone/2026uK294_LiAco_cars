import { Link } from "react-router-dom";
import type { Car } from "../../service/api";
import Button from "../atoms/Button";


type CarListItemProps = {
  car: Car;
  onDelete: (id?: number) => void;
};

export default function CarListItem({ car, onDelete }: CarListItemProps) {
  return (
    <li className="list-item">
      {car.name} ({car.year}){" "}
      <Link to={`/objects/${car.id}`}>Details</Link>{" "}
      <Link to={`/objects/${car.id}/edit`}>Bearbeiten</Link>{" "}
      <Button onClick={() => onDelete(car.id)}>Löschen</Button>
    </li>
  );
}
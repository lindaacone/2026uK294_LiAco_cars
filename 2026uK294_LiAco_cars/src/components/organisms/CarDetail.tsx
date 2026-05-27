import { Link } from "react-router-dom";
import DetailRow from "../molecules/DetailRow";
import type { Car } from "../../service/api";

type CarDetailProps = {
  car: Car;
};

export default function CarDetail({ car }: CarDetailProps) {
  return (
    <>
      <DetailRow label="ID" value={car.id} />
      <DetailRow label="Name" value={car.name} />
      <DetailRow label="Jahr" value={car.year} />
      <DetailRow label="Origin" value={car.origin} />

      <div className="actions">
        <Link to="/objects">Zurück</Link>
        <Link to={`/objects/${car.id}/edit`}>Bearbeiten</Link>
      </div>
    </>
  );
}
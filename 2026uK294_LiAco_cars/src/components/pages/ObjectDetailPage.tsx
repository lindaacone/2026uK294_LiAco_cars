import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCar, type Car } from "../../service/api";

export default function ObjectDetailPage() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    async function loadCar() {
      if (!id) return;

      const data = await getCar(id);
      setCar(data);
    }

    void loadCar();
  }, [id]);

  if (!car) {
    return <p>Lädt...</p>;
  }

  return (
    <div>
      <h1>Details</h1>

      <p>ID: {car.id}</p>
      <p>Name: {car.name}</p>
      <p>Jahr: {car.year}</p>
      <p>Origin: {car.origin}</p>

      <Link to="/objects">Zurück</Link>{" "}
      <Link to={`/objects/${car.id}/edit`}>Bearbeiten</Link>
    </div>
  );
}
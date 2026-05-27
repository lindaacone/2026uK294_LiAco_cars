import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCar, type Car } from "../../service/api";

export default function ObjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    async function loadCar() {
      if (!id) return;

      try {
        const data = await getCar(id);
        setCar(data);
      } catch {
        alert("Auto konnte nicht geladen werden");
        navigate("/objects");
      }
    }

    void loadCar();
  }, [id, navigate]);

  if (!car) {
    return <p>Lädt...</p>;
  }

  return (
    <div className="page">
      <h1>Details</h1>

      <p>ID: {car.id}</p>
      <p>Name: {car.name}</p>
      <p>Jahr: {car.year}</p>
      <p>Origin: {car.origin}</p>

      <div className="actions">
        <Link to="/objects">Zurück</Link>
        <Link to={`/objects/${car.id}/edit`}>Bearbeiten</Link>
      </div>
    </div>
  );
}
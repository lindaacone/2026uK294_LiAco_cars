import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteCar, getCars, type Car } from "../../service/api";

export default function ObjectListPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const navigate = useNavigate();

  async function loadCars() {
    const data = await getCars();
    setCars(data);
  }

  function handleLogout() {
    localStorage.removeItem("accessToken");
    navigate("/login");
  }

  async function handleDelete(id?: number) {
    if (!id) return;

    await deleteCar(id);
    await loadCars();
  }

  useEffect(() => {
    async function fetchCars() {
      const data = await getCars();
      setCars(data);
    }

  void fetchCars();
}, []);

  return (
    <div>
      <h1>Cars</h1>

      <button onClick={handleLogout}>Logout</button>

      <br />

      <Link to="/objects/create">Neues Auto erstellen</Link>

      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.name} ({car.year}){" "}
            <Link to={`/objects/${car.id}`}>Details</Link>{" "}
            <Link to={`/objects/${car.id}/edit`}>Bearbeiten</Link>{" "}
            <button onClick={() => handleDelete(car.id)}>Löschen</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
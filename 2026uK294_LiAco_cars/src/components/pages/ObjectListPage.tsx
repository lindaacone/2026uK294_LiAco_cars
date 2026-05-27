import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button";
import Heading from "../../components/atoms/Heading";
import CarList from "../../components/organisms/CarList";
import PageLayout from "../../components/templates/PageLayout";
import { deleteCar, getCars, type Car } from "../../service/api";

export default function ObjectListPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const navigate = useNavigate();

  async function loadCars() {
    try {
      const data = await getCars();
      setCars(data);
    } catch {
      alert("Autos konnten nicht geladen werden");
    }
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const data = await getCars();
        setCars(data);
      } catch {
        alert("Autos konnten nicht geladen werden");
      }
    }

  void fetchCars();
}, []);

  function handleLogout() {
    localStorage.removeItem("accessToken");
    navigate("/login");
  }

  async function handleDelete(id?: number) {
    if (!id) return;

    try {
      await deleteCar(id);
      await loadCars();
    } catch {
      alert("Auto konnte nicht gelöscht werden");
    }
  }

  return (
    <PageLayout>
      <Heading>Cars</Heading>

      <div className="actions">
        <Button onClick={handleLogout}>Logout</Button>
        <Link to="/objects/create">Neues Auto erstellen</Link>
      </div>

      <CarList cars={cars} onDelete={handleDelete} />
    </PageLayout>
  );
}
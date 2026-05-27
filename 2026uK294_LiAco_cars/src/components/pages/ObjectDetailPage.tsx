import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "../../components/atoms/Heading";
import Spinner from "../../components/atoms/Spinner";
import CarDetail from "../../components/organisms/CarDetail";
import PageLayout from "../../components/templates/PageLayout";
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
    return <Spinner />;
  }

  return (
    <PageLayout>
      <Heading>Details</Heading>
      <CarDetail car={car} />
    </PageLayout>
  );
}
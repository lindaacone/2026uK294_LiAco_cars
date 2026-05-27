import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "../../components/atoms/Heading";
import CarForm from "../../components/organisms/CarForm";
import PageLayout from "../../components/templates/PageLayout";
import { createCar, getCar, updateCar, type Car } from "../../service/api";

export default function ObjectEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState<Car>({
    name: "",
    year: new Date().getFullYear(),
    origin: "",
  });

  useEffect(() => {
    async function loadCar() {
      if (!id) return;

      try {
        const data = await getCar(id);

        setInitialValues({
          name: data.name,
          year: data.year,
          origin: data.origin ?? "",
        });
      } catch {
        alert("Auto konnte nicht geladen werden");
        navigate("/objects");
      }
    }

    void loadCar();
  }, [id, navigate]);

  async function handleSave(values: Car) {
    const car: Car = {
      ...values,
      year: Number(values.year),
    };

    try {
      if (id) {
        await updateCar(id, car);
      } else {
        await createCar(car);
      }

      navigate("/objects");
    } catch {
      alert("Auto konnte nicht gespeichert werden");
    }
  }

  return (
    <PageLayout>
      <Heading>{id ? "Auto bearbeiten" : "Auto erstellen"}</Heading>
      <CarForm initialValues={initialValues} onSave={handleSave} />
    </PageLayout>
  );
}
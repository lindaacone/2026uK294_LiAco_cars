import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  async function handleSubmit(values: Car) {
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
    <div className="page">
      <h1>{id ? "Auto bearbeiten" : "Auto erstellen"}</h1>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validate={(values) => {
          const errors: {
            name?: string;
            year?: string;
          } = {};

          if (!values.name) {
            errors.name = "Name ist erforderlich";
          }

          if (!values.year) {
            errors.year = "Jahr ist erforderlich";
          } else if (Number(values.year) < 1800) {
            errors.year = "Jahr muss grösser als 1800 sein";
          }

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        <Form className="form">
          <div className="form-group">
            <label>Name</label>
            <Field name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div className="form-group">
            <label>Jahr</label>
            <Field name="year" type="number" />
            <ErrorMessage name="year" component="div" className="error" />
          </div>

          <div className="form-group">
            <label>Origin</label>
            <Field name="origin" />
          </div>

          <button type="submit">Speichern</button>
        </Form>
      </Formik>
    </div>
  );
}
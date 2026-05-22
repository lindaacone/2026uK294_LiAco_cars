import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCar, getCar, updateCar, type Car } from "../../service/api";

export default function ObjectEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState<Car>({
    name: "",
    year: "",
    origin: "",
  });

  useEffect(() => {
    async function loadCar() {
      if (!id) return;

      const data = await getCar(id);
      setInitialValues({
        name: data.name,
        year: data.year,
        origin: data.origin ?? "",
      });
    }

    void loadCar();
  }, [id]);

  async function handleSubmit(values: Car) {
    if (id) {
      await updateCar(id, values);
    } else {
      await createCar(values);
    }

    navigate("/objects");
  }

  return (
    <div>
      <h1>{id ? "Auto bearbeiten" : "Auto erstellen"}</h1>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validate={(values) => {
          const errors: Partial<Car> = {};

          if (!values.name) {
            errors.name = "Name ist erforderlich";
          }

          if (!values.year) {
            errors.year = "Jahr ist erforderlich";
          }

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label>Name</label>
            <Field name="name" />
            <ErrorMessage name="name" component="div" />
          </div>

          <div>
            <label>Jahr</label>
            <Field name="year" />
            <ErrorMessage name="year" component="div" />
          </div>

          <div>
            <label>Origin</label>
            <Field name="origin" />
          </div>

          <button type="submit">Speichern</button>
        </Form>
      </Formik>
    </div>
  );
}
import { Formik, Form } from "formik";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import type { Car } from "../../service/api";

type CarFormProps = {
  initialValues: Car;
  onSave: (values: Car) => void;
};

export default function CarForm({ initialValues, onSave }: CarFormProps) {
  return (
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
      onSubmit={onSave}
    >
      <Form className="form">
        <FormField label="Name" name="name" />
        <FormField label="Jahr" name="year" type="number" />
        <FormField label="Origin" name="origin" />

        <Button type="submit">Speichern</Button>
      </Form>
    </Formik>
  );
}
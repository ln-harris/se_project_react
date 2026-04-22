import { useState } from "react";

function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return { values, handleChange, resetForm, setValues };
}

export default useForm;

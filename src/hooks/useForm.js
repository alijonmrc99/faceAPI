import { useState } from "react";

export const useForm = (initialState) => {
  const [value, setValue] = useState(initialState);
  // console.log(initialState);
  // setValue(initialState);
  return [
    value,
    (e) => {
      setValue({
        ...value,
        [e.target.name]: e.target.value,
      });
    },
  ];
};

import { useFormStatus } from "react-dom";

const MealsFormSubmit = () => {
  //const status = useFormStatus();
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? "Submitting..." : "Share Meal"}
    </button>
  );
};

export default MealsFormSubmit;

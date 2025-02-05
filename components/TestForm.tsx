import React from "react";
import { useForm } from "react-hook-form";

const TestForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();
  return (
    <div>
      TestForm
      <form className="flex flex-col gap-y-2">
        <input {...register("email", { required: "Email is required" })} type="email" placeholder="email" className="px-4 py-2" />
        {errors.email && <p>{`${errors.email.message}`}</p>}
        <input
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 10,
              message: "password too short",
            },
          })}
          type="password"
          placeholder="password"
          className="px-4 py-2"
        />
        {errors.password && <p>{`${errors.password.message}`}</p>}
        <input
          {...register("ConfirmPassword", {
            required: "confirm password is required",
            minLength: {
              value: 10,
              message: "password too short",
            },
          })}
          type="password"
          placeholder="re-enter password"
          className="px-4 py-2"
        />
        {errors.ConfirmPassword && <p>{`${errors.ConfirmPassword.message}`}</p>}
        <button disabled={isSubmitting} type="submit" className="px-4 rounded bg-slate-900 disabled:bg-slate-400 py-3 text-white">
          submit
        </button>
      </form>{" "}
    </div>
  );
};
export default TestForm;

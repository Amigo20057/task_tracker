import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import { userRegister } from "~/hooks/user/mutation/useRegister";
import { useLogin } from "~/hooks/user/mutation/userLogin";
import type { IUser } from "~/types/user.interface";

interface IProps {
  formType: "register" | "login";
}

export default function FormCommon({ formType }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();
  const { registerMutation } = userRegister();
  const { loginMutation } = useLogin();

  const onSubmit: SubmitHandler<IUser> = (data) => {
    console.log(`${formType} data:`, data);

    if (formType === "register" && formType !== undefined) {
      registerMutation.mutate(data);
    } else if (formType === "login" && formType !== undefined) {
      loginMutation.mutate(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[380px] bg-[#1f1f1f] rounded-2xl p-8 shadow-lg shadow-black/40 border border-white/10 flex flex-col gap-6"
    >
      <h1 className="text-2xl font-bold text-center mb-2 text-white">
        {formType === "login" ? "Welcome Back" : "Create Account"}
      </h1>
      <p className="text-gray-400 text-sm text-center mb-4">
        {formType === "login"
          ? "Please enter your credentials to sign in."
          : "Welcome! Please enter your details to register."}
      </p>

      {formType === "register" && (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition"
          />
          {errors.name && (
            <span className="text-xs text-red-400">{errors.name.message}</span>
          )}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-300">Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition"
        />
        {errors.email && (
          <span className="text-xs text-red-400">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-300">Password</label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition"
        />
        {errors.password && (
          <span className="text-xs text-red-400">
            {errors.password.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white font-semibold shadow-md hover:from-[#2563eb] hover:to-[#0891b2] transition-all duration-200"
      >
        {formType === "login" ? "Sign In" : "Sign Up"}
      </button>

      <p className="text-center text-sm text-gray-400">
        {formType === "login" ? (
          <>
            Don’t have an account?{" "}
            <Link
              to="/auth/register"
              className="text-[#3b82f6] hover:underline"
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link to="/auth/login" className="text-[#3b82f6] hover:underline">
              Sign in
            </Link>
          </>
        )}
      </p>
    </form>
  );
}

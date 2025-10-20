import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import { userRegister } from "~/hooks/user/mutation/useRegister";
import { useLogin } from "~/hooks/user/mutation/userLogin";
import type { IUser } from "~/types/user.interface";
import MessageBox from "./massageBox";

interface IProps {
  formType: "register" | "login";
}

export default function FormCommon({ formType }: IProps) {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();
  const { registerMutation } = userRegister();
  const { loginMutation } = useLogin();

  const isLoading = registerMutation.isPending || loginMutation.isPending;

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    if (formType === "register") {
      registerMutation.mutate(data, {
        onSuccess: () =>
          setToast({ message: "Реєстрація успішна!", type: "success" }),
        onError: (error: any) =>
          setToast({
            message: error?.response?.data?.error,
            type: "error",
          }),
      });
    } else if (formType === "login") {
      loginMutation.mutate(data, {
        onSuccess: () =>
          setToast({ message: "Вхід успішний!", type: "success" }),
        onError: (error: any) =>
          setToast({
            message: error?.response?.data?.error,
            type: "error",
          }),
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[380px] bg-[#1f1f1f] rounded-2xl p-8 shadow-lg shadow-black/40 border border-white/10 flex flex-col gap-6"
      >
        <h1 className="text-2xl font-bold text-center mb-2 text-white">
          {formType === "login" ? "З поверненням" : "Створити акаунт"}
        </h1>
        <p className="text-gray-400 text-sm text-center mb-4">
          {formType === "login"
            ? "Будь ласка, введіть свої дані для входу."
            : "Ласкаво просимо! Введіть свої дані для реєстрації."}
        </p>

        {formType === "register" && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-300">Ім’я</label>
            <input
              type="text"
              {...register("name", { required: "Імʼя обов'язкове" })}
              className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition"
            />
            {errors.name && (
              <span className="text-xs text-red-400">
                {errors.name.message}
              </span>
            )}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300">
            Електронна пошта
          </label>
          <input
            type="email"
            {...register("email", { required: "Емейл обов'язковий" })}
            className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition"
          />
          {errors.email && (
            <span className="text-xs text-red-400">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300">Пароль</label>
          <input
            type="password"
            {...register("password", { required: "Пароль обов'язковий" })}
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
          disabled={isLoading}
          className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition-all duration-200 flex justify-center items-center gap-2
            ${
              isLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] hover:from-[#2563eb] hover:to-[#0891b2]"
            }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span>Обробка...</span>
            </>
          ) : formType === "login" ? (
            "Увійти"
          ) : (
            "Зареєструватися"
          )}
        </button>

        <p className="text-center text-sm text-gray-400">
          {formType === "login" ? (
            <>
              Немає акаунта?{" "}
              <Link
                to="/auth/register"
                className="text-[#3b82f6] hover:underline"
              >
                Зареєструватися
              </Link>
            </>
          ) : (
            <>
              Вже маєте акаунт?{" "}
              <Link to="/auth/login" className="text-[#3b82f6] hover:underline">
                Увійти
              </Link>
            </>
          )}
        </p>
      </form>
      {toast && (
        <MessageBox
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

import { useState, useRef, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import {
  useSendForgotPasswordCodeMutation,
  useUpdatePassMutation,
  useVerifyCodeMutation,
} from "../redux/auth/authApi";
import { useNavigate } from "react-router-dom";

const ForgotPass = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);

  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [verifyCode] = useVerifyCodeMutation();
  const [sendForgotPasswordCode, { isLoading }] =
    useSendForgotPasswordCodeMutation();
  const [updatePass] = useUpdatePassMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: "",
      code: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const otpRefs = useRef([]);

  const handleSendEmail = async (data: string) => {
    await sendForgotPasswordCode({ email: data.email }).unwrap();
    setStep(2);
  };

  const handleSendCode = async (otpCode) => {
    const email = getValues("email");
    await verifyCode({ email, code: otpCode }).unwrap();
    setStep(3);
  };

  const handleSavePass = async (data) => {
    const email = getValues("email");
    await updatePass({ email, pass: data.password }).unwrap();
    navigate("/login");
  };

  const handleSend = (data) => {
    if (step === 1) {
      handleSendEmail(data);
    } else if (step === 2) {
      // Aqui estamos enviando o código OTP como uma string
      handleSendCode(otp.join("")); // Combina os valores do OTP e envia como string
    } else if (step === 3) {
      handleSavePass(data);
    }
  };

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Prevent invalid input (only numbers)

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      otpRefs.current[index + 1].focus(); // Move to next input field
    }
  };

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index]) {
      if (index > 0) {
        otpRefs.current[index - 1].focus(); // Move to previous input field
      }
    }
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <section className="bg-white shadow-lg flex flex-col lg:justify-center items-center w-[85%] lg:w-1/3 lg:h-[80%] p-4">
        <h1 className="text-purple-500 font-mooli font-bold text-2xl ml-6">
          {step === 1 && "Enviar email"}
          {step === 2 && "Enviar código"}
          {step === 3 && "Alterar senha"}
        </h1>
        <form
          className="flex w-[100%] lg:w-[70%] mt-4 p-2"
          onSubmit={handleSubmit(handleSend)}
        >
          {step === 1 && (
            <section className="flex flex-col gap-2 w-[100%]">
              <input
                className="p-2 font-mooli outline-none border border-purple-500 rounded-md"
                type="email"
                id="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Insira um email válido",
                  },
                  required: {
                    value: true,
                    message: "Email é obrigatório",
                  },
                })}
                placeholder="Digite seu e-mail"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-semibold p-2 rounded-md"
                type="submit"
              >
                {isLoading ? "Enviando..." : "Enviar e-mail"}
              </button>
            </section>
          )}

          {step === 2 && (
            <section className="flex flex-col gap-4 w-[100%]">
              <div className="flex justify-between">
                {otp.map((item, index) => (
                  <input
                    ref={(el) => (otpRefs.current[index] = el)} // Assigning ref
                    type="text"
                    maxLength={1}
                    key={index}
                    className="w-10 h-10  lg:w-10 lg:h-10 text-center rounded-md border-2 border-purple-400 outline-none text-purple-600 font-bold font-2xl"
                    value={item}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-semibold rounded-md p-2"
                type="submit"
              >
                Enviar código
              </button>
            </section>
          )}

          {step === 3 && (
            <section className="flex flex-col items-center p-2 gap-2 w-[100%]">
              <input
                className="p-2 text-center font-mooli outline-none border border-purple-500 w-[80%] rounded-md"
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Senha é obrigatória",
                  },
                  minLength: {
                    value: 6,
                    message: "Senha deve conter ao menos 6 caracteres",
                  },
                })}
                placeholder="Nova senha"
              />
              {errors.password?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password?.message}
                </p>
              )}

              <input
                className="p-2 text-center font-mooli outline-none border border-purple-500 w-[80%] rounded-md"
                type="password"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirmação de senha é obrigatória",
                  },
                  validate: (value) => {
                    const password = getValues("password");
                    return value === password || "Senhas não coincidem";
                  },
                })}
                placeholder="Confirme a nova senha"
              />
              {errors.confirmPassword?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword?.message}
                </p>
              )}
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-semibold p-2 text-center w-[80%] rounded-md"
                type="submit"
              >
                Salvar senha
              </button>
            </section>
          )}
        </form>
      </section>
    </main>
  );
};

export default ForgotPass;

"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useRegistration } from "@/hooks/auth/useRegistration";

import { IRegistrationForm } from "@/types/auth.types";

import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Button from "@/components/ui/Button/Button";
import RegistrationFields from "@/components/entities/RegistrationFields/RegistrationFields";

import styles from "./Registration.module.scss";
import EmailConfirmation from "@/components/entities/EmailConfirmation/EmailConfirmation";
import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";
import { useNavigation } from "@/hooks/navigation/useNavigation";

interface IProps {
  variant?: "default" | "modal";
  // onCloseEvent?: () => void;
  handleReturnButton?: () => void;
  handleSuccessRegistration?: () => void;
  handleInputChange?: (data: IRegistrationForm) => void;
  defaultData?: Partial<IRegistrationForm>;
  setIsEmailConfirmationActive?: (value: boolean) => void;
  isEmailConfirmationActive?: boolean;
}

const Registration = ({
  handleReturnButton,
  handleSuccessRegistration,
  variant = "default",
  handleInputChange,
  defaultData,
  isEmailConfirmationActive = false,
  setIsEmailConfirmationActive,
}: IProps) => {
  const { handleSubmit, control, watch, reset } = useForm<IRegistrationForm>({
    defaultValues: defaultData,
  });
  const {
    registration,
    isRegistrationPending,
    isRegistrationError,
    isRegistrationSuccess,
    registrationErrors,
  } = useRegistration();

  const [isEmailConfirmationVisible, setIsEmailConfirmationVisible] =
    useState<boolean>(false);

  const [formatedRegistrationData, setFormatedRegistrationData] =
    useState<IRegistrationForm>();

  const { navigateToHome, reloadPage } = useNavigation();

  // useEffect(() => {
  //   if (defaultData) {
  //     reset(defaultData);
  //   }
  // }, []);

  const password = watch("password");
  const allFieldsWatch = watch([
    "checkbox",
    "email",
    "name",
    "password",
    "password_confirmation",
    "surname",
  ]);

  useEffect(() => {
    if (handleInputChange) {
      handleInputChange({
        checkbox: allFieldsWatch[0],
        email: allFieldsWatch[1],
        name: allFieldsWatch[2],
        password: allFieldsWatch[3],
        password_confirmation: allFieldsWatch[4],
        surname: allFieldsWatch[5],
      });
    }
  }, [allFieldsWatch]);

  const onSubmit: SubmitHandler<IRegistrationForm> = (data) => {
    setFormatedRegistrationData(data);
  };

  useEffect(() => {
    if (formatedRegistrationData) {
      console.log(formatedRegistrationData);

      registration(formatedRegistrationData);
    }
  }, [formatedRegistrationData]);

  function onFormError() {
    toast.error("Заполните все обязательные поля");
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    let isMounted = true;

    if (isRegistrationPending) {
      toast.loading("Загрузка");
    }

    if (isRegistrationError && isMounted) {
      toast.dismiss();
      if (registrationErrors.email === "taken") {
        toast.error("Этот email уже занят");
      } else {
        toast.error("Ошибка регистрации");
      }
    } else if (isRegistrationSuccess && isMounted) {
      toast.dismiss();
      toast.success("Регистрация прошла успешно");
      setIsEmailConfirmationVisible(true);
      if (setIsEmailConfirmationActive) {
        setIsEmailConfirmationActive(true);
      }

      if (variant === "default") {
        timeoutId = setTimeout(() => {
          console.log("navigateToHome");
          // navigateToHome();
          // reloadPage();
        }, 1500);
      }
      // saveTokenToStorage(registrationResponse?.data.token || "");
    }

    return () => {
      isMounted = false;
    };
  }, [isRegistrationPending, isRegistrationError, isRegistrationSuccess]);

  function successRegistration() {
    if (handleSuccessRegistration) {
      handleSuccessRegistration();
    } else {
      setTimeout(() => {
        navigateToHome();
        reloadPage();
      }, 1000);
    }
  }

  const Wrapper: React.ElementType = variant === "default" ? Substrate : "div";

  function handleReturnButtonClick() {
    setIsEmailConfirmationVisible(false);
    if (setIsEmailConfirmationActive) {
      setIsEmailConfirmationActive(false);
    }
  }

  return (
    <Wrapper
      className={`${styles.substrate} ${
        variant === "modal" ? styles.modalSubstrate : ""
      } `}
    >
      {(isRegistrationSuccess && isEmailConfirmationVisible) ||
      isEmailConfirmationActive ? (
        <EmailConfirmation
          email={formatedRegistrationData?.email || defaultData?.email || ""}
          handleReturnButtonClick={handleReturnButtonClick}
          isModal={variant === "modal"}
          handleSuccessAuth={successRegistration}
        />
      ) : (
        <>
          <form
            action=""
            noValidate
            onSubmit={handleSubmit(onSubmit, onFormError)}
          >
            <CustomTitle tag="h1" isCentered className={styles.title}>
              Регистрация личного кабинета
            </CustomTitle>

            <RegistrationFields
              control={control}
              password={password}
              variant={variant}
            />

            <Button className={styles.submit} type="submit">
              Регистрация
            </Button>
          </form>

          {variant === "modal" && !isEmailConfirmationVisible && (
            <div className={styles.changeAuthTypeWrapper}>
              Уже зарегистрированы?{" "}
              <button
                onClick={handleReturnButton}
                className={styles.changeAuthTypeButton}
              >
                Войдите
              </button>
            </div>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Registration;

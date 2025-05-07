import { EGenders, ICreateNsPolicyRequest } from "@/types/policy.types";

export function formatDataToCreateNsPolicy(
  data: ICreateNsPolicyRequest
): ICreateNsPolicyRequest {
  let formatedData: ICreateNsPolicyRequest = {
    ...data,
  };

  formatedData.insured = formatedData.insured.map((item) => ({
    ...item,
    gender: item.gender === EGenders.MAN ? "мужской" : "женский",
  }));

  return formatedData;
}

import {
  EPolicyStatus,
  INsPolicy,
  IOsagoPolicy,
  IPolicyUniversalData,
} from "@/types/policy.types";
import { getPaymentStatus } from "./getPaymentStatus";

interface IParams {
  policyNsData: INsPolicy | undefined;
  policyOsagoData: IOsagoPolicy | undefined;
}

export function getUniversalPolicyData(policies: IParams): IPolicyUniversalData {
  const policyNsData = policies.policyNsData;
  const policyOsagoData = policies.policyOsagoData;
  return {
    id: policyNsData ? policyNsData.id : policyOsagoData ? policyOsagoData.id : 1,
    title: policyNsData
      ? policyNsData.get_peoples[0].fio
      : policyOsagoData
      ? `${policyOsagoData.brand} ${policyOsagoData.model} | ${policyOsagoData.registration_plate}`
      : "",
    policyNumber: policyNsData
      ? policyNsData.NS_number
      : policyOsagoData
      ? policyOsagoData.osaga_number
      : "",
    start_date: policyNsData
      ? policyNsData.start_date
      : policyOsagoData
      ? policyOsagoData.start_date
      : "",
    finish_date: policyNsData
      ? policyNsData.finish_date
      : policyOsagoData
      ? policyOsagoData.finish_date
      : "",
    payment_status: policyNsData
      ? getPaymentStatus(policyNsData.status)
      : policyOsagoData
      ? getPaymentStatus(policyOsagoData.payment_status)
      : EPolicyStatus.AWAITING_PAYMENT,
  };
}

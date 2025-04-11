import { useEffect, useState } from "react";
import getOsagoApplyFields, { ISplitFieldConfig } from "@/helpers/OsagoApply/getOsagoApplyFields.helper";

export const useOsagoFormConfig = () => {
  const [config, setConfig] = useState<ISplitFieldConfig>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getOsagoApplyFields();
      setConfig(data);
      setIsLoading(false);
    })();
  }, []);

  return { config, isLoading };
};

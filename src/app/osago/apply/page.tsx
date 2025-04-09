import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import OsagoApply from "@/components/widgets/OsagoApply/OsagoApply";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Оформить ОСАГО",
};
export default function OsagoApplyPage() {
  return (
    <ContentContainer>
      <div>OsagoApplyPage</div>
      <OsagoApply />
    </ContentContainer>
  );
}

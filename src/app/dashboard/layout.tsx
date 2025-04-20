import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import SidebarDashboard from "@/components/widgets/SidebarDashboard/SidebarDashboard";
import type { Metadata } from "next";

// import "react-day-picker/style.css";

import styles from "./layout.module.scss";

export const metadata: Metadata = {
  description: "Garant личный кабинет",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContentContainer className={styles.container}>
      <div className={styles.sidebar}>
        <SidebarDashboard className={styles.sidebarNav} />
      </div>
      <div className={styles.content}>{children}</div>
    </ContentContainer>
  );
}

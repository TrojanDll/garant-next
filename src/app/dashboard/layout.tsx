import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import SidebarDashboard from "@/components/widgets/SidebarDashboard/SidebarDashboard";
import type { Metadata } from "next";

import styles from "./layout.module.scss";
import BottomNavigationPanel from "@/components/widgets/BottomNavigationPanel/BottomNavigationPanel";

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
        <BottomNavigationPanel className={styles.bottomNav} />
      </div>
      <div className={styles.content}>{children}</div>
    </ContentContainer>
  );
}

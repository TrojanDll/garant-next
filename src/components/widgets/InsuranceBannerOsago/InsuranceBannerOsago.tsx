import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import styles from "./InsuranceBannerOsago.module.scss";
import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";

interface IProps {
  className?: string;
}

export function InsuranceBannerOsago({ className }: IProps) {
  return (
    <section className={`${className} ${styles.root}`}>
      <ContentContainer>
        <Substrate withShadow="light" className={styles.substrate}>
          <CustomTitle tag="h2" className={styles.title}>
            ОСАГО в Абхазии для иностранных автомобилей
          </CustomTitle>

          <p className={styles.paragraph}>
            Если вы въезжаете в Абхазию на автомобиле, мотоцикле или другом
            транспортном средстве, вам необходим абхазский полис ОСАГО.
            Российская страховка здесь не действует, а наличие ОСАГО обязательно
            для всех водителей.
          </p>

          <CustomTitle tag="h3" className={styles.subtitle}>
            Оформить полис ОСАГО в Абхазии можно онлайн за 3–5 минут:
          </CustomTitle>

          <ul className={styles.ul}>
            <li className={styles.li}>
              Оплата производится любым удобным способом.
            </li>
            <li className={styles.li}>
              Готовый документ приходит сразу на почту.
            </li>
            <li className={styles.li}>
              Полис всегда доступен для скачивания в личном кабинете.
            </li>
          </ul>

          <CustomTitle tag="h3" className={styles.subtitle}>
            Почему стоит купить страховку автомобиля в Абхазии у нас:
          </CustomTitle>

          <ul className={styles.ul}>
            <li className={styles.li}>
              Быстрое онлайн-оформление без визита в офис.
            </li>
            <li className={styles.li}>Действует на всей территории Абхазии.</li>
            <li className={styles.li}>
              Проверяется сотрудниками ГАИ во время поездки
            </li>
            <li className={styles.li}>
              Минимальный срок действия ОСАГО — 15 суток.
            </li>
            <li className={styles.li}>
              Можно оформить заранее, ещё до выезда.
            </li>
          </ul>

          <p className={styles.paragraph}>
            Страховка в Абхазию для россиян на автомобиле оформляется у нас
            всего за несколько минут — выберите срок действия, оплатите онлайн и
            получите готовый полис прямо на почту.
          </p>
        </Substrate>
      </ContentContainer>
    </section>
  );
}

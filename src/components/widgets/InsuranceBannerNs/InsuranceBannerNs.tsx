import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import styles from "./InsuranceBannerNs.module.scss";
import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Link from "next/link";
import { PAGES } from "@/config/pages-url.config";

interface IProps {
  className?: string;
}

export function InsuranceBannerNs({ className }: IProps) {
  return (
    <section className={`${className} ${styles.root}`}>
      <ContentContainer>
        <Substrate withShadow="light" className={styles.substrate}>
          <CustomTitle tag="h2" className={styles.title}>
            Страховка от несчастного случая в Абхазии
          </CustomTitle>
          <p className={styles.paragraph}>
            Помимо обязательного полиса ОСАГО, туристам в Абхазии рекомендуется
            оформить страховку от несчастного случая. Такой полис защищает жизнь
            и здоровье путешественников и действует на территории всей
            республики.
          </p>
          <CustomTitle tag="h3" className={styles.subtitle}>
            Оформление занимает всего несколько минут:
          </CustomTitle>
          <ul className={styles.ul}>
            <li className={styles.li}>Минимальный срок действия — 1 сутки.</li>
            <li className={styles.li}>Оплата онлайн удобным способом.</li>
            <li className={styles.li}>
              Полис приходит на электронную почту и сохраняется в личном
              кабинете.
            </li>
          </ul>

          <CustomTitle tag="h3" className={styles.subtitle}>
            Преимущества страховки от несчастных случаев в Абхазии:
          </CustomTitle>

          <ul className={styles.ul}>
            <li className={styles.li}>
              Защита от травм, несчастных случаев и непредвиденных ситуаций.
            </li>
            <li className={styles.li}>Действует на всей территории Абхазии.</li>
            <li className={styles.li}>
              Возможность оформить для взрослых и детей.
            </li>
            <li className={styles.li}>
              Доступная стоимость, гибкие сроки действия.
            </li>
          </ul>

          <p className={styles.paragraph}>
            Такую страховку часто покупают дополнительно к{" "}
            <Link href={PAGES.OSAGO} className={styles.link}>
              полису ОСАГО
            </Link>
            , чтобы поездка была максимально безопасной. Купите полис от
            несчастного случая онлайн и путешествуйте по Абхазии с уверенностью
            в защите себя и близких.
          </p>
        </Substrate>
      </ContentContainer>
    </section>
  );
}

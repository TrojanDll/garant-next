import Substrate from "@/components/ui/Substrate/Substrate";
import styles from "./InsuranceBannerMain.module.scss";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Link from "next/link";
import { PAGES } from "@/config/pages-url.config";

interface IProps {
  className?: string;
}

export function InsuranceBannerMain({ className }: IProps) {
  return (
    <section className={`${className} ${styles.root}`}>
      <ContentContainer>
        <Substrate withShadow="light" className={styles.substrate}>
          <CustomTitle tag="h2" className={styles.title}>
            Страховка автомобиля в Абхазии
          </CustomTitle>

          <p className={styles.paragraph}>
            Планируете поездку в Абхазию на автомобиле? Российская страховка на
            территории республики не действует. Для въезда в страну обязательна
            абхазская{" "}
            <Link href={PAGES.OSAGO} className={styles.link}>
              страховка ОСАГО
            </Link>
            . Отсутствие полиса грозит штрафом и проверяется сотрудниками ГАИ.
          </p>

          <p className={styles.paragraph}>
            На нашем сайте вы можете быстро оформить страховку автомобиля в
            Абхазии онлайн. Достаточно ввести данные автомобиля и срок
            пребывания — и через 3–5 минут полис будет готов. Оплата
            производится онлайн, а готовый документ приходит сразу на
            электронную почту и доступен для скачивания в личном кабинете.
          </p>

          <ul className={styles.ul}>
            <li className={styles.li}>
              Минимальный срок действия ОСАГО — 15 суток.
            </li>
            <li className={styles.li}>
              Можно оформить заранее, ещё до выезда.
            </li>
            <li className={styles.li}>
              Дополнительно доступна{" "}
              <Link href={PAGES.NS} className={styles.link}>
                страховка от несчастного случая
              </Link>
              , чтобы защитить жизнь и здоровье туристов.
            </li>
          </ul>

          <p className={styles.paragraph}>
            Страховка на машину в Абхазии нужна каждому водителю. Без неё въезд
            невозможен. У нас вы можете оформить полис заранее и путешествовать
            спокойно.
          </p>
        </Substrate>
      </ContentContainer>
    </section>
  );
}

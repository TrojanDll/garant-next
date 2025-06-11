// components/DataTable.tsx
import React from "react";
import styles from "./DataTable.module.scss";

type Row = {
  title: string;
  items: string[];
};

const data: Row[] = [
  {
    title: "Цель обработки",
    items: [
      "Предоставление доступа Пользователю к сервисам, информации и/или материалам, содержащимся на веб-сайте",
      "Заключение, исполнение и прекращение гражданско-правовых договоров",
      "Информирование Пользователя посредством отправки электронных писем",
    ],
  },
  {
    title: "Персональные данные",
    items: [
      "фамилия, имя, отчество",
      "электронный адрес",
      "номера телефонов",
      "год, месяц, дата и место рождения",
      "реквизиты документа, удостоверяющего личность",
      "иные данные, переданные Оператору",
    ],
  },
  {
    title: "Правовые основания",
    items: [
      "договоры, заключаемые между оператором и субъектом персональных данных",
      "Закон РФ от 07.02.1992 № 2300-1 «О защите прав потребителей»",
    ],
  },
];

const DataTable: React.FC = () => (
  <div className={styles.container}>
    <table className={styles.table}>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className={styles.row}>
            <td className={styles.title}>{row.title}</td>
            <td className={styles.content}>
              <ul className={styles.list}>
                {row.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;

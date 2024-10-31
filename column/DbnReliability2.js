const DbnReliability2 = {
  template: `
  <div class="reliability">
  <table>
    <caption>
      Таблиця 5 - Значення коеффіцієнта надійности за відповідальністю
      $\\gamma_n$
    </caption>
    <thead>
      <tr class="row">
        <th class="col" rowspan="3">Клас наслідків (відповідальности)</th>
        <th class="col" rowspan="3">
          Категорія відповідальності конструкції
        </th>
        <th class="col" colspan="5">
          Значення $\\gamma_n$, які використовуються в розрахункових
          ситуаціях
        </th>
      </tr>
      <tr class="row">
        <th class="col" colspan="2">усталених</th>
        <th class="col" colspan="2">перехідних</th>
        <th class="col">аварійних</th>
      </tr>
      <tr class="row">
        <th class="col">перша група граничних станів</th>
        <th class="col">друга група граничних станів</th>
        <th class="col">перша група граничних станів</th>
        <th class="col">друга група граничних станів</th>
        <th class="col">перша група граничних станів</th>
      </tr>
    </thead>
    <tbody>
    <tr class="row">
      <th class="col" rowspan="3">СС3</th>
      <th class="col">А</th>
      <td class="col">1,250</td>
      <td class="col" rowspan="3">1,000</td>
      <td class="col">1,050</td>
      <td class="col" rowspan="3">0,975</td>
      <td class="col" rowspan="3">1,050</td>
    </tr>
    <tr class="row">
      <th class="col">Б</th>
      <td class="col">1,200</td>
      <td class="col">1,000</td>
    </tr>
    <tr class="row">
      <th class="col">В</th>
      <td class="col">1,150</td>
      <td class="col">0,950</td>
    </tr>

    <tr class="row">
      <th class="col" rowspan="3">СС2</th>
      <th class="col">А</th>
      <td class="col">1,100</td>
      <td class="col" rowspan="3">0,975</td>
      <td class="col">0,975</td>
      <td class="col" rowspan="3">0,950</td>
      <td class="col" rowspan="3">0,975</td>
    </tr>
    <tr class="row">
      <th class="col">Б</th>
      <td class="col">1,050</td>
      <td class="col">0,950</td>
    </tr>
    <tr class="row">
      <th class="col">В</th>
      <td class="col">1,000</td>
      <td class="col">0,925</td>
    </tr>

    <tr class="row">
      <th class="col" rowspan="3">СС3</th>
      <th class="col">А</th>
      <td class="col">1,000</td>
      <td class="col" rowspan="3">0,950</td>
      <td class="col">0,950</td>
      <td class="col" rowspan="3">0,925</td>
      <td class="col" rowspan="3">0,950</td>
    </tr>
    <tr class="row">
      <th class="col">Б</th>
      <td class="col">0,975</td>
      <td class="col">0,925</td>
    </tr>
    <tr class="row">
      <th class="col">В</th>
      <td class="col">0,950</td>
      <td class="col">0,900</td>
    </tr>
    </tbody>
  </table>
  <ul>
    <li>
      <b>Примітка 1.</b> Якщо у нормах проектування певних типів будівель
      або споруд не наведено конкретних рекомендацій щодо розподілу
      конструкций за категоріями відповідальності відповідно до класів
      наслідків (відповідальності), слід їх відносити до категорії Б.
    </li>
    <li>
      <b>Примітка 2.</b> Для об'єктів нового будівництва, що споруджуються
      в охоронній зорі пам'яток культурної спадщини національного та
      місцевого значенняя, які за всіма характеристиками можливих
      наслідків їх відмови відносяться до классу насідків
      (відповідальності) СС1, коєффіцієнт надійности $\\gamma_n$, що
      передбачений для вищих класів наслідків, не застосовується.
    </li>
  </ul>
</div>
    `,
  // data() {
  //   return {};
  // },
};

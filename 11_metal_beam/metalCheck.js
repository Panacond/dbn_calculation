const MetalCheck = {
  props: [
    "wpcalk",
    "ipcalk",
    "resistance",
    "stress",
    "lenght",
    "deflection",
    "types",
  ],
  emits: [],
  template: `
    <div class="test-strength">
    <h4>
      Перевірка міцності за ДБН В.2.6-198:2014 Зі Зміною № 1 сталеві
      конструкції
    </h4>
    <p>
      Таблиця 5.1 – Коефіцієнт умов роботи для балок суцільного перерізу
      $\\gamma_c = {{gamma_c = 0.9}}$
    </p>
    <p>
      9 Розрахунок елементів сталевих конструкцій при згині
      <br />
      9.2 Розрахунок на міцність згинних елементів суцільного перерізу
      <br />
      9.2.1 Розрахунок на міцність балок у розрахункових перерізах 1 класу
      необхідно виконувати за формулами:
    </p>
    <p>
      - при дії згинального моменту М в одній з головних площин (9.1):
    </p>
    <p>
      $$k = \\frac{M}{W_p \\times R \\times \\gamma_c} = \\frac{ {{M}} }{
      {{W_p}} \\times {{R}} \\times {{gamma_c}} } = {{k = Math.round(
      (M/W_p/R)*100)/100}}$$
    </p>
    <div v-if="k < 1">
      <h4>Міцність перерізу достатня коэфіцієнт використання {{k}}</h4>
    </div>
    <div style="color: red" v-else>
      <h3>Міцність перерізу не достатня k ={{k}}</h3>
      <p>
        Необхіднй момент опору: $$W_{tr}= W_p \\times k ={{W_p}} \\times
        {{k}} = {{Math.round((W_p*k)*100)/100}} cm^3$$
      </p>
    </div>
  </div>
  <div class="checking-deflections">
    <h4>Згідно з ДСТУ Б В.1.2-3:2006 Прогини і переміщення</h4>
    <p>
      5 Вертикальні граничні прогини елементів конструкцій
      5.1 Вертикальні граничні прогини елементів конструкцій і
      навантаження, від яких слід визначати прогини, наведені в табл.
      1.<br />
      Згідно таблиці 1<br />
      При прольоті {{l_p}} м допустимий прогин l/ {{max_f}}:
    </p>
    <p v-if="typeS == 2">
      Для консолі замість l слід приймати подвоєний її виліт.
    </p>
    <p>
      $$f_d= \\frac{l_p}{ {{max_f}} } = \\frac{ {{l_p}} \\times 1000}{
      {{max_f}} } = {{f_d=Math.round(l_p/max_f*1000*100 )/100}}мм $$
    </p>
    <div v-if="f < f_d">
      <h4>
        Прогини не перевищують допустимі f= {{f}}мм,
        L<sub>d</sub>={{f_d}}мм, k={{Math.round(f/f_d*100 )/100}}
      </h4>
    </div>
    <div style="color: red" v-else>
      <h3>
        Прогини перевищують допустимі f= {{f}}мм, L<sub>d</sub>={{f_d}}мм,
        k={{k1 = Math.round(f/f_d*100 )/100}}
      </h3>
      <p>
        Необхіднй момент інерції:
        $$I_{tr}=I_p \\times k ={{I_p}}
        \\times {{k1}} = {{Math.round((I_p*k1)*100)/100}}см^3$$ 
      </p>
    </div>
  </div>     
      `,
  data() {
    return {
    };
  },
  computed: {
    W_p() {
      return this.wpcalk;
    },
    I_p() {
      return this.ipcalk;
    },
    R() {
      return this.resistance;
    },
    M() {
      return this.stress;
    },
    l_p() {
      return this.lenght;
    },
    f() {
      return this.deflection;
    },
    typeS() {
        return this.types;
      },
    max_f() {
      let k = this.typeS;
      if (this.l_p * k <= 1) {
        return 120 * k;
      } else if (this.l_p * k <= 3) {
        return this.interpolate(this.l_p, 1, 3, 120, 150);
      } else if (this.l_p * k <= 6) {
        return this.interpolate(this.l_p, 3, 6, 150, 200);
      } else if (this.l_p * k <= 12) {
        return this.interpolate(this.l_p, 6, 12, 200, 250);
      } else if (this.l_p * k <= 24) {
        return this.interpolate(this.l_p, 12, 24, 250, 300);
      }
      return 300;
    },
  },
  watch: {},
  mounted() {
    this.renderMath();
  },
  updated() {
    this.renderMath();
  },
  methods: {
    round(a) {
      return Math.round(a * 100) / 100;
    },
    interpolate(x, x1, x2, y1, y2) {
      return (
        Math.round((y1 + ((y2 - y1) / (x2 - x1)) * (x - x1)) * 100) / 100
      )
    },
    renderMath() {
      MathJax.typesetPromise();
    },
  },
};

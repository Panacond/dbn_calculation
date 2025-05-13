const StressDeflection = {
  props: ["elastic", "calculated", "normative", "ipcalk"],
  emits: ["update:stress", "update:deflection", "update:lenght", "update:types"],
  template: `
  <p>
    l=
    <input v-model="l" type="number" placeholder="l" />
    (м) довжина розрахункового прольоту
    </p>
    <p>
    Розрахункова схема:
    <select v-model="scheme">
        <option disabled value="">Виберіть тип</option>
        <option>Балка з вільним опиранням</option>
        <option>Балка з 2 затиснутими опорами</option>
        <option>Балка з 1 затиснутою опорою</option>
        <option>Консольна</option>
        <option>Консольна із зосередженою силою</option>
        <option>Балка на двох опорах з двома силами</option>
    </select>
    </p>
    <div v-if="scheme == 'Балка з вільним опиранням'">
    <h2>Балка з вільним опиранням</h2>
    <img src="../09_al_beam/beam_re.svg" alt="шарнироно опертая балка" />
    <p>Максимальний момент в перерізі буде:</p>
    <p>
        $$M= \\frac{q \\times l^2}{8} =\\frac{ {{q}} \\times {{l}}^2}{8} = {{M=
        Math.round( (q*l**2/8)*100)/100}} Н × м$$
    </p>
    <p>Максимальній прогин:</p>
    <p>
        $$f= \\frac{ 5 \\times q_e \\times\ l^4}{384 \\times E \\times I_p} =
        \\frac{ 5 \\times {{q_e}} \\times\ {{l}}^4}{384 \\times {{E}} \\times
        {{I_p}} }= {{f = Math.round( (5 * q_e * l**4)/(384 * E *
        I_p)*100*10**5)/100}}мм$$
    </p>
    </div>
    <div v-else-if="scheme == 'Балка з 2 затиснутими опорами'">
    <h2>Балка з 2 затиснутими опорами</h2>
    <img
        src="../09_al_beam/beam_two.svg"
        alt="балка с двумя защемленными опорами"
    />
    <p>Максимальний момент в перерізі буде:</p>
    <p>
        $$M= \\frac{q \\times l^2}{12} =\\frac{ {{q}} \\times {{l}}^2}{12} = {{M
        = Math.round( (q*l**2/12)*100)/100}} Н × м$$
    </p>
    <p>Максимальній прогин:</p>
    <p>
        $$f= \\frac{ 1 \\times q_e \\times\ l^4}{384 \\times E \\times I_p} =
        \\frac{ 1 \\times {{q_e}} \\times\ {{l}}^4}{384 \\times {{E}} \\times
        {{I_p}} }= {{f = Math.round( (1 * q_e * l**4)/(384 * E *
        I_p)*100*10**5)/100}}мм$$
    </p>
    </div>
    <div v-else-if="scheme == 'Балка з 1 затиснутою опорою'">
    <h2>Балка з 1 затиснутою опорою</h2>
    <img
        src="../09_al_beam/beam_one.svg"
        alt="балка с одной защемленной опорой"
    />
    <p>Максимальний момент в перерізі буде:</p>
    <p>
        $$M= \\frac{q \\times l^2}{8} =\\frac{ {{q}} \\times {{l}}^2}{8} = {{M =
        Math.round( (q*l**2/8)*100)/100}} Н × м$$
    </p>
    <p>Максимальній прогин:</p>
    <p>
        $$f= \\frac{ 1 \\times q_e \\times\ l^4}{185 \\times E \\times I_p} =
        \\frac{ 1 \\times {{q_e}} \\times\ {{l}}^4}{185 \\times {{E}} \\times
        {{I_p}} }= {{f = Math.round( (1 * q_e * l**4)/(185 * E *
        I_p)*100*10**5)/100}}мм$$
    </p>
    </div>
    <div v-else-if="scheme == 'Консольна із зосередженою силою'">
    <h2>Консольна із зосередженою силою</h2>
    <img
        src="../09_al_beam/console_beam_force.svg"
        alt="Консольна із зосередженою силою"
    />
    <p>
        b<sub>f</sub> =
        <input v-model="b_f" type="number" placeholder="l" />
        (м) довжина  дії навантаження
    </p>
    <p>Максимальний момент в перерізі буде:</p>
    <p>
        $$M= q \\times b_f \\times l = {{q}}\\times {{b_f}} \\times {{l}} = {{M =
        Math.round( (q*b_f*l)*100)/100}} Н × м$$
    </p>
    <p>Максимальній прогин:</p>
    <p>
        $$f= \\frac{ 1 \\times q_e \\times b_f \\times\ l^3}{3 \\times E \\times I_p} =
        \\frac{ 1 \\times {{q_e}} \\times {{b_f}} \\times\ {{l}}^3}{3 \\times {{E}} \\times
        {{I_p}} }= {{f = Math.round( (1 * q_e * b_f * l**3)/(3 * E *
        I_p)*100*10**5)/100}}мм$$
    </p>
    </div>
    <div v-else-if="scheme == 'Балка на двох опорах з двома силами'">
    <h2>Балка на двох опорах з двома силами</h2>
    <img
        src="../09_al_beam/beam_two_force.svg"
        alt="Балка на двох опорах з двома силами"
    />
    <p>
        b<sub>f</sub> =
        <input v-model="b_f" type="number" placeholder="l" />
        (м) довжина  дії навантаження
    </p>
    <p>
        a =
        <input v-model="a" type="number" placeholder="l" />
        (м) розташування сили
    </p>
    <p>Максимальний момент в перерізі буде:</p>
    <p>
        $$M= q \\times b_f \\times a = {{q}}\\times {{b_f}} \\times {{a}} = {{M =
        Math.round( (q*b_f*a)*100)/100}} Н × м$$
    </p>
    <p>Максимальній прогин:</p>
    <p>
        $$f= \\frac{ 1 \\times q_e \\times b_f \\times\ l^3}{24 \\times E \\times I_p} \\left( 3 \\frac{a}{l} - 4 \\frac{a^3}{l^2}  \\right) =
        \\frac{ 1 \\times {{q_e}} \\times {{b_f}} \\times\ {{l}}^3}{24  \\times {{E}} \\times
        {{I_p}} } \\left( 3 \\frac{ {{a}} }{ {{l}} } - 4 \\frac{ {{a}}^3}{ {{l}}^2}  \\right) =
        {{f = Math.round( (1 * q_e * b_f * l**3)/(24 * E *
        I_p)*(3*a/l-4*a**3/l**2)*100*10**5)/100}}мм$$
    </p>
    </div>
    <div v-else>
    <h2>Консольна балка</h2>
    <img src="../09_al_beam/console.svg" alt="балка консольная" />
    <p>Максимальний момент в перерізі буде:</p>
    <p>
        $$M= \\frac{q \\times l^2}{2} =\\frac{ {{q}} \\times {{l}}^2}{2} = {{M =
        Math.round( (q*l**2/2)*100)/100}} Н × м$$
    </p>
    <p>Максимальній прогин:</p>
    <p>
        $$f= \\frac{ q_e \\times\ l^4}{8 \\times E \\times I_p} = \\frac{ {{q_e}}
        \\times\ {{l}}^4}{8 \\times {{E}} \\times {{I_p}} }= {{f = Math.round(
        ( q_e * l**4)/(8 * E * I_p)*100*10**5)/100}}мм$$
    </p>
    </div>
    `,
  data() {
    return {
      l: 2.3,
      scheme: "Балка з вільним опиранням",
      b_f: 1,
      a: 0.1,
    };
  },
  computed: {
    E() {
      return this.elastic;
    },
    q() {
      return this.calculated;
    },
    q_e() {
      return this.round(this.normative);
    },
    I_p() {
      return this.ipcalk;
    },
    stress() {
      if (this.scheme == "Балка з вільним опиранням") {
        return Math.round(((this.q * this.l ** 2) / 8) * 100) / 100;
      } else if (this.scheme == "Балка з 2 затиснутими опорами") {
        return Math.round(((this.q * this.l ** 2) / 12) * 100) / 100;
      } else if (this.scheme == "Балка з 1 затиснутою опорою") {
        return Math.round(((this.q * this.l ** 2) / 8) * 100) / 100;
      } else if (this.scheme == "Консольна із зосередженою силою") {
        return Math.round(this.q * this.b_f * this.l * 100) / 100;
      } else if (this.scheme == "Балка на двох опорах з двома силами") {
        return Math.round(this.q * this.b_f * this.a * 100) / 100;
      }
      return Math.round( (this.q*this.l**2/2)*100)/100;
    },
    deflection() {
      if (this.scheme == "Балка з вільним опиранням") {
        return (
          Math.round(
            ((5 * this.q_e * this.l ** 4) / (384 * this.E * this.I_p)) *
              100 *
              10 ** 5
          ) / 100
        );
      } else if (this.scheme == "Балка з 2 затиснутими опорами") {
        return (
          Math.round(
            ((1 * this.q_e * this.l ** 4) / (384 * this.E * this.I_p)) *
              100 *
              10 ** 5
          ) / 100
        );
      } else if (this.scheme == "Балка з 1 затиснутою опорою") {
        return (
          Math.round(
            ((1 * this.q_e * this.l ** 4) / (185 * this.E * this.I_p)) *
              100 *
              10 ** 5
          ) / 100
        );
      } else if (this.scheme == "Консольна із зосередженою силою") {
        return (
          Math.round(
            ((1 * this.q_e * this.b_f * this.l ** 3) /
              (3 * this.E * this.I_p)) *
              100 *
              10 ** 5
          ) / 100
        );
      } else if (this.scheme == "Балка на двох опорах з двома силами") {
        return (
          Math.round(
            ((1 * this.q_e * this.b_f * this.l ** 3) /
              (24 * this.E * this.I_p)) *
              ((3 * this.a) / this.l - (4 * this.a ** 3) / this.l ** 2) *
              100 *
              10 ** 5
          ) / 100
        );
      }
      return Math.round(
        ( this.q_e * this.l**4)/(8 * this.E * this.I_p)*100*10**5)/100;
    },
    lenght() {
      return this.l;
    },
    types() {
      let k = 1;
      if (this.scheme == "Консольна" || this.scheme == "Консольна із зосередженою силою" ) {
        k = 2;
      }
      return k;
    },
  },
  watch: {
    stress(newValue) {
      this.$emit("update:stress", newValue);
    },
    deflection(newValue) {
      this.$emit("update:deflection", newValue);
    },
    lenght(newValue) {
      this.$emit("update:lenght", newValue);
    },
    types(newValue) {
      this.$emit("update:types", newValue);
    },
  },
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
    renderMath() {
      MathJax.typesetPromise();
    },
  },
};

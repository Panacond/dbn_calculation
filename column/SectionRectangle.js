const SectionRectangle = {
  props: ["geometry"],
  template: `
  <div>
    <h4>Суцільний переріз</h4>
    <img src="./image/rect.svg" alt="rect" />
    <span class="form-group">
        <label for="b">b мм:</label>
        <input type="number" v-model="geometry.b" id="b" min="0" step="1" />
    </span>
    <span class="form-group">
        <label for="t"> t мм:</label>
        <input type="number" v-model="geometry.t" id="t" min="0" step="1" />
    </span>
    <p>Площа перерізу:</p>
    <p>
        $$A=b \\times t = {{geometry.b}} \\times {{geometry.t}} \\times \\frac{1}{100}=
        {{A}} \\text{ см}^2$$
    </p>
    <p>Момент інерції:</p>
    <p>
        $$I_x = \\frac{b \\times t^3}{12} = \\frac{ {{geometry.b}} \\times {{geometry.t}}^3 }{12}
        \\times \\frac{1}{10^4} = {{I}} \\text{ см}^4 $$
    </p>
    <p>Момент опору см<sup>3</sup>:</p>
    <p>
        $$W_x=\\frac{I}{\\frac{b}{2}}=\\frac{ {{I}} }{\\frac{ {{geometry.b}} \\times 0.1
        }{2}} \\times10 = {{W}} \\text{ см}^3$$
    </p>
    <p>Радіус інерції перерізу:</p>
    <p>
        $$i=\\sqrt{ \\frac{I}{A}} = \\sqrt{ \\frac{ {{I}} }{ {{A}} }} =
        {{i}} \\text{ см}$$
    </p>
    </div>
    `,
  data() {
    return {};
  },
  computed: {
    A() {
      let a = this.round((this.geometry.b * this.geometry.t) / 100);
      this.geometry.A = a;
      return a;
    },
    I() {
      let I = this.round(
        (this.geometry.b * this.geometry.t ** 3) / 12 / 10 ** 4
      );
      this.geometry.I = I;
      return I;
    },
    W() {
      let W = this.round((this.I / this.geometry.b) * 2 * 10);
      this.geometry.W = W;
      return W;
    },
    i() {
      this.geometry.i = this.round((this.geometry.I / this.geometry.A) ** 0.5);
      this.geometry.alpha = 0.04;
      this.geometry.beta = 0.09;
      return this.geometry.i;
    },
  },
  methods: {
    round(a) {
      return Math.round(a * 100) / 100;
    },
    renderMath() {
      MathJax.typesetPromise();
    },
  },
  mounted() {
    // Ждем пока MathJax загрузится
    this.renderMath();
  },
  updated() {
    // Перерендериваем формулы при обновлении данных
    this.renderMath();
  },
};

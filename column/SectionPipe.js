const SectionPipe = {
  props: ["geometry"],
  template: `
    <div>
      <h4>Квадратна труба</h4>
      <img src="./image/pipe.svg" alt="pipe" />
      <span class="form-group">
        <label for="b">b мм:</label>
        <input type="number" v-model="geometry.b" id="b" min="0" step="1" />
      </span>
      <span class="form-group">
        <label for="t"> t мм:</label>
        <input type="number" v-model="geometry.t" id="t" min="0" step="1" />
      </span>
      <p>
        Площа перерізу: A={{A}} см<sup>2</sup>; Момент інерції:
        I<sub>x</sub>={{I}}см<sup>4</sup>;
      </p>
      <p>Момент опору см<sup>3</sup>:</p>
      <p>
        $$W_x=\\frac{I}{\\frac{b}{2}}=\\frac{ {{I}} }{\\frac{ {{geometry.b}} \\times 0.1
        }{2}} \\times10 = {{W=round(I/geometry.b*2*10)}} \\text{ см}^3$$
      </p>
      <p>Радіус інерції перерізу:</p>
      <p>
        $$i=\\sqrt{ \\frac{I}{A}} = \\sqrt{ \\frac{ {{I}} }{ {{A}} }} =
        {{i=round((I/A)**0.5 )}} \\text{ см}$$
      </p>
    </div>
    `,
  data() {
    return {};
  },
  computed: {
    A() {
      let a = this.round(
        (this.geometry.b * this.geometry.t * 4 - this.geometry.t ** 2 * 6) /
          10 ** 2
      );
      this.geometry.A = a;
      return a;
    },
    I() {
      let I = this.round(
        (this.geometry.b ** 4 / 12 -
          (this.geometry.b - this.geometry.t * 2) ** 4 / 12 -
          this.geometry.t ** 2 *
            (this.geometry.b / 2 + this.geometry.t * (7 - this.geometry.t)) **
              2) /
          10 ** 4
      );
      this.geometry.I = I;
      this.geometry.W = this.round((I / this.geometry.b) * 2 * 10);
      this.geometry.i = this.round((I / this.geometry.A) ** 0.5);
      this.geometry.alpha = 0.03;
      this.geometry.beta = 0.06;
      return I;
    },
  },
  methods: {
    round(a) {
      return Math.round(a * 100) / 100;
    },
  },
};

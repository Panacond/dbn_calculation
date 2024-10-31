const SectionNumerical = {
  props: ["geometry"],
  template: `
  <h4>Чисельний переріз {{A}}</h4>
  <img src="./image/rect.svg" alt="rect" />
  <span class="form-group">
    <label for="A">площа A (cм<sup>2</sup>):</label>
    <input type="number" v-model="geometry.A" min="0" step="0.1" />
  </span>
  <span class="form-group">
    <label for="I"> момент інерції I<sub>x</sub> (cм<sup>4</sup>):</label>
    <input type="number" v-model="geometry.I" min="0" step="0.1" />
  </span>
  <p>
    <span class="form-group">
      <label for="W"> момент опору W<sub>x</sub> (cм<sup>3</sup>):</label>
      <input type="number" v-model="geometry.W" min="0" step="0.1" />
    </span>
  </p>
  <p>Радіус інерції перерізу:</p>
  <p>
    $$i=\\sqrt{ \\frac{I}{A}} = \\sqrt{ \\frac{ {{geometry.I}} }{
    {{geometry.A}} }} = {{geometry.i}} \\text{ см}$$
  </p>
  <p>тип поперечного перерізу для визначення криової стійкості:</p>
  <div id="type">
    <input type="radio" id="one" value="1" v-model="type_a" />
    <label for="one">
      <img src="./image/section1.svg" alt="section1" />
    </label>
    <input type="radio" id="two" value="2" v-model="type_a" />
    <label for="two">
      <img src="./image/section2.svg" alt="section2" />
    </label>
    <input type="radio" id="three" value="3" v-model="type_a" />
    <label for="two">
      <img src="./image/section3.svg" alt="section3" />
    </label>
    {{select_type}}
  </div>
    `,
  data() {
    return {
        type_a: 1,
    };
  },
  computed: {
    A() {
      this.geometry.A = 1;
      this.geometry.I = 4;
      this.geometry.W = 2;
      this.geometry.i = this.round( (this.geometry.I/ this.geometry.A)**0.5 )
    },
    select_type() {
        if (this.type_a == 1) {
          this.geometry.alpha = 0.03;
          this.geometry.beta = 0.06;
        } else if(this.type_a == 2){
          this.geometry.alpha = 0.04;
          this.geometry.beta = 0.09;
        } else{
          this.geometry.alpha = 0.04;
          this.geometry.beta = 0.14;
        }
      },
  },
  methods: {
    round(a) {
      return Math.round(a * 100) / 100;
    },
  },
};

const GeometrySection = {
  props: [],
  emits: ["update:ipcalk","update:wpcalk",],
  template: `
    <h2>Геометрічні характеристики перерізу</h2>
    <p></p>
    <div class="grid-container">
      <div class="left">
        <div v-if="picked === 'One'">
          <p>
            I<sub>p</sub>=
            <input v-model="I_p" type="number" placeholder="I_p" />
            (см<sup>4</sup>) момент інерції
          </p>
          <p>
            W<sub>p</sub>=
            <input v-model="W_p" type="number" placeholder="W_p" />
            (см<sup>3</sup>) момент опору
          </p>
        </div>
        <div v-else>
          <p>
            h=
            <input v-model="h" type="number" placeholder="h" />
            (мм) висота перерізу
            <img
              class="section"
              src="../09_al_beam/section.svg"
              width="100px"
              alt="сечение"
            />
          </p>

          <p>
            b<sub>s</sub>=
            <input v-model="b_s" type="number" placeholder="b" />
            (мм) ширина перерізу
          </p>
          <p>
            t=
            <input v-model="t" type="number" placeholder="t" />
            (мм) товщина елементa
          </p>
          <p>
            Момент інерції: $ I = \\frac{b_s \\times h^3}{12} - \\frac{(b_s - 2
            \\times t) \\times (h - 2 \\times t)^3}{12}= \\frac{ {{b_s}}
            \\times {{h}}^3}{12} - \\frac{({{b_s}} - 2 \\times {{t}}) \\times
            ({{h}} - 2 \\times {{t}})^3}{12} = {{I_p = Math.round((
            b_s*h**3/12-(b_s-2*t)*(h-2*t)**3/12 )/100)/100}}см^4$
          </p>
          <p>
            Момент опору: $W = \\frac{I}{ \\frac{h}{2} } = \\frac{ {{I_p}} }{
            \\frac{ {{h}} }{2} } = {{W_p =
            Math.round((I_p/h*2)*1000)/100}}см^3$
          </p>
        </div>
      </div>
      <div class="right">
        <input type="radio" id="one" value="One" v-model="picked" />
        <label for="one">Чисельно</label><br />

        <input type="radio" id="two" value="Two" v-model="picked" />
        <label for="two">Переріз</label>
      </div>
    </div>
    `,
  data() {
    return {
      I_p: 166.71,
      W_p: 26.53,
      picked: "One",
      b_s: 100,
      h: 100,
      t: 1.5,
    };
  },
  computed: {
    ipcalk(){
        if (this.picked == "One"){
          return this.I_p
        } else{
          return this.round((this.b_s *this.h**3/12 - (this.b_s- 2*this.t)*(this.h- 2*this.t)**3/12)/10**4 )
        }
    },
    wpcalk(){
      if (this.picked == "One"){
        return this.W_p
      } else{
        return this.round(this.ipcalk /this.h*2*10 )
      }
  },
  },
  watch: {
    ipcalk(newValue) {
      this.$emit("update:ipcalk", newValue);
    },
    wpcalk(newValue) {
      this.$emit("update:wpcalk", newValue);
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

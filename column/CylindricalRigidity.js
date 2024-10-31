const CylindricalRigidity = {
  props: ["young_modulus", "delta_1", "mu", "number"],
  template: `
    <div>
        <p>цилиндрическая жесткость стекла №{{number}}:</p>
        <p>$$D_{{number}} = \\frac{E \\times \\delta_{{number}}^3 }{ 12 (1- \\mu )} = \\frac{ {{E}} \\times {{delta_1}}^3 }{ 12 (1- {{mu}} )} \\times \\frac{1}{10^3} = {{D_1}} \\text{ N m}$$</p>
    </div>
    `,
  data() {
    return {};
  },
  computed: {
    E() {
      return this.young_modulus;
    },
    D_1() {
      let d = this.round(
        (this.young_modulus * this.delta_1 ** 3) /
          (12 * (1 - this.mu)) /
          10 ** 3
      );
      this.$emit('update-rigidity', d);
      return d;
    },
  },
  methods: {
    round(a) {
      return Math.round(a * 100) / 100;
    },
  },
};

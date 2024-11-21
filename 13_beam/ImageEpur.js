const ImageEpur = {
  props: ["beam", "epur", "value"],
  template: `
  <div>
    <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width="650px"
    height="400px"
    >
    <g id="beam">
        <path
        d="M 20 200 L 620 200"
        fill="none"
        stroke="rgb(0, 0, 0)"
        stroke-miterlimit="20"
        pointer-events="stroke"
        />
    </g>

    <g id="forse_distributed">
        <defs>
        <pattern
            patternUnits="userSpaceOnUse"
            width="10"
            height="10"
            x="0"
            y="0"
            patternTransform="rotate(0)"
            id="mx-pattern-hatch-1-0050ef-0"
        >
            <line
            x1="0"
            y1="0"
            x2="0"
            y2="10"
            stroke="blue"
            stroke-width="1"
            />
        </pattern>
        </defs>
        <g transform="translate(20 200)">
        <path
            :d="graph()"
            fill="url(#mx-pattern-hatch-1-0050ef-0)"
            stroke="#001dbc"
        />

        <g v-for="item in value">
            <g :transform="x1(item.x)">
            <text
                :x="-15+item.x"
                :y="positive(item.y)"
                fill="rgb(0, 0, 0)"
                font-family="Helvetica"
                font-size="12px"
                text-anchor="middle"
            >
                {{item.y}}
            </text>
            </g>
        </g>
        </g>
    </g>
    </svg>
    </div>
    `,
  data() {
    return {};
  },
  computed: {
    max_abc() {
      let m = 0;
      for (let i of this.epur) {
        if (Math.abs(i.y) > m) {
          m = Math.abs(i.y);
        }
      }
      return m;
    },
  },
  methods: {
    graph() {
      const start = "M 0 0 ";
      const end = "L 0 0 Z";
      let middle = "";
      for (let i of this.epur) {
        middle +=
          "L " +
          (i.x / this.beam) * 600 +
          " " +
          -(i.y / this.max_abc) * 180 +
          " ";
      }
      return start + middle + end;
    },
    positive(x) {
      if (x < 0) {
        return (x / this.max_abc) * -190 - 30;
      }
      return (x / this.max_abc) * -190 - 40;
    },

    x1(x) {
      x = (x / this.beam) * 600;
      x += 13;
      return "translate(" + x + " 40)";
    },
  },
};

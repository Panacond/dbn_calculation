const ImageBeam = {
  props: ["beam","loads", "support" ],
  template: `
  <div>
  <svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  version="1.1"
  width="650px"
  height="132px"
>
  <g id="beam">
    <path
      d="M 20 90 L 620 90"
      fill="none"
      stroke="rgb(0, 0, 0)"
      stroke-miterlimit="10"
      pointer-events="stroke"
    />
    <g>
      <g v-for="item in support">
        <g id="support" :transform="sup(item.start)">
          <path
            d="M 140 120 L 170 120"
            fill="none"
            stroke="rgb(0, 0, 0)"
            stroke-width="3"
            stroke-miterlimit="10"
            pointer-events="none"
          />
          <path
            d="M 160 130 L 170 120"
            fill="none"
            stroke="rgb(0, 0, 0)"
            stroke-miterlimit="10"
            pointer-events="none"
          />
          <path
            d="M 150 130 L 160 120"
            fill="none"
            stroke="rgb(0, 0, 0)"
            stroke-miterlimit="10"
            pointer-events="none"
          />
          <path
            d="M 140 130 L 150 120"
            fill="none"
            stroke="rgb(0, 0, 0)"
            stroke-miterlimit="10"
            pointer-events="none"
          />
          <ellipse
            cx="155"
            cy="95"
            rx="5"
            ry="5"
            fill="rgb(255, 255, 255)"
            stroke="rgb(0, 0, 0)"
            pointer-events="none"
          />
          <path
            d="M 155 110 L 155 100"
            fill="none"
            stroke="rgb(0, 0, 0)"
            stroke-miterlimit="10"
            pointer-events="none"
          />
          <ellipse
            cx="155"
            cy="115"
            rx="5"
            ry="5"
            fill="rgb(255, 255, 255)"
            stroke="rgb(0, 0, 0)"
            pointer-events="none"
          />
        </g>
      </g>
    </g>
  </g>

  <g v-for="item in list">
    <g id="force" :transform="x(item.l)">
      <text
        x="20"
        y="25"
        fill="rgb(0, 0, 0)"
        font-family="Helvetica"
        font-size="12px"
        text-anchor="middle"
      >
        {{item.p}}кН
      </text>
      <path
        d="M 20 30 L 20 73.63"
        fill="none"
        stroke="rgb(0, 0, 0)"
        stroke-miterlimit="10"
        pointer-events="stroke"
      />
      <path
        d="M 20 78.88 L 16.5 71.88 L 20 73.63 L 23.5 71.88 Z"
        fill="rgb(0, 0, 0)"
        stroke="rgb(0, 0, 0)"
        stroke-miterlimit="10"
      />
    </g>
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
    <g v-for="item in list_distributed">
      <g :transform="x1(item.l)">
        <rect
          x="7"
          y="30"
          :width="(item.b-item.l)/beam*600"
          height="20"
          fill="url(#mx-pattern-hatch-1-0050ef-0)"
          stroke="#001dbc"
          pointer-events="all"
        />

        <g id="forse">
          <path d="M 7 30 L 7 43.63" fill="none" stroke="rgb(0, 0, 0)" />
          <path
            d="M 7 48.88 L 3.5 41.88 L 7 43.63 L 10.5 41.88 Z"
            fill="rgb(0, 0, 0)"
            stroke="rgb(0, 0, 0)"
          />
        </g>
        <text
          :x="(item.b-item.l)/beam*300"
          y="19"
          fill="rgb(0, 0, 0)"
          font-family="Helvetica"
          font-size="12px"
          text-anchor="middle"
        >
          {{item.p}}кН/м
        </text>
        <use
          x="0"
          y="0"
          xlink:href="#forse"
          :transform="x2(item.b-item.l)"
        />
        <use
          x="0"
          y="0"
          xlink:href="#forse"
          :transform="x3(item.b-item.l)"
        />
      </g>
    </g>
  </g>
</svg>
</div>
    `,
  data() {
    return {
    };
  },
  computed: {
    list() {
        let l = [];
        for (let i of this.loads) {
          if (i.type == "point") {
            let a = { p: i.magnitude, l: i.start };
            l.push(a);
          }
        }
        return l;
      },
      list_distributed() {
        let l = [];
        for (let i of this.loads) {
          if (i.type == "uniform") {
            let a = { p: i.magnitude, l: i.start, b: i.end };
            l.push(a);
          }
        }
        return l;
      },
  },
  methods: {
    x(x) {
        return "translate(" + (x / this.beam) * 600 + " 10)";
      },
      x1(x) {
        x = (x / this.beam) * 600;
        x += 13;
        return "translate(" + x + " 40)";
      },
      x2(x) {
        x = ((x / this.beam) * 600) / 2;
        return "translate(" + x + " )";
      },
      x3(x) {
        x = (x / this.beam) * 600;
        return "translate(" + x + " )";
      },
      sup(x) {
        return "translate(" + ((x / this.beam) * 600 - 135) + ")";
      },
      round(a) {
        return Math.round(a * 100) / 100;
      },
  },
};

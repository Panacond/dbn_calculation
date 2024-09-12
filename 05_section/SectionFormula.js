const SectionFormula = {
  components: {
    RectangleForm,
  },
  props: {},
  template: `
    <h1>Розрахунок характеристик складного перерізу складного з прямокутників </h1>

      <div class="form-row" v-for="(rect, index) in rectangles" :key="rect.id">
        <rectangle-form
          v-model:width="rect.width"
          v-model:height="rect.height"
          v-model:x="rect.x"
          v-model:y="rect.y"
        ></rectangle-form>
        <button @click="removeRectangle(index)">Видалити</button>
      </div>
      <button @click="addRectangle">Додати прямокутник</button>
      <br />

      <!-- SVG Drawing -->
      <svg
        width="500"
        height="500"
        style="border: 1px solid black; margin-top: 20px"
      >
        <!-- Сетка -->
        <g>
          <line
            v-for="n in 50"
            :x1="n*10"
            :y1="0"
            :x2="n*10"
            :y2="500"
            class="grid"
          ></line>
          <line
            v-for="n in 50"
            :x1="0"
            :y1="n*10"
            :x2="500"
            :y2="n*10"
            class="grid"
          ></line>
        </g>

        <!-- Оси координат -->
        <line x1="5" y1="5" x2="40" y2="5" class="axis"></line>
        <!-- Ось X -->
        <line x1="5" y1="5" x2="5" y2="40" class="axis"></line>
        <!-- Ось Y -->

        <!-- Стрелка оси X -->
        <polygon points="30,0 40,5 30,10" class="arrow"></polygon>

        <!-- Стрелка оси Y -->
        <polygon points="5,40 0,30 10,30" class="arrow"></polygon>
        <text x="40" y="10" font-size="14" fill="black">X</text>
        <text x="0" y="50" font-size="14" fill="black">y</text>

        <!-- Прямоугольники -->
        <rect
          v-for="rect in rectangles"
          :key="rect.id"
          :x="rect.x"
          :y="rect.y"
          :width="rect.width"
          :height="rect.height"
        />
        <!-- Точка центра -->
        <circle :cx="centroidX" :cy="centroidY" r="3" fill="red" />
        <line
          :x1="centroidX-10"
          :y1="centroidY"
          :x2="centroidX+10"
          :y2="centroidY"
          stroke="red"
          stroke-width="1"
          stroke-dasharray="3 3"
        ></line>
        <!-- Горизонтальная линия -->
        <line
          :x1="centroidX"
          :y1="centroidY-10"
          :x2="centroidX"
          :y2="centroidY+10"
          stroke="red"
          stroke-width="1"
          stroke-dasharray="3 3"
        ></line>
        <!-- Вертикальная линия -->
      </svg>
      <!-- Формулы -->
      <div class="formula">
        <h2>Розрахунки</h2>
        <p>усі розрахунки виконані в мм, але результат для характеристик переведен у см</p>
        <p>
          <strong>Загальна площа перерізу:</strong> 
        </p>
        <p v-html="renderAreaFormula"></p>
        <p>
          <strong
            >Координати центру важкості (X<sub>cg</sub>, Y<sub>cg</sub>):</strong
          >
        </p>
        <p v-html="renderCentroidFormulaX"></p>
        <p v-html="renderCentroidFormulaY"></p>
        <p>
          <strong>Момент інерції (I<sub>x</sub>):</strong>
        </p>

        <p v-html="renderInertiaXFormula"></p>
        <p>
          <strong>Момент інерції (I<sub>y</sub>):</strong>
        </p>

        <p v-html="renderInertiaYFormula"></p>
        <p>
          <strong>Моменти опору:</strong>
        </p>

        <p v-html="renderSectionModulusFormulaXuP"></p>
        <p v-html="renderSectionModulusFormulaXdown"></p>
        <p v-html="renderSectionModulusFormulaYleft"></p>
        <p v-html="renderSectionModulusFormulaYright"></p>
      </div>
    `,
  setup() {
    const rectangles = ref([
      { id: 1, width: 20, height: 10, x: 10, y: 50 },
      { id: 2, width: 10, height: 50, x: 30, y: 10 },
      { id: 3, width: 30, height: 5, x: 40, y: 10 },
    ]);

    const addRectangle = () => {
      const newId = rectangles.value.length
        ? Math.max(...rectangles.value.map((r) => r.id)) + 1
        : 1;
      rectangles.value.push({
        id: newId,
        width: 50,
        height: 50,
        x: 10,
        y: 10,
      });
    };

    const removeRectangle = (index) => {
      rectangles.value.splice(index, 1);
    };

    const totalArea = computed(() => {
      return rectangles.value.reduce(
        (sum, rect) => sum + rect.width * rect.height,
        0
      );
    });

    const centroidX = computed(() => {
      const sumWx = rectangles.value.reduce(
        (sum, rect) =>
          sum + rect.width * rect.height * (rect.x + rect.width / 2),
        0
      );
      return sumWx / totalArea.value;
    });

    const centroidY = computed(() => {
      const sumWy = rectangles.value.reduce(
        (sum, rect) =>
          sum + rect.width * rect.height * (rect.y + rect.height / 2),
        0
      );
      return sumWy / totalArea.value;
    });

    const inertiaX = computed(() => {
      return rectangles.value.reduce((sum, rect) => {
        const Ix = (rect.width * Math.pow(rect.height, 3)) / 12;
        const dy = Math.pow(rect.y + rect.height / 2 - centroidY.value, 2);
        return sum + (Ix + rect.width * rect.height * dy);
      }, 0);
    });

    const inertiaY = computed(() => {
      return rectangles.value.reduce((sum, rect) => {
        const Iy = (rect.height * Math.pow(rect.width, 3)) / 12;
        const dx = Math.pow(rect.x + rect.width / 2 - centroidX.value, 2);
        return sum + (Iy + rect.width * rect.height * dx);
      }, 0);
    });

    const sectionModulusX = computed(() => {
      return inertiaX.value / (centroidY.value || 1);
    });

    const sectionModulusY = computed(() => {
      return inertiaY.value / (centroidX.value || 1);
    });

    const renderAreaFormula = computed(() => {
      let areaSteps = rectangles.value
        .map((rect, i) => ` ${rect.width} \\times ${rect.height}`)
        .join(" + ");
      return katex.renderToString(
        `A_{total} =\\sum  w_i \\times h_i =  ${areaSteps} =  ${(
          totalArea.value / 100
        ).toFixed(2)} \\text{ см}^2`
      );
    });

    const sectionModuli = computed(() => {
      // Найдем максимальные и минимальные координаты Y для расчета Wx-up и Wx-down
      const maxY = Math.max(
        ...rectangles.value.map((rect) => rect.y + rect.height)
      );
      const minY = Math.min(...rectangles.value.map((rect) => rect.y));

      // Найдем максимальные и минимальные координаты X для расчета Wy-left и Wy-right
      const maxX = Math.max(
        ...rectangles.value.map((rect) => rect.x + rect.width)
      );
      const minX = Math.min(...rectangles.value.map((rect) => rect.x));

      // Расчет W для всех направлений
      const Yup = maxY - centroidY.value;
      const WxUp = inertiaX.value / Yup;
      const Ydown = centroidY.value - minY;
      const WxDown = inertiaX.value / Ydown;
      const Xleft = centroidX.value - minX;
      const WyLeft = inertiaY.value / Xleft;
      const Xright = maxX - centroidX.value;
      const WyRight = inertiaY.value / Xright;

      return { WxUp, WxDown, WyLeft, WyRight, Yup, Ydown, Xleft, Xright };
    });

    const renderCentroidFormulaX = computed(() => {
      let centroidStepsX = rectangles.value
        .map(
          (rect, i) =>
            `${rect.width * rect.height} \\times (${rect.x} + \\frac{${
              rect.width
            }}{2})`
        )
        .join(" + ");
      return katex.renderToString(
        `X_{cg}= \\sum \\frac{A_i \\times x_i}{A_{total}}=  ${centroidStepsX}  = ${centroidX.value.toFixed(
          2
        )} \\text{ мм},`
      );
    });

    const renderCentroidFormulaY = computed(() => {
      let centroidStepsY = rectangles.value
        .map(
          (rect, i) =>
            `${rect.width * rect.height} \\times (${rect.y} + \\frac{${
              rect.height
            }}{2})`
        )
        .join(" + ");
      return katex.renderToString(
        `Y_{cg} = \\sum \\frac{A_i \\times y_i}{A_{total}} =   ${centroidStepsY}  = ${centroidY.value.toFixed(
          2
        )} \\text{ мм}`
      );
    });

    const renderInertiaXFormula = computed(() => {
      let inertiaXSteps = rectangles.value
        .map(
          (rect, i) =>
            `\\frac{${rect.width} \\times ${rect.height}^3}{12} + ${
              rect.width * rect.height
            } \\times (${Math.round(rect.y * 100) / 100} + \\frac{${
              rect.height
            }}{2} - ${Math.round(centroidY.value * 100) / 100})^2`
        )
        .join(" + ");

      return katex.renderToString(
        `I_{x} = \\sum(I_{xi} + A_i \\times y_i^2)= ${inertiaXSteps} =${(
          inertiaX.value /
          10 ** 4
        ).toFixed(2)} \\text{ см}^4`
      );
    });

    const renderInertiaYFormula = computed(() => {
      let inertiaYSteps = rectangles.value
        .map(
          (rect, i) =>
            `\\frac{${rect.height} \\times ${rect.width}^3}{12} + ${
              rect.width * rect.height
            } \\times (${Math.round(rect.x * 100) / 100} + \\frac{${
              rect.width
            }}{2} - ${Math.round(centroidX.value * 100) / 100})^2`
        )
        .join(" + ");

      return katex.renderToString(
        `I_{y} = \\sum(I_{yi} + A_i \\times x_i^2) = ${inertiaYSteps}  = ${(
          inertiaY.value /
          10 ** 4
        ).toFixed(2)} \\text{ см}^4`
      );
    });

    const renderSectionModulusFormulaXuP = computed(() => {
      return katex.renderToString(
        `W_{x\\text{-up}}= \\frac{I_x}{y_{up}} = \\frac{ ${inertiaX.value.toFixed(
          2
        )} }{${sectionModuli.value.Yup.toFixed(2)}}=  ${(
          sectionModuli.value.WxUp /
          10 ** 3
        ).toFixed(2)} \\text{ см}^3`
      );
    });

    const renderSectionModulusFormulaXdown = computed(() => {
      return katex.renderToString(
        `
  W_{x\\text{-down}}= \\frac{I_x}{y_{doun}} =
  \\frac{ ${inertiaX.value.toFixed(2)} }{${sectionModuli.value.Ydown.toFixed(
          2
        )}}
  = ${(sectionModuli.value.WxDown / 10 ** 3).toFixed(2)} \\text{ см}^3`
      );
    });

    const renderSectionModulusFormulaYleft = computed(() => {
      return katex.renderToString(
        `
  W_{y\\text{-left}}= \\frac{I_y}{x_{left}}=
  \\frac{ ${inertiaY.value.toFixed(2)} }{${sectionModuli.value.Xleft.toFixed(
          2
        )}}
  = ${(sectionModuli.value.WyLeft / 10 ** 3).toFixed(2)} \\text{ см}^3`
      );
    });

    const renderSectionModulusFormulaYright = computed(() => {
      return katex.renderToString(
        `
  W_{y\\text{-right}}= \\frac{I_y}{x_{right}} = 
  \\frac{ ${inertiaY.value.toFixed(2)} }{${sectionModuli.value.Xright.toFixed(
          2
        )}}
  =${(sectionModuli.value.WyRight / 10 ** 3).toFixed(2)} \\text{ см}^3`
      );
    });

    return {
      rectangles,
      addRectangle,
      removeRectangle,
      centroidX,
      centroidY,
      renderAreaFormula,
      renderCentroidFormulaX,
      renderCentroidFormulaY,
      renderInertiaXFormula,
      renderInertiaYFormula,
      renderSectionModulusFormulaXuP,
      renderSectionModulusFormulaXdown,
      renderSectionModulusFormulaYleft,
      renderSectionModulusFormulaYright,
    };
  },
  mounted() {
    renderMathInElement(this.$el, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
      ],
    });
  },
};

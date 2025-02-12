// const SelectChart =
app.component('select-chart', {
  props: ["width", "height"],
  emits: ['update:cd',],
  components: { ChartComponent },
  template:
    /*html*/
    `
        <p>
        Тип будівлі:
        <select v-model="scheme">
          <option disabled value="">Виберіть тип</option>
          <option>
            кам янa будівля чи будівеля із залізобетонним каркасом
          </option>
          <option>будівля із сталевим каркасом</option>
          <option>будівля із сталебетонним каркасом</option>
        </select>
      </p>
      <div
        v-if="scheme == 'кам янa будівля чи будівеля із залізобетонним каркасом'"
      >
        <p>Рисунок 9.5. Коефіцієнт Cd для кам яних будівель і будівель із залізобетонним каркасом</p>
        <chart-component
          :lines="chartLines1"
          :point="pointData"
          @min-found="updateValue"
        ></chart-component>
      </div>
      <div v-if="scheme == 'будівля із сталевим каркасом'">
        <p>Рисунок 9.6. Коефіцієнт Cd для будівель із сталевим каркасом</p>
        <chart-component
          :lines="chartLines2"
          :point="pointData"
          @min-found="updateValue"
        ></chart-component>
      </div>
      <div v-if="scheme == 'будівля із сталебетонним каркасом'">
        <p>Рисунок 9.7. Коефіцієнт Cd для будівель із сталебетонним каркасом</p>
        <chart-component
        :lines="chartLines3"
        :point="pointData"
        @min-found="updateValue"
      ></chart-component>
      </div>

    `,
  data() {
    return {
      //   width: 20,
      //   height: 45,
      // cd:15,
      chartLines1: linesData1,
      chartLines2: linesData2,
      chartLines3: linesData3,
      MinValue: 10,
      scheme: "кам янa будівля чи будівеля із залізобетонним каркасом",
    };
  },
  methods: {
    updateValue(value) {
      this.MinValue = value; // Получаем значение из дочернего компонента
    },
  },
  computed: {
    pointData() {
      return { x: this.width, y: this.height };
    },
    cd() {
      return this.MinValue;
    },
  },
  watch: {
    cd(newValue) {
      this.$emit("update:cd", newValue);
    },
  },
});

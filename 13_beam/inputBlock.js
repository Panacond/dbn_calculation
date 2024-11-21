const InputBlock = {
  props: ["loads", "data"],
  template: `
  <div>
  <h3>Вихідні дані</h3>
  <p class="form-group">
    <label>Довжина балки: </label>
    <input type="number" v-model="data.beamLength" min="0" step="0.1" />
    м
  </p>
  <div>
    <div v-for="(load, index) in loads" :key="index">
      <label>Тип навантаження:</label>
      <select v-model="load.type">
        <option value="point">Зосереджена</option>
        <option value="uniform">Поступово розподілена</option>
      </select>
      <div>
        <label>Величина (кН):</label>
        <input type="number" v-model="load.magnitude" />
        <label v-if="load.type === 'point'">Розташування (м):</label>
        <input
          type="number"
          v-model="load.start"
          v-if="load.type === 'point'"
          min="0"
          step="0.1"
          :max="data.beamLength"
          @input="load.start = validateInput(load.start)"
        />
        <label v-if="load.type === 'uniform'">Початок (м):</label>
        <input
          type="number"
          v-model="load.start"
          v-if="load.type === 'uniform'"
          min="0"
          step="0.1"
          :max="data.beamLength"
          @input="load.start = validateInput(load.start)"
        />
        <label v-if="load.type === 'uniform'">Кінець (м):</label>
        <input
          type="number"
          v-model="load.end"
          v-if="load.type === 'uniform'"
          min="0"
          step="0.1"
          :max="data.beamLength"
          @input="load.end = validateInput(load.end)"
        />
        <button @click="removeLoad(index)">Видалити навантаження</button>
      </div>
    </div>
    <button @click="addLoad">Додати навантаження</button>
  </div>
</div>
<div>
  <span class="form-group">
    <label>Модуль пружності: </label>
    <input
      type="number"
      v-model="data.modulusElasticity"
      min="0"
      step="1"
    />
    МПа;
  </span>
  <span class="form-group">
    <label>Момент інерції </label>
    <input type="number" v-model="data.momentInertia" min="0" step="1" />
    см<sup>4</sup>
  </span>
</div>
    `,
  data() {
    return {
    };
  },
  computed: {
  },

  methods: {
    validateInput(a) {
      if (a > this.data.beamLength) {
        return this.data.beamLength;
      } 
      return a;
    },
    addLoad() {
      this.loads.push({
        type: "uniform",
        magnitude: 0,
        start: 0,
        end: 0,
      });
    },
    removeLoad(index) {
      this.loads.splice(index, 1);
    },
  },
};

// const { createApp, ref, computed } = Vue;

const RectangleForm = {
    props: {
      width: Number,
      height: Number,
      x: Number,
      y: Number,
    },
    emits: ["update:width", "update:height", "update:x", "update:y"],
    template: `
  <div>
    <label>Width:
      <input type="number" v-model.number="widthLocal" @input="$emit('update:width', widthLocal)">
    </label>
    <label>Height:
      <input type="number" v-model.number="heightLocal" @input="$emit('update:height', heightLocal)">
    </label>
    <label>X:
      <input type="number" v-model.number="xLocal" @input="$emit('update:x', xLocal)">
    </label>
    <label>Y:
      <input type="number" v-model.number="yLocal" @input="$emit('update:y', yLocal)">
    </label>
  </div>
  `,
    data() {
      return {
        widthLocal: this.width,
        heightLocal: this.height,
        xLocal: this.x,
        yLocal: this.y,
      };
    },
    watch: {
      width(newVal) {
        this.widthLocal = newVal;
      },
      height(newVal) {
        this.heightLocal = newVal;
      },
      x(newVal) {
        this.xLocal = newVal;
      },
      y(newVal) {
        this.yLocal = newVal;
      },
    },
  };
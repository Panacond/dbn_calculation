const ChartComponent = {
  props: {
    lines: Array, // Данные линий
    point: Object, // Координаты точки
  },
  emits: ["min-found"],
  template: `
    <div style="width: 300px; height: 300px;">
      <canvas ref="canvasRef" width="300" height="300"></canvas>
    </div>
    <p>C<sub>d</sub>={{coordinate()}}</p>
  `,

  mounted() {
    this.drawChart();
  },
  watch: {
    lines: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
    point: {
      handler() {
        this.drawChart();
      },
      deep: true,
    },
  },
  methods: {
    coordinate() {
      const nearestPoints2 = this.findNearestPoints2(this.lines, this.point);
      const z = this.planeInter(this.point, nearestPoints2);
      return Math.round(z * 100) / 100;
    },
    planeInter(p0, points) {
      if (points.length < 3) return null;
      const [p1, p2, p3] = points;
      const A = (p2.y - p1.y) * (p3.z - p1.z) - (p3.y - p1.y) * (p2.z - p1.z);
      const B = (p3.x - p1.x) * (p2.z - p1.z) - (p2.x - p1.x) * (p3.z - p1.z);
      const C = (p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y);
      let z = p1.z - (A * (p0.x - p1.x) + B * (p0.y - p1.y)) / C;
      const minZ = Math.min(p1.z, p2.z, p3.z);
      z = Math.round((z > minZ ? z : minZ) * 100) / 100;
      this.$emit("min-found", z);
      return z;
    },
    findNearestPoints2(linesData, pointData) {
      const x0 = pointData.x;
      const y0 = pointData.y;

      const nearest = { Q1: null, Q2: null, Q3: null, Q4: null };

      function distance(p) {
        return Math.sqrt((p.x - x0) ** 2 + (p.y - y0) ** 2);
      }

      for (const line of linesData) {
        for (const point of line.line) {
          let quadrant = null;
          if (point.x > x0 && point.y > y0) quadrant = "Q1";
          else if (point.x < x0 && point.y > y0) quadrant = "Q2";
          else if (point.x < x0 && point.y < y0) quadrant = "Q3";
          else if (point.x > x0 && point.y < y0) quadrant = "Q4";

          if (
            quadrant &&
            (!nearest[quadrant] ||
              distance(point) < distance(nearest[quadrant]))
          ) {
            nearest[quadrant] = { ...point, z: line.z };
          }
        }
      }

      return Object.values(nearest)
        .filter((p) => p !== null)
        .sort((a, b) => distance(a) - distance(b))
        .slice(0, 3);
    },
    drawChart() {
      if (!this.$refs.canvasRef) return;
      const ctx = this.$refs.canvasRef.getContext("2d");

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const allX = this.lines.flatMap((line) => line.line.map((p) => p.x));
      const allY = this.lines.flatMap((line) => line.line.map((p) => p.y));
      const minX = Math.min(...allX);
      const maxX = Math.max(...allX);
      const minY = Math.min(...allY);
      const maxY = Math.max(...allY);

      let annotations = this.lines.map((lineData) => {
        let midPoint = lineData.line[Math.floor(lineData.line.length / 2)];
        return {
          type: "label",
          xValue: midPoint.x,
          yValue: midPoint.y-10,
          content: `${lineData.z}`,
          backgroundColor: "transparent",
          color: "blue",
          font: { size: 14, weight: "bold" },
        };
      });

      annotations.push(
        {
          type: "point",
          xValue: this.point.x,
          yValue: this.point.y,
          radius: 3,
          backgroundColor: "red",
          borderColor: "red",
          borderWidth: 2,
        },
        {
          type: "line",
          mode: "vertical",
          scaleID: "x",
          value: this.point.x,
          borderColor: "red",
          borderWidth: 1,
          borderDash: [5, 5],
        },
        {
          type: "line",
          mode: "horizontal",
          scaleID: "y",
          value: this.point.y,
          borderColor: "red",
          borderWidth: 1,
          borderDash: [5, 5],
        }
      );

      this.chartInstance = new Chart(ctx, {
        type: "scatter",
        data: {
          datasets: [
            ...this.lines.map((line) => ({
              label: "Линия",
              data: line.line.map((p) => ({ x: p.x, y: p.y })),
              borderColor: "black",
              borderWidth: 1.5,
              radius: 1,
              showLine: true,
              fill: false,
            })),
            {
              label: "Точка",
              data: [{ x: this.point.x, y: this.point.y }],
              backgroundColor: "red",
              borderColor: "red",
              borderWidth: 2,
              pointRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { type: "logarithmic", min: minX, max: maxX },
            y: { type: "logarithmic", min: minY, max: maxY },
          },
          plugins: {
            legend: { display: false },
            annotation: { annotations },
          },
        },
      });
    },
  },
};

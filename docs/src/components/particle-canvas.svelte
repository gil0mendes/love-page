<script lang="ts">
  import { onMount } from "svelte";

  import { Circle } from "../types/circle";
  import { Arc } from "../types/arc";
  import { watchResize } from "../hooks/resize";

  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;

  const MAX_CIRCLE_WIDTH = 100;
  const MIN_WIDTH_PERC = 0.15;

  const MAX_ELEMENTS = 20;

  let circlesList: Array<Circle> = [];
  let arcList: Array<Arc> = [];

  function setupCanvasSize() {
    const dpr = window.devicePixelRatio || 1;

    // Adapt the scale based on the screen pixel ratio
    context.scale(dpr, dpr);

    const elementRect = canvas.getBoundingClientRect();
    const elementWidth = elementRect.width;
    const elementHeight = elementRect.height;

    context.canvas.width = elementWidth * dpr;
    context.canvas.height = elementHeight * dpr;
  }

  function getRandomWidth() {
    return Math.random() * MAX_CIRCLE_WIDTH + MAX_CIRCLE_WIDTH * MIN_WIDTH_PERC;
  }

  function generateCircle({ x, y }): Circle {
    const width = getRandomWidth();
    return new Circle(x, y, width);
  }

  function generateArc({ x, y }): Arc {
    const width = getRandomWidth();
    return new Arc(x, y, width);
  }

  onMount(() => {
    context = canvas.getContext("2d");
    let frame: number;

    setupCanvasSize();

    const loveBtn = document.querySelector("#lovePageBtn") as HTMLElement;
    const btnRect = loveBtn.getBoundingClientRect();
    const initialRenderPos = { x: (btnRect.x + btnRect.width / 2) * 2, y: (btnRect.y + btnRect.height / 2) * 2 };

    (function loop() {
      frame = requestAnimationFrame(loop);

      // clear screen buffer before render next frame
      context.clearRect(0, 0, canvas.width, canvas.height);

      // set circle color
      context.fillStyle = "#d54c6af0";
      context.strokeStyle = "#d54c6af0";

      // generate a new circle if the limit wasn't reacted
      if (circlesList.length < MAX_ELEMENTS) {
        circlesList = [...circlesList, generateCircle(initialRenderPos)];
      }

      // generate a new arc if the limit wasn't reacted
      if (arcList.length < MAX_ELEMENTS) {
        arcList = [...arcList, generateArc(initialRenderPos)];
      }

      circlesList = circlesList.filter((circle) => {
        circle.update();
        circle.render(context);

        return !circle.isToRemove(canvas.width, canvas.height);
      });

      arcList = arcList.filter((arc) => {
        arc.update();
        arc.render(context);

        return !arc.isToRemove(canvas.width, canvas.height);
      });
    })();

    return () => {
      cancelAnimationFrame(frame);
    };
  });
</script>

<canvas class="z-0" bind:this={canvas} id="particleCanvas" use:watchResize={setupCanvasSize} />

<style>
  #particleCanvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>

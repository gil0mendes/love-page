const MAX_VELOCITY = 6;
const MIN_VELOCITY = -MAX_VELOCITY;

const INC_SCALE = 0.02;

/**
 * Last circle identifier to be assigned to a new circle.
 */
let lastCircleId = 0;

function getRandomVelocity(): number {
  return Math.random() * (MAX_VELOCITY * 2) + MIN_VELOCITY;
}

export class Circle {
  id: number;

  vx: number;
  vy: number;

  scale = 0.1;

  constructor(public x: number, public y: number, readonly size: number) {
    this.id = ++lastCircleId;

    this.vx = getRandomVelocity();
    this.vy = getRandomVelocity();
  }

  update(): void {
    this.x += this.vx;
    this.y += this.vy;
  }

  render(ctx: CanvasRenderingContext2D): void {
    const circlePath = new Path2D();

    this.scale += this.scale >= 1 ? 0 : INC_SCALE;
    const currentScale = this.size * this.scale;
    circlePath.arc(this.x, this.y, currentScale, 0, 2 * Math.PI);

    ctx.fill(circlePath);
  }

  /**
   * When the circle moves out of the canvas area remove it.
   *
   * @param width
   * @param height
   * @returns
   */
  isToRemove(width: number, height: number): boolean {
    return (
      this.x - this.size > width || this.y - this.size > height || this.x + this.size < 0 || this.y + this.size < 0
    );
  }
}

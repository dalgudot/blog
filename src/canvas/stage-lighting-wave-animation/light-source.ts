import { PI2 } from '../../lib/utils/Math';

export interface ILightSource {
  drawRadialGradientBehindLightSource: (ctx: CanvasRenderingContext2D) => void;
  drawLightSource: (ctx: CanvasRenderingContext2D) => void;
  drawLightLines: (
    ctx: CanvasRenderingContext2D,
    pointCenterX: number,
    pointCenterY: number
  ) => void;
}

export class LightSource implements ILightSource {
  private centerX: number;
  private centerY: number;
  private radius: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.centerX = canvasWidth / 2;
    this.centerY = canvasHeight / 1.4;
    this.radius =
      canvasWidth / 48 > 48
        ? 48
        : canvasWidth / 48 < 24
        ? 24
        : canvasWidth / 48;
  }

  drawRadialGradientBehindLightSource(ctx: CanvasRenderingContext2D) {
    const gradientRadius = this.radius * 16;
    const gradient = ctx.createRadialGradient(
      this.centerX,
      this.centerY,
      0,
      this.centerX,
      this.centerY,
      gradientRadius
    );
    gradient.addColorStop(0, 'rgb(102, 103, 171, 0.2)');
    gradient.addColorStop(1, 'rgb(31, 31, 36, 0.1)');
    ctx.fillStyle = gradient;
    ctx.arc(this.centerX, this.centerY, gradientRadius, 0, PI2);
    ctx.fill();
  }

  drawLightSource(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = 'rgb(102, 103, 171)';
    ctx.arc(this.centerX, this.centerY, this.radius, 0, PI2);
    ctx.fill();
  }

  drawLightLines(
    ctx: CanvasRenderingContext2D,
    pointCenterX: number,
    pointCenterY: number
  ) {
    ctx.strokeStyle = 'rgb(176, 176, 212, 0.24)';
    ctx.lineWidth = 1;
    ctx.moveTo(this.centerX, this.centerY - this.radius);
    ctx.lineTo(pointCenterX, pointCenterY);
    ctx.stroke();
  }
}

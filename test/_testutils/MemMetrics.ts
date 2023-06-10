export class MemMetrics {
  public min = 0;
  public max = 0;
  public sampleCount = 0;
  public sampleSum = 0;
  public average = 0;

  constructor() {
  }

  /**
   * @param memUsage
   */
  sampleAndStore() {
    // samples memory usage in megabytes
    const memUsage = this.sampleMemUsage();

    if (this.min === 0) this.min = memUsage;
    if (memUsage < this.min) this.min = memUsage;
    if (memUsage > this.max) this.max = memUsage;
    // assert(memUsage < 100);
    this.sampleCount += 1;
    this.sampleSum += memUsage;
    this.average = this.sampleSum / this.sampleCount;
  }

  /**
   * @returns Memory usage at the time of calling this function in megabytes
   */
  sampleMemUsage() {
    const memUsage = Deno.memoryUsage();
    const kiloBytes = memUsage.rss / 1024;
    const megaBytes = kiloBytes / 1024;

    return megaBytes;
  }

  log() {
    console.info(`Memory Usage Information: 
    sampleCount: ${this.sampleCount}
    min: ${this.min}
    max: ${this.max}
    average: ${this.average}
    `);
  }
}

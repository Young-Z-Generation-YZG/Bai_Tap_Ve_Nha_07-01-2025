// mutex.ts
export class Mutex {
  private _locked: boolean = false;
  private _queue: (() => void)[] = [];

  isLocked(): boolean {
    return this._locked;
  }

  acquire(): Promise<() => void> {
    if (!this._locked) {
      this._locked = true;
      return Promise.resolve(() => {
        this._locked = false;
        const next = this._queue.shift();
        if (next) next();
      });
    }
    return new Promise((resolve) => {
      this._queue.push(() => {
        this._locked = true;
        resolve(() => {
          this._locked = false;
          const next = this._queue.shift();
          if (next) next();
        });
      });
    });
  }

  async waitForUnlock(): Promise<void> {
    if (!this._locked) return;
    await new Promise<void>((resolve) => this._queue.push(resolve));
  }
}

export const mutex = new Mutex();
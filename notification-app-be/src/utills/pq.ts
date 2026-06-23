
const WEIGHT: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

interface Notification {
  ID: string;
  Type: string;
  Message: string;
  Timestamp: string;
}

function score(n: Notification ): number {
  const weight = WEIGHT[n.Type] ?? 0;
  const time = new Date(n.Timestamp).getTime();

  return weight * 1e13 + time;
}

export class MaxHeap {
  private heap: Notification[] = []; 

  private parent(i: number) { return Math.floor((i - 1) / 2); }
  private left(i: number) { return 2 * i + 1; }
  private right(i: number) { return 2 * i + 2; }

  private swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  private bubbleUp(i: number) {
    while (i > 0 && score(this.heap[i]) > score(this.heap[this.parent(i)])) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }

  private bubbleDown(i: number) {
    let max = i;
    const l = this.left(i);
    const r = this.right(i);
    if (l < this.heap.length && score(this.heap[l]) > score(this.heap[max])) max = l;
    if (r < this.heap.length && score(this.heap[r]) > score(this.heap[max])) max = r;
    if (max !== i) {
      this.swap(i, max);
      this.bubbleDown(max);
    }
  }

  insert(n: Notification) {
    this.heap.push(n);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMax(): Notification | null {
    if (!this.heap.length) return null;
    const top = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return top;
  }

  size() { return this.heap.length; }

  getTopN(n: number): Notification[] {
    const copy = new MaxHeap();
    copy.heap = [...this.heap];
    const result: Notification[] = [];
    for (let i = 0; i < n && copy.size() > 0; i++) {
      const item = copy.extractMax();
      if (item) result.push(item);
    }
    return result;
  }
}
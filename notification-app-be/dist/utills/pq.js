const WEIGHT = {
    Placement: 3,
    Result: 2,
    Event: 1,
};
const score = (n) => (WEIGHT[n.Type] ?? 0) * 1e13 + new Date(n.Timestamp).getTime();
export class MaxHeap {
    heap = [];
    parent(i) { return Math.floor((i - 1) / 2); }
    left(i) { return i * 2 + 1; }
    right(i) { return i * 2 + 2; }
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    bubbleUp(i) {
        while (i > 0 &&
            score(this.heap[i]) > score(this.heap[this.parent(i)])) {
            const p = this.parent(i);
            this.swap(i, p);
            i = p;
        }
    }
    bubbleDown(i) {
        while (true) {
            let max = i;
            const l = this.left(i);
            const r = this.right(i);
            if (l < this.heap.length && score(this.heap[l]) > score(this.heap[max]))
                max = l;
            if (r < this.heap.length && score(this.heap[r]) > score(this.heap[max]))
                max = r;
            if (max === i)
                break;
            this.swap(i, max);
            i = max;
        }
    }
    insert(n) {
        this.heap.push(n);
        this.bubbleUp(this.heap.length - 1);
    }
    extractMax() {
        if (this.heap.length === 0)
            return null;
        const top = this.heap[0];
        const last = this.heap.pop();
        if (last !== undefined && this.heap.length > 0) {
            this.heap[0] = last;
            this.bubbleDown(0);
        }
        if (top == undefined)
            return null;
        return top;
    }
    size() {
        return this.heap.length;
    }
    getTopN(n) {
        const copy = new MaxHeap();
        copy.heap = [...this.heap];
        const result = [];
        while (result.length < n && copy.size() > 0) {
            const item = copy.extractMax();
            if (item !== null) {
                result.push(item);
            }
        }
        return result;
    }
}
//# sourceMappingURL=pq.js.map
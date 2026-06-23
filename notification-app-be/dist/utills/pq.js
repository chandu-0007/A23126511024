const WEIGHT = {
    Placement: 3,
    Result: 2,
    Event: 1,
};
function score(n) {
    const weight = WEIGHT[n.Type] ?? 0;
    const time = new Date(n.Timestamp).getTime();
    return weight * 1e13 + time;
}
export class MaxHeap {
    heap = [];
    parent(i) { return Math.floor((i - 1) / 2); }
    left(i) { return 2 * i + 1; }
    right(i) { return 2 * i + 2; }
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    bubbleUp(i) {
        while (i > 0 && score(this.heap[i]) > score(this.heap[this.parent(i)])) {
            this.swap(i, this.parent(i));
            i = this.parent(i);
        }
    }
    bubbleDown(i) {
        let max = i;
        const l = this.left(i);
        const r = this.right(i);
        if (l < this.heap.length && score(this.heap[l]) > score(this.heap[max]))
            max = l;
        if (r < this.heap.length && score(this.heap[r]) > score(this.heap[max]))
            max = r;
        if (max !== i) {
            this.swap(i, max);
            this.bubbleDown(max);
        }
    }
    insert(n) {
        this.heap.push(n);
        this.bubbleUp(this.heap.length - 1);
    }
    extractMax() {
        if (!this.heap.length)
            return null;
        const top = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length) {
            this.heap[0] = last;
            this.bubbleDown(0);
        }
        return top;
    }
    size() { return this.heap.length; }
    getTopN(n) {
        const copy = new MaxHeap();
        copy.heap = [...this.heap];
        const result = [];
        for (let i = 0; i < n && copy.size() > 0; i++) {
            const item = copy.extractMax();
            if (item)
                result.push(item);
        }
        return result;
    }
}
//# sourceMappingURL=pq.js.map
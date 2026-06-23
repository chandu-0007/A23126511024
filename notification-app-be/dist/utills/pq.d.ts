interface Notification {
    ID: string;
    Type: string;
    Message: string;
    Timestamp: string;
}
export declare class MaxHeap {
    private heap;
    private parent;
    private left;
    private right;
    private swap;
    private bubbleUp;
    private bubbleDown;
    insert(n: Notification): void;
    extractMax(): Notification | null;
    size(): number;
    getTopN(n: number): Notification[];
}
export {};
//# sourceMappingURL=pq.d.ts.map
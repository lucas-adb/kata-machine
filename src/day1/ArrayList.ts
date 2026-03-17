export default class ArrayList<T> {
    public length: number;
    private capacity: number;
    private array: T[];

    constructor(capacity: number = 5) {
        this.capacity = capacity;
        this.array = [];
        this.array.length = this.capacity;
        this.length = 0;
    }

    private grow() {
        const old = this.array;
        this.capacity *= 2;
        this.array = [];
        this.array.length = this.capacity;

        for (let i = 0; i < this.length; i++) {
            this.array[i] = old[i];
        }
    }

    private ShiftLeft(idx: number) {
        this.length--;
        for (let i = idx; i < this.length; i++) {
            this.array[i] = this.array[i + 1];
        }
    }

    private ShiftRight(idx: number) {
        if (this.length === this.capacity) {
            this.grow();
        }

        for (let i = this.length; i > idx; i--) {
            this.array[i] = this.array[i - 1];
        }

        this.length++;
    }

    prepend(item: T): void {
        this.ShiftRight(0);
        this.array[0] = item;
    }

    insertAt(item: T, idx: number): void {
        this.ShiftRight(idx);
        this.array[idx] = item;
    }

    append(item: T): void {
        if (this.length === this.capacity) {
            this.grow();
        }

        this.array[this.length] = item;
        this.length++;
    }

    remove(item: T): T | undefined {
        let i = 0;

        for (; i < this.length; i++) {
            if (this.array[i] === item) {
                break;
            }
        }

        if (i === this.length) {
            return undefined;
        }

        return this.removeAt(i);
    }

    get(idx: number): T | undefined {
        if (idx >= this.length) {
            return undefined;
        }

        return this.array[idx];
    }
    removeAt(idx: number): T | undefined {
        const item = this.get(idx);
        this.ShiftLeft(idx);
        return item;
    }
}

import { BRAND } from "./types.js";
export class AppleMobile {
    brand = BRAND.APPLE;
    name;
    price;
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    description() {
        return `Apple ${this.name} with price ${this.price}`;
    }
}

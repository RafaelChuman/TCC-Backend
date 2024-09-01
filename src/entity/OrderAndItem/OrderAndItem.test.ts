import { v4 as uuidv4 } from "uuid";
import { OrderAndItem } from "./OrderAndItem";

describe("Unit Test for Oil Monitor Class", () => {

    it("Should create a oil monitor", async () => {

        const test = new OrderAndItem();

        test.deleted = false;

        // expect(typeof test.id).toBe('string');
        // expect(typeof test.oilLevel).toBe('number');
        // expect(typeof test.createdAt).toBe('Date');
        // expect(typeof test.er).toBe('ERs');

        expect(test.id).not.toBeNull();
    })
})

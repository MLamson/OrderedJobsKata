import {testSetup} from "../src/OrderedJobs";

describe('test', () => {
    it('true should be true', () => {
        expect(testSetup.isWorking).toBe(true);
    });
});
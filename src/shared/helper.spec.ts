import { pick } from './helper';

describe('pick', () => {
    it('should pick one key', () => {
        const input = { key1: 'value1', key2: 'value2' };
        const picked = pick(input, 'key2');
        const output = { key2: 'value2' };

        expect(picked).toStrictEqual(output);
    });

    it('should pick two keys', () => {
        const input = { key1: 'value1', key2: 'value2', key3: 'value3' };
        const picked = pick(input, 'key1', 'key2');
        const output = { key1: 'value1', key2: 'value2' };

        expect(picked).toStrictEqual(output);
    });

    it('should not pick non-existent keys', () => {
        const input = { key1: 'value1', key2: 'value2' } as {
            [key: string]: string;
        };
        const picked = pick(input, 'key1', 'key3');
        const output = { key1: 'value1' };

        expect(picked).toStrictEqual(output);
    });
});

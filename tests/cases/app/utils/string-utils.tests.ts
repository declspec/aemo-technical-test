import { findSubTextIndices } from 'app/utils/string-utils';

type NoneExpected = [string, string];
type SingleExpected = [string, string, number];
type MultipleExpected = [string, string, number[]];

describe('findSubTextIndices', () => {
    const emptyInputs: NoneExpected[] = [
        ['', 'test'],
        ['test', ''],
        ['', '']
    ];

    it.each(emptyInputs)('should return an empty array with empty inputs', (text, subText) => {
        const actual = findSubTextIndices(text, subText)
        expect(actual).toEqual([]);
    })

    const singleInputs: SingleExpected[] = [
        ['hello', 'hello', 0],
        ['hello, world', 'world', 7]
    ];

    it.each(singleInputs)('should successfully find single instances', (text, subText, expected) => {
        const actual = findSubTextIndices(text, subText);
        expect(actual).toEqual([expected]);
    })

    const multipleInputs: MultipleExpected[] = [
        ['hello, hello', 'hello', [0, 7]],
        ['goodbye, world goodbye world good', 'goodbye', [0, 15]]
    ];

    it.each(multipleInputs)('should successfully find multiple instances', (text, subText, expected) => {
        const actual = findSubTextIndices(text, subText);
        expect(actual).toEqual(expected);
    })

    const unmatchedInputs: NoneExpected[] = [
        ['hello', 'goodbye'],
        ['fooba', 'bar'],
        ['h', 'hello']
    ];

    it.each(unmatchedInputs)('should not find subText that does not match', (text, subText) => {
        const actual = findSubTextIndices(text, subText);
        expect(actual).toEqual([]);
    });

    const insensitiveInputs: SingleExpected[] = [
        ['hello', 'HeLLO', 0],
        ['hello, world', 'WOrlD', 7]
    ];

    it.each(singleInputs)('should be case insensitive', (text, subText, expected) => {
        const actual = findSubTextIndices(text, subText);
        expect(actual).toEqual([expected]);
    })
});


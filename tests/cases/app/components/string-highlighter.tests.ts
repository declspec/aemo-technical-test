import { mount } from '@vue/test-utils';
import { findSubTextIndices } from 'app/utils';

import StringHighlighter from 'app/components/string-highlighter.vue';

interface Props {
    string: string;
    markers: {start: number, length: number}[];
}

function mountComponent(props: Props) {
    const wrapper = mount(StringHighlighter, {
        propsData: props
    });

    // TypeScript support for *.vue components is not great so have to cast to any
    return wrapper.vm as any;
}

describe('components/string-highlighter.vue', () => {
    it('should correctly chunk the text', () => {
        const str = 'this is a fairly long string that is definitely long and has trailing text';
        const indices = findSubTextIndices(str, 'long');

        const vm = mountComponent({
            string: str,
            markers: indices.map(i => ({ start: i, length: 'long'.length }))
        });

        const actual = vm.chunks.reduce((acc: string, chunk: any) => acc + chunk.text, '');
        const highlighted = vm.chunks.filter((chunk: any) => chunk.isHighlighted);

        expect(actual).toEqual(str);
        expect(highlighted.length).toEqual(indices.length);
    });

    it ('should correctly handle empty markers', () => {
        const vm = mountComponent({
            string: 'this is an example string',
            markers: []
        });

        expect(vm.chunks.length).toEqual(1);
        expect(vm.chunks[0].text).toEqual(vm.string);
    })
})
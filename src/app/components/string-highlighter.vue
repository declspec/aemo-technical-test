<template>
    <pre><!--
    --><template v-for="(chunk, index) in chunks"><!--
        --><span :key="index" 
                v-if="chunk.isHighlighted" 
                class="highlighted" 
                :title="`position: ${chunk.position}`"
            >{{ chunk.text }}</span><!--
        --><template v-else>{{ chunk.text }}</template><!--
    --></template><!--
--></pre>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';

    export type TextMarker = {
        start: number;
        length: number;
    };

    interface TextChunk {
        text: string;
        position?: number;
        isHighlighted?: boolean;
    };

    @Component({})
    export default class StringHighlighter extends Vue {
        @Prop({ required: true })
        public string!: string;

        @Prop({ required: true })
        public markers!: TextMarker[];

        public get chunks(): TextChunk[] {
            // Ensure that the markers are pre-sorted to appear in document order.
            const sortedMarkers = this.markers.slice().sort((a, b) => a.start - b.start);
            return textToChunks(this.string, sortedMarkers);
        }
    }

    function textToChunks(text: string, sortedMarkers: TextMarker[]): TextChunk[] {
        const chunks: TextChunk[] = [];
        let lastIndex = 0;

        for (const marker of sortedMarkers) {
            // Any text between the current match and the last index is not highlighted
            if (marker.start > lastIndex) {
                chunks.push({ 
                    text: text.substring(lastIndex, marker.start)
                });
            }

            // Update lastIndex to match the next location (NOTE: order important here)
            lastIndex = marker.start + marker.length;
            const markerText = text.substring(marker.start, lastIndex);

            // Add the highlighted chunk if required
            if (markerText.length > 0) {
                chunks.push({
                    text: markerText,
                    position: marker.start,
                    isHighlighted: true
                });
            }

            // TODO: this only happens if markers is invalid (i.e. refers to locations outside of `text`)
            //  decide if this constitutes an error or not.
            if (lastIndex >= text.length)
                break;
        }

        // Add any trailing unhighlighted text
        if (lastIndex < text.length) {
            chunks.push({
                text: text.substring(lastIndex),
                isHighlighted: false
            })
        }

        return chunks;
    }
</script>

<style lang="scss" scoped>
    .highlighted {
        background-color: cyan;
    }
</style>
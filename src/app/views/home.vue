<template>
    <div class="primary-layout">
        <div class="left-column">
            <div class="form-group field-subtext" name="subText">
                <input id="subText" v-model="subText" placeholder="Enter text to search for" />
            </div>

            <div class="form-group field-text" name="text">
                <textarea id="text" v-model="text" placeholder="Fill out some text to search in" />
            </div>
        </div>
        <div class="right-column">
            <div class="results">
                <span v-if="!markers.length" class="no-results">No results found, make sure you've added some text!</span>
                <span v-else-if="markers.length === 1" class="some-results">Showing 1 result</span>
                <span v-else class="some-results">Showing {{ markers.length }} results</span>
            </div>
            <string-highlighter :string="text" :markers="markers"></string-highlighter>
        </div>
    </div>
</template>



<script lang="ts">
    import { Vue, Component, Watch } from 'vue-property-decorator';
    import { ErrorCollection, findSubTextIndices } from 'app/utils';

    import StringHighlighter, { TextMarker } from 'app/components/string-highlighter.vue';

    const LoremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    @Component({
        components: { 
            StringHighlighter
        }
    })
    export default class HomeView extends Vue {
        public text: string = LoremIpsum;
        public subText: string = "";

        public get markers(): TextMarker[] {
            const indices = findSubTextIndices(this.text, this.subText);
            const subTextLen = this.subText.length;
            
            return indices.map(index => ({ 
                start: index, 
                length: subTextLen
            }));
        }
    }
</script>

<style lang="scss" scoped>
    .primary-layout {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        font-size: 0.875rem;

        .left-column {
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;

            .field-subtext {
                flex: 0 0 auto;

                input {
                    padding: 1rem;
                    width: 100%;
                    display: block;
                    border: none;
                    outline: none;
                    font-size: inherit;
                }
            }

            .field-text {
                flex: 1 1 auto;

                textarea { 
                    display: block;
                    width: 100%;
                    height: 100%;
                    font-family: inherit;
                    font-size: inherit;
                    padding: 1rem;
                    outline: none;
                    border: 1px solid #666;
                }
            }
        }

        .right-column {
            width: 50%;
            height: 100%;

            .results {
                padding: 1rem;
                border-bottom: 1px solid #666;

                .no-results {
                    color: red;
                }

                .some-results {
                    color: green;
                }
            }

            pre {
                font-family: inherit;
                padding: 1rem;
                margin: 0;
                white-space: pre-wrap;
            }
        }
    }
</style>
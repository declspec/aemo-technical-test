export function findSubTextIndices(text: string, subText: string, isCaseSensitive: boolean = false): number[] {
    if (text.length === 0 || subText.length === 0)
        return [];
        
    // PERF: check on toLowerCase() vs manually creating a case-insensitive regex
    const lowerText = text.toLowerCase();
    const lowerSubText = subText.toLowerCase();
    const indices = [];

    let index = 0;
    
    // Sweep the text using indexOf, keeping track of the last known position.
    while ((index = lowerText.indexOf(lowerSubText, index)) >= 0) {
        indices.push(index);
        index += lowerSubText.length;
    }

    return indices;
}
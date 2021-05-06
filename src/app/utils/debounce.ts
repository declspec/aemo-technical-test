// Returns a function wrapper that - as long as it continues to be invoked - will not
// invoke the underlying function. The underlying function will be called after 
// the wrapper hasn't been called for `interval` milliseconds
export function debounce<TArgs extends unknown[]>(interval: number, fn: (...args: TArgs) => never): (...args: TArgs) => void;
export function debounce<TThis, TArgs extends unknown[]>(interval: number, fn: (this: TThis, ...args: TArgs) => never): (this: TThis, ...args: TArgs) => void {
    let timeout: number | undefined;

    return function(this: TThis, ...args: TArgs) {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            if (!timeout)
                return;

            timeout = undefined;
            fn.apply(this, args);
        }, interval);
    };
}
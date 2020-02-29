export const randomNum = (min: number, max: number) => Math.random() * (max - min) + min;

const delay = async (ms: number) => new Promise((resolve, rejects) => {
    setTimeout(resolve, ms);
});

export const humanDelay = async (fixedDelay: number) =>
    fixedDelay ? await delay(fixedDelay) : await delay(randomNum(500, 3000));
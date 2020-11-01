// A **promise** example
namespace roulettePromise {
    function roulette(): boolean {
        return Math.random() > 0.5
    }

    export function runRoulette(timeout: number): Promise<string> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(roulette()) {
                    resolve('You won!')
                } else {
                    reject(new Error('Looser!'))
                }
            }, timeout)
        })
    }
}

const game = roulettePromise.runRoulette(1000)

game.finally(() => {console.log('Game ready')})
    .then(value => {console.log(value)})
    .catch(reason => {console.log(reason)})
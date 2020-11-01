// A **groupby example
namespace groupByExample {
    class ExtendedArray<T> extends Array<T> {
        assign(newElement: T): ExtendedArray<T> {
            super.push(newElement)
            return this
        }
    }

    interface DataRow {
        name: string
        score: number
    }

    interface IGroupedData<T> {
        [name: string]: ExtendedArray<T>
    }

    class GroupedData<T> implements IGroupedData<T>{
        [name: string]: ExtendedArray<T>
    }

    function getGroup<T>(groupedData: IGroupedData<T>, name: string): ExtendedArray<T> {
        if(groupedData[name]) {
            return groupedData[name]
        }
        return new ExtendedArray<T>()
    }

    const dataset: DataRow[] = [
        {name: 'Ivan', score: 12},
        {name: 'John', score: 23},
        {name: 'Ivan', score: 34},
        {name: 'Alex', score: 51},
        {name: 'Ivan', score: 33},
        {name: 'John', score: 21}
    ]

    const groupedData = dataset.reduce(
        (prev: IGroupedData<number>, curr: DataRow) => Object.assign(prev, {[curr.name]: getGroup(prev, curr.name).assign(curr.score)}),
        new GroupedData<number>()
    )

    console.log(groupedData)
}

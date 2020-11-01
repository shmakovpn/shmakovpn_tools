interface IGroups<T> {
    [key: string]: Array<T>
}

interface IGroupsDict<T> {
    push(key: string, value: T): IGroupsDict<T>
}

class GroupsDict<T> implements IGroupsDict<T> {
    protected _groups: IGroups<T> = {}

    push(key: string, value: T): IGroupsDict<T> {
        if(!(key in this._groups)) {
            this._groups[key] = new Array<T>()
        }
        this._groups[key].push(value)
        return this
    }
}

interface DataRow {
    name: string
    score: number
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
    (prev: IGroupsDict<number>, curr: DataRow) => prev.push(curr.name, curr.score),
    new GroupsDict<number>()
)

console.log(groupedData)
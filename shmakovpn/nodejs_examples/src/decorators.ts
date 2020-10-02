console.log('Hello from Decorators')

function Log(constructor: Function) {
    console.log(constructor)
}

function Log2(target: any, propName: string|Symbol) {
    console.log(`Log2 target=${target}`)
    console.log(`Log2 propName=${propName}`)
}

function Log3(target: any, propName: string|Symbol, descriptor: PropertyDescriptor) {
    console.log(`Log3 target=${target}`)
    console.log(`Log3 propName=${propName}`)
    console.log(`Log3 descriptor=${descriptor}`)
}

@Log
class Component {
    @Log2
    name: string

    constructor(name: string) {
        this.name = name
    }

    @Log3
    get componentName() {
        return this.name
    }

    @Log3
    logName(): void {
        console.log(`Component name is ${this.name}`)
    }
}

const component = new Component('Fox')
console.log('Component created')
component.logName()

//
interface ComponentDecorator {
    selector: string
    template: string
}

function Component2(config: ComponentDecorator) {
    return function (Constructor: Function) {
        return class extends Constructor {
            constructor(...args: any[]) {
                super();
            }
        }
    }
}

@Component2({
    selector: '#card',
    template: `
        <div class="card">
           <div class="card-content">
               <span class="card-title">Card Component</span>
           </div>
        </div>
    `
})
class CardComponent {
    constructor(public name: string) {
    }

    logName(): void {
        console.log(`Component Name: ${this.name}`)
    }
}



console.log('Hello from Decorators')

// the decorator for a class
function Log(constructor: Function) {
    console.log(constructor)
}

// the decorator for a property
function Log2(target: any, propName: string|Symbol) {
    console.log(`Log2 target=${target}`)
    console.log(target)
    console.log(`Log2 propName=${propName}`)
}

// the decorator for a method
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

// a decorator which receives arguments is a function
// this function return another function
function Component2(config: ComponentDecorator) {
    return function
        <T extends { new(...args: any[]): object}>
    (Constructor: T) {
        return class extends Constructor {
            constructor(...args: any[]) {
                super(...args);

                const el: Element|null = document.querySelector(config.selector)
                if(el) {
                    el.innerHTML = config.template
                }
            }
        }
    }
}

// decorator
function Bind(_: any, _2: any, descriptor: PropertyDescriptor): PropertyDescriptor {
    const original = descriptor.value

    return {
        configurable: true,
        enumerable: false,
        get(): any {
            return original.bind(this)
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
    constructor(protected name: string) {
    }

    @Bind
    logName(): void {
        console.log(`Component Name: ${this.name}`)
    }
}

const card = new CardComponent('My card component')

const btn2: Element = document.querySelector('#btn')!

btn2.addEventListener('click', card.logName)


// ----

type ValidatorType = 'required' | 'email'

interface ValidatorConfig {
   [prop: string]: {
       [validateProp: string]: string
   }
}

const validators: ValidatorConfig = {

}

function Required(target: any, propName: string) {
    validators[target.constructor.name] = {
        ...validators[target.constructor.name],
        [propName]: 'required'
    }
}

function validate(obj: any): boolean {
    const objConfig = validators[obj.constructor.name]
    if(!objConfig) {
        return true
    }
    let isValid: boolean = true
    Object.keys(objConfig).forEach(key => {
        if (objConfig[key] === 'required') {
            isValid = isValid && !!obj[key]
        }
    })
    return isValid
}

// class Form {
//     @Required
//     email: string | void
//
//     constructor(email?: string) {
//         this.email = email
//     }
// }
//
// const form = new Form()
//
// if(validate(form)) {
//     console.log('Valid: ', form)
// } else {
//     console.log('Validation failed')
// }


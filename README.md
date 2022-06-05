# NgxStir

A dead simple state management for Angular. Strongly inspired by Vuex.

## Motivation

The most of time, developers are using huge state management packages to solve simple problems - like ngrx/store. The motivation behind this project is to show how this kind of solution can be simple.  

We don't need complex solutions to solve simple problems.   

## How to create a store

You just need to make a service extends the `Stir` class.  

```ts
@Injectable({
  providedIn: 'root'
})
export class SumStoreService extends Stir<number>{

  constructor() { 
    super(0);
  }

  add(value: number) {
    this.setState(this.state + value); 
  }

  subtract(value: number) {
    if(this.state === 0) {
        return;
    }

    this.setState(this.state - value); 
  }
  
}

```

That's all! 

The service can handle asynchronous and synchronous operations. 

> The `Stir` class can deal only with synchronous operations.

## Using with components

See below an example using shared state among components.

```ts
@Component({
  selector: 'app-root',
  template: `
    <app-total></app-total>
    <app-actions></app-actions>
  `,
})
export class AppComponent {
  
    sum: number;

    contructor(
        private sumStoreService: SumStoreService
    ) { }

    ngOnInit() {
        sumStoreService
            .changes
            .subscribe(state => {
                this.sum = state;
            })
    }
}
```

```ts
@Component({
  selector: 'app-total',
  template: `
    <strong>Total: {{ total }}</strong>
  `,
})
export class TotalComponent {
  
    sum: number = this.sumStoreService.state;

    contructor(
        private sumStoreService: SumStoreService
    ) { }

    ngOnInit() {
        sumStoreService
            .changes
            .subscribe(state => {
                this.sum = state;
            });
    }
}
```

```ts
@Component({
  selector: 'app-actions',
  template: `
    <button (click)="onAdd()">+</button>
    <button (click)="onSubtract()">-</button>
  `,
})
export class ActionsComponent {
  
    contructor(
        private sumStoreService: SumStoreService
    ) { }

    onAdd() {
        this.sumStoreService.add(1);
    }

    onSubtract() {
        this.sumStoreService.subtract(1);
    }
}
```

## Properties

| Name  | Type          | Description                       |   
|---        |---            |---                                |
| state  | T (Generic Type) | The state of store                |   
| changes  | Observable<T>  | Emit an event when state changes  |

## Methods

| Name      | Param                   | Description       |   
|---        |---                      |---                |
| setState  | value: T (Generic Type) | Set a new state   |   


> This project is being developed using TDD. The main goal is to reach 100% of coverage. 


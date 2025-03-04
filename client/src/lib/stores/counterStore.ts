import { makeAutoObservable } from 'mobx'
export default class CounterStore {
    title = 'Counter store';
    count = 42;

    constructor() {
        // makeObservable(this, {
        //     title: observable,
        //     count: observable,
        //     increment: action,
        //     decrement: action
        // })
        makeAutoObservable(this)
    }

    increment = (amount = 1) => {
        this.count += amount
    }

    decrement = (amount = 1) => {
        this.count -= amount
    }

}
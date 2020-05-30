/// <reference types='reflect-metadata'/>
import Vue from 'vue';
import {createDecorator} from 'vue-class-component'
import {isObservable, Observable, Subscription as RxSub} from "rxjs";

export function DomStream() {
    return (target: any, key: string) => {
        createDecorator((componentOptions, key) => {
            // @ts-ignore
            if (componentOptions.domStreams) {
                // @ts-ignore
                componentOptions.domStreams.push(key);
            } else {
                // @ts-ignore
                componentOptions.domStreams = [key];
            }
        })(target, key)
    }
}

export function defineReactive (vm: any, key: string, val: any) {
    if (key in vm) {
        vm[key] = val;
    } else {
        // @ts-ignore
        Vue.util.defineReactive(vm, key, val);
    }
}

export function Subscription(observable: any) {

    return (target: any, key: string) => {
        createDecorator((componentOptions, k) => {
            target.$observables = target.$observables || {}

            // @ts-ignore
            target._subscription = target._subscription || new RxSub()
            defineReactive(target, key, undefined)

            // @ts-ignore
            const obs = target.$observables[k] = observable
            if (!isObservable(obs)) {
                console.warn(
                    'Invalid Observable found in subscriptions option with key "' + key + '".',
                    target
                )
                return
            }
            target._subscription.add(obs.subscribe((value: any) => {
                target[key] = value
            }, (error: any) => { throw error }))
        })(target, key)
    }
}

/// <reference types='reflect-metadata'/>
import {createDecorator} from 'vue-class-component'
import {Observable} from "rxjs";

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

export function Subscription() {

    return (target: any, key: string) => {
        createDecorator((componentOptions, k: string) => {
            // @ts-ignore
            if (typeof componentOptions.subscriptions == 'function') {
                // @ts-ignore
                let obs: any = componentOptions.subscriptions()
                obs[k] = new Observable<any>()

                // @ts-ignore
                componentOptions.subscriptions = function() {
                    return obs;
                }
            } else {
                // @ts-ignore
                componentOptions.subscriptions = function () {
                    return {
                        [k]: new Observable<any>(),
                    }
                }
            }
        })(target, key)
    }
}

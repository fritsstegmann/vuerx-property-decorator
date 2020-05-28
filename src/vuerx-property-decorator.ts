/// <reference types='reflect-metadata'/>
import {createDecorator} from 'vue-class-component'

/**
 * decorator of a dom stream
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
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
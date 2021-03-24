import React from 'react'
import {
    useRecoilValue,
} from 'recoil';

import { charCountState } from '../../atom'

export default function Name() {
    const count = useRecoilValue(charCountState);
    console.log('errer', count)
    return (
        <div>
         my name is
         <input defaultValue="heyu"/>
        </div>
    )
}
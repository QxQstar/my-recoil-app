import React, { useState } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil'

import { searchedName, userNameQuery } from './atom'

import request from '../../../packages/request-he';

export default function CurrentUserInfo() {
    const [keyword, setKeyword] = useState('default');
    const [name,setName] = useRecoilState(searchedName)
    const userNameLoadable = useRecoilValueLoadable(userNameQuery(name));
    const onOk = () => {
        setName(keyword)
        setKeyword('')
    }
    switch (userNameLoadable.state) {
        case 'hasValue':
          return <div>
              <input value={keyword} onChange={(event) => setKeyword(event.target.value)}/>
            <button onClick={onOk}>ok</button>
              {userNameLoadable.contents}
            </div>;
        case 'loading':
          return <div>Loading...</div>;
        case 'hasError':
          throw userNameLoadable.contents;
      }
}
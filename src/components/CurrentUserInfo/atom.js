import { atom, selector, selectorFamily } from 'recoil'

export const searchedName = atom({
    key: 'searchedName',
    default: ''
})

export const resultName = selector({
    key: 'resultName',
    get: ({get}) => {
        const name = get(searchedName);
        if (name) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(name)
                },1000)
            })
        } else {
            return Promise.resolve('输入')
        }
        
    }
})

export const userNameQuery = selectorFamily({
    key: 'userNameQuery',
    get: (ID) => () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(ID)
            },1000)
        })
    }
})
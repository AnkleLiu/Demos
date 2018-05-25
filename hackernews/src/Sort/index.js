import React from 'react'
import Button from '../Button/index'

const Sort = ({ sortKey, onSort, children, activeSortKey }) => {
    const sortClass = ['button-inline']
    if (sortKey === activeSortKey) {
        sortClass.push('button-active')
    }
    return (
        <Button
            onClick={() => onSort(sortKey)}
            className={sortClass.join(' ')}>
            {children}
        </Button>
    )
}


export default Sort

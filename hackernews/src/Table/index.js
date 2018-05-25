import React from 'react'
import Button from '../Button/index'
import { SORTS } from '../App'
import Sort from '../Sort/index'

const Table = ({ list, onDismiss, sortKey, onSort, isSortReverse }) => {
        const sortedList = SORTS[sortKey](list)
        const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList
    return (
        <div className="table">
            <div className="table-header">
                <span style={{ width: '40% '}}>
                    <Sort
                        sortKey={'TITLE'}
                        onSort={onSort}
                        activeSortKey={sortKey}
                    >
                        Title
                    </Sort>
                </span>
                <span style={{ width: '30% '}}>
                    <Sort
                        sortKey={'AUTHOR'}
                        onSort={onSort}
                        activeSortKey={sortKey}
                    >
                        Author
                    </Sort>
                </span>
                <span style={{ width: '10% '}}>
                    <Sort
                        sortKey={'COMMENTS'}
                        onSort={onSort}
                        activeSortKey={sortKey}
                    >
                        Comments
                    </Sort>
                </span>
                <span style={{ width: '10% '}}>
                    <Sort
                        sortKey={'POINTS'}
                        onSort={onSort}
                        activeSortKey={sortKey}
                    >
                        Points
                    </Sort>
                </span>
                <span style={{ width: '10% '}}>
                    Archive
                </span>
            </div>
            {
                reverseSortedList.map(item => (
                    <div key={item.objectID} className="table-row">
                        <span style={{ width: '40%' }}>
                            <a href={item.url}>{item.url}</a>
                        </span>
                        <span style={{ width: '30%' }}>{item.title}</span>
                        <span style={{ width: '30%' }}>{item.author}</span>
                        <span style={{ width: '10%' }}>{item.num_comments}</span>
                        <span style={{ width: '10%' }}>{item.points}</span>
                        <span style={{ width: '10%' }}>
                            <Button
                                className="button-inline"
                                onClick={() => onDismiss(item.objectID)}>
                                Dismiss
                            </Button>
                        </span>
                    </div>
                ))
            }

        </div>
    )
}

export default Table

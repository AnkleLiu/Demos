import React from 'react'
import Button from '../Button/index'

const Table = ({ list, onDismiss }) => {
    return (
        <div className="table">
            {
                list.map(item => (
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

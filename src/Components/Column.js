import React from 'react';
import Card from './Card';
import './Column.css'

const Column = ({ columns, sortOption }) => {
      const sortDecider = (x, y) => {
            if (sortOption === "sortPriority") return sortOnPriority(x, y);
            else if (sortOption === "sortTitle") return sortOnTitle(x, y);
            else return 0;
      }
      const sortOnPriority = (x, y) => {
            if (x.priority > y.priority) return -1;
            return 1;
      }
      const sortOnTitle = (x, y) => {
            if (x.title > y.title) return 1;
            return -1;
      }
      return (
            <div className="columns">
                  {Object.keys(columns).sort(() => -1).map((column) => (

                        <div key={column} className='column' >
                              <div className='columnTop'>
                                    <h3>{column} <span>{columns[column].length}</span></h3>
                              </div>
                              <div className='columnCards'>
                                    {
                                          columns[column].sort(sortDecider).map((obj) => {
                                                return <Card key={obj.id} card={obj} />
                                          })
                                    }
                              </div>
                        </div>
                  ))
                  }
            </div >
      );
};

export default Column;

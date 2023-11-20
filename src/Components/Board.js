import React from 'react';
import Column from './Column';

const Board = ({ columns, sortOption }) => {
      return (
            <div>
                  <div className="board">
                        <Column columns={columns} sortOption={sortOption} />
                  </div>
            </div>
      );
};

export default Board;

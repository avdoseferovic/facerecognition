import React from 'react';

const Rank = ({stats}) => {
    return (
        <div style={{marginTop: '100px'}}>
            <div className='white f3'>
                { stats.name +  ' your current rank is..'}
            </div>
            <div className='white f1'>
                {stats.entries}
            </div>
        </div>
    );
};

export default Rank;
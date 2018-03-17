import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({url, box}) => {
    return (
        <div className='center ma'>
        <div className='absolute'>
            <img id='faceimage' className='imagerecognize' src={url} alt=''/>

            <div className='face-box'
                 style={{top: box.topRow, left: box.leftCol, right: box.rightCol, bottom: box.bottomRow}}>
            </div>
        </div>
        </div>
    );
};

export default FaceRecognition;
import React from 'react';

import './Modal.css';

const modal = (props) => {
    const styles = ['Modal', props.show ? 'ModalShow' : 'ModalClose']

    return (
    <div className={styles.join(' ')}>
        <h1>A Modal</h1>
        <button className="Button" onClick={props.onCloseModal}>Dismiss</button>
    </div>
    )
};

export default modal;
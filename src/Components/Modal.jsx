import { forwardRef, useEffect, useRef } from 'react'
import '../Styles/Modal.css'
import '@material/web/ripple/ripple.js'
import { Link } from 'react-router-dom';

const CustomModal = forwardRef(function CustomModal(props) {
    const dialog = useRef(null);

    useEffect(() => {
        dialog.current.showModal();
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
            }
        }
        );
    }, []);
    return (
        <>
            <dialog ref={dialog} id="dialog" className='col al-ctr'>
                <div className="model-header col al-ctr gp-16">
                    <div className="modal-icon row">
                        <span className="material-symbols-rounded modal-warning-icon">wrong_location</span>
                    </div>
                    <div className="modal-header title-large">
                        No well selected
                    </div>
                    <div className="modal-content row">
                        <p className="body-large">
                            Currently no well is selected. Please select a well from the map to view the metrics.
                        </p>
                    </div>
                </div>
                <md-divider></md-divider>
                <div className="model-footer row">
                    <Link to="/" className="link">
                        <div className="button row fw al-ctr jc-ctr gp-12 go-home">
                            <md-ripple></md-ripple>
                            <span className="material-symbols-rounded">home</span>
                        </div>
                    </Link>
                    <Link to="/map" className="link">
                        <div className="button row fw al-ctr jc-ctr gp-12 go-map">
                            <md-ripple></md-ripple>
                            <span className="material-symbols-rounded">map</span>
                            Select a location
                        </div>
                    </Link>
                </div>
            </dialog>
        </>

    )
});

export default CustomModal;

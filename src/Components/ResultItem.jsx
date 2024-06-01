import '@material/web/divider/divider.js'
import '../Styles/ResultItem.css'


export default function ResultItem() {
    return (
        <>
            <div className="result-item-container col">
                <div className="item-content col gp-8">
                    <p className="title-medium">Sample Location 1</p>
                    <p className="body-large">Sample Item Description</p>
                    <div className="status row">
                        <span className='status-token safe'>Safe to Drink</span>
                    </div>
                    <p className="body-medium last-updated  "><span>
                        Updated : {"23-June-2021"}
                    </span></p>
                </div>
                <div className="divider"></div>
                <div className="card-action row jc-end">
                    <div className="button text-button row jc-ctr al-ctr">
                        More Details
                    </div>
                </div>
            </div>


        </>
    )
}

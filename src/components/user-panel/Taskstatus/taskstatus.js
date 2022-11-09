import axios from 'axios'
import { useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookie from 'react-cookies'
import '../../admin-panel/multipleusers/multipleuser.scss'
export default () => {
    const params=useParams();
    const Navigate = useNavigate()
    const [activeButton, setActiveButton] = useState(true)
    const [status, setStatus] = useState({
        taskStatus:"",
    })
    const setStatusApi = (e) => {
        e.preventDefault(e)
        let token = Cookie.load('token');
        let headers = {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        axios.patch(`https://crm-09.herokuapp.com/task/edit/${params.id}`, status, headers).then((response) => {
            alert("You Have Succesfully Send Task Status")
            Navigate('/')
            setActiveButton(false)
        })
    }
    return (
        <>
            <div className="container-fluid main-list">
                <div className='vertical-align-wrap '>
                    <div className="  vertical-align-middle">
                        <div className='auth-box mt-5 '>
                            <div className="content">
                                <h4>Where Your Task is reached?</h4>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={"inprogress"}  onChange={(e) => {
                                                    setStatus({ taskStatus: e.target.value})
                                                    setActiveButton(false)
                                                }}/>
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        In Progress
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={"complete"} onChange={(e) => {
                                                    setStatus({ taskStatus: e.target.value})
                                                    setActiveButton(false)
                                                }}/> 
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Completed
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={"not complete"} onChange={(e) => {
                                                    setStatus({ taskStatus: e.target.value})
                                                    setActiveButton(false)
                                                }}/> 
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Not Completed
                                    </label>
                                </div>
                                <button type="submit" disabled={activeButton} className="btn btn-danger" onClick={(e)=>setStatusApi(e)}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
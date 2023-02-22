import React, { useState, useEffect } from 'react';
import './App.css';
import { Radio, Checkbox, Col, Row, Modal } from "antd";
import { connect } from "react-redux";
import { userDetails } from "./Comonente/Action"
import { userDelete } from './Comonente/Action';
import { userEdit } from "./Comonente/Action";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Form = (props) => {
    const navigate = useNavigate()
    const parms = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allDetails, setAllDetails] = useState({});
    // const [tableData, setTableData] = useState([]);
    // const [index, setIndex] = useState(props.editData1.index);
    const [errors, setErrors] = useState({});
    const [hobby, setHobby] = useState([])

    useEffect(() => {
        if (parms.id) {
            setAllDetails(props.editData1);
            props.editData1 && props.editData1.hobby && setHobby(props.editData1.hobby);
        }
    }, [parms.id])

    function validation(name, value) {
        switch (name) {
            case ("firstname"):
                if (!value) {
                    return "firstname is required";
                } else {
                    return "";
                }
            case ("lastname"):
                if (!value) {
                    return "lastname is required";
                } else {
                    return "";
                }
            case ("country"):
                if (!value) {
                    return "country is required";
                } else {
                    return "";
                }
            case ("subject"):
                if (!value) {
                    return "subject is required";
                } else {
                    return "";
                }
            case ("gender"):
                if (!value) {
                    return "gender is required";
                } else {
                    return "";
                }
            case ("hobby"):
                if (!value) {
                    return "hobby is required";
                } else {
                    return "";
                }
            default:
                return "";
        }
    }

    const handleOk = () => {
        if (parms.id) {
            let newtableData = [...props.tableData]
            newtableData[parms.id] = allDetails
            props.allUserDetails(newtableData)
            setAllDetails(newtableData)
        }
        else {
            let newtableData = [...props.tableData]
            newtableData.push(allDetails)
            props.allUserDetails(newtableData)
        }
        resetFrom();
        setIsModalOpen(false);
        navigate('/Table')
    };

    const handleCancel = () => {
        resetFrom();
        setIsModalOpen(false);
        navigate('/')
    };

    const handleOnChange = (e) => {
        setAllDetails({ ...allDetails, [e.target.name]: e.target.value });
    }

    const handleClick = (e) => {
        let hobbyData = JSON.parse(JSON.stringify(hobby))
        if (e.target.checked) {
            hobbyData = [...hobbyData, e.target.name]
            setHobby([...hobbyData])
        } else {
            const i = hobbyData.indexOf(e.target.name)
            hobbyData.splice(i, 1)
            setHobby([...hobbyData])
        }
        setAllDetails({ ...allDetails, hobby: [...hobbyData] })
    }

    const mySubmit = () => {
        const data = {
            firstname: allDetails.firstname,
            lastname: allDetails.lastname,
            country: allDetails.country,
            subject: allDetails.subject,
            gender: allDetails.gender,
            hobby: hobby
        }
        let error1 = {};
        Object.keys(data).forEach(key => {
            const error = validation(key, data[key]);
            if (error && error.length > 0) {
                error1[key] = error;
            }
        });
        if (Object.keys(error1).length > 0) {
            setErrors(error1);
            return
        }
        setIsModalOpen(true)
    }

    const resetFrom = () => {
        setAllDetails({
            firstname: "",
            lastname: "",
            country: "",
            subject: "",
            gender: "",
        })
        setHobby([])
    }

    return (

        <>
            <div className="container">
                <h1>Contact Form</h1><hr />
                <label for="fname">First Name</label>
                <span className="valid">{errors.firstname}</span>
                <input type="text" id="fname" name="firstname" placeholder="Your name.." onChange={handleOnChange} value={allDetails?.firstname} />
                <label for="lname">Last Name</label>
                <span className="valid">{errors.lastname}</span>
                <input type="text" id="lname" name="lastname" placeholder="Your last name.." onChange={handleOnChange} value={allDetails?.lastname} />
                <label for="country">Country</label>
                <span className="valid">{errors.country}</span>
                <select id="country" name="country" onChange={handleOnChange} value={allDetails?.country} >
                    <option value="">Select Your City</option>
                    <option value="australia">Australia</option>
                    <option value="canada">Canada</option>
                    <option value="usa">USA</option>
                </select>
                <label for="subject">Subject</label>
                <span className="valid">{errors.subject}</span>
                <textarea id="subject" name="subject" placeholder="Write something.." style={{ height: "200px" }} onChange={handleOnChange} value={allDetails?.subject} ></textarea>
                <div>
                    <label>Gender</label><br></br>
                    <Radio.Group name="gender" buttonStyle="solid" onChange={handleOnChange} value={allDetails?.gender}  >
                        <Radio.Button value="MALE">MALE</Radio.Button>
                        <Radio.Button value="FEMALE">FEMALE</Radio.Button>
                        <Radio.Button value="OTHER">OTHER</Radio.Button>
                    </Radio.Group>
                    <span className="valid">{errors.gender}</span>
                    <div className='mt-3'>
                        <label>Hobby</label>
                        <Row>
                            <Col span={4}>
                                <Checkbox name="Shopping" onChange={handleClick} checked={hobby?.includes("Shopping")}  >Shopping</Checkbox>
                            </Col>
                            <Col span={4}>
                                <Checkbox name="Hiking" onChange={handleClick} checked={hobby?.includes("Hiking")}  >Hiking</Checkbox>
                            </Col>
                            <Col span={4}>
                                <Checkbox name="Cycling" onChange={handleClick} checked={hobby?.includes("Cycling")}  >Cycling</Checkbox>
                            </Col>
                            <Col span={4}>
                                <Checkbox name="Sewing" onChange={handleClick} checked={hobby?.includes("Sewing")}  >Sewing</Checkbox>
                            </Col>
                            <Col span={4}>
                                <Checkbox name="Skydiving" onChange={handleClick} checked={hobby?.includes("Skydiving")} >Skydiving</Checkbox>
                            </Col>
                        </Row>
                    </div>


                </div>
                <div className='mt-4'>
                    <input type="submit" value="Submit" onClick={mySubmit} />
                    <Modal title="CONFIRM" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        {parms.id === undefined ? <h4>ADD DETAILS</h4> : <h4>EDIT DETAILS</h4>}
                    </Modal>
                </div>
            </div>
            <div className="container">
            </div>
        </>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        allUserDetails: (data) => dispatch(userDetails(data)),
        newDeleteUser: (data) => dispatch(userDelete(data)),
        newEditUser: (data) => dispatch(userEdit(data)),
    }
}

const mapStateToProps = (state) => {
    return {
        tableData: state.data,
        editData1: state.editData
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);

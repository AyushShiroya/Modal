import React from 'react'
import { Table } from 'antd';
import { connect } from "react-redux";
import { userDelete } from './Comonente/Action';
import { userEdit } from "./Comonente/Action"
import { EditOutlined, DeleteOutlined, RollbackOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';

const TableEntery = (props) => {
    const navigate = useNavigate()
    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstname',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastname',
        },
        {
            title: 'country',
            dataIndex: 'country',
        },
        {
            title: 'subject',
            dataIndex: 'subject',
        },
        {
            title: 'gender',
            dataIndex: 'gender'
        },
        {
            title: 'hobby',
            dataIndex: 'hobby'
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            render: (text, recode, i) => (
                <>
                    <EditOutlined onClick={() => handleEdit(i)} style={{ color: "green", fontSize: "30px" }} />
                    <DeleteOutlined onClick={() => handleDelete(i)} style={{ color: "red", marginLeft: 40, fontSize: "30px" }} />
                </>
            )
        },
    ];

    const handleBack = () => {
        navigate('/')
    }

    const handleEdit = (i) => {
        navigate(`/edit/${i}`)
    
        console.log('props.newEditUser :>> ', props.newEditUser);
        props.newEditUser(i)

    }

    const handleDelete = (i) => {
        props.newDeleteUser(i)
    }

    return (
        <>
            <div className="container">
                <Table columns={columns} dataSource={props?.tableData || []} />
            </div>
            <div className="container">
                <RollbackOutlined onClick={() => handleBack()} style={{ color: "white", fontSize: "40px",marginLeft:"45%" }}/>
            </div>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {

        newDeleteUser: (data) => dispatch(userDelete(data)),
        newEditUser: (data) => dispatch(userEdit(data),)
    }
}

const mapStateToProps = (state) => {
    return {
        tableData: state.data,
        editData1: state.editData
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableEntery);


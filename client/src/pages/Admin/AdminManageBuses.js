import { message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FormBus from '../../components/FormBus';
import { Instanceaxios } from '../../Helpers/Instanceaxios';
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';

function AdminManageBuses() {
  const dispatch = useDispatch();
  const [showBusForm, setShowBusForm] = useState(false);
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);


  const getBuses = async () => {
    try {
      dispatch(ShowLoading());
      const response = await Instanceaxios.post("/api/buses/display-buses", {});
      dispatch(HideLoading());
      if (response.data.success) {
        setBuses(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteBus = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await Instanceaxios.post("/api/buses/delete-bus", {
        _id: id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        getBuses();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: 'Bus Name',
      dataIndex: 'name',
    },
    {
      title: 'Bus Number',
      dataIndex: 'number',
    },
    {
      title: 'From',
      dataIndex: 'from',
    },
    {
      title: 'To',
      dataIndex: 'to',
    },
    {
      title: 'Journey Date',
      dataIndex: 'journeyDate',
    },
    {
      title: 'Bus Status',
      dataIndex: 'busStatus',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      render: (action, record) => (
        <div className='d-flex gap-3'>
          <button type='button' className='btn btn-primary' onClick={() => {
            setSelectedBus(record);
            setShowBusForm(true);
          }}>
            <i className="bi bi-pencil-square"></i> Edit
          </button>
          <button type='button' className='btn btn-danger' onClick={() => {
            deleteBus(record._id)

          }} >
            <i className="bi bi-trash3-fill"></i>  Delete
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getBuses();
  }, []);

  return (
    <div>
      <div className='d-flex justify-content-between my-2'>
        <h1 className='para-lg'>Buses</h1>
        <button className='login-button' onClick={() => setShowBusForm(true)}>
          <i className="bi bi-bag-plus-fill"></i> Add Bus
        </button>
      </div>

      <Table className='table table-bordered table-striped' columns={columns} dataSource={buses} />

      {showBusForm && (
        <FormBus
          showBusForm={showBusForm}
          setShowBusForm={setShowBusForm}
          type={selectedBus ? "edit" : "add"}
          selectedBus={selectedBus}
          setSelectedBus={setSelectedBus}
          getData={getBuses}

        />
      )}
    </div>
  );
}

export default AdminManageBuses;

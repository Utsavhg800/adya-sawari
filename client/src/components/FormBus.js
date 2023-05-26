import React from 'react';
import { Col, Modal, Row, Form, message } from 'antd';
import { Instanceaxios } from '../Helpers/Instanceaxios';
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../redux/alertsSlice';

function FormBus({ showBusForm, setShowBusForm, type = 'add', getData, selectedBus, setSelectedBus }) {
  const dispatch = useDispatch();

  const onFinish = async (values) => { 
    try {
      dispatch(ShowLoading());
      let response = null;
      if (type === 'add') {
        response = await Instanceaxios.post('/api/buses/add-bus', values);
      } else {
        response = await Instanceaxios.post('/api/buses/update-bus', {
          ...values,
          _id: selectedBus._id,
        });
      }
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
      getData();
      setShowBusForm(false);
      setSelectedBus(null);
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  return (
    <Modal
      width={750}
      title={type === "add" ? "Add Bus" : "Update Bus"}
      visible={showBusForm}
      onCancel={() => {
        setSelectedBus(null);
        setShowBusForm(false);
      }}
      footer={null}
    >
      <Form layout='vertical' onFinish={onFinish} initialValues={selectedBus}>
        <Row gutter={[10, 10]}>
          <Col lg={24} xs={24}>
            <Form.Item label='Bus Name' name='name'>
              <input type='text' />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label='Bus Number' name='number'>
              <input type='text' />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label='Bus Capacity' name='capacity'>
              <input type='text' />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label='From' name='from'>
              <input type='text' />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label='To' name='to'>
              <input type='text' />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label='Journey Date' name='journeyDate'>
              <input type='date' />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label='Departure Time' name='departureTime'>
              <input type='time' />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label='Arrival Time' name='arrivalTime'>
              <input type='time' />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label='Bus Category' name='category'>
            <select name="" id="">
                <option value="Deluxe">Deluxe</option>
                <option value="Super Deluxe">Super Deluxe</option>
                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
              </select>
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label='Ticket Price' name='price'>
              <input type='text' />
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item label="Status" name="busStatus">
              <select name="" id="">
                <option value="Yet To Start">Yet To Start</option>
                <option value="Running">Running</option>
                <option value="Completed">Completed</option>
              </select>
            </Form.Item>
          </Col>

        </Row>
        <div className='d-flex justify-content-end'>
          <button className='login-button' type='submit'>
            Add Bus
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default FormBus;

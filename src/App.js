import { Form, Row, Col, Input, Button } from 'antd';
import { useState } from 'react';
import 'antd/lib/form/style/css'
import 'antd/lib/row/style/css'
import 'antd/lib/col/style/css'
import 'antd/lib/input/style/css'
import 'antd/lib/button/style/css'

function App() {
  const [cardNumber, setCardNumber] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [amount, setAmount] = useState(0)

  const submitForm = async () => {
    try {
      let response = await fetch('//localhost:8000/pay-handler', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cardNumber, expirationDate, cvv, amount })
      })

      let result = await response.json()
      alert(JSON.stringify(result))
    } catch(e) {
      alert(e)
    }
  }

  return (
    <Row type="flex" justify="center" align="middle">
      <Col xs={ 18 } sm={ 12 } md={ 10 } lg={ 6 }>
        <Form
        name="pay-form"
        layout="vertical"
        autoComplete="off"
        >
          <Form.Item
            label="Card Number"
            name="cardNumber"
            rules={[
              { 
                required: true, 
                message: 'Please input your Card Number!' 
              }, 
              () => ({
                validator(_, value){
                  if (value.length === 16 && value.match(/^\d+$/)) 
                    return Promise.resolve()
                  if (value.length !== 16)
                    return Promise.reject('Enter 16 digits of Card Number!')
                  if (!value.match(/^\d+$/))
                    return Promise.reject('Only digits allowed!')
                }
              })
            ]}
            hasFeedback
          >
            <Input
              value={ cardNumber }
              maxLength={ 16 }
              onChange={ e => setCardNumber(e.target.value) }
            />
          </Form.Item>

          <Form.Item
            label="Expiration Date"
            name="expirationDate"
            rules={[
              { 
                required: true, 
                message: 'Please input your card Expiration Date!' 
              },
              () => ({
                validator(_, value){
                  const date = value.split('/')
                  if (value.match(/^\d{2}\/\d{4}$/) && date[0] <= 12) 
                    return Promise.resolve()
                  else
                    return Promise.reject('Enter Expiration Date in correct format: "MM/YYYY"!')
                }
              })
            ]}
            hasFeedback
          >
            <Input 
              value={ expirationDate }
              maxLength={ 7 }
              onChange={ e => setExpirationDate(e.target.value) }
            />
          </Form.Item>

          <Form.Item
            label="CVV"
            name="cvv"
            rules={[
              { 
                required: true, 
                message: 'Please input your card CVV!' 
              },
              () => ({
                validator(_, value){
                  if (value.match(/^\d{3}$/)) 
                    return Promise.resolve()
                  else
                    return Promise.reject('Wrong CVV code!')
                }
              })
            ]}
            hasFeedback
          >
            <Input.Password 
              value={ cvv }
              maxLength={ 3 }
              onChange={ e => setCvv(e.target.value) }
            />
          </Form.Item>

          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              { 
                required: true, 
                message: 'Please input your Amount' 
              },
              () => ({
                validator(_, value){
                  if (value.match(/^\d{1,}$/)) 
                    return Promise.resolve()
                  else
                    return Promise.reject('Only numbers allowed!')
                }
              })
            ]}
            hasFeedback
          >
            <Input 
              value={ amount }
              onChange={ e => setAmount(e.target.value) }
            />
          </Form.Item>

          <Form.Item 
            shouldUpdate
          >
            {({ getFieldsValue }) => {
              const { cardNumber, expirationDate, cvv, amount } = getFieldsValue()
              const isError = !!cardNumber && !!expirationDate && !!cvv && !!amount
              return (
                <Button 
                  block={ true }
                  type="primary" 
                  htmlType="button"
                  disabled={ !isError }
                  onClick={ submitForm }
                >
                  Submit
                </Button>
              )
            }}
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default App;
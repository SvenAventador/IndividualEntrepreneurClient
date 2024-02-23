import React from 'react';
import {Button, Input, Modal} from "antd";
import {updateCount} from "../../../http/adminApi";
import Swal from "sweetalert2";

const OurGoodModal = (props) => {
    const {
        id,
        amount,
        onOk,
        onCancel,
        open
    } = props

    const [amounts, setAmount] = React.useState(amount)
    const [ids, setIds] = React.useState(id)
    React.useEffect(() => {
        setAmount(amount)
    }, [amount])
    React.useEffect(() => {
        setIds(id)
    }, [id])

    const updateCounts = (id, amounts) => {
        updateCount(id, amounts).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Ваушки',
                text: 'Количество товара успешно обновлено!'
            }).then(() => {
                onOk()
            })
        })
    }
    return (
        <Modal open={open}
               title={'Изменить количество'}
               onOk={onOk}
               onCancel={onCancel}
               centered
               maskClosable={false}
               footer={[
                   <Button type={"primary"}
                           key='cancel'
                           onClick={() => {
                               onCancel()
                           }}>
                       Отмена
                   </Button>,
                   <Button style={{
                       background: 'green',
                       color: 'white'
                   }}
                           key='ok'
                           onClick={() => {
                                updateCounts(ids, amounts)
                           }}>
                       Сохранить изменения
                   </Button>
               ]}>
            <Input value={amounts}
                   onChange={(e) => {
                       const onlyNumbers = e.target.value.replace(/[^0-9]/g, ''); // Удаляем все символы, кроме цифр
                       setAmount(onlyNumbers);
                   }}
                   maxLength={7}
                   style={{marginBottom: '1rem'}}
                   placeholder="Введите количество товара..."
                   prefix='шт'
            />
        </Modal>
    );
};

export default OurGoodModal;

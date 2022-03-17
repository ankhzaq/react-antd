import { useEffect } from "react";
import { Modal, Button, Space } from 'antd';

interface errorInfo {
  code?: string;
  friendlyMessage?: string;
  message?: string;
}

export interface ModalInfoInterface {
  cancelText?: string;
  okText?: string;
  onCancel?: () => void;
  onOk?: () => void;
  title?: string;
  type?: string;
};

const defaultProps: ModalInfoInterface = {}

const ModalComponent = (props = defaultProps) => {
  const { type } = props;

  useEffect(() => {
    if (type) {
      Modal.info({
        title: 'This is a notification message',
        content: (
          <div>
            <p>some messages...some messages...</p>
            <p>some messages...some messages...</p>
          </div>
        ),
        onOk() {},
      });
    }
  }, [type])

  return (null);
}

ModalComponent.defaultProps = {
  modalInfo: {}
}

export default ModalComponent;

import {ProColumns, ProFormInstance, ProTable,} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useEffect, useRef} from 'react';
import {Modal} from "antd";


export type Props = {
  values: API.ApiInterface;
  columns: ProColumns<API.ApiInterface>[],
  onCancel: () => void;
  onSubmit: (values: API.ApiInterface) => Promise<void>;
  visible: boolean;
};
const UpdateModal: React.FC<Props> = (props) => {
  const {values, visible, columns, onSubmit, onCancel} = props;

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(values);
    }
  }, [values])

  return (
    <Modal visible={visible} onCancel={() => onCancel?.()} footer={false}>
      <ProTable
        type="form"
        columns={columns}
        formRef={formRef}

        onSubmit={async (values) => {
          onSubmit?.(values)
        }}

      />
    </Modal>

  );
};
export default UpdateModal;

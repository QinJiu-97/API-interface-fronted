import {ProColumns, ProTable,} from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
import {Modal} from "antd";


export type Props = {
  columns: ProColumns<API.ApiInterface>[],
  onCancel: () => void;
  onSubmit: (values: API.ApiInterface) => Promise<void>;
  visible: boolean;
};
const CreateModal: React.FC<Props> = (props) => {
  const {visible, columns, onSubmit, onCancel} = props;
  return (
    <Modal visible={visible} onCancel={() => onCancel?.()} footer={false}>
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (values) => {
          onSubmit?.(values)
        }}

      />
    </Modal>

  );
};
export default CreateModal;

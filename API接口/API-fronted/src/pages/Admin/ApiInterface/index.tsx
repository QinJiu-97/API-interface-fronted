import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns, ProDescriptionsItemProps} from '@ant-design/pro-components';
import {FooterToolbar, PageContainer, ProDescriptions, ProTable,} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Drawer, message} from 'antd';
import React, {useRef, useState} from 'react';
import {
  addApiInterfaceUsingPOST,
  deleteApiInterfaceUsingPOST,
  listApiInterfaceUsingGET, offlineApiInterfaceUsingPOST, onlineApiInterfaceUsingPOST,
  updateApiInterfaceUsingPOST
} from "@/services/api-backend/interfaceController";
import type {SortOrder} from "antd/es/table/interface";
import CreateModal from "@/pages/Admin/ApiInterface/components/CreateModal";
import UpdateModal from "@/pages/Admin/ApiInterface/components/UpdateModal";


const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ApiInterface>();
  const [selectedRowsState, setSelectedRows] = useState<API.ApiInterface[]>([]);

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.ApiInterface) => {
    const hide = message.loading('正在添加');
    try {
      await addApiInterfaceUsingPOST({
        ...fields,
      });
      hide();
      message.success('Added successfully');
      handleModalVisible(false);
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.ApiInterface) => {
    const hide = message.loading('Configuring');
    try {
      if (!currentRow) {
        return;
      }
      await updateApiInterfaceUsingPOST({
        id: currentRow.id,
        ...fields,

      });
      hide();
      message.success('Configuration is successful');
      handleModalVisible(false);
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('Configuration failed, please try again!');
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param field
   */
  const handleRemove = async (field: number) => {
    const hide = message.loading('正在删除');
    if (!field) return true;
    try {
      await deleteApiInterfaceUsingPOST({
        id: field,
      });
      hide();
      message.success('删除成功');
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };
  /**
   *  发布节点
   * @zh-CN 发布节点
   *
   * @param fields
   */
  const handleOnline = async (fields: API.idRequest) => {
    const hide = message.loading('正在发布');
    if (!fields) return true;
    try {
      await onlineApiInterfaceUsingPOST({
        id: fields.id
      });
      hide();
      message.success('发布成功');
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('发布失败，请重试');
      return false;
    }
  };
  /**
   *
   * @zh-CN 下线节点
   *
   * @param fields
   */
  const handleOffline = async (fields: API.idRequest) => {
    const hide = message.loading('正在下线');
    if (!fields) return true;
    try {
      await offlineApiInterfaceUsingPOST({
        id: fields.id

      });
      hide();
      message.success('下线成功');
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('下线失败，请重试');
      return false;
    }
  };


  const columns: ProColumns<API.ApiInterface>[] = [
    {
      title: 'id',
      dataIndex: 'id',

      valueType: "index",
    },
    {
      title: '接口名称',
      dataIndex: 'apiName',
      valueType: "text",
      formItemProps: {
        rules: [{
          required: true,
        }]
      },
      // tip: 'The rule name is the unique key',
      // render: (dom, entity) => {
      //   return (
      //     <a
      //       onClick={() => {
      //         setCurrentRow(entity);
      //         setShowDetail(true);
      //       }}
      //     >
      //       {dom}
      //     </a>
      //   );
      // },
    },
    {
      title: 'url',
      dataIndex: 'apiUrl',
      valueType: "text",
      formItemProps: {
        rules: [{
          required: true,
        }]
      },
      // renderText: (val: string) => `${val}万`,
    },
    {
      title: '请求参数',
      dataIndex: 'apiRequestParams',
      valueType: "jsonCode",
      formItemProps: {
        rules: [{
          required: true,
        }]
      },
      // renderText: (val: string) => `${val}万`,
    },
    {
      title: '请求类型',
      dataIndex: 'apiMethod',
      valueEnum: {
        'GET': {
          text: 'GET',
        },
        'POST': {
          text: 'POST',
        },
        'PUT': {
          text: 'PUT',
        },
        'DELETE': {
          text: 'DELETE',
        },
      },
      formItemProps: {
        rules: [{
          required: true,
        }]
      },
    },
    {
      title: '创建人id',
      dataIndex: 'userid',
      hideInForm: true,
      valueType: 'text',
    },
    {
      title: '请求头',
      dataIndex: 'apiRequestHeader',
      hideInTable: true,
      valueType: 'jsonCode',
    },
    {
      title: '响应头',
      dataIndex: 'apiResponseHeader',
      hideInTable: true,

      valueType: 'jsonCode',
    },
    {
      title: '描述',
      dataIndex: 'apiDescription',
      valueType: 'textarea',
    },
    {
      title: '状态',
      dataIndex: 'apiStatus',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '开启',
          status: 'Processing',
        },

        2: {
          text: '异常',
          status: 'Error',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
      hideInForm: true,
      // renderFormItem: (item, {defaultRender, ...rest}, form) => {
      //   const status = form.getFieldValue('status');
      //   if (`${status}` === '0') {
      //     return false;
      //   }
      //   if (`${status}` === '3') {
      //     return <Input {...rest} placeholder={'请输入异常原因！'}/>;
      //   }
      //   return defaultRender(item);
      // },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="update"
          onClick={() => {
            handleUpdateModalVisible(true);

            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        record.apiStatus === 0 ? <a

          type='text'
          key="config"
          onClick={() => {
            handleOnline(record);
          }}
        >
          发布
        </a> : null,

        record.apiStatus === 1 ? <Button
          danger
          type='text'
          key="config"
          onClick={() => {
            handleOffline(record);
          }}
        >
          下线
        </Button> : null,
        <Button
          danger
          type='text'
          key="delete"
          onClick={() => {
            handleRemove(record.id);
          }}
        >
          删除
        </Button>,

      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);


            }}
          >
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request={async (params, sort: Record<string, SortOrder>, filter: Record<string, React.ReactText[] | null>) => {
          const res = await listApiInterfaceUsingGET({
            ...params,
          })
          if (res?.data) {
            return {
              data: res.data || [],
              success: true,
              total: res.data.total,
            }
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            }
          }
        }}

        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}

      <UpdateModal
        columns={columns}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
      <CreateModal
        columns={columns}
        onCancel={() => {
          handleModalVisible(false);
        }}
        onSubmit={(values) => {
          handleAdd(values)
        }}
        visible={createModalVisible}/>
    </PageContainer>
  );
};
export default TableList;

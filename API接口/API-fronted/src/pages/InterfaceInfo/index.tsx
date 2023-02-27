import {PageContainer} from '@ant-design/pro-components';
import {Badge, Button, Card, Descriptions, Divider, Form, message, Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import {getApiInterfaceByIdUsingGET, invokeApiInterfaceUsingPOST} from "@/services/api-backend/interfaceController";
import {useParams} from "@@/exports";
import TextArea from "antd/es/input/TextArea";


const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [data, setData] = useState<API.ApiInterface>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const params = useParams();

  const loadData = async () => {
    if (!params) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try {
      const res = await getApiInterfaceByIdUsingGET({
        id: Number(params.id),
      })
      setData(res.data)
    } catch (e: any) {
      message.error("请求数据失败" + e.message)
    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, [])

  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeApiInterfaceUsingPOST({
        id: params.id,
        ...values
      })
      setInvokeRes(res.data);
      message.success("调用成功！")
    } catch (error) {

      message.error('调用失败，请重试');

    }

    setInvokeLoading(false);

  };

  return (
    <PageContainer title={"查看接口文档"}>
      <Card>
        {
          data ? (
            <Descriptions title={data.apiName} bordered>
              <Descriptions.Item label="接口名称">{data.apiName}</Descriptions.Item>
              <Descriptions.Item label="url">{data.apiUrl}</Descriptions.Item>
              <Descriptions.Item label="请求方式">{data.apiMethod}</Descriptions.Item>
              <Descriptions.Item label="请求参数" span={3}>{data.apiRequestParams}</Descriptions.Item>
              <Descriptions.Item label="请求头">{data.apiRequestHeader}</Descriptions.Item>
              <Descriptions.Item label="响应头">{data.apiResponseHeader}</Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {data.createTime}
              </Descriptions.Item>
              <Descriptions.Item label="描述" span={3}>{data.apiDescription}</Descriptions.Item>

              <Descriptions.Item label="接口状态" span={3}>
                <Badge status={data.apiStatus == 1 ? "processing" : "error"} text={data.apiStatus ? '正常' : '关闭'}/>
              </Descriptions.Item>


            </Descriptions>
          ) : (<>接口不存在</>)
        }
      </Card>
      <Divider/>
      <Card title="在线测试">
        <Form
          name="invoke"
          layout={"vertical"}
          onFinish={onFinish}

        >
          <Form.Item
            label="请求参数"
            name="userRequestParams"

          >
            <TextArea rows={4}/>

          </Form.Item>

          <Form.Item wrapperCol={{span: 16}}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider/>

      <Card title="调用结果" loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default Index;



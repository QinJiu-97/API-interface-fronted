import {PageContainer} from '@ant-design/pro-components';
import {List, message, Skeleton} from 'antd';
import React, {useEffect, useState} from 'react';
import {listApiInterfaceByPageUsingGET} from "@/services/api-backend/interfaceController";


const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.ApiInterface[]>([]);
  const [total, setTotal] = useState<number>(0);
  const pageSize = 5;

  const loadData = async (current = 1) => {
    setLoading(true);
    try {
      const res = await listApiInterfaceByPageUsingGET({
        current, pageSize
      })
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    } catch (e: any) {
      message.error("请求数据失败" + e.message)
    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <PageContainer title={"在线接口调用平台"}>
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => {
          const apiLink = `/interface/${item.id}`;
          return (
            <List.Item
            actions={[<a key={item.id} href={apiLink}>查看</a>]}
          >
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                title={<a href={apiLink}>{item.apiName}</a>}
                description={item.apiDescription}
              />

            </Skeleton>
          </List.Item>)
        }
        }


        pagination={
          {

            total,
            pageSize: pageSize,
            onChange(page) {
              loadData(page);
            },
            showTotal(sum: number) {
              return '总条数: ' + sum;
            },
          }
        }
      />
    </PageContainer>
  );
};

export default Index;

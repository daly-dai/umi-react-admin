import { Button, Form, Table } from 'antd';

import FormGroup from '@/components/FormGroup';
import { GroupListItemType } from '@/components/FormGroup/types';
import useTemplate from './hook';

const AsidePage = () => {
  const [form] = Form.useForm();

  const {
    pageData,
    totalSize,
    params,
    searchTableData,
    handleReset,
    setParamsData,
  } = useTemplate(form);

  const columns = [
    {
      title: '序号',
      dataIndex: 'name',
      width: 70,
      render: (_: any, __: any, index: number) => <>{index + 1}</>,
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
    },
  ];

  const templateForm: GroupListItemType<any>[] = [
    {
      title: '基本信息',
      fieldList: [
        {
          label: '产品名称',
          name: 'productName',
          fieldType: 'input',
          fieldProps: {
            style: { width: '275px' },
            maxLength: 20,
          },
          formItemProps: {
            labelCol: { span: 12 },
            rules: [{ required: true, message: '请输入内容' }],
          },
          colProps: { span: 12 },
        },
      ],
    },
  ];

  return (
    <div>
      <FormGroup groupList={templateForm} form={form}>
        <div style={{ display: 'flex' }}>
          <Button
            type="primary"
            style={{ margin: '0px 6px' }}
            onClick={searchTableData}
          >
            确认
          </Button>
          <Button onClick={handleReset}>取消</Button>
        </div>
      </FormGroup>
      <Table
        pagination={{
          total: totalSize,
          current: params.pageNum,
          onChange(pageNum: any, size: any) {
            setParamsData({
              pageNum: pageNum,
              pageSize: size,
            });
          },
        }}
        columns={columns as any}
        dataSource={pageData}
      ></Table>
    </div>
  );
};

export default AsidePage;

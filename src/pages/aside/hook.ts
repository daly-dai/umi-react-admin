import { FormInstance } from 'antd';
import { useEffect, useState } from 'react';

function testFetch(params: any) {
  console.log(params);

  return { dataList: [], totalSize: 0 };
}

const useTemplate = (form: FormInstance<any>) => {
  const [totalSize, setTotalSize] = useState(0);
  const [params, setParams] = useState({
    pageNum: 1,
    pageSize: 10,
  });

  const [pageData, setPageData] = useState<any[]>([]);

  const setParamsData = (data: any) => {
    setParams((pre) => ({
      ...pre,
      ...data,
    }));
  };

  const getPageData = async () => {
    const result = await testFetch(params);

    if (!result) return;

    const listData = result?.dataList || [];

    setTotalSize(result.totalSize || 0);
    setPageData(listData || []);
  };

  const handleReset = () => {
    setParams({
      pageNum: 1,
      pageSize: 10,
    });
  };

  const searchTableData = () => {
    const params = form.getFieldsValue();

    setParamsData(params);
  };

  useEffect(() => {
    getPageData();
  }, [params]);

  return {
    pageData,
    totalSize,
    params,
    searchTableData,
    handleReset,
    setParamsData,
  };
};

export default useTemplate;

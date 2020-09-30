import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Table, Tag, Space } from "antd";
import "./print.css";
import { Row, Col } from "antd";
const PageHeader = ({
  ngayIn,
  ngayThucdon,
  siso,
  tien1tre,
  buaTrua,
  buaChieu,
}: any) => {
  return (
    <Row>
      <Col span={8}>
        <div>TP.HỒ CHÍ MINH</div>
        <div>Quận Gò Vấp</div>
        <div>Phường 15</div>
        <div>Ngày in: {ngayIn}</div>
      </Col>
      <Col span={8} className="header-print">
        <div>KẾT QUẢ PHẦN DINH DƯỠNG</div>
        <div>THỰC ĐƠN: {ngayThucdon}</div>
        <div>Lớp mẫu giáo</div>
        <div>
          Sỉ số: {siso} trẻ; Tiền ăn 1 trẻ {tien1tre}
        </div>
      </Col>
      <Col span={8}>
        <div className="meal-right-header">
          <div>Bữa trưa:</div>{" "}
          <div>
            {buaTrua.map((x: any) => (
              <div>{x}</div>
            ))}
          </div>
        </div>
        <div className="meal-right-header">
          <div>Bữa chiều:</div>{" "}
          <div>
            {buaChieu.map((x: any) => (
              <div>{x}</div>
            ))}
          </div>
        </div>
      </Col>
    </Row>
  );
};
const TableData = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Age",
      children: [
        {
          title: "Age",
          dataIndex: "age",
          key: "age",
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age",
        },
      ],
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
    },
    {
      title: "Action",
      key: "action",
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return <Table columns={columns} dataSource={data} pagination={false} />;
};
class ComponentToPrint extends React.Component {
  render() {
    return (
      <div className="report-data">
        <PageHeader
          ngayIn="todayDate"
          ngayThucdon={"todayDate"}
          siso={21}
          tien1tre={30000}
          buaTrua={["Thịt kho trứng", "Susu cà rốt hấp"]}
          buaChieu={["Bánh mỳ que pate"]}
        />
        <TableData />
        <table>
          <thead>
            <th>column 1</th>
            <th>column 2</th>
            <th>column 3</th>
          </thead>
          <tbody>
            <tr>
              <td>data 1</td>
              <td>data 2</td>
              <td>data 3</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const PrintExample = () => {
  const componentRef = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <button onClick={handlePrint}>Print</button>
    </div>
  );
};
export default PrintExample;

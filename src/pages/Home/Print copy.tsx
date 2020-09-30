import React, { useRef } from "react";

import { useReactToPrint } from "react-to-print";
import moment from "moment";
import { Row, Col } from "antd";
import "./print.css";
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
class ComponentToPrint extends React.Component {
  render() {
    const todayDate = moment().format("MM-DD-YYYY");
    return (
      <React.Fragment>
        <PageHeader
          ngayIn={todayDate}
          ngayThucdon={todayDate}
          siso={21}
          tien1tre={30000}
          buaTrua={["Thịt kho trứng", "Susu cà rốt hấp"]}
          buaChieu={["Bánh mỳ que pate"]}
        />
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
      </React.Fragment>
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

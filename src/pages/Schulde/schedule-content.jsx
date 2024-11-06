import { Button, Card, Col, Flex, Radio, Row } from "antd";
import React, { useRef } from "react";
import styled from "styled-components";
import { DownloadOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";
import { useScreenshot } from "use-react-screenshot";

const options = [
  {
    label: "JORIY HAFTA",
    value: "this",
  },
  {
    label: "KELGUSI HAFTA",
    value: "next",
  },
];

const ScheduleContent = ({ loading, setLoading }) => {
  const captureRef = useRef(null);

  const [image, takeScreenshot] = useScreenshot();

  const onRadioChange = (e) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const getImage = () => {
    takeScreenshot(captureRef.current);
    const link = document.createElement("a");
    link.href = image;
    link.download = "dars-jadvali.png";
    link.click();
  };

  return (
    <Container>
      <Flex
        vertical
        gap="middle"
        align="center"
        justify="center"
        className="my-4"
      >
        <Radio.Group
          block
          options={options}
          defaultValue="this"
          optionType="button"
          buttonStyle="solid"
          size="large"
          onChange={onRadioChange}
        />
        <Button
          type="primary"
          onClick={getImage}
          icon={<DownloadOutlined />}
          size={"large"}
        >
          Yuklab olish
        </Button>
      </Flex>
      <div ref={captureRef}>
        <Row style={{ padding: "20px 0" }} gutter={[10, 10]}>
          <Col span={8}>
            <Card
              title="Dushanba"
              bordered={true}
              extra={<div>dd/mm/yyyy</div>}
              loading={loading}
            >
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Seshanba"
              bordered={true}
              extra={<div>dd/mm/yyyy</div>}
              loading={loading}
            >
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Chorshanba"
              bordered={true}
              extra={<div>dd/mm/yyyy</div>}
              loading={loading}
            >
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Payshanba"
              bordered={true}
              extra={<div>dd/mm/yyyy</div>}
              loading={loading}
            >
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Juma"
              bordered={true}
              extra={<div>dd/mm/yyyy</div>}
              loading={loading}
            >
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Shanba"
              bordered={true}
              extra={<div>dd/mm/yyyy</div>}
              loading={loading}
            >
              Card content
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ScheduleContent;

const Container = styled.div``;

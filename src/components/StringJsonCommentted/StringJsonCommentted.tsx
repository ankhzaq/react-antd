import 'antd/dist/antd.css';
import './style.css';
import { Comment, Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';

const { TextArea } = Input;

// @ts-ignore
const Editor = ({ onSubmit }) => (
  <>
    <Form.Item>
      <TextArea rows={4} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const defaultTranslations = {
  modalTitle: 'Comments',
  modalCancel: 'Close',
  modalOk: 'Send'
};


let ElementsJSON: any[] = [];

interface Propslines {
  className?: string;
  line: string;
  pageElement: any;
}

const renderLine = (props: Propslines) => {
  const { className, line, pageElement } = props;
  let [key,value] = line.split(': ');

  let keyParsed = key && key.trim();
  const valueParsed = value && value.trim().replaceAll(',', '');

  // exception case: line where key is a value because is only a value (example: value of a list)
  if (keyParsed && keyParsed.length > 2 && !valueParsed) {
    const [preKey, postKey] = line.split(keyParsed);
    return (<div className={className}>
        <pre>
          {pageElement}
          <span>{preKey}</span>
          <span className="string">{keyParsed}</span>
          <span>{postKey}</span>
        </pre>
    </div>);
  }

  if (valueParsed) {
    const [preKey, postKey] = line.split(keyParsed);
    const [preValue, postValue] = postKey.split(valueParsed);
    return (<div className={className}>
        <pre>
          {pageElement}
          <span>{preKey}</span>
          <span className="key">{keyParsed}</span>
          <span>{preValue}</span>
          <span className="string">{valueParsed}</span>
          <span>{postValue}</span>
        </pre>
    </div>);
  }
  return (
    <div className={className}>
        <pre>
          {pageElement}
          {line}
        </pre>
    </div>
  );
}

const linesAreEquals = (line1: string, line2: string) => {
  const line1Parsed = line1.trim().replaceAll(',', '')
  const line2Parsed = line2.trim().replaceAll(',', '')
  return line1Parsed === line2Parsed;
}

interface StringJsonCommenttedProps {
  comments: any;
  translations: any;
};

const defaultProps: StringJsonCommenttedProps = {
  comments: {},
  translations: defaultTranslations,
}

export const StringJsonCommentted = (props: StringJsonCommenttedProps) => {
  const { translations } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);

  ElementsJSON = [];

  const stringJSONParsedEnv = '{\n  "hammurabi": {\n    "dataFrameInfo": {\n      "cutoffDate": "${ODATE}",\n      "physicalTargetName": "t_kgov_ficticio_master",\n      "source": "datio",\n      "targetPathName": "/data/master/kgov/t_kgov_ficticio_master",\n      "uuaa": "kgov"\n    },\n    "input": {\n      "paths": [\n        "/data/master/kgov/t_kgov_ficticio_master"\n      ],\n      "type": "parquet"\n    },\n    "temporaryObjects": [\n      {\n        "class": "com.datio.hammurabi.temporary.TemporaryObject",\n        "config": {\n          "id": "1",\n          "keyColumns": [\n            {\n              "columnInput": "2",\n              "columnOrigin": "3"\n            }\n          ],\n          "leftSubset": "${env7}",\n          "leftValues": {\n            "paths": [\n              "${CACHE}/artifactory/${repo}/schemaName"\n            ],\n            "schema": {\n              "PATH": "${env1}/${env2}/${env3}"\n            },\n            "type": "parquet"\n          },\n          "rightValues": {\n            "paths": [\n              "5"\n            ],\n            "type": "parquet"\n          }\n        }\n      }\n    ],\n    "rules": [\n      {\n        "class": "com.datio.hammurabi.rules.availability.DateValidationRule",\n        "config": {\n          "acceptanceMin": 0,\n          "column": "g_ficticio_campo5tmp://1",\n          "failIfEmpty": false,\n          "format": "${env1}/${env2}/${env3}",\n          "id": "1644340283496",\n          "lastIntakeColumn": "${env}asdasd",\n          "subset": "asd234${env}",\n          "tClass": "com.datio.hammurabi.rules.availability.DateValidationRule",\n          "temporalPath": "1",\n          "value": "fhdfh${env}asdasd",\n          "withRefusals": true\n        }\n      }\n    ]\n  }\n}'
  const stringJSONParsedEnvNew = '{\n  "hammurabi": {\n    "dataFrameInfo": {\n      "cutoffDate": "${ODATE}",\n      "physicalTargetName": "t_kgov_ficticio_master",\n      "source": "datio",\n      "targetPathName": "/data/master/kgov/t_kgov_ficticio_master",\n      "uuaa": "kgov"\n    },\n    "input": {\n      "paths": [\n        "/data/master/kgov/t_kgov_ficticio_master"\n      ],\n      "type": "parquet"\n    },\n    "temporaryObjects": [\n      {\n        "class": "com.datio.hammurabi.temporary.TemporaryObject",\n        "config": {\n          "keyColumns": [\n            {\n              "columnInput": "23",\n              "columnOrigin": "3"\n            }\n          ],\n          "leftValues": {\n            "paths": [\n              "${CACHE}/artifactory/${repo}/schemaName"\n            ],\n            "schema": {\n              "PATH": "${env1}/${env2}/${env3}"\n            },\n            "options": {\n              "newOption1": "value1"\n            },\n            "type": "parquet"\n          },\n          "rightValues": {\n            "paths": [\n              "5"\n            ],\n            "type": "parquet"\n          },\n          "id": "1",\n          "leftSubset": "${env7}",\n          "rightSubset": "2",\n          "leftValuesCache": true,\n          "leftValuesLastIntakeColumn": "new"\n        }\n      }\n    ],\n    "rules": [\n      {\n        "class": "com.datio.hammurabi.rules.availability.DateValidationRule",\n        "config": {\n          "failIfEmpty": false,\n          "withRefusals": true,\n          "tClass": "com.datio.hammurabi.rules.availability.DateValidationRule",\n          "column": "g_ficticio_campo5tmp://12",\n          "format": "${env1}/${env2}/${env3}",\n          "id": "1644340283496",\n          "subset": "asd234${env}",\n          "temporalPath": "1",\n          "value": "fhdfh${env}asdasd"\n        }\n      }\n    ]\n  }\n}';

  const lines = stringJSONParsedEnv.split('\n');
  const linesNew = stringJSONParsedEnvNew.split('\n');

  let index = 0;
  let indexNew = 0;

  while (index < lines.length || indexNew < linesNew.length) {
    const pageElement = (
      <Button className="page" onClick={() => setIsModalVisible(true)} >{ElementsJSON.length}</Button>
    )
    if (index === 45) debugger;
    // new string already finished
    if (indexNew === linesNew.length) {
      const line = lines[index];
      ElementsJSON.push(renderLine({ line, pageElement }));
      index++;
      // old string alreay finished
    } else if (index === lines.length) {
      const line = linesNew[indexNew];
      ElementsJSON.push(renderLine({ line, pageElement }));
      indexNew++;
    } else {
      let line = lines[index];
      let lineNew = linesNew[indexNew];
      // no changes
      if (linesAreEquals(line, lineNew)) {
        ElementsJSON.push(renderLine({ line, pageElement }));
        indexNew++;
        index++;
      } else {
        // new lines added before this one. So, print all new lines, before this
        if (linesNew.slice(indexNew).includes(line)) {
          while (lineNew !== line) {
            ElementsJSON.push(renderLine({ line: lineNew, pageElement }));
            indexNew++;
            lineNew = linesNew[indexNew];
          }
          // line replaced.
        } else if (lines.slice(index).includes(lineNew)) {
          while (lineNew !== line) {
            ElementsJSON.push(renderLine({ line, pageElement }));
            index++;
            line = lines[index];
          }
          // line replaced.
        } else {
          ElementsJSON.push(renderLine({ className: "removed", line, pageElement }));
          ElementsJSON.push(renderLine({ className: "added", line: lineNew, pageElement }));
          indexNew++;
          index++;
        }
      }
    }
  }

  return (
    <>
      <Modal
        cancelText={translations.modalCancel}
        closable={false}
        okButtonProps={{ disabled: true }}
        okText={translations.modalOk}
        onCancel={() => { setIsModalVisible(!isModalVisible)}}
        onOk={() => { setIsModalVisible(!isModalVisible)}}
        title={translations.modalTitle}
        visible={isModalVisible}
      >
        <Comment
          author={<a>31-03-2022</a>}
          content={
            <p>
              We supply a series of design principles, practical patterns and high quality design
              resources (Sketch and Axure).
            </p>
          }
        >
          <Editor onSubmit={() => {}} />
        </Comment>
      </Modal>
      {ElementsJSON}
    </>
  );
}

StringJsonCommentted.defaultProps = defaultProps;

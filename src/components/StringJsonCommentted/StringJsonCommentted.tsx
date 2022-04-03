import 'antd/dist/antd.css';
import './style.css';
import { Comment, Button, Form, Input, Modal } from 'antd';
import styled from 'styled-components';
import { useState } from 'react';
import moment from 'moment';
import { CommentOutlined } from '@ant-design/icons';
import { BasicObject } from '../../interfaces/common';

const { TextArea } = Input;

// @ts-ignore
const Editor = ({ defaultValue, onChange }) => (
  <>
    <Form.Item>
      <TextArea onChange={onChange} rows={4} />
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
  className?: 'added' | 'removed';
  line: string;
  pageElement: any;
}

interface propsLineElem {
  backgroundColor: string;
}

const COLORS: BasicObject = {
  added: 'springgreen',
  odd: '#fff',
  pair: '#fff',
  //odd: '#e8e6e6',
  //pair: '#f1eeee',
  removed: 'lightcoral'
}

const DivLineStyled = styled.div`
  background-color: ${(props: propsLineElem) => `${props.backgroundColor};`}
`;

const renderLine = (props: Propslines) => {
  const { className, line, pageElement } = props;
  let [key,value] = line.split(': ');

  let keyParsed = key && key.trim();
  const valueParsed = value && value.trim().replaceAll(',', '');

  const colorLine = className ? className : (ElementsJSON.length %2 === 0 ? 'pair' : 'odd');

  const propsLine = { backgroundColor: COLORS[colorLine] };

  // exception case: line where key is a value because is only a value (example: value of a list)
  if (keyParsed && keyParsed.length > 2 && !valueParsed) {
    const [preKey, postKey] = line.split(keyParsed);
    return (
      <DivLineStyled {...propsLine}>
          <pre>
            {pageElement}
            <span>{preKey}</span>
            <span className="string">{keyParsed}</span>
            <span>{postKey}</span>
          </pre>
      </DivLineStyled>);
  }

  if (valueParsed) {
    const [preKey, postKey] = line.split(keyParsed);
    const [preValue, postValue] = postKey.split(valueParsed);
    return (
      <DivLineStyled {...propsLine}>
          <pre>
            {pageElement}
            <span>{preKey}</span>
            <span className="key">{keyParsed}</span>
            <span>{preValue}</span>
            <span className="string">{valueParsed}</span>
            <span>{postValue}</span>
          </pre>
      </DivLineStyled>);
  }
  return (
    <DivLineStyled {...propsLine}>
        <pre>
          {pageElement}
          {line}
        </pre>
    </DivLineStyled>
  );
}

const linesAreEquals = (line1: string, line2: string) => {
  const line1Parsed = line1.trim().replaceAll(',', '')
  const line2Parsed = line2.trim().replaceAll(',', '')
  return line1Parsed === line2Parsed;
}

interface StringJsonCommenttedProps {
  commentsEnabled: boolean;
  comments: any;
  oldString: string;
  newString?: string;
  translations: any;
};

// newString: '{\n\t"hammurabi": {\n\t\t"dataFrameInfo": {\n\t\t\t"cutoffDate": ${ODATE},\n\t\t\t"physicalTargetName": "t_kgov_ficticio_master",\n\t\t\t"source": "datio",\n\t\t\t"targetPathName": "targetPathName",\n\t\t\t"uuaa": "kgov"\n\t\t},\n\t\t"input": {\n\t\t\t"paths": [\n\t\t\t\t"targetPathName"\n\t\t\t],\n\t\t\t"type": "parquet"\n\t\t},\n\t\t"temporaryObjects": [\n\t\t\t{\n\t\t\t\t"class": "temporaryClass",\n\t\t\t\t"config": {\n\t\t\t\t\t"keyColumns": [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\t"columnInput": "23",\n\t\t\t\t\t\t\t"columnOrigin": "3"\n\t\t\t\t\t\t}\n\t\t\t\t\t],\n\t\t\t\t\t"leftValues": {\n\t\t\t\t\t\t"paths": [\n\t\t\t\t\t\t\t${CACHE}"/artifactory/"${repo}"/schemaName"\n\t\t\t\t\t\t],\n\t\t\t\t\t\t"schema": {\n\t\t\t\t\t\t\t"PATH": ${env1}"/"${env2}"/"${env3}\n\t\t\t\t\t\t},\n\t\t\t\t\t\t"options": {\n\t\t\t\t\t\t\t"newOption1": "value1"\n\t\t\t\t\t\t},\n\t\t\t\t\t\t"type": "parquet"\n\t\t\t\t\t},\n\t\t\t\t\t"rightValues": {\n\t\t\t\t\t\t"paths": [\n\t\t\t\t\t\t\t"5"\n\t\t\t\t\t\t],\n\t\t\t\t\t\t"type": "parquet"\n\t\t\t\t\t},\n\t\t\t\t\t"id": "1",\n\t\t\t\t\t"leftSubset": ${env7},\n\t\t\t\t\t"rightSubset": "2",\n\t\t\t\t\t"leftValuesCache": true,\n\t\t\t\t\t"leftValuesLastIntakeColumn": "new"\n\t\t\t\t}\n\t\t\t}\n\t\t],\n\t\t"rules": [\n\t\t\t{\n\t\t\t\t"class": "ruleClass",\n\t\t\t\t"config": {\n\t\t\t\t\t"failIfEmpty": false,\n\t\t\t\t\t"withRefusals": true,\n\t\t\t\t\t"tClass": "ruleClass",\n\t\t\t\t\t"column": "g_ficticio_campo5tmp://12",\n\t\t\t\t\t"format": ${env1}"/"${env2}"/"${env3},\n\t\t\t\t\t"id": "12323421496",\n\t\t\t\t\t"subset": "asd234"${env},\n\t\t\t\t\t"temporalPath": "1",\n\t\t\t\t\t"value": "fhdfh"${env}"asdasd"\n\t\t\t\t}\n\t\t\t}\n\t\t]\n\t}\n}'
const defaultProps: StringJsonCommenttedProps = {
  oldString: '{\n\t"hammurabi": {\n\t\t"dataFrameInfo": {\n\t\t\t"cutoffDate": ${ODATE},\n\t\t\t"physicalTargetName": "t_kgov_ficticio_master",\n\t\t\t"source": "datio",\n\t\t\t"targetPathName": "targetPathName",\n\t\t\t"uuaa": "kgov"\n\t\t},\n\t\t"input": {\n\t\t\t"paths": [\n\t\t\t\t"targetPathName"\n\t\t\t],\n\t\t\t"type": "parquet"\n\t\t},\n\t\t"temporaryObjects": [\n\t\t\t{\n\t\t\t\t"class": "temporaryClass",\n\t\t\t\t"config": {\n\t\t\t\t\t"id": "1",\n\t\t\t\t\t"keyColumns": [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\t"columnInput": "2",\n\t\t\t\t\t\t\t"columnOrigin": "3"\n\t\t\t\t\t\t}\n\t\t\t\t\t],\n\t\t\t\t\t"leftSubset": ${env7},\n\t\t\t\t\t"leftValues": {\n\t\t\t\t\t\t"paths": [\n\t\t\t\t\t\t\t${CACHE}"/artifactory/"${repo}"/schemaName"\n\t\t\t\t\t\t],\n\t\t\t\t\t\t"schema": {\n\t\t\t\t\t\t\t"PATH": ${env1}"/"${env2}"/"${env3}\n\t\t\t\t\t\t},\n\t\t\t\t\t\t"type": "parquet"\n\t\t\t\t\t},\n\t\t\t\t\t"rightValues": {\n\t\t\t\t\t\t"paths": [\n\t\t\t\t\t\t\t"5"\n\t\t\t\t\t\t],\n\t\t\t\t\t\t"type": "parquet"\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t],\n\t\t"rules": [\n\t\t\t{\n\t\t\t\t"class": "ruleClass",\n\t\t\t\t"config": {\n\t\t\t\t\t"acceptanceMin": 0,\n\t\t\t\t\t"column": "g_ficticio_campo5tmp://1",\n\t\t\t\t\t"failIfEmpty": false,\n\t\t\t\t\t"format": ${env1}"/"${env2}"/"${env3},\n\t\t\t\t\t"id": "12323421496",\n\t\t\t\t\t"lastIntakeColumn": ${env}"asdasd",\n\t\t\t\t\t"subset": "asd234"${env},\n\t\t\t\t\t"tClass": "ruleClass",\n\t\t\t\t\t"temporalPath": "1",\n\t\t\t\t\t"value": "fhdfh"${env}"asdasd",\n\t\t\t\t\t"withRefusals": true\n\t\t\t\t}\n\t\t\t}\n\t\t]\n\t}\n}',
  commentsEnabled: false,
  comments: {
    5: [{
      author: "zaquiel",
      content: <p>Default comment</p>,
      datetime: <span>{moment().fromNow()}</span>
    }]
  },
  translations: defaultTranslations,
}

let newComment = '';

export const StringJsonCommentted = (props: StringJsonCommenttedProps) => {
  const { comments, commentsEnabled, oldString, newString, translations } = props;

  const [lineModalVisible, setLineModalVisible] = useState(0);
  const [okModalBtnEnabled, setOkModalBtnEnabled] = useState(false);

  ElementsJSON = [];

  const lines = oldString ? oldString.split('\n') : [];
  const linesNew = newString ? newString.split('\n') : [];

  let index = 0;
  let indexNew = 0;

  while (index < lines.length || indexNew < linesNew.length) {
    const currentPage = ElementsJSON.length + 1;
    const pageElement = (
      <span className="page">
        <span className="pageNumber">
            {currentPage}
        </span>
        {commentsEnabled && <Button className="pageBtn" onClick={() => setLineModalVisible(currentPage)} icon={<CommentOutlined />} />}
      </span>
    );

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
        okButtonProps={{ disabled: !okModalBtnEnabled }}
        okText={translations.modalOk}
        onCancel={() => { setLineModalVisible(0)}}
        onOk={() => { setLineModalVisible(0)}}
        title={translations.modalTitle}
        visible={!!lineModalVisible}
      >
        {lineModalVisible && comments[lineModalVisible] && comments[lineModalVisible].map((comment: any) => (
          <>
            <Comment
              {...comment}
            >
            </Comment>
            <Editor
              defaultValue={newComment}
              onChange={(elem: any) => {
                newComment = elem.currentTarget.value;
                const nextOkModalBtnEnabled = !!newComment.length;
                if (nextOkModalBtnEnabled !== okModalBtnEnabled) {
                  setOkModalBtnEnabled(nextOkModalBtnEnabled);
                }
              }}
            />
          </>
        ))}
      </Modal>
      {ElementsJSON}
    </>
  );
}

StringJsonCommentted.defaultProps = defaultProps;

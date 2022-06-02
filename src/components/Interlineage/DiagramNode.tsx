// @ts-ignore
import { Handle } from 'react-flow-renderer';
import './DiagramNode.scss'

import { memo } from 'react';
import { Button, Input } from 'antd';
import { CheckCircleOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BasicObject } from '../../interfaces/common';

let draftValues: BasicObject = {};

// @ts-ignore
const DiagramNode = memo((props) => {
  // @ts-ignore
  const { data, id, isConnectable } = props;
  const { body = null, draft, onDraftFinished, onAddNode, onRemoveNode, title = '...', positionHandleSource = 'bottom', positionHandleTarget = 'left' } = data;

  const renderTitle = () => {
    if (title) {

      const addChild = (
        <Button
          icon={<PlusCircleOutlined />}
          onClick={() => {
            onAddNode({ nodeProps: { extent: 'parent', parentNode: id } });
          }}
          shape="circle"
          size="small"
        />
      );

      const removeBtn = (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            onRemoveNode({ id });
          }}
          shape="circle"
          size="small"
        />
      );

      if (draft) {
        return (
          <div className="diagramNode-header">
            <Input
              defaultValue={title}
              onChange={(param1: any) => {
                const value = param1.target.value;
                draftValues.title = value;
              }}
            />
            <Button
              onClick={() => {
                onDraftFinished({ id, data: { ...data, ...draftValues, draft: false } });
              }}
              icon={<CheckCircleOutlined />}
              shape="circle"
            />
            {addChild}
            {removeBtn}
          </div>
        )
      }
      return (
        <div className="diagramNode-header">
          <div>{title}</div>
          {addChild}
          {removeBtn}
        </div>
      );
    }
    return null;
  }

  const renderBody = () => {
    if (title) {
      if (draft) {
        return (
          <div className="diagramNode-body">
            <Input
              defaultValue={body}
              onChange={(param1: any) => {
                const value = param1.target.value;
                draftValues.body = value;
              }}
            />
          </div>
        )
      }
      return (<div className="diagramNode-body">{body}</div>);
    }
    return null;
  }


  return (
    <div className="diagramNode">
      <Handle
        type="target"
        // @ts-ignore
        position={positionHandleTarget}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      {renderTitle()}
      {renderBody()}
      <Handle
        type="source"
        id={id}
        isConnectable={isConnectable}
        // @ts-ignore
        position={positionHandleSource}
      />
    </div>
  );
});

export default DiagramNode;

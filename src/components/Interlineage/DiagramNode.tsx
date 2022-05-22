// @ts-ignore
import { Handle } from 'react-flow-renderer';
import './DiagramNode.scss'

import { memo } from 'react';

// @ts-ignore
const DiagramNode = memo((props) => {
  // @ts-ignore
  const { data, id, isConnectable } = props;
  const { body = null, showHideNodes, title = '...', positionHandleSource = 'bottom', positionHandleTarget = 'left' } = data;

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
      {title && (<div className="diagramNode-header">{title}</div>)}
      {body && <div className="diagramNode-body">{body}</div>}
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

// @ts-ignore
import { Handle } from 'react-flow-renderer';
import './DiagramNode.scss'
import { memo } from 'react';

// @ts-ignore
const DiagramNode = memo(({ data, isConnectable }) => {
  return (
    <div className="diagramNode">
      <div className="diagramNode-header">Title</div>
      <div className="diagramNode-body">Body</div>
      custom node
    </div>
  );
});

export default DiagramNode;

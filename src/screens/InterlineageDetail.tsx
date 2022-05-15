import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls } from 'react-flow-renderer';
import DiagramNode from 'components/Interlineage/DiagramNode';

const initBgColor = '#dedede';

const connectionLineStyle = { stroke: '#fff' };
const snapGrid = [20, 20];

const DATA_CUSTOM_NODE = {
  nodes: [
    {
      id: '5',
      type: 'input',
      data: { label: 'label node 5' },
      position: { x: 0, y: 50 },
      // @ts-ignore
      sourcePosition: 'left',
    },
    {
      id: '6',
      type: 'input',
      data: { label: 'label node 6' },
      position: { x: 0, y: 50 },
      // @ts-ignore
      sourcePosition: 'right',
    }
  ]
}

const InterlineageDetail = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState(initBgColor);

  useEffect(() => {
    const onChange = (event: any) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== '2') {
            return node;
          }

          const color = event.target.value;

          setBgColor(color);

          return {
            ...node,
            data: {
              ...node.data,
              color,
            },
          };
        })
      );
    };

    setNodes([
      {
        id: '1',
        type: 'input',
        data: { label: 'An input node' },
        position: { x: 0, y: 50 },
        // @ts-ignore
        sourcePosition: 'right',
      },
      {
        id: '2',
        data: { label: 'Input-output-2' },
        extent: 'parent',
        style: { border: '1px solid #777', padding: 10 },
        position: { x: 300, y: 50 },
      },
      {
        id: '3',
        type: 'output',
        data: { label: 'Output A' },
        position: { x: 650, y: 25 },
        // @ts-ignore
        targetPosition: 'left',
      },
      {
        id: '4',
        type: 'output',
        data: { label: 'Output B' },
        position: { x: 650, y: 100 },
        // @ts-ignore
        targetPosition: 'left',
      },
      {
        id: '5',
        data: { label: 'label node 5' },
        position: { x: 0, y: 50 },
        // @ts-ignore
        sourcePosition: 'left',
        parentNode: '2'
      }
    ]);

    setEdges([
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        animated: true,
        style: { stroke: '#fff' },
      },
      {
        id: 'e2a-3',
        source: '2',
        target: '3',
        sourceHandle: 'a',
        animated: true,
        style: { stroke: '#fff' },
      },
      {
        id: 'e2b-4',
        source: '2',
        target: '4',
        sourceHandle: 'b',
        animated: true,
        style: { stroke: '#fff' },
      },
    ]);
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)),
    []
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      style={{ background: bgColor }}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      // @ts-ignore
      snapGrid={snapGrid}
      defaultZoom={1.5}
      fitView
      attributionPosition="bottom-left"
    >
      <Controls />
    </ReactFlow>
  );
};

export default InterlineageDetail;

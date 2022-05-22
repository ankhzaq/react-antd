import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { Background, useNodesState, useEdgesState, addEdge, Controls, MarkerType } from 'react-flow-renderer';
import DiagramNode from 'components/Interlineage/DiagramNode';

const connectionLineStyle = { stroke: '#fff' };
const snapGrid = [20, 20];

const NODE_TYPES = {
  customNode: DiagramNode,
};

const CUSTOM_STYLE = {
  border: '2px solid rgb(45, 204, 205)',
}

const EDGES = [
  {
    id: '1-2',
    source: '1',
    target: '2',
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    id: '1a-1b',
    source: '1a',
    target: '1b',
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    id: '2-3',
    source: '2',
    target: '3',
    markerEnd: {
      type: MarkerType.Arrow,
    },
  }
];

const InterlineageDetail = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);


  const showHideNodes = (id: string) => {
    const nodeIsVisible = nodes.findIndex((node) => node.id === id);
    if (nodeIsVisible) {
      const nextNodes = nodes.filter((node) => node.id !== id);
      setNodes(nextNodes);
    } else {
      const nextNode = NODES.find((node) => node.id === id);
      // @ts-ignore
      const nextNodes = nodes.concat([nextNode]);
      setNodes(nextNodes);
    }
  }

  const genericData = {
    showHideNodes
  };

  const NODES = [
    {
      type: 'customNode',
      id: '1',
      data: { ...genericData, positionHandleSource: 'right', title: 'F   CONTRATOS' },
      // @ts-ignore
      sourcePosition: 'right',
      style: {
        ...CUSTOM_STYLE,
        backgroundColor: 'rgba(255, 255, 255, 0.35)',
        height: 350,
        width: 480
      },
      position: { x: 100, y: 200 },
    },
    {
      id: '1a',
      data: { ...genericData, title: 'P INTERVINIENTES DOMÉSTICA', positionHandleSource: 'right' },
      // @ts-ignore
      sourcePosition: 'right',
      parentNode: '1',
      position: {
        x: 15, y: 65
      },
      style: {
        ...CUSTOM_STYLE,
        width: 300,
        height: 200,
      },
      type: 'customNode',
    },
    {
      id: '1b',
      data: { ...genericData, body: 'EOM CONTRATOS' },
      // @ts-ignore
      targetPosition: 'left',
      parentNode: '1',
      position: {
        x: 340, y: 145
      },
      style: {
        ...CUSTOM_STYLE,
      },
      type: 'customNode',
    },
    {
      id: '1a1',
      data: { ...genericData, body: 'EOM INTERVINIENTES' },
      extent: 'parent',
      parentNode: '1a',
      position: {
        x: 15, y: 50
      },
      style: {
        ...CUSTOM_STYLE,
      },
      type: 'customNode',
    },
    {
      id: '1a2',
      data: { ...genericData, body: 'EOM INTERVINIENTES ES DOMÉSTICA' },
      extent: 'parent',
      parentNode: '1a',
      position: {
        x: 15, y: 120
      },
      style: {
        ...CUSTOM_STYLE,
      },
      type: 'customNode',
    },
    {
      id: '2',
      data: { ...genericData, title: 'P   CONTRATOS' },
      // @ts-ignore
      targetPosition: 'left',
      // @ts-ignore
      sourcePosition: 'bottom',
      style: {
        ...CUSTOM_STYLE,
        backgroundColor: 'rgba(255, 255, 255, 0.35)',
        width: 200,
        height: 200,
      },
      position: { x: 650, y: 250 },
      type: 'customNode',
    },
    {
      id: '2a',
      data: { ...genericData, title: 'CONTRATOS CLIENTE' },
      extent: 'parent',
      parentNode: '2',
      position: {
        x: 25, y: 70
      },
      style: {
        ...CUSTOM_STYLE,
      },
      type: 'customNode',
    },
    {
      id: '3',
      data: { ...genericData, body: 'EOM CONTRATOS ACTIVOS', positionHandleTarget: 'top' },
      style: {
        ...CUSTOM_STYLE
      },
      position: { x: 675, y: 500 },
      type: 'customNode',
    }
  ];


  useEffect(() => {
    // @ts-ignore
    setNodes(NODES);

    setEdges(EDGES);
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)),
    []
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={NODE_TYPES}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      style={{ background: 'rgb(255 255 255)' }}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      // @ts-ignore
      snapGrid={snapGrid}
      defaultZoom={1.5}
      attributionPosition="bottom-left"
    >
      {/* @ts-ignore */}
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export default InterlineageDetail;

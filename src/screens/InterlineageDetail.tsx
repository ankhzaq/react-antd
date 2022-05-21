import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, MarkerType } from 'react-flow-renderer';
import DiagramNode from 'components/Interlineage/DiagramNode';

const initBgColor = '#dedede';

const connectionLineStyle = { stroke: '#fff' };
const snapGrid = [20, 20];

const InterlineageDetail = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState(initBgColor);

  const nodeTypes = {
    customNode: DiagramNode,
  };

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
        data: { label: 'F   CONTRATOS' },
        // @ts-ignore
        sourcePosition: 'right',
        style: {
          backgroundColor: 'rgba(255, 255, 255, 0.35)',
          border: '1px solid #777',
          height: 350,
          padding: 10,
          width: 450
        },
        position: { x: 100, y: 200 },
      },
      {
        id: '1a',
        data: { label: 'P INTERVINIENTES DOMÉSTICA' },
        // @ts-ignore
        sourcePosition: 'right',
        parentNode: '1',
        position: {
          x: 15, y: 65
        },
        style: {
          width: 200,
          height: 200,
        }
      },
      {
        id: '1b',
        data: { label: 'EOM CONTRATOS' },
        // @ts-ignore
        targetPosition: 'left',
        parentNode: '1',
        position: {
          x: 250, y: 145
        }
      },
      {
        id: '1a1',
        data: { label: 'EOM INTERVINIENTES' },
        extent: 'parent',
        parentNode: '1a',
        position: {
          x: 15, y: 50
        }
      },
      {
        id: '1a2',
        data: { label: 'EOM INTERVINIENTES ES DOMÉSTICA' },
        extent: 'parent',
        parentNode: '1a',
        position: {
          x: 15, y: 100
        },
      },
      {
        id: '2',
        data: { label: 'P   CONTRATOS' },
        // @ts-ignore
        targetPosition: 'left',
        // @ts-ignore
        sourcePosition: 'bottom',
        style: {
          backgroundColor: 'rgba(255, 255, 255, 0.35)',
          border: '1px solid #777',
          padding: 10,
          width: 200,
          height: 200,
        },
        position: { x: 650, y: 250 },
      },
      {
        id: '2a',
        data: { label: 'CONTRATOS CLIENTE' },
        extent: 'parent',
        parentNode: '2',
        position: {
          x: 25, y: 70
        },
      },
      {
        id: '3',
        data: { label: 'EOM CONTRATOS ACTIVOS' },
        style: {
          backgroundColor: 'rgba(255, 255, 255, 0.35)',
          border: '1px solid #777',
          padding: 10
        },
        position: { x: 675, y: 500 },
      },
      {
        id: '4',
        data: { label: 'CUSTOM NODE' },
        style: {
          backgroundColor: 'white',
          border: '2px solid rgb(45, 204, 205)',
        },
        type: 'customNode',
        position: { x: 100, y: 700 },
      },
    ]);

    setEdges([
      {
        id: '1-2',
        source: '1',
        target: '2',
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
      },
      {
        id: '1a-1b',
        source: '1a',
        target: '1b',
        markerEnd: {
          type: MarkerType.Arrow,
        },
      }
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
      /*nodeTypes={nodeTypes}*/
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      style={{ background: bgColor }}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      // @ts-ignore
      snapGrid={snapGrid}
      defaultZoom={1.5}
      attributionPosition="bottom-left"
    >
      <Controls />
    </ReactFlow>
  );
};

export default InterlineageDetail;

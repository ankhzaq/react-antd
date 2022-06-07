import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// @ts-ignore
import customId from 'custom-id';
import ReactFlow, {
  Background,
  useNodesState,
  Controls,
  MarkerType
} from 'react-flow-renderer';

const connectionLineStyle = {stroke: '#fff'};
const snapGrid = [20, 20];

const propsEdge = {
  type: 'simplebezier'
}

const EDGES = [
  {
    ...propsEdge,
    id: 'IN_PROGRESS-SNAPSHOT',
    label: 'User deploy snapshot file',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    source: 'IN_PROGRESS',
    target: 'SNAPSHOT',
  },
  {
    ...propsEdge,
    id: 'SNAPSHOT-IN_PROGRESS',
    label: 'User modify config.',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    source: 'SNAPSHOT',
    target: 'IN_PROGRESS',
  },
  {
    ...propsEdge,
    id: 'SNAPSHOT-IN_REVIEW',
    label: 'Deploy release version',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    source: 'SNAPSHOT',
    target: 'IN_REVIEW',
  },
  {
    ...propsEdge,
    id: 'IN_REVIEW-SNAPSHOT',
    label: 'Cancel proposal',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    source: 'IN_REVIEW',
    target: 'SNAPSHOT',
  },
  {
    ...propsEdge,
    id: 'IN_REVIEW-IN_PROGRESS',
    label: 'User modify config',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    source: 'IN_REVIEW',
    target: 'IN_PROGRESS',
  },
  {
    ...propsEdge,
    id: 'IN_REVIEW-REJECTED',
    label: 'Reject version proposal',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    source: 'IN_REVIEW',
    target: 'REJECTED',
  },
  {
    ...propsEdge,
    id: 'REJECTED-IN_REVIEW',
    label: 'Promotor reply to validator',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    source: 'REJECTED',
    target: 'IN_REVIEW',
  },
  {
    ...propsEdge,
    id: 'IN_REVIEW-ACCEPTED',
    label: 'Validator accept version proposal',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    source: 'IN_REVIEW',
    target: 'ACCEPTED',
  },
  {
    ...propsEdge,
    id: 'ACCEPTED-REJECTED',
    label: 'Validator reject proposal',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    source: 'ACCEPTED',
    target: 'REJECTED',
  },
  {
    ...propsEdge,
    id: 'ACCEPTED-RELEASE',
    label: 'user deploy proposal version',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    source: 'ACCEPTED',
    target: 'RELEASE',
  },
  {
    ...propsEdge,
    id: 'RELEASE-IN_PROGRESS',
    label: 'user modify config',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    source: 'RELEASE',
    target: 'IN_PROGRESS',
  }
];

const NODES = [
  {
    data: {
      label: (
        <>
          IN_PROGRESS
        </>
      ),
    },
    id: 'IN_PROGRESS',
    position: {x: -120, y: 20},
    sourcePosition: 'right',
    targetPosition: 'bottom',
  },
  {
    data: {
      label: (
        <>
          SNAPSHOT
        </>
      ),
    },
    id: 'SNAPSHOT',
    position: {x: 380, y: 470},
    sourcePosition: 'left',
    targetPosition: 'top',
  },
  {
    data: {
      label: (
        <>
          IN_REVIEW
        </>
      ),
    },
    id: 'IN_REVIEW',
    position: {x: 200, y: 270},
    sourcePosition: 'top',
    targetPosition: 'bottom',
  },
  {
    data: {
      label: (
        <>
          REJECTED
        </>
      ),
    },
    id: 'REJECTED',
    position: {x: -120, y: 390},
    sourcePosition: 'right',
    targetPosition: 'top',
  },
  {
    data: {
      label: (
        <>
          ACCEPTED
        </>
      ),
    },
    id: 'ACCEPTED',
    position: {x: 240, y: 10},
    sourcePosition: 'bottom',
    targetPosition: 'left',
  },
  {
    data: {
      label: (
        <>
          RELEASE
        </>
      ),
    },
    id: 'RELEASE',
    position: {x: -120, y: 250},
    sourcePosition: 'top',
    targetPosition: 'right',
  },
];

const DQFlow = (props: any) => {

  const {
    edgesToAnimate,
    nodesToShow
  } = props;

  const getEdges = () => {
    if (!edgesToAnimate) return EDGES;
    return EDGES.map((edge) => {
      // @ts-ignore
      if (edgesToAnimate.includes(edge.id)) return { ...edge, animated: true };
      return edge;
    })
  }

  // @ts-ignore
  const [nodes, setNodes, onNodesChange] = useNodesState(nodesToShow ? NODES.filter((node) => nodesToShow.includes(node.id)) : NODES);

  return (
    <div className="width100 height100 flex-column">
      <div className="flex1">
        <ReactFlow
          // @ts-ignore
          nodes={nodes}
          edges={getEdges()}
          fitView
          style={{ background: 'rgb(255 255 255)' }}
          connectionLineStyle={connectionLineStyle}
          onNodesChange={onNodesChange}
          snapToGrid
          // @ts-ignore
          snapGrid={snapGrid}
          defaultZoom={1.5}
          attributionPosition="bottom-left"
        >
          {/* @ts-ignore */}
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

DQFlow.defaultProps = {
  edgesToAnimate: null,
  nodesToShow: null
}

DQFlow.propTypes = {
  edgesToAnimate: PropTypes.array,
  nodesToShow: PropTypes.array
}

export default DQFlow;

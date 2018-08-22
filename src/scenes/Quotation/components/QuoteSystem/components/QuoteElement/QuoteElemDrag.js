import React, { Component } from 'react';
import {
  DragSource,
  DropTarget,
} from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import VisibleQuoteElem from './VisibleQuoteElem';
import iconDrag from '../../../../../../assets/grab.svg';

const quoteElemSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const quoteElemTarget = {
  hover(props, monitor, component) {
    if (!component) {
      return null;
    }
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return false;
    }

    // Determine rectangle on screen
    // eslint-disable-next-line react/no-find-dom-node
    const hoverBoundingRect = (findDOMNode(component)).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 3;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = (clientOffset).y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return false;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return false;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    // eslint-disable-next-line no-param-reassign
    monitor.getItem().index = hoverIndex;
    return true;
  },
};

class QuoteElemDrag extends Component {
  render() {
    const {
      index,
      quoteItem,
      connectDropTarget,
      connectDragPreview,
      connectDragSource,
      draggedItem,
    } = this.props;

    const isDraggedElem = draggedItem !== null && draggedItem.id === quoteItem.id;
    const opacity = {
      opacity: isDraggedElem ? 0.5 : 1,
    };

    return (

      connectDropTarget(
        connectDragPreview(
          <div style={opacity}>
            <VisibleQuoteElem
              index={index}
              quoteItem={quoteItem}
              key={`key_${index}`}
            >
              {connectDragSource(
                <img src={iconDrag} alt="" className="drag" style={{ cursor: '-webkit-grab' }} />,
              )}
            </VisibleQuoteElem>
          </div>,
        ),
      )
    );
  }
}

QuoteElemDrag.propTypes = {
  index: PropTypes.number.isRequired,
  quoteItem: PropTypes.shape({
    id: PropTypes.string,
    id_product: PropTypes.number,
    quantity: PropTypes.number,
    price: PropTypes.number,
    note: PropTypes.string,
    size: PropTypes.string,
    material: PropTypes.string,
    size_x: PropTypes.number,
    size_y: PropTypes.number,
  }).isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  draggedItem: PropTypes.shape({
    id: PropTypes.string,
    index: PropTypes.number,
  }),
};

QuoteElemDrag.defaultProps = {
  draggedItem: {
    id: '',
    index: null,
  },
};


function collectDrop(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

function collectDrag(connect, monitor) {
  return {
    connectDragPreview: connect.dragPreview(),
    connectDragSource: connect.dragSource(),
    draggedItem: monitor.getItem(),
  };
}

const enhance = compose(
  DropTarget('quoteElem', quoteElemTarget, collectDrop),
  DragSource('quoteElem', quoteElemSource, collectDrag),
);

export default enhance(QuoteElemDrag);

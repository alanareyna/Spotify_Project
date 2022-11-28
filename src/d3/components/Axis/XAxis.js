// @flow
import React, { PureComponent } from 'react';

import { select } from 'd3-selection';
import { axisBottom } from 'd3-axis';

import { ChartData, Margin } from '../../utils/commonTypes';


/** Class representing an XAxis node. */
class XAxis extends PureComponent {
  static displayName = 'XAxis';

  static defaultProps = {
    width: 600,
    height: 200,
    margin: { top: 20, left: 40, bottom: 30, right: 10 },
    showLabel: true,
    label: 'X Axis',
    labelPosition: 'right',
    showGrid: true,
  };

  // Element flow types.
  xAxis: ?Element;

  /**
   * Determines the position of the x axis label.
   * @param {Element} node - text element.
   */
  positionAxisLabel = (node) => {
    const { width, margin, labelPosition } = this.props;
    const formattedWidth = width - margin.left - margin.right;

    switch (labelPosition) {
      case 'left':
        // $FlowFixMe
        node.attr('x', 0).style('text-anchor', 'start');
        break;

      case 'right':
        // $FlowFixMe
        node.attr('x', formattedWidth).style('text-anchor', 'end');
        break;

      case 'center':
        // $FlowFixMe
        node.attr('x', formattedWidth / 2).style('text-anchor', 'middle');
        break;

      default:
        break;
    }
  };

  /** Render the X Axis. */
  renderXAxis = () => {
    const { data, height, x, showLabel, label, showGrid } = this.props;

    if (!x) {
      return;
    }

    const node = this.xAxis;
    const selection = select(node);

    selection.selectAll('*').remove();

    const xAxis = selection
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', `translate(0, ${height})`)
      .datum(data);

    xAxis.call(axisBottom(x));

    xAxis
      .filter(() => showLabel)
      .append('text')
      .attr('class', 'label')
      .attr('y', 30)
      //.style('fill', 'white')
      .text(label);

    xAxis.filter(() => showLabel).call(() => {
      const labelNode = xAxis.selectAll('.label');
      this.positionAxisLabel(labelNode);
    });

    xAxis
      .filter(() => showGrid)
      .append('g')
      .attr('class', 'grid x-grid')
      .call(
        axisBottom(x)
          .tickSize(-height, 0, 0)
          .tickFormat(''),
      );

    /*
      xAxis.selectAll('line')
      .style('stroke', 'white');

      xAxis.selectAll('axis x-axis')
      .style('stroke', 'white')

    xAxis.selectAll('label')
        .style('fill', 'white');
        */

  };

  render() {
    this.renderXAxis();
    return (
      <g
        ref={xAxis => {
          this.xAxis = xAxis;
        }}
        className="xAxis"
      />
    );
  }
}

export default XAxis;

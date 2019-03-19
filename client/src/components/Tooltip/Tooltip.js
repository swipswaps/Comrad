import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RCTooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

function preventDefault(e) {
  e.preventDefault();
}

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.escFunction = this.escFunction.bind(this);
  }

  state = {
    visible: false,
  };

  static propTypes = {
    setKey: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
    overlay: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
      .isRequired,
    trigger: PropTypes.oneOf(['hover', 'click']).isRequired,
    destroyTooltipOnHide: PropTypes.bool,
    mouseLeaveDelay: PropTypes.number,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  escFunction(event) {
    //https://stackoverflow.com/questions/37440408/how-to-detect-esc-key-press-in-react-and-how-to-handle-it
    if (event.keyCode === 27) {
      this.setState({
        visible: false,
      });
    }
  }

  onVisibleChange = visible => {
    this.setState({
      visible,
    });
  };

  render() {
    const {
      setKey,
      children,
      className,
      placement,
      text,
      overlay,
      trigger,
      destroyTooltipOnHide = false,
      mouseLeaveDelay = 0,
      ...rest
    } = this.props;

    const { visible } = this.state;

    return (
      <RCTooltip
        key={setKey}
        className={className}
        trigger={trigger}
        overlay={overlay}
        placement={placement}
        //Visible and onVisableChange are used for trigger='click' tooltips
        visible={visible}
        onVisibleChange={this.onVisibleChange}
        destroyTooltipOnHide={destroyTooltipOnHide}
        mouseLeaveDelay={mouseLeaveDelay}
        {...rest}
      >
        {children}
      </RCTooltip>
    );
  }
}

export default Tooltip;

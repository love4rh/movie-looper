import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

import './styles.scss';



class ScriptItem extends Component {
  static propTypes = {
    index: PropTypes.number,
    data: PropTypes.object,
    selected: PropTypes.bool,
    showAll: PropTypes.bool,

    onClick: PropTypes.func
  }

  constructor (props) {
    super(props);

    this.state = {
      textShown: props.showAll,
      propShown: props.showAll
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if( prevState.propShown !== nextProps.showAll  ) {
      // 변경이 필요한 것만 반환
      return { textShown: nextProps.showAll, propShown: nextProps.showAll };
    }

    return null;
  }

  toggleHide = () => {
    const { textShown } = this.state;

    this.setState({ textShown: !textShown });
  }

  handleClick = () => {
    const { onClick } = this.props;

    onClick();
  }

  render () {
		const { data, selected, index } = this.props;
    const { textShown } = this.state;

    return (
      <div className={ cn({ 'ScriptItem':true, 'ScriptSelected':selected }) }>
        <div className="ScriptButton" onClick={this.toggleHide}>{textShown ? <RiEyeOffLine /> : <RiEyeLine />}</div>
				<div className="ScriptText" onClick={this.handleClick}>
          {'[' + (index + 1) + '] '} {textShown ? data.text : '...'}
        </div>
			</div>
    );
  }
};

export default ScriptItem;
export { ScriptItem} ;

import React from 'react'
import PropsTypes from 'prop-types'
import ClassNames from 'classnames'

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            editable: false
        };
        this.handleClickShowEdit = this.handleClickShowEdit.bind(this);
        this.handleKeyUpCloseEdit = this.handleKeyUpCloseEdit.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
    }

    handleChangeText(e) {
        this.setState({
            text: e.target.value
        });
    }

    handleKeyUpCloseEdit(e) {
        if (e.keyCode === 13 && e.shiftKey === true) {
            this.setState({
                text: e.currentTarget.value,
                editable: false
            });
            this.props.onEnterUpdateTask(e.currentTarget.value);
        }
    }

    handleClickShowEdit() {
        this.setState({
            editable: true
        });
    }


    render() {
        const {onClickToggleDone, onClickRemove} = this.props;
        const classNameLi = ClassNames({
            'list__item': true,
            'list__item--done': this.props.done
        });
        const classNameIcon = ClassNames({
            'fa': true,
            'fa-circle-thin': !this.props.done,
            'fa-check-circle': this.props.done,
            'icon-check': true
        });

        const input = (this.state.editable) ? <input type={"text"} className="editText" value={this.state.text}
                                                     onChange={this.handleChangeText}
                                                     onKeyUp={this.handleKeyUpCloseEdit}/> :
            <span onClick={this.handleClickShowEdit}>{this.state.text}</span>;

        return (
            <li className={classNameLi}>
                <i className={classNameIcon} onClick={onClickToggleDone} aria-hidden="true"/>
                {input}
                <i className="fa fa-trash icon-trash" onClick={onClickRemove} aria-hidden="true"/>
            </li>
        )
    }
}

Task.propsTypes = {
    id: PropsTypes.string.isRequired,
    text: PropsTypes.string.isRequired,
    done: PropsTypes.bool.isRequired,
    onEnterUpdateTask: PropsTypes.func.isRequired,
    onClickToggleDone: PropsTypes.func.isRequired,
    onClickRemove: PropsTypes.func.isRequired
};

export default Task;
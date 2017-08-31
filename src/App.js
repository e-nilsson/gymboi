import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

class UserForm extends Component {
  constructor() {
    super();
    this.state = {
      showComponent: false,
      inputAge: 0,
      inputWeight: 0,
      inputLength: 0,
      inputActivityFactor: 1.3,
    };
    this.handleChange = this.handleChange.bind(this);
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick(e) {
    e.preventDefault();
    this.setState({
      showComponent: true,
    });
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleActivityFactor = (inputActivityFactor, val) => {
    val['min'] = parseFloat(val.min).toFixed(1)
    val['max'] = parseFloat(val.max).toFixed(1)
    const state = {...this.state, [inputActivityFactor]: val}
    this.setState(state);
  }

  render() {
    return (
      <div>
        <div className="container">
          <form className="user-form">
            <div className="form-group col-12 col-sm-8 col-md-6 col-lg-4">
              <label htmlFor="inputAge">Ålder: </label>
              <input type="text" value={this.state.inputAge} name="inputAge" className="form-control" id="inputAge" onChange={this.handleChange} />
            </div>
            <div className="form-group col-12 col-sm-8 col-md-6 col-lg-4">
              <label htmlFor="inputWeight">Vikt (kg): </label>
              <input type="text" value={this.state.inputWeight} name="inputWeight" className="form-control" id="inputWeight" onChange={this.handleChange} />
            </div>
            <div className="form-group col-12 col-sm-8 col-md-6 col-lg-4">
              <label htmlFor="inputLength">Längd (cm): </label>
              <input type="text" value={this.state.inputLength} name="inputLength" className="form-control" id="inputLength" onChange={this.handleChange} />
            </div>
            <div className="form-group range-slider col-12 col-sm-8 col-md-6 col-lg-4">
            <label htmlFor="inputLength">Aktivitetsfaktor: </label>
            <InputRange
              step={0.1}
              maxValue={2.0}
              minValue={1.2}
              formatLabel={value => value.toFixed(1)}
              value={this.state.inputActivityFactor}
              onChange={value => this.setState({ inputActivityFactor: value })} 
              />
            </div>
            <div className="form-group col-12 col-sm-8 col-md-6 col-lg-4">
              <button onClick={this._onButtonClick}>Beräkna!</button>
            </div>
          </form>
          
        </div>
        {
          this.state.showComponent ? 
          <UserResults 
            _onButtonClick={this._onButtonClick}
            inputAge={this.state.inputAge}
            inputWeight={this.state.inputWeight}
            inputLength={this.state.inputLength}
            inputActivityFactor={this.state.inputActivityFactor} /> : null
        }
      </div>
    )
  }
}

class UserResults extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    const bee = 66.2 + (13.75 * this.props.inputWeight) + (5.003 * this.props.inputLength) - (6.775 * this.props.inputAge);
    const energyNeed = bee * this.props.inputActivityFactor;
    const weightDecrease = energyNeed - 500;
    const weightDecreaseLight = energyNeed - 200;
    const weightIncrease = energyNeed + 250;

    const proteinKcal = weightIncrease * 0.25;
    const proteinGrams = proteinKcal / 4;
    const carbsKcal = weightIncrease * 0.4;
    const carbsGrams = carbsKcal / 4;
    const fatKcal = weightDecrease * 0.35;
    const fatGrams = fatKcal / 9;
    
    return (
      <div>
        <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true} transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false}>
          <div className="user-result">
            <div className="user-result__details container">
              <div className="row">
                <div className="col-4">
                    <div className="user-details__item"><span>Energibehov:</span> <br/>{energyNeed}</div>
                    <div className="user-details__item"><span>BEE:</span> <br/>{bee}</div>
                </div>
                <div className="col-4">
                  <div className="user-details__item"><span>För viktnedgång (0,5kg/v):</span> <br/>{weightDecrease}</div>
                  <div className="user-details__item"><span>För viktnedgång (0,2kg/v):</span> <br/>{weightDecreaseLight}</div>
                  <div className="user-details__item"><span>För viktuppgång:</span> <br/>{weightIncrease}</div>
                </div>
                <div className="col-4">
                  <div className="user-details__item"><span>Protein:</span> <br/>{proteinKcal} kcal / {proteinGrams} g</div>
                  <div className="user-details__item"><span>Kolhydrater:</span> <br/>{carbsKcal} kcal / {carbsGrams} g</div>
                  <div className="user-details__item"><span>Fett:</span> <br/>{fatKcal} kcal / {fatGrams} g</div>
                </div>
              </div>
              <div className="calltoaction col-4">
              <button>Beställ matschema av Tonka!</button>
              </div>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default UserForm;

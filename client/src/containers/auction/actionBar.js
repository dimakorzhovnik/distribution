import React, { Component } from 'react';


export class ActionBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          valueSelect: ''
        };
      }
    render(){
        const { valueSelect } = this.state;

        return(
           <div className='container-action'>
               <div className='container-action-content'>
                   <div className='action-text'>
                        <span className='actionBar-text'>Contribute ETH using</span>
                        <select>
                            <option>Any ETH wallet</option>
                            <option>Ledger</option>
                        </select>
                    </div>
                    <button className='btn'>Fuck Google</button>
               </div>
           </div>
        );
    }
}


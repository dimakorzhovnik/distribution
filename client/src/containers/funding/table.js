import React, { Component } from 'react';

export class Table extends Component {
    render() {
        return (
            <div className='table'>
                <div className='table-header-rows'>
                    <div className='number'>TX id</div>
                    <div className='number'>ATOMs</div>
                    <div className='number'>GCYB estimation</div>
                    <div className='number'>Price</div>
                </div>
                <div className='table-body'>
                <div className='table-rows'>
                    <div className='number address'>cosmos1q4c2j27y4rn2lpp9epadwu27a9d4ktcyf3ujnw</div>
                    <div className='number'>20.000000</div>
                    <div className='number'>5</div>
                    <div className='number'>2</div>
                </div>
                <div className='table-rows'>
                    <div className='number address'>cosmos1q4c2j27y4rn2lpp9epadwu27a9d4ktcyf3ujnw</div>
                    <div className='number'>20.000000</div>
                    <div className='number'>5</div>
                    <div className='number'>2</div>
                </div>
                <div className='table-rows'>
                    <div className='number address'>cosmos1q4c2j27y4rn2lpp9epadwu27a9d4ktcyf3ujnw</div>
                    <div className='number'>20.000000</div>
                    <div className='number'>5</div>
                    <div className='number'>2</div>
                </div>
                <div className='table-rows'>
                    <div className='number address'>cosmos1q4c2j27y4rn2lpp9epadwu27a9d4ktcyf3ujnw</div>
                    <div className='number'>20.000000</div>
                    <div className='number'>5</div>
                    <div className='number'>2</div>
                </div>
             
                </div>
                
            </div>
        )
    }
}
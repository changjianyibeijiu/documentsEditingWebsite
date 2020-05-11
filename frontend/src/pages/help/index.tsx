import React, { Component } from 'react'
import styles from './index.less'
export default class index extends Component {
    render() {
        return (
            <div className = {styles.box}>
                <div className={styles.content}>
                    <h1>毕业设计2020</h1>
                    <p style={{textAlign:"right"}}>design by zheng</p>
                </div>
            </div>
        )
    }
}

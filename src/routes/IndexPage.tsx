import React from 'react'
import PrimaryTheme from '../themes/Primary'

export default function IndexPage() {
  return (
    <>
      <div className="col-md-12 border-right hero" style={{backgroundColor: PrimaryTheme.appBar}}></div>
      <div className="col-md-12 border-right bg-white" style={styles.section}></div>
      <div className="col-md-12 border-right bg-light" style={styles.section}></div>
      <div className="col-md-12 border-right bg-white" style={styles.section}></div>
      <div className="col-md-12 border-right bg-light" style={styles.section}></div>
      <div className="col-md-12 border-right bg-dark" style={styles.section}></div>
    </>
  )
}

const styles = {
  header: {
    color: '#fff'
  },
  section: {
    height: 450
  },
  content: {
    overflow: 'auto',
  }
}
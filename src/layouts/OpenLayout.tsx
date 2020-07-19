import React from 'react'

export default function OpenLayout() {
  return (
    <div>
      <header className='bg-color'>
        <div className="container">
          <div className="row">
            <h3 className="p-2" style={styles.header}>Artisana</h3>
          </div>
        </div>
      </header>

      <div className="container-fluid bg-light">
        <div className="row content" style={styles.content}>
          <div className="col-md-12 border-right bg-color" style={styles.section}></div>
          <div className="col-md-12 border-right bg-white" style={styles.section}></div>
          <div className="col-md-12 border-right bg-light" style={styles.section}></div>
          <div className="col-md-12 border-right bg-white" style={styles.section}></div>
          <div className="col-md-12 border-right bg-light" style={styles.section}></div>
          <div className="col-md-12 border-right bg-dark" style={styles.section}></div>
        </div>
      </div>
    </div>
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

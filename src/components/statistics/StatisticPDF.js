import React from 'react'

function StatisticPDF(props) {

  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Ngày</th>
            <th scope="col">Doanh thu theo ngày</th>
            <th scope="col">Chi phí theo ngày</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <td>{props.dayCosts}</td>
            <td>{props.statistics}</td>
            <td>{props.dayCosts}</td> */}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default StatisticPDF
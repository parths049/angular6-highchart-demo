import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-chart-component',
  templateUrl: './chart-component.component.html',
  styleUrls: ['./chart-component.component.css']
})
export class ChartComponentComponent implements OnInit {

  public chartData: any;
  public chart: any;
  ngOnInit() {
    this.getChartData().subscribe(res => {
      if (res.status === '1') {
        this.chartData = res.data.chartData;

        this.chart = new Chart({
          chart: {
            type: 'line'
          },
          title: {
            text: 'Axeman Test'
          },
          xAxis: {
            title: {
                  text: 'Words'
              },
              categories: res.data.xAxis
            },
          yAxis: {
              title: {
                  text: 'Score'
              }
          },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle'
          },
          series: [{
            name: 'Your Score',
                data: res.data.score
            }, {
                name: 'Avg Score',
                data: res.data.avgScore
            }],
            responsive: {
              rules: [{
                condition: {
                  maxWidth: 500
                },
                chartOptions: {
                      legend: {
                          layout: 'horizontal',
                          align: 'center',
                          verticalAlign: 'bottom'
                      }
                  }
                }]
              }
        });
      } else {
        alert(res.message);
      }
    });
  }



  constructor(private httpClient: HttpClient) { }

  /**
   * Get request
   */
  get(url: string): Observable<any> {

    return this.httpClient.get<any>(url);
  }

  getChartData(): Observable<any> {
    return this.get('http://localhost:8080/chart/getData');
  }

}


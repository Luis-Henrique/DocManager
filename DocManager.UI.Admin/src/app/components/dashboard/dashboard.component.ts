import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DashboardService } from "src/app/services/dashboard-service";
import { DashBoardGroupView } from "./models/dashboard-view";

@Component({
    templateUrl:'./dashboard.component.html',
     styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  
    constructor(private dashBoardService: DashboardService){}

    ngOnInit(){

        this.dashBoardByProductUnity('product','status','unity','unityId');
        this.dashBoardByProductCategory('product','status','category','categoryId');
        this.dashBoardByProductType('product','status','productType','productTypeId');
    }

    dashboardModel: DashBoardGroupView[]=[];


    public colors: string[] = ['#0d6efd','#ad92e0','#6f42c1','#d63384','#dc3545','#fd7e14','#ffc107','#198754','#20c997','#0dcaf0','#e55353','#39f','#4f5d73','#FF6384','#36A2EB','#FFCE56'];

    chartPieData = {
      labels: [''],
      datasets: [
        {
          data: [0],
          backgroundColor: [''],
          hoverBackgroundColor: ['']
        }
      ]
    };

    chartPieData2 = {
        labels: [''],
        datasets: [
          {
            data: [0],
            backgroundColor: [''],
            hoverBackgroundColor: ['']
          }
        ]
      };    

      chartPieData3 = {
        labels: [''],
        datasets: [
          {
            data: [0],
            backgroundColor: [''],
            hoverBackgroundColor: ['']
          }
        ]
      };  

      dashBoardByProductCategory(entity:string, field:string, join:string, fieldjoin:string) {

        var _chartLabel: string[] = [];
        var _chartData: number[] = [];
        var _color: string[] = [];
        var _houverColor: string[] = [];   
        this.dashBoardService.getDashboard(entity,field,join,fieldjoin).subscribe(view => {
          this.dashboardModel = view;
          for (var name of this.dashboardModel)
          {
            var randomData = Math.floor(Math.random()*100);
      
            if (randomData ==0)
               randomData = Math.floor(Math.random()*100);
      
            var randomColor = Math.floor(Math.random()*this.colors.length);      
      
            _chartLabel.push(name.group);
            _chartData.push(name.count);
      
            _color.push(this.colors[randomColor])
            _houverColor.push(this.colors[randomColor])
          }
      
          this.chartPieData2 = {
            labels: _chartLabel,
            datasets: [
              {
                data: _chartData,
                backgroundColor: _color,
                hoverBackgroundColor: _houverColor
              }
            ]
          };     
        }, error => {
          console.log(error);    
        });
      }

      dashBoardByProductType(entity:string, field:string, join:string, fieldjoin:string) {
        var _chartLabel: string[] = [];
        var _chartData: number[] = [];
        var _color: string[] = [];
        var _houverColor: string[] = [];   
        this.dashBoardService.getDashboard(entity,field,join,fieldjoin).subscribe(view => {
          this.dashboardModel = view;
          for (var name of this.dashboardModel)
          {
            var randomData = Math.floor(Math.random()*100);
      
            if (randomData ==0)
               randomData = Math.floor(Math.random()*100);
      
            var randomColor = Math.floor(Math.random()*this.colors.length);      
      
            _chartLabel.push(name.group);
            _chartData.push(name.count);
      
            _color.push(this.colors[randomColor])
            _houverColor.push(this.colors[randomColor])
          }
      
          this.chartPieData3 = {
            labels: _chartLabel,
            datasets: [
              {
                data: _chartData,
                backgroundColor: _color,
                hoverBackgroundColor: _houverColor
              }
            ]
          };     
        }, error => {
          console.log(error);    
        });
      }            


      dashBoardByProductUnity(entity:string, field:string, join:string, fieldjoin:string) {
        var _chartLabel: string[] = [];
        var _chartData: number[] = [];
        var _color: string[] = [];
        var _houverColor: string[] = [];   
        this.dashBoardService.getDashboard(entity,field,join,fieldjoin).subscribe(view => {
          this.dashboardModel = view;
          for (var name of this.dashboardModel)
          {
            var randomData = Math.floor(Math.random()*100);
      
            if (randomData ==0)
               randomData = Math.floor(Math.random()*100);
      
            var randomColor = Math.floor(Math.random()*this.colors.length);      
      
            _chartLabel.push(name.group);
            _chartData.push(name.count);
      
            _color.push(this.colors[randomColor])
            _houverColor.push(this.colors[randomColor])
          }
      
          this.chartPieData = {
            labels: _chartLabel,
            datasets: [
              {
                data: _chartData,
                backgroundColor: _color,
                hoverBackgroundColor: _houverColor
              }
            ]
          };     
        }, error => {
          console.log(error);    
        });
      }            


    
}
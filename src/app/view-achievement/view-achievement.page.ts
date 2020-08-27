import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationExtras } from '@angular/router';
import {ToastController, LoadingController,AlertController, NavController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as papa from 'papaparse';

@Component({
  selector: 'app-view-achievement',
  templateUrl: './view-achievement.page.html',
  styleUrls: ['./view-achievement.page.scss'],
})
export class ViewAchievementPage implements OnInit {
  s: string[]=new Array();
  sa: string[]=new Array();
  csvData: any[]=[];
  headerRow: any[]=[];
  sub: string;
  n: number;
  convertstr:string;
  finalstr: string[]=new Array();
  tds: string[][]=new Array();
  sc: string ="";
  header: string[]=['Regno','Category','Sub Category','Date of Achievement','Details'];
  separated: string[]=new Array();
  constructor(private route: ActivatedRoute,
    private storage: Storage,
    private  router : Router,
    private navCtrl: NavController) { }

  ngOnInit(){
    this.route.queryParams.subscribe(NavParams => {
      this.sub = NavParams["data"];
      this.n=NavParams["number"]
    });
    this.s=this.sub.split(',');
  
    for(let i=0; i<this.s.length;i+=5){
       this.tds.push(this.s.slice(i,i+5));
    }
     

}

private extractData(finalstr){
  let csvData= finalstr['_body'] || '';
  let parsedData=papa.parse(csvData).finalstr;
  this.headerRow = parsedData[0];
  parsedData.splice(0,1);
  this.csvData=parsedData;
}

downloadCSV(){
  let csv=papa.unparse({
    fields: this.header,
    data:this.tds

  });
  var blob= new Blob([csv]);
  var a= window.document.createElement("a");
  a.href= window.URL.createObjectURL(blob);
  a.download="achievement.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
trackByFn(index:any,item:any){
  return index;
}
tryHome(){
  this.router.navigate(['/home2']);
}
}

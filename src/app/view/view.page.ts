import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationExtras } from '@angular/router';
import {ToastController, LoadingController,AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../app/providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  datastorage: any;
  category: string ;
  scategory: string ;
  rdate: string ;
  details: string;
   regno: string; 
   s: string[]=new Array();
   sa: string[]=new Array();
   sub: string;
   n: number;
   convertstr:string;
   finalstr: string[]=new Array();
   sc: string;
   separated: string[]=new Array();
   
  constructor( private route: ActivatedRoute,
    private storage: Storage,
    private  router : Router,
    private navCtrl: NavController) {}
 
  ngOnInit(){
    this.route.queryParams.subscribe(NavParams => {
      this.sub = NavParams["data"];
      this.n=NavParams["number"]
    });
    this.s=this.sub.split(',');
    let c=0;
    while(this.n!=0){
    for(let i=0;i<5;i++){
          this.sa[i] =this.s[i];

    }
    this.convertstr=this.sa.toString();
    this.finalstr[this.n-1]=this.convertstr;
    c=c+5;
    let e=0;
    for(let d=c; d<c+5;d++){
         this.s[e]=this.s[d];
         e++;
    }
     this.n--; 
  }  
      
      
  }
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
            console.log(res);
             this.datastorage = res;    
            this.regno = this.datastorage.Regno;
          });
        }
        tryEdit(b){
                  this.sc=this.finalstr[b];  
                  this.separated=this.sc.split(',');
                  this.category=this.separated[1];   
                  this.scategory=this.separated[2];
                  this.rdate=this.separated[3];
                  this.details=this.separated[4];         
          let navigationExtras: NavigationExtras={
            queryParams:{
             
              category:this.category,
               scategory:this.scategory,
               rdate:this.rdate,
              details:this.details}};
          this.navCtrl.navigateForward(['/edit'],navigationExtras);
        }
        tryHome(){
          this.router.navigate(['/home1']);
        }
}

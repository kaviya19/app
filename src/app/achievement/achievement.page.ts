import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationExtras } from '@angular/router';
import {ToastController, LoadingController,AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../app/providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.page.html',
  styleUrls: ['./achievement.page.scss'],
})
export class AchievementPage implements OnInit {

  datastorage: any;
  name: string;
  dept: string;
  regno: string;
  category: string = "";
  scategory: string = "";
  rdate: string = "" ;
  details: string = "";
  data: string= "";
  trans: string="";
  number: number;
  disabledButton;
  constructor( 
    private  router : Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accPrvds: AccessProviders,
    private storage: Storage,
    private navCtrl: NavController

    ) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
            console.log(res);
             this.datastorage = res;
            this.name = this.datastorage.username;
            this.dept = this.datastorage.dept;
            this.regno = this.datastorage.Regno;
            
    });
  }
 
  async trySubmit(){
    if(this.category == ""){
    this.presentToast('Category is a required field');}
    else if(this.scategory == ""){
      this.presentToast(' Sub Category is a required field');}
    else if(this.rdate == ""){
    this.presentToast('Recieved Date Of Award is a required field');}
    else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message :'please wait...',
      });
      loader.present();

      return new Promise(resolve =>{
        let body = {
          aksi: 'process_submit',
          regno: this.datastorage.Regno,
          category: this.category,
          scategory: this.scategory,
          rdate: this.rdate,
          details: this.details
         }
         this.accPrvds.postData(body, 'process_api.php').subscribe((res: any)=>{
           if(res.success == true){
             loader.dismiss();
             this.disabledButton = false;
             this.presentToast('Your achievemnet is Recorded');
              this.navCtrl.navigateRoot(['/home1']);
           }else{
            loader.dismiss();
             this.disabledButton = false;
             this.presentToast('Error occurred'); 
           }
         },(err)=>{
          loader.dismiss();
          this.disabledButton = false;
          this.presentAlert('Timeout'); 
         });
      });
    }
  }
  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }
  async presentAlert(a) {
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
      
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Try Again',
          handler: () => {
            this.trySubmit();
          }
        }
      ]
    });

    await alert.present();
  }
  tryHome(){
    this.router.navigate(['/home1']);
  }

}

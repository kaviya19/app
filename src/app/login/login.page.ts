import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastController,LoadingController, AlertController } from '@ionic/angular';
import { AccessProviders } from '../providers/access-providers';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string ="";
  password: string ="";
  disabledButton;


  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController ,
    private alertCtrl: AlertController,
    private storage: Storage,
    private accPrvds: AccessProviders
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.disabledButton = false;
  }

  async tryLogin(){
    if(this.username==""){
      this.presentToast('Username is required');
    }else if(this.password==""){
      this.presentToast('Password is required');
    }
    else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: "Please wait..."
      });
      loader.present();

      return new Promise(resolve =>{
        let body = {
          aksi: 'staff_login',
          username: this.username,
          password: this.password
        }

        this.accPrvds.postData(body, 'process_api.php').subscribe((res:any)=>{
          if(res.success==true){
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.result);
              this.router.navigate(['/home2']);
          }else{
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.result);
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
      duration:1500,
      position:'bottom'
    });
    toast.present();
  }

  async presentAlert(a) {
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Close',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Try Again',
          handler: () => {
            this.tryLogin();
          }
        }
      ]
    });

    await alert.present();
  }
  tryforgot(){
    this.router.navigate(['/alert']);
  }
  }


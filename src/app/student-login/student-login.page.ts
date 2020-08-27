import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastController,LoadingController, AlertController } from '@ionic/angular';
import { AccessProviders } from '../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.page.html',
  styleUrls: ['./student-login.page.scss'],
})
export class StudentLoginPage implements OnInit {

  username: string ="";
  password: string ="";
  disabledButton;


  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController ,
    private alertCtrl: AlertController,
    private accPrvds: AccessProviders,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.disabledButton = false;
  }

  async trystudentlogin(){
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
          aksi: 'student_login',
          username: this.username,
          password: this.password
        }

        this.accPrvds.postData(body,'process_api.php').subscribe((res:any)=>{
          if(res.success==true){
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast('Login successfully');
              this.storage.set('storage_xxx',res.result);
              this.router.navigate(['/home1']);
          }else{
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast('Username or password is incorrect');
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
            this.trystudentlogin();
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



